import * as yargs from 'yargs';

import BigNumber from 'bignumber.js';
import * as fs from 'fs';
import * as path from 'path';
import { Utxo } from './packages/yoroi-lib-browser/node_modules/@emurgo/yoroi-lib-core/dist/utxo';
import { UtxoDiffToBestBlock } from './packages/yoroi-lib-browser/node_modules/@emurgo/yoroi-lib-core/src/utxo/models';
import { UtxoAtSafePoint } from './packages/yoroi-lib-browser/node_modules/@emurgo/yoroi-lib-core/src/utxo/models';

import { init, UtxoStorage } from './packages/yoroi-lib-core/src/utxo';

if (!fs.existsSync(path.join(__dirname, '__storage__'))) {
  fs.mkdirSync(path.join(__dirname, '__storage__'));
}

// add all needed addresses to this __storage__/addresses.json file
if (!fs.existsSync(path.join(__dirname, '__storage__', 'addresses.json'))) {
  fs.writeFileSync(path.join(__dirname, '__storage__', 'addresses.json'), '[]');
}

const addresses: string[] = JSON.parse(fs.readFileSync(path.join(__dirname, '__storage__', 'addresses.json'), 'utf-8'));

class JsonUtxoStorage implements UtxoStorage {
  private _safePointPath: string
  private _diffPath: string

  constructor() {
    this._safePointPath = path.join(__dirname, '__storage__', 'safe-point.json');
    this._diffPath = path.join(__dirname, '__storage__', 'diff.json');
  }

  async getUtxoAtSafePoint(): Promise<UtxoAtSafePoint | undefined> {
    if (!fs.existsSync(this._safePointPath)) return undefined;

    return JSON.parse(fs.readFileSync(this._safePointPath, 'utf-8'));
  }

  async getUtxoDiffToBestBlock(): Promise<UtxoDiffToBestBlock[]> {
    if (!fs.existsSync(this._diffPath)) return [];

    return JSON.parse(fs.readFileSync(this._diffPath, 'utf-8'));
  }

  async replaceUtxoAtSafePoint(utxos: Utxo[], safeBlockHash: string): Promise<void> {
    const safePoint: UtxoAtSafePoint = {
      lastSafeBlockHash: safeBlockHash,
      utxos: utxos
    };
    fs.writeFileSync(this._safePointPath, JSON.stringify(safePoint, null, 2));
  }

  async clearUtxoState(): Promise<void> {
    if (fs.existsSync(this._safePointPath)) {
      fs.unlinkSync(this._safePointPath);
    }

    if (fs.existsSync(this._diffPath)) {
      fs.unlinkSync(this._diffPath);
    }
  }

  async appendUtxoDiffToBestBlock(diff: UtxoDiffToBestBlock): Promise<void> {
    if (!fs.existsSync(this._diffPath)) {
      fs.writeFileSync(this._diffPath, '[]');
    }

    const currentDiffs = await this.getUtxoDiffToBestBlock();
    if (!currentDiffs.find(d => d.lastBestBlockHash === diff.lastBestBlockHash)) {
      currentDiffs.push(diff);

      fs.writeFileSync(this._diffPath, JSON.stringify(currentDiffs, null, 2));
    }
  }

  async removeDiffWithBestBlock(blockHash: string): Promise<void> {
    if (!fs.existsSync(this._diffPath)) {
      throw new Error('missing diffs!');
    }

    const currentDiffs = await this.getUtxoDiffToBestBlock();
    const diffToRemove = currentDiffs.find(d => d.lastBestBlockHash === blockHash);

    const index = currentDiffs.indexOf(diffToRemove);
    if (index > -1) {
      currentDiffs.splice(index, 1);
    }

    fs.writeFileSync(this._diffPath, JSON.stringify(currentDiffs, null, 2));
  }
}

(async () => {
  const argv = await yargs
    .command('sync', 'syncs the latest safe point and diffs')
    .command('sum', 'sums the current UTxO amounts, including the diffs')
    .argv;

  const utxoService = init(new JsonUtxoStorage(), 'http://localhost:8082/');
  if (argv._.includes('sync')) {  
    await utxoService.syncUtxoState(addresses);
  } else if (argv._.includes('sum')) {
    const utxos = await utxoService.getAvailableUtxos();
    const sum = utxos.reduce((prev, curr) => {
      return prev.plus(curr.amount);
    }, new BigNumber('0'));
    console.log(sum.toString());
  }
})();

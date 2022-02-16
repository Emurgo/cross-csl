import {
  AccountStorage,
  AddressRecord
} from '@emurgo/yoroi-lib-core/dist/account/models'
import { UtxoStorage } from '@emurgo/yoroi-lib-core/dist/utxo'
import {
  Utxo,
  UtxoAtSafePoint,
  UtxoDiffToBestBlock
} from '@emurgo/yoroi-lib-core/dist/utxo/models'
import * as fs from 'fs'

export class JsonAccountStorage implements AccountStorage {
  #accountsPath: string
  constructor(accountsPath: string) {
    this.#accountsPath = accountsPath
  }

  async readAccounts(): Promise<AddressRecord[]> {
    if (!fs.existsSync(this.#accountsPath)) return []
    return JSON.parse(fs.readFileSync(this.#accountsPath, 'utf-8'))
  }

  async saveAccounts(addresses: AddressRecord[]): Promise<boolean> {
    fs.writeFileSync(this.#accountsPath, JSON.stringify(addresses, null, 2))
    return true
  }

  async clearStorage(): Promise<void> {
    if (fs.existsSync(this.#accountsPath)) {
      fs.unlinkSync(this.#accountsPath)
    }
  }
}

export class JsonUtxoStorage implements UtxoStorage {
  private _safePointPath: string
  private _diffPath: string

  constructor(safePointPath: string, diffPath: string) {
    this._safePointPath = safePointPath
    this._diffPath = diffPath
  }

  async getUtxoAtSafePoint(): Promise<UtxoAtSafePoint | undefined> {
    if (!fs.existsSync(this._safePointPath)) return undefined

    return JSON.parse(fs.readFileSync(this._safePointPath, 'utf-8'))
  }

  async getUtxoDiffToBestBlock(): Promise<UtxoDiffToBestBlock[]> {
    if (!fs.existsSync(this._diffPath)) return []

    return JSON.parse(fs.readFileSync(this._diffPath, 'utf-8'))
  }

  async replaceUtxoAtSafePoint(
    utxos: Utxo[],
    safeBlockHash: string
  ): Promise<void> {
    const safePoint: UtxoAtSafePoint = {
      lastSafeBlockHash: safeBlockHash,
      utxos: utxos
    }
    fs.writeFileSync(this._safePointPath, JSON.stringify(safePoint, null, 2))
  }

  async clearUtxoState(): Promise<void> {
    if (fs.existsSync(this._safePointPath)) {
      fs.unlinkSync(this._safePointPath)
    }

    if (fs.existsSync(this._diffPath)) {
      fs.unlinkSync(this._diffPath)
    }
  }

  async appendUtxoDiffToBestBlock(diff: UtxoDiffToBestBlock): Promise<void> {
    if (!fs.existsSync(this._diffPath)) {
      fs.writeFileSync(this._diffPath, '[]')
    }

    const currentDiffs = await this.getUtxoDiffToBestBlock()
    if (
      !currentDiffs.find((d) => d.lastBestBlockHash === diff.lastBestBlockHash)
    ) {
      currentDiffs.push(diff)

      fs.writeFileSync(this._diffPath, JSON.stringify(currentDiffs, null, 2))
    }
  }

  async removeDiffWithBestBlock(blockHash: string): Promise<void> {
    if (!fs.existsSync(this._diffPath)) {
      throw new Error('missing diffs!')
    }

    const currentDiffs = await this.getUtxoDiffToBestBlock()
    const diffToRemove = currentDiffs.find(
      (d) => d.lastBestBlockHash === blockHash
    )

    const index = currentDiffs.indexOf(diffToRemove)
    if (index > -1) {
      currentDiffs.splice(index, 1)
    }

    fs.writeFileSync(this._diffPath, JSON.stringify(currentDiffs, null, 2))
  }
}

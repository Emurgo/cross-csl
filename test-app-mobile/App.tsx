import './shim';

import mocha from 'mocha';

import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { setupTests } from '../packages/cross-csl-core/spec/index.spec'
import { init } from '../packages/cross-csl-mobile/src'
import { MochaYoroiReporter } from './MochaYoroiReporter'

export default function App() {
  useEffect(() => {
    const wasm = init();

    mocha.setup('bdd');

    const suite = setupTests(wasm, 'Cross CSL Mobile');
    const runner = new Mocha.Runner(suite);
    const reporter = new MochaYoroiReporter(runner);

    runner.run((failures) => {
      console.log('Test suite finished');
      console.log('\x1b[32m', `passes:`, '\x1b[0m', `${reporter.passes}`);
      console.log('\x1b[31m', `fails:`, '\x1b[0m', `${reporter.fails}`);
      if (reporter.fails === 0) {
        console.log('\x1b[32m', `All tests were successfull`, '\x1b[0m');
      }
    });
  })

  return (
    <View style={styles.container}>
      <Text>See tests results in console</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

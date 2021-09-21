import './shim';

import mocha from 'mocha';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { setupTests } from '../packages/yoroi-lib-core/spec/index.spec'
import { init } from '../packages/yoroi-lib-mobile/src'
import { MochaYoroiReporter } from './MochaYoroiReporter'

export default function App() {
  (async function() {
    const yoroiLib = init();

    mocha.setup('bdd');

    const suite = setupTests(yoroiLib, 'Yoroi Lib Mobile');
    const runner = new Mocha.Runner(suite);
    const reporter = new MochaYoroiReporter(runner);

    runner.run((failures) => {
      
    });
  })();

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

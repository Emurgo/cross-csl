import './shim';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { init } from '../packages/cross-csl-mobile';
import {setupTests} from "../packages/cross-csl-core/spec/index.spec";
import {useEffect} from "react";
import {executeTests, mockDescribe} from "./testRunner";


export default function App() {
  useTests();
  return (
    <View style={styles.container}>
      <Text>See tests results in console</Text>
      <StatusBar style="auto" />
    </View>
  );
}



const useTests = () => {
  useEffect(() => {
    const wasm = init('global');
    const tests = mockDescribe();

    setupTests(wasm, 'Cross CSL Mobile');

    executeTests(tests).then((results) => {
      console.log('-------------------');
      console.log('SUMMARY');
      console.log('SUCCEEDED', results.succeeded);
      console.log('FAILED', results.failed);
    }).catch((e) => {
      console.log('ERROR', e);
    });

  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

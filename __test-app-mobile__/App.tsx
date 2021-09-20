import './shim';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import { init } from '../packages/yoroi-lib-mobile/src'
import { encrypt_with_password, decrypt_with_password } from '@emurgo/react-native-haskell-shelley'

export default function App() {
  (async function() {
    // const yoroiLib = init();
    const password = 'my password'
    const data = 'my secret data'

    const passwordHex = Buffer.from(password, 'utf-8').toString('hex')
    const saltHex = 'd01747b41d72c8f1f26a7f72d28e1111d7eca73cfac0a05b431869e5f9ab8839'
    const nonceHex = 'c0fd98b73ac941aa18a258e5'
    const dataHex = Buffer.from(data, 'utf-8').toString('hex')

    // const encrypted = await yoroiLib.encryptWithPassword(passwordHex, saltHex, nonceHex, dataHex)
    // const decrypted = await yoroiLib.decryptWithPassword(passwordHex, encrypted)
    const encrypted = await encrypt_with_password(passwordHex, saltHex, nonceHex, dataHex)
    const decrypted = await decrypt_with_password(passwordHex, encrypted)

    const dataBack = Buffer.from(decrypted, 'hex').toString('utf-8')

    console.log(dataBack);
  })();

  return (
    <View style={styles.container}>
      <Text>Test 2</Text>
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

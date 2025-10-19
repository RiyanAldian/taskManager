import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FormScreen = () => {
  return (
    <View style={styles.container}>
      <Text>FormScreen</Text>
    </View>
  )
}

export default FormScreen

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#edf2f7' },
})
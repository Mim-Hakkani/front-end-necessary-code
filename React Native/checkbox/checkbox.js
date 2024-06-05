// @react-native-community/checkbox


import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const App = () => {
  const [isSelectedCheckbox, setSelectionCheckbox] = useState(false);

  return (
    <View style={styles.container}>
      <CheckBox
        value={isSelectedCheckbox}
        onValueChange={setSelectionCheckbox}
        tintColors={{ true: 'red', false: 'gray' }}
        style={styles.checkbox}
      />
      <Text style={styles.label}>Check me!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  checkbox: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], // Reduce the scale of the checkbox
    marginRight: 10,
  },
  label: {
    fontSize: 20,
  },
});

export default App;

import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

export default function InteractiveMenu() {
  const handleFirst = () => {
    Alert.alert('Option A', 'You selected the first option!');
  };

  const handleSecond = () => {
    Alert.alert('Option B', 'You selected the second option!');
  };

  return (
    <View style={styles.container}>
          <Text style={styles.heading}>Press a Button</Text>

      <View style={styles.buttonWrapper}>
        <Button title="Button 1" onPress={handleFirst} color="#2196F3" />
      </View>

      <View style={styles.buttonWrapper}>
        <Button title="Button 2" onPress={handleSecond} color="#FF5722" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 25,
    color: '#333',
  },
  buttonWrapper: {
    width: '70%',
    marginVertical: 12,
  },
});

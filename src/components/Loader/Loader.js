import {View, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './Loader.style';
const Loader = () => {
  return (
    <View style={styles.main__container}>
      <ActivityIndicator />
    </View>
  );
};

export default Loader;

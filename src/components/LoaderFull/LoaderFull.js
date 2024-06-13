import {View, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './Loader.style';
import { AppColors } from '../../constants/colors';
const LoaderFull = () => {
  return (
    <View style={styles.main__container}>
      <ActivityIndicator  size={'large'} color={AppColors?.PRIMARY}/>
    </View>
  );
};

export default LoaderFull;

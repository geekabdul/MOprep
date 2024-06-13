import {StyleSheet, View} from 'react-native';
import React from 'react';

const SubContainer = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default SubContainer;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
});

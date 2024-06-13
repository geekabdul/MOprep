import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RowContainer = ({children, style}) => {
  return (
    <View style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
      {children}
    </View>
  );
};

export default RowContainer;

const styles = StyleSheet.create({});

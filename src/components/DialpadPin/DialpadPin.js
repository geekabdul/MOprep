import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColors} from '../../constants/colors';

const DialpadPin = ({pinLength, pinSize, code, dialPadContent}) => {
  return (
    <View style={styles.dialPadPinContainer}>
      {Array(pinLength)
        .fill()
        .map((_, index) => {
          const item = dialPadContent[index];
          const isSelected =
            typeof item === 'number' && code[index] !== undefined;
          return (
            <View
              key={index}
              style={{
                width: pinSize * 1.2,
                height: pinSize * 1.2,
                overflow: 'hidden',
                elevation: 5,
                borderRadius: 10,
                // alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: 'red',
              }}>
              <View style={[styles.pinContentContainer]} key={index}>
                {isSelected && (
                  <Text style={{fontSize: 30, color: AppColors.GREY}}>*</Text>
                )}
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default DialpadPin;

const styles = StyleSheet.create({
  dialPadPinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
  },
  pinContentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 5,
    borderRadius: 10,
  },
  pinContent: {
    backgroundColor: '#5E454B',
  },
});

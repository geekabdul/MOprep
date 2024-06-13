import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {AppColors} from '../../constants/colors';
import Fonts from '../../assets/fonts';

const DialpadKeypad = ({
  dialPadContent,
  pinLength,
  code,
  setCode,
  navigation,
  dialPadSize,
  dialPadTextSize,
}) => {
  return (
    <FlatList
      data={dialPadContent}
      numColumns={3} // set number of columns
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            // disabled={item === ''} // make the empty space on the dialpad content unclickable
            onPress={() => {
              if (item === 'X') {
                setCode(prev => prev.slice(0, -1));
              } else {
                if (code.length !== pinLength) {
                  //   navigation.goBack();
                  console.log('eeeeee');
                  setCode(prev => [...prev, item]);
                }
              }
            }}>
            <View
              style={[
                {
                  width: dialPadSize * 1.2,
                  height: dialPadSize * 0.8,
                  //   backgroundColor: 'red',
                },
                styles.dialPadContainer,
              ]}>
              {item === 'X' ? (
                <Feather name="delete" size={24} color={AppColors.BLACK} />
              ) : (
                <Text style={styles.dialPadText}>{item}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default DialpadKeypad;

const styles = StyleSheet.create({
  dialPadContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 50,
    borderColor: 'transparent',
  },
  dialPadText: {
    color: AppColors.GREY,
    fontFamily: Fonts.MulishExtraBold800,
    fontSize: 18,
  },
});

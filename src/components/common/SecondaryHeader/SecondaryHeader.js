import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Fonts from '../../../assets/fonts';
import {AppColors} from '../../../constants/colors';

const SecondaryHeader = ({title, subtitle}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontFamily: Fonts.SemiBold600,
          color: AppColors.PRIMARY_DARK,
        }}>
        {title}
      </Text>
      {subtitle && (
        <Text
          style={{
            fontSize: 16,
            fontFamily: Fonts.SemiBold600,
            color: AppColors.GREY_BORDER,
          }}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default SecondaryHeader;

const styles = StyleSheet.create({});

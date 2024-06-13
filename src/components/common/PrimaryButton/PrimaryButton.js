import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppColors} from '../../../constants/colors';
import Fonts from '../../../assets/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PrimaryButton = ({
  title,
  onPress,
  customContainerStyle,
  disabled = false,
  circleHeight = 48,
  circleWidth = 48,
  iconSize = 25,
  iconPosition = 'right',
  isOpposite = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.buttonContainer,
        {
          backgroundColor: !disabled
            ? isOpposite
              ? AppColors.WHITE
              : AppColors.PRIMARY
            : AppColors.GREY,
        },
        customContainerStyle,
      ]}
      onPress={onPress}>
      {iconPosition === 'left' && (
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.circle,
              {
                height: circleHeight,
                width: circleWidth,
                backgroundColor: isOpposite
                  ? AppColors.PRIMARY
                  : AppColors.WHITE,
              },
            ]}>
            <AntDesign
              name="arrowleft"
              size={iconSize}
              color={
                !disabled
                  ? isOpposite
                    ? AppColors.WHITE
                    : AppColors.PRIMARY
                  : AppColors.GREY
              }
            />
          </View>
        </View>
      )}
      <Text
        style={[
          styles.buttonText,
          {color: isOpposite ? AppColors.PRIMARY : AppColors.WHITE},
        ]}>
        {title}
      </Text>
      {iconPosition === 'right' && (
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.circle,
              {
                height: circleHeight,
                width: circleWidth,
                backgroundColor: isOpposite
                  ? AppColors.PRIMARY
                  : AppColors.WHITE,
              },
            ]}>
            <AntDesign
              name="arrowright"
              size={iconSize}
              color={
                !disabled
                  ? isOpposite
                    ? AppColors.WHITE
                    : AppColors.PRIMARY
                  : AppColors.GREY
              }
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 5,
    borderRadius: 999,
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
    width: '100%',
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: Fonts.SemiBold600,
    color: AppColors.WHITE,
  },
  iconContainer: {
    alignItems: 'flex-start',
  },
  circle: {
    backgroundColor: AppColors.WHITE,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

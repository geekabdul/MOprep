import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {AppColors} from '../../../constants/colors';
import Fonts from '../../../assets/fonts';

const renderIcon = icon => {
  switch (icon) {
    case 'university':
    case 'user':
      return <FontAwesome name={icon} size={20} color={AppColors.GREY} />;
    case 'lock':
      return <SimpleLineIcons name={icon} size={20} color={AppColors.GREY} />;
    case 'mobile':
    case 'mail':
    case 'graduation-cap':
    case 'location-pin':
      return <Entypo name={icon} size={20} color={AppColors.GREY} />;
    default:
      return <Feather name={icon} size={20} color={AppColors.GREY} />;
  }
};

const IconTextInput = ({
  inputValue,
  setInputValue,
  placeholder,
  icon,
  isPassword = false,
  isOptional = false,
  customInputStyle,
  keyboardType = 'default',
  maxLength,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <View style={[styles.container, customInputStyle]}>
      <View style={styles.inputContainer}>
        {renderIcon(icon)}
        <TextInput
          style={styles.input}
          onChangeText={setInputValue}
          value={inputValue}
          placeholder={placeholder}
          placeholderTextColor={AppColors.GREY}
          secureTextEntry={isPassword && !isShowPassword}
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
        {isPassword && (
          <View onTouchEnd={() => setIsShowPassword(!isShowPassword)}>
            <Feather
              name={isShowPassword ? 'eye' : 'eye-off'}
              size={20}
              color={AppColors.GREY}
            />
          </View>
        )}
      </View>
      {isOptional && <Text style={styles.optionalText}>optional</Text>}
    </View>
  );
};

export default IconTextInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    padding: 0,
    flex: 1,
    marginHorizontal: 10,
    fontFamily: Fonts.MulishBold700,
    color: AppColors.PLACEHOLDER_TEXT,
  },
  optionalText: {
    fontFamily: Fonts.MulishMedium500,
    color:AppColors?.PRIMARY_DARK
  },
});

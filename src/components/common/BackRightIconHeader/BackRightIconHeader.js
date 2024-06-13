import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppColors} from '../../../constants/colors';
import Fonts from '../../../assets/fonts';
import {useNavigation} from '@react-navigation/native';
import RowContainer from '../RowContainer/RowContainer';

const BackRightIconHeader = ({
  headerTitle,
  subTitle,
  rightIcon,
  headerTextStyle,
  backOnPress
}) => {
  const navigation = useNavigation();

  return (
    <View style={{marginVertical: 20}}>
      <RowContainer style={{justifyContent: 'space-between'}}>
        <RowContainer style={{flex: 1}}>
          <TouchableOpacity onPress={() => backOnPress ? backOnPress() : navigation.goBack()}>
            <AntDesign
              name="arrowleft"
              size={25}
              color={AppColors.PRIMARY_DARK}
            />
          </TouchableOpacity>
          {headerTitle && (
            <Text
              style={[
                {
                  flex: 1,
                  fontSize: 16,
                  fontFamily: Fonts.SemiBold600,
                  color: AppColors.PRIMARY_DARK,
                  marginLeft: 10,
                },
                headerTextStyle,
              ]}
              numberOfLines={1}>
              {headerTitle}
            </Text>
          )}
        </RowContainer>
        {rightIcon && rightIcon}
      </RowContainer>
      {subTitle && (
        <Text
          style={{
            fontSize: 13,
            fontFamily: Fonts.MulishBold700,
            color: AppColors.GREY,
            marginLeft: 35,
          }}>
          {subTitle}
        </Text>
      )}
    </View>
  );
};

export default BackRightIconHeader;

const styles = StyleSheet.create({});

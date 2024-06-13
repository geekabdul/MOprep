import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppColors} from '../../../constants/colors';
import Fonts from '../../../assets/fonts';
import {useNavigation} from '@react-navigation/native';
import RowContainer from '../RowContainer/RowContainer';

const BackHeader = ({headerTitle, rightIcon}) => {
  const navigation = useNavigation();

  return (
    <RowContainer style={styles.container}>
      <RowContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={25}
            color={AppColors.PRIMARY_DARK}
            style={styles.icon}
          />
        </TouchableOpacity>
        {headerTitle && <Text style={styles.title}>{headerTitle}</Text>}
      </RowContainer>
      {rightIcon && rightIcon}
    </RowContainer>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 21,
    fontFamily: Fonts.SemiBold600,
    color: AppColors.PRIMARY_DARK,
    marginLeft: 10,
  },
});

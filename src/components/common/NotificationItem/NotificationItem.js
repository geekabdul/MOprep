import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColors} from '../../../constants/colors';
import RowContainer from '../RowContainer/RowContainer';
import Fonts from '../../../assets/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NotificationItem = ({data}) => {
  return (
    <RowContainer style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconBackground}>
        <Ionicons
              name={'ticket-outline'}
              size={20}
              color={AppColors.PRIMARY_DARK}
            />
          {/* {data.icon === 'ticket-outline' ? (
            <Ionicons
              name={data.icon}
              size={20}
              color={AppColors.PRIMARY_DARK}
            />
          ) : (
            <AntDesign
              name={data.icon}
              size={20}
              color={AppColors.PRIMARY_DARK}
            />
          )} */}
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subTitle} >
          {data.description}
        </Text>
      </View>
    </RowContainer>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.BORDER_LINE,
    borderWidth: 2,
    borderColor: 'rgba(180, 189, 196, 0.2)',
    borderRadius: 20,
    marginVertical: 5,
    padding: 20,
    gap: 5,
  },
  iconContainer: {
    backgroundColor: AppColors.WHITE,
    borderRadius: 999,
    height: 52,
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  iconBackground: {
    backgroundColor: AppColors.WHITE,
    borderRadius: 999,
    height: 52,
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 19,
    fontFamily: Fonts.SemiBold600,
    color: AppColors.PRIMARY_DARK,
  },
  subTitle: {
    fontFamily: Fonts.MulishBold700,
    color: AppColors.GREY,
  },
});

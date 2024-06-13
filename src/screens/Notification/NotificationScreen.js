import {StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScrollViewContainer from '../../components/common/ScrollViewContainer/ScrollViewContainer';
import SubContainer from '../../components/common/SubContainer/SubContainer';
import BackHeader from '../../components/common/BackHeader/BackHeader';
import Fonts from '../../assets/fonts';
import {AppColors} from '../../constants/colors';
import NotificationItem from '../../components/common/NotificationItem/NotificationItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, USER_TOKEN} from '../../helper/helper';
import axios from 'axios';

const todayNotification = [
  {
    title: 'New Subject!',
    subTitle: 'New the 3D Design Course is Availa..',
    icon: 'appstore-o',
  },
  {
    title: 'Transaction successful!',
    subTitle: 'New the 3D Design Course is Availa..',
    icon: 'wallet',
  },
  {
    title: 'Today’s Special Offers',
    subTitle: 'You Have made a Coure Payment.',
    icon: 'ticket-outline',
  },
];

const NotificationScreen = () => {
  const [notificationData, setnotificationData] = useState(null);
  useEffect(() => {
    NotificationDetails();
  }, []);
  const NotificationDetails = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const response = await axios.get(`${BASE_URL}notificaionList`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response?.data?.error) {
        setnotificationData(response?.data);
      }
    } catch (err) {
      console.log(err?.response?.data);
    }
  };
  return (
    <ScrollViewContainer>
      <SubContainer>
        <BackHeader headerTitle={'Notifications'} />
        {notificationData?.result &&
          Object.keys(notificationData?.result).map((date, i) => (
            <>
              <Text style={styles.sectionTitle}>{date}</Text>
              {notificationData?.result[date].map(notification => (
                <NotificationItem data={notification} key={i} />
              ))}
            </>
          ))}
      </SubContainer>
    </ScrollViewContainer>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: Fonts.Bold700,
    fontSize: 16,
    color: AppColors.PRIMARY_DARK,
    marginVertical: 20,
  },
});

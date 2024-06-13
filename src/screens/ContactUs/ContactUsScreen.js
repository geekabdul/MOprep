import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScrollViewContainer from '../../components/common/ScrollViewContainer/ScrollViewContainer';
import SubContainer from '../../components/common/SubContainer/SubContainer';
import BackHeader from '../../components/common/BackHeader/BackHeader';
import ShadowContainer from '../../components/common/ShadowContainer/ShadowContainer';
import {AppImages} from '../../assets/images';
import RowContainer from '../../components/common/RowContainer/RowContainer';
import Fonts from '../../assets/fonts';
import {AppColors} from '../../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, USER_TOKEN} from '../../helper/helper';
import axios from 'axios';

const FAQsData = [
  {
    quesNo: 'A',
    ques: 'How do you handle security and privacy?',
    ans: ' Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    quesNo: 'B',
    ques: 'How do you handle security and privacy?',
    ans: ' Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    quesNo: 'C',
    ques: 'How do you handle security and privacy?',
    ans: ' Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
];
const ContactUsScreen = () => {
  const [contactData, setContactData] = useState(null);
  useEffect(() => {
    contactDetails();
  }, []);
  const contactDetails = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const response = await axios.get(`${BASE_URL}contactUs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response?.data?.error) {
        console.log('response?.data?response?.data?', response?.data);
        setContactData(response?.data);
      }
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  const handleLinking = task => {
    if(task=='mail'){
      Linking.openURL(`mailto:${contactData?.email}`);
    }else if(task=='phone'){
      Linking.openURL(`tel:${contactData?.mobile}`);
    }else if(task=='telegram'){
      Linking.openURL('tg://resolve?domain=mopprepcms');
    }
  };

  return (
    <ScrollViewContainer>
      <SubContainer>
        <BackHeader headerTitle={'Contact Us'} />
        <ShadowContainer style={styles.shadowContainer}>
          <Image source={AppImages.CONTACT_US} style={styles.image} />
          <View style={styles.contactInfoContainer}>
            <TouchableOpacity
              style={styles.contactRow}
              activeOpacity={0.8}
              onPress={() => {
                handleLinking('mail');
              }}>
              <Entypo name="mail" size={25} />
              <Text style={styles.contactText}>{contactData?.email}</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            {!!contactData?.mobile && (
              <TouchableOpacity style={styles.contactRow} activeOpacity={0.8}onPress={() => {
                handleLinking('phone');
              }}>
                <FontAwesome name="phone" size={25} />
                <Text style={styles.contactText}>{contactData?.mobile}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.contactRow} activeOpacity={0.8}onPress={() => {
                handleLinking('telegram');
              }}>
              <FontAwesome name="telegram" size={25} />
              <Text style={styles.contactText}>{contactData?.telegram}</Text>
            </TouchableOpacity>
          </View>
        </ShadowContainer>

        <View style={styles.faqsContainer}>
          <Text style={styles.sectionTitle}>FAQs</Text>
          {contactData?.result?.map((FAQ, index) => (
            <View
              key={index}
              style={[
                styles.faqItem,
                {borderBottomWidth: index < FAQsData.length - 1 ? 1 : 0},
              ]}>
              <Text style={styles.question}>
                {`(${index + 1}) Que. ${FAQ.title}`}
              </Text>
              <Text style={styles.answerText}>
                Ans. <Text style={styles.answer}>{FAQ.description}</Text>
              </Text>
            </View>
          ))}
        </View>
      </SubContainer>
    </ScrollViewContainer>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  shadowContainer: {
    padding: 20,
  },
  image: {
    alignSelf: 'center',
  },
  contactInfoContainer: {
    marginTop: 10,
  },
  contactRow: {
    gap: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontFamily: Fonts.MulishBold700,
    color: AppColors.PLACEHOLDER_TEXT,
    fontSize: 18,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: AppColors.BORDER_LINE,
  },
  faqsContainer: {
    marginTop: 30,
  },
  sectionTitle: {
    fontFamily: Fonts.Bold700,
    fontSize: 16,
    color: AppColors.PRIMARY_DARK,
  },
  faqItem: {
    paddingVertical: 15,
    borderBottomColor: AppColors.BORDER_LINE,
  },
  question: {
    fontFamily: Fonts.MulishExtraBold800,
    color: AppColors.PRIMARY_DARK,
  },
  answerText: {
    color: AppColors.GREY,
    fontWeight: '800',
    marginLeft: 25,
    marginVertical: 5,
  },
  answer: {
    color: AppColors.GREY,
    fontWeight: '400',
  },
});

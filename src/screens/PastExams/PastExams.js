import {FlatList, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScrollViewContainer from '../../components/common/ScrollViewContainer/ScrollViewContainer';
import BackHeader from '../../components/common/BackHeader/BackHeader';
import ShadowContainer from '../../components/common/ShadowContainer/ShadowContainer';
import {AppImages} from '../../assets/images';
import RenderExamsItem from '../../components/common/RenderExamsItem/RenderExamsItem';
import SubContainer from '../../components/common/SubContainer/SubContainer';
import Fonts from '../../assets/fonts';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, USER_TOKEN} from '../../helper/helper';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';

const PastExams = () => {
  const navigation = useNavigation();
  const [pastData, SetpastData] = useState([]);

  // useEffect(() => {
  //   pastExamsFunc();
  // }, []);
  // const pastExamsFunc = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem(USER_TOKEN);
  //     const response = await axios.get(`${BASE_URL}mockTestPast`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (!response?.data?.error) {
  //       SetpastData(response?.data?.result);
  //     }
  //   } catch (err) {
  //     console.log(err?.response?.data);
  //   }
  // };
  useEffect(() => {
    pastExamsFunc();
  }, []);
  const pastExamsFunc = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const response = await axios.get(`${BASE_URL}mockTestPast`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response?.data?.error) {
        SetpastData(response?.data?.result);
      }
    } catch (err) {
      console.log(err?.response?.data);
    }
  };
  return (
    <ScrollViewContainer>
      <SubContainer>
        <BackHeader />
        <Text
          style={{
            fontFamily: Fonts?.MulishSemiBold600,
            fontSize: 21,
            lineHeight: 26,
            color: '#202244',
            marginBottom: 18,
          }}>
          Past Exams
        </Text>
        {
          pastData?.length ? 
          <ShadowContainer>
          <FlatList
            scrollEnabled={false}
            data={pastData}
            renderItem={({item}) => <RenderExamsItem item={item} activeOpacity={1} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </ShadowContainer> 
         : <Loader/>
        }
       
      </SubContainer>
    </ScrollViewContainer>
  );
};

export default PastExams;

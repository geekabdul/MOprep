import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainContainer from '../../components/common/MainContainer/MainContainer';
import BackHeader from '../../components/common/BackHeader/BackHeader';
import {AppColors} from '../../constants/colors';
import {useRoute, useNavigation} from '@react-navigation/native';
import Fonts from '../../assets/fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ShadowContainer from '../../components/common/ShadowContainer/ShadowContainer';
import RowContainer from '../../components/common/RowContainer/RowContainer';
import {AppImages} from '../../assets/images';
import PrimaryButton from '../../components/common/PrimaryButton/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL, USER_TOKEN} from '../../helper/helper';

const TestInstructionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {data} = route.params;
  console.log(data, 'dddd');
  const [testInstructionData, SettestInstructionData] = useState(null);

  useEffect(() => {
    testInstructionFunc();
  }, []);
  const testInstructionFunc = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {mock_id: data?.id};
      const response = await axios.post(
        `${BASE_URL}mockTestInstructions`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(
        'SettestInstructionDataSettestInstructionData',
        response?.data,
      );
      if (!response?.data?.error) {
        SettestInstructionData(response?.data);
      }
    } catch (err) {
      console.log(err?.response?.data);
    }
  };
  console.log("testInstructionDatatestInstructionData",testInstructionData?.total_questions.split(' ')[0])
  return (
    <MainContainer style={{paddingHorizontal: 20}}>
      <BackHeader />
      <ShadowContainer style={{padding: 20, flex: 1 / 2}}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Fonts.SemiBold600,
            color: AppColors.PRIMARY_DARK,
          }}>
          {data?.name}
        </Text>
        <View style={{marginTop: 20}}>
          <RowContainer style={{marginVertical: 10, gap: 10}}>
            <ImageBackground
              source={AppImages.OVAL}
              style={{
                height: 35,
                width: 35,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name="timetable"
                size={20}
                color={AppColors.PRIMARY_DARK}
              />
            </ImageBackground>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: Fonts.SemiBold600,
                  color: AppColors.PRIMARY_DARK,
                }}>
                {testInstructionData?.duration}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.MulishBold700,
                  color: AppColors.PLACEHOLDER_TEXT,
                }}>
                Duration
              </Text>
            </View>
          </RowContainer>

          <RowContainer style={{marginVertical: 10, gap: 10}}>
            <ImageBackground
              source={AppImages.OVAL}
              style={{
                height: 35,
                width: 35,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name="file-document-outline"
                size={20}
                color={AppColors.PRIMARY_DARK}
              />
            </ImageBackground>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: Fonts.SemiBold600,
                  color: AppColors.PRIMARY_DARK,
                }}>
                {testInstructionData?.total_questions}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.MulishBold700,
                  color: AppColors.PLACEHOLDER_TEXT,
                }}>
                Scoring Details
              </Text>
            </View>
          </RowContainer>

          <RowContainer style={{marginVertical: 10, gap: 10}}>
            <ImageBackground
              source={AppImages.OVAL}
              style={{
                height: 35,
                width: 35,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name="newspaper-variant"
                size={20}
                color={AppColors.PRIMARY_DARK}
              />
            </ImageBackground>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: Fonts.SemiBold600,
                  color: AppColors.PRIMARY_DARK,
                }}>
                {testInstructionData?.total_marks}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.MulishBold700,
                  color: AppColors.PLACEHOLDER_TEXT,
                }}>
                Total Marks
              </Text>
            </View>
          </RowContainer>

          <RowContainer style={{marginVertical: 10, gap: 10}}>
            <ImageBackground
              source={AppImages.OVAL}
              style={{
                height: 35,
                width: 35,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialIcons
                name="checklist"
                size={20}
                color={AppColors.PRIMARY_DARK}
              />
            </ImageBackground>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: Fonts.SemiBold600,
                  color: AppColors.PRIMARY_DARK,
                }}>
                Correct{' '}
                <Text style={{color: '#00B027'}}>
                  {testInstructionData?.correct_marks}
                </Text>{' '}
                <Text>Incorrect</Text>{' '}
                <Text style={{color: '#D20000'}}>
                  {testInstructionData?.incorrect_marks}
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.MulishBold700,
                  color: AppColors.PLACEHOLDER_TEXT,
                }}>
                Marking scheme
              </Text>
            </View>
          </RowContainer>
        </View>

        <PrimaryButton
          title={'Start Test'}
          customContainerStyle={{
            position: 'absolute',
            alignSelf: 'center',
            bottom: -20,
            width: '110%',
          }}
          onPress={() => navigation.navigate('MockUpTestQuestionScreen',{
            totalque:testInstructionData?.total_questions.split(' ')[0],
            mock_id:testInstructionData?.mock_id
          })}
        />
      </ShadowContainer>
    </MainContainer>
  );
};

export default TestInstructionScreen;

const styles = StyleSheet.create({});

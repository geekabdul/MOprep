import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScrollViewContainer from '../../components/common/ScrollViewContainer/ScrollViewContainer';
import SubContainer from '../../components/common/SubContainer/SubContainer';
import BackHeader from '../../components/common/BackHeader/BackHeader';
import HeaderTab from '../../components/common/HeaderTab/HeaderTab';
import Fonts from '../../assets/fonts';
import {AppColors} from '../../constants/colors';
import SecondaryHeader from '../../components/common/SecondaryHeader/SecondaryHeader';
import Analysis from '../../components/Analysis/Analysis';
import RenderQuestion from '../../components/common/RenderQuestion/RenderQuestion';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, USER_TOKEN} from '../../helper/helper';
import axios from 'axios';

const tabData = ['Analysis', 'Solution'];
const TopicQuestionsData = [
  {
    quesNo: 'Q.1',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
  {
    quesNo: 'Q.2',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
  {
    quesNo: 'Q.3',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
  {
    quesNo: 'Q.4',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
  {
    quesNo: 'Q.5',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
  {
    quesNo: 'Q.6',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
  {
    quesNo: 'Q.7',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
];
const BookmarkedAnalysisScreen = props => {
  const {data} = props?.route?.params;
  console.log('dataaaa0-0000', data);
  const [selectedHeaderTab, setSelectedHeaderTab] = useState('Analysis');
  const [analysisALlData, setanalysisALlData] = useState(null);
  const [solutionData, setsolutionData] = useState(null);


  useEffect(() => {
    getAllanalysisData();
    getSolutiondata()
  }, []);
  const getAllanalysisData = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {mock_id: data?.id};
      const response = await axios.post(`${BASE_URL}mockTestAnalysis`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(
        'getAllanalysisDatagetAllanalysisDatagetAllanalysisData',
        response?.data,
      );
      if (!response?.data?.error) {
        setanalysisALlData(response?.data);
      }
    } catch (err) {
      console.log(err?.response?.data, 'errr');
    }
  };
  const getSolutiondata = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {mock_id: data?.id};
      const response = await axios.post(`${BASE_URL}mockTestQuestionList`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(
        'getSolutiondatagetSolutiondatagetSolutiondata',
        response?.data,
      );
      if (!response?.data?.error) {
        setsolutionData(response?.data?.result);
      }
    } catch (err) {
      console.log(err?.response?.data, 'errr');
    }
  };
  return (
    <ScrollViewContainer>
      <SubContainer>
        <BackHeader />
        <SecondaryHeader
          title={'Bookmarked Analysis'}
          subtitle={data?.name}
        />
        <HeaderTab
          data={tabData}
          selectedHeaderTab={selectedHeaderTab}
          setSelectedHeaderTab={setSelectedHeaderTab}
          customContainerStyle={{marginTop: 40}}
        />

        {selectedHeaderTab === 'Analysis' ? (
          <Analysis analysisALlData ={analysisALlData} />
        ) : (
          <FlatList
            scrollEnabled={false}
            data={solutionData}
            renderItem={({item,index}) => (
              <RenderQuestion
                item={item}
                customContainerStyle={{paddingHorizontal: 20}}
                onPress = {true}
                index={index}
                mock_id = {data?.id}
                totalque = {solutionData.length}
                checkapi = 'mock'

              />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        )}
      </SubContainer>
    </ScrollViewContainer>
  );
};

export default BookmarkedAnalysisScreen;

const styles = StyleSheet.create({});

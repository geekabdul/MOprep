import {FlatList, Share, StyleSheet,TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AppColors} from '../../constants/colors';
import BackRightIconHeader from '../../components/common/BackRightIconHeader/BackRightIconHeader';
import ShadowContainer from '../../components/common/ShadowContainer/ShadowContainer';
import MainContainer from '../../components/common/MainContainer/MainContainer';
import PrimaryButton from '../../components/common/PrimaryButton/PrimaryButton';
import RenderQuestion from '../../components/common/RenderQuestion/RenderQuestion';
import SubContainer from '../../components/common/SubContainer/SubContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, USER_DATA, USER_TOKEN} from '../../helper/helper';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';

const tagStyle = {
  // p: {
  //   padding: 0,
  //   marginTop: 0,
  //   fontSize: 16,
  //   fontFamily: Fonts.MulishSemiBold600,
  //   color: AppColors.GREY,
  // },
  td: {
    borderColor: 'black',
    borderWidth: 1,
  },
};
const TopicQuestionsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {data, subject_id, chapter_id, topic_id,chapterData} = route.params;
  console.log(data, subject_id, chapter_id, topic_id, 'topic Questions');
  const [chapterQuestion, SetchapterQuestion] = useState([]);
  const [status, Setstatus] = useState('');
  const [nextIndex, SetnextIndex] = useState(0);



  useEffect(() => {
    chapterQuestionFunc();
  }, []);
  const chapterQuestionFunc = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {
        subject_id: subject_id,
        chapter_id: chapter_id,
        topic_id: topic_id,
      };
      console.log("paramsparamsparamsparams0",params)
      const response = await axios.post(`${BASE_URL}chapterQuestions`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response?.data?.error) {
        SetchapterQuestion(response?.data?.result);
        Setstatus(response?.data?.pause_status)
        SetnextIndex(response?.data?.attempted)
      }
    } catch (err) {
      console.log("djdjjsjjsjsjdj99999999999999999999999999999999",err?.response?.data);
    }
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
       title: 'App link',
  message: 'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en', 
  url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <MainContainer>
      <SubContainer style={styles.container}>
        <BackRightIconHeader
          headerTitle={data?.topic_name }
          subTitle={`${data?.questions} Questions`}
          rightIcon={
            <TouchableOpacity onPress={()=>{
              onShare()
            }}>

              <MaterialIcons name="share" size={22} color={AppColors.GREY} />
            </TouchableOpacity>
          }
        />
        {chapterQuestion.length ? (
          <ShadowContainer style={styles.shadowContainer}>
            <FlatList
              showsVerticalScrollIndicator={true}
              data={chapterQuestion}
              renderItem={({item}) => (
                <RenderQuestion
                  item={item}
                  customContainerStyle={styles.renderQuestionContainer}

                />
              )}
              keyExtractor={(_, index) => index.toString()}
            />
            <PrimaryButton
              title={status == 'resume' ? 'Resume Question Bank' : status == 'complete' ?  'Restart Question Bank' :'Start Question Bank'}
              customContainerStyle={styles.primaryButton}
              onPress={() =>
                navigation.navigate('QuestionScreen', {
                  subject_id,
                  chapter_id,
                  topic_id,
                  totalque: data?.questions,
                  status:status,
                  nextIndex: status == 'complete' ? 0 : nextIndex,
                  chapterData:chapterData
                })
              }
            />
          </ShadowContainer>
        ) : (
          <Loader />
        )}
      </SubContainer>
    </MainContainer>
  );
};

export default TopicQuestionsScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
  },
  shadowContainer: {
    paddingVertical: 20,
    flex: 1,
    paddingBottom: 40,
  },
  renderQuestionContainer: {
    paddingHorizontal: 20,
  },
  primaryButton: {
    position: 'absolute',
    bottom: -25,
    width: '90%',
    alignSelf: 'center',
  },
});

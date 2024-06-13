import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  useWindowDimensions,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackRightIconHeader from '../../components/common/BackRightIconHeader/BackRightIconHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RowContainer from '../../components/common/RowContainer/RowContainer';
import {AppColors} from '../../constants/colors';
import Fonts from '../../assets/fonts';
import ShadowContainer from '../../components/common/ShadowContainer/ShadowContainer';
import PrimaryButton from '../../components/common/PrimaryButton/PrimaryButton';
import MainContainer from '../../components/common/MainContainer/MainContainer';
import SecondaryButton from '../../components/common/SecondaryButton/SecondaryButton';
import SubContainer from '../../components/common/SubContainer/SubContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, USER_DATA, USER_TOKEN, showToast} from '../../helper/helper';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import Loader from '../../components/Loader/Loader';
import {useNavigation} from '@react-navigation/native';
import base64 from 'react-native-base64';
import WebView from 'react-native-webview';
import TableRenderer, {tableModel} from '@native-html/table-plugin';
import HTML from 'react-native-render-html';
import MathJax from 'react-native-mathjax';
import LoaderFull from '../../components/LoaderFull/LoaderFull';

const tagStyle = {
  p: {
    padding: 0,
    marginTop: 0,
    fontSize: 16,
    fontFamily: Fonts.MulishSemiBold600,
    color: AppColors.GREY,
  },
  td: {
    borderColor: 'black',
    borderWidth: 1,
  },
};
const tagStyleforOptions = {
  p: {
    fontSize: 16,
    fontFamily: Fonts.MulishBold700,
    color: AppColors.PRIMARY_DARK,
    paddingRight: 25,
  },
};
const tagStyleforExplanation = {
  p: {
    padding: 0,
    marginTop: 0,
    fontSize: 16,
    // fontSize: 16,
    // fontFamily: Fonts.MulishBold700,
    color: AppColors.PRIMARY_DARK,
  },
  li: {
    padding: 0,
    marginTop: 0,
    fontSize: 16,
    // fontSize: 16,
    // fontFamily: Fonts.MulishBold700,
    color: AppColors.PRIMARY_DARK,
  },
  ui: {
    padding: 0,
    marginTop: 0,
    fontSize: 16,
    // fontSize: 16,
    // fontFamily: Fonts.MulishBold700,
    color: AppColors.PRIMARY_DARK,
  },
  // td:{
  //   borderColor:'black',
  //   borderWidth:1
  // }
};
const htmlProps = {
  WebView,
  renderers: {
    table: TableRenderer,
  },
  renderersProps: {
    table: {
      // Put the table config here
      td: {
        borderColor: 'black',
        borderWidth: 1,
      },
    },
  },
  customHTMLElementModels: {
    table: tableModel,
  },
  td: {
    borderColor: 'black',
    borderWidth: 1,
  },
};
const mmlOptions = {
  messageStyle: 'none',
  extensions: ['tex2jax.js'],
  jax: ['input/TeX', 'output/HTML-CSS'],
  tex2jax: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
    processEscapes: true,
  },
  TeX: {
    extensions: [
      'AMSmath.js',
      'AMSsymbols.js',
      'noErrors.js',
      'noUndefined.js',
    ],
  },
};
//RENDER HEADER ICONS
const RenderRightIcon = ({
  setModalVisible,
  BookmarkAddorRemove,
  AllquesData,
  currentQuestionIndex,
  QuizSummary,
}) => {
  const currentQuestion = AllquesData[currentQuestionIndex];

  return (
    <RowContainer>
      {/* <TouchableOpacity
        onPress={() => {
          BookmarkAddorRemove();
        }}>
        <Ionicons
          name={
            currentQuestion?.bookmark_status == 1
              ? 'bookmark-sharp'
              : 'bookmark-outline'
          }
          size={25}
          color={AppColors.PRIMARY}
        />
      </TouchableOpacity> */}
    </RowContainer>
  );
};

const {width} = Dimensions.get('screen');
const BookmarkSolution = props => {
  const {data, mock_id, nextIndex, totalque, checkapi, alldata} =
    props?.route?.params;
  console.log('nextIndexnextIndex', nextIndex);
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [AllquesData, SetAllquesData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(nextIndex);
  const [ansDetails, setansDetails] = useState(null);
  const [summaryData, setsummaryData] = useState(null);
  const [disabled, setdisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const handleBackButton = () => {
    setModalVisible2(true);
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);
  useEffect(() => {
    console.log(
      'checkapi?.lengthcheckapi?.lengthcheckapi?.lengthcheckapi?.length',
      checkapi?.length,
    );
    if (checkapi == 'mock') {
      console.log('iffffffff');
      AllquesDataFunc();
    } else if (checkapi?.length) {
      console.log('elseeeee ifffff');

      subjectQueston();
    } else if (!!alldata) {
      allmixQuestion()
    } else {
      console.log('elseeeee---------');

      yearQuestion();
    }
  }, []);
  const allmixQuestion = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);

      // let urlRoute =
      //   status == 'resume'
      //     ? 'questionBankQuestionsResume'
      //     : status == 'complete'
      //     ? 'questionBankQuestions'
      //     : 'questionBankQuestions';
      const response = await axios.get(`${BASE_URL}allBookmarkedQuestionsDetails`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response?.data?.error) {
        SetAllquesData(response?.data?.result);
      }
    } catch (err) {
      console.log(err?.response?.data);
    }
  };
  const AllquesDataFunc = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {
        mock_id: mock_id,
      };
      // let urlRoute =
      //   status == 'resume'
      //     ? 'questionBankQuestionsResume'
      //     : status == 'complete'
      //     ? 'questionBankQuestions'
      //     : 'questionBankQuestions';
      const response = await axios.post(`${BASE_URL}mockTestSolution`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response?.data?.error) {
        SetAllquesData(response?.data?.result);
      }
    } catch (err) {
      console.log(err?.response?.data);
    }
  };
  const subjectQueston = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {
        subject_id: mock_id,
      };
      // let urlRoute =
      //   status == 'resume'
      //     ? 'questionBankQuestionsResume'
      //     : status == 'complete'
      //     ? 'questionBankQuestions'
      //     : 'questionBankQuestions';
      const response = await axios.post(
        `${BASE_URL}bookmarkedSubjectQuestionsDetail`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response?.data?.error) {
        SetAllquesData(response?.data?.result);
      }
    } catch (err) {
      console.log(err?.response?.data);
    }
  };
  const yearQuestion = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {
        year_id: mock_id,
      };
      // let urlRoute =
      //   status == 'resume'
      //     ? 'questionBankQuestionsResume'
      //     : status == 'complete'
      //     ? 'questionBankQuestions'
      //     : 'questionBankQuestions';
      const response = await axios.post(
        `${BASE_URL}bookmarkedYearQuestionsDetail`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response?.data?.error) {
        SetAllquesData(response?.data?.result);
      }
    } catch (err) {
      console.log(err?.response?.data, 'dshdgsdhsghdshdhsdsvdgsd');
    }
  };
  const renderCurrentQuestion = () => {
    const currentQuestion = AllquesData[currentQuestionIndex];
    console.log(
      'currentQuestioncurrentQuestioncurrentQuestioncurrentQuestioncurrentQuestion',
      currentQuestion,
    );
    let options = [
      {
        id: 1,
        optionType: 'a',
        option: currentQuestion?.option1,
        isCorrect: false,
        responsePercent: '10',
      },
      {
        id: 2,
        optionType: 'b',
        option: currentQuestion?.option2,
        isCorrect: false,
        responsePercent: '63',
      },
      {
        id: 3,
        optionType: 'c',
        option: currentQuestion?.option3,
        isCorrect: false,
        responsePercent: '25',
      },
      {
        id: 4,
        optionType: 'd',
        option: currentQuestion?.option4,
        isCorrect: false,
        responsePercent: '2',
      },
    ];
    if (!currentQuestion) {
      return <Loader />;
    }

    return (
      <>
        <View style={styles.questionContainer}>
          <RenderHtml
            contentWidth={width}
            source={{html: currentQuestion.question}}
            tagsStyles={tagStyle}
          />
          <Text style={styles.yearText}>{currentQuestion?.years}</Text>
        </View>

        {/* RENDER OPTIONS */}
        {options.map((optionData, index) => (
          <>
            <ShadowContainer
              style={{
                marginVertical: 5,
                padding: 20,
                borderWidth:
                  (currentQuestion &&
                    currentQuestion.right_option == optionData.optionType) ||
                  (currentQuestion?.user_answer == optionData.optionType &&
                    currentQuestion?.user_answer !=
                      currentQuestion?.right_option)
                    ? 1
                    : 0,
                borderColor:
                  currentQuestion &&
                  currentQuestion?.right_option == optionData.optionType
                    ? AppColors.SUCCESS
                    : currentQuestion?.user_answer == optionData.optionType &&
                      currentQuestion?.user_answer !=
                        currentQuestion?.right_option
                    ? AppColors.DANGER
                    : AppColors.PLACEHOLDER_TEXT,
              }}
              key={index}>
              <TouchableOpacity>
                <RowContainer>
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 999,
                      borderWidth: 2,
                      borderColor:
                        currentQuestion &&
                        currentQuestion?.right_option == optionData.optionType
                          ? AppColors.SUCCESS
                          : currentQuestion?.user_answer ==
                              optionData.optionType &&
                            currentQuestion?.user_answer !=
                              currentQuestion?.right_option
                          ? AppColors.DANGER
                          : AppColors.PLACEHOLDER_TEXT,
                      marginRight: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {currentQuestion &&
                      currentQuestion?.right_option ==
                        optionData.optionType && (
                        <View
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            backgroundColor:
                              currentQuestion?.right_option ==
                              optionData.optionType
                                ? AppColors.SUCCESS
                                : 'transparent',
                          }}
                        />
                      )}
                    {currentQuestion?.user_answer == optionData.optionType &&
                      currentQuestion?.user_answer !=
                        currentQuestion?.right_option && (
                        <View
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            backgroundColor:
                              currentQuestion?.user_answer !=
                              currentQuestion?.right_option
                                ? AppColors.DANGER
                                : 'transparent',
                          }}
                        />
                      )}
                  </View>
                  <RenderHtml
                    contentWidth={width}
                    source={{html: optionData?.option}}
                    tagsStyles={tagStyleforOptions}
                  />
                  {/* <Text style={{width:'85%'}}>fsdjsjdsjd djfjdjfd fjfjjfd hffhf  fud f udf d hffu f d d  ududude e suusus hsh djdjdjd </Text> */}
                </RowContainer>
              </TouchableOpacity>
            </ShadowContainer>

            {currentQuestion &&
              currentQuestion?.right_option == optionData.optionType && (
                <Text
                  style={{
                    alignSelf: 'flex-end',
                    fontSize: 12,
                    fontFamily: Fonts.MulishExtraBold800,
                    marginRight: 10,
                    color: AppColors.SUCCESS,
                    marginBottom: 10,
                  }}>
                  {currentQuestion.right_percentage || currentQuestion?.rightPercentage}% got this correct
                </Text>
              )}

            {currentQuestion?.user_answer == optionData.optionType &&
              currentQuestion?.user_answer != currentQuestion?.right_option && (
                <Text
                  style={{
                    alignSelf: 'flex-end',
                    fontSize: 12,
                    fontFamily: Fonts.MulishExtraBold800,
                    marginRight: 10,
                    color: AppColors.DANGER,
                    marginBottom: 10,
                  }}>
                  {currentQuestion.wrong_percentage || currentQuestion?.wrongPercentage}% marked this
                </Text>
              )}
          </>
        ))}
      </>
    );
  };

  const BookmarkAddorRemove = async () => {
    try {
      const currentQuestion = AllquesData[currentQuestionIndex];

      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {
        mock_id: mock_id,
        question_id: currentQuestion?.question_id,
      };
      const response = await axios.post(
        `${BASE_URL}mockTestQuestionBookmark`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('BookmarkAddorRemoveBookmarkAddorRemove', response?.data);
      if (!response?.data?.error) {
        AllquesDataFunc();
      }
    } catch (err) {
      console.log(err?.response?.data, 'jdjdjdjjderrror');
    }
  };
  const backOnPress = () => {
    navigation.goBack();
  };
  const renderCurrentSolution = () => {
    const currentQuestion = AllquesData[currentQuestionIndex];
    return (
      <>
        {currentQuestion && (
          <View style={{marginVertical: 20}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Fonts.Medium500,
                color: AppColors.PRIMARY_DARK,
              }}>
              Solution
            </Text>
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontFamily: Fonts.MulishSemiBold600,
                  color: AppColors.PRIMARY_DARK,
                }}>
                Correct Option {currentQuestion?.right_option}:{' '}
              </Text>
            </View>

            <MathJax
              mathJaxOptions={mmlOptions}
              contentWidth={width}
              html={currentQuestion?.explaination}
              {...htmlProps}
            />
          </View>
        )}
      </>
    );
  };

  console.log("AllquesDataAllquesData",AllquesData)
  return (
    <>
      {isLoading && <LoaderFull />}

      <MainContainer>
        <ScrollView>
          <SubContainer style={styles.container}>
            <BackRightIconHeader
              backOnPress={backOnPress}
              headerTitle={
                currentQuestionIndex + 1 >= totalque
                  ? `Ques ${totalque} of ${totalque}`
                  : `Ques ${currentQuestionIndex + 1} of ${totalque}`
              }
              headerTextStyle={styles.HeaderText}
              rightIcon={
                <RenderRightIcon
                  setModalVisible={setModalVisible}
                  BookmarkAddorRemove={BookmarkAddorRemove}
                  AllquesData={AllquesData}
                  currentQuestionIndex={currentQuestionIndex}
                />
              }
            />

            {renderCurrentQuestion()}
            {renderCurrentSolution()}

            {/* RENDER SOLUTION AFTER SELECT OPTION */}
          </SubContainer>
        </ScrollView>
        <PrimaryButton
          disabled={disabled}
          title={currentQuestionIndex + 1 >= totalque ? 'Done' : 'Next'}
          customContainerStyle={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            width: '40%',
          }}
          circleHeight={28}
          circleWidth={28}
          iconSize={20}
          onPress={async () => {
            if (currentQuestionIndex + 1 >= totalque) {
              navigation.goBack();
            } else {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
          }}
        />
      </MainContainer>
    </>
  );
};

export default BookmarkSolution;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 60,
  },
  HeaderText: {fontSize: 20},
  questionContainer: {marginVertical: 10},
  questionText: {
    fontSize: 16,
    fontFamily: Fonts.MulishSemiBold600,
    color: AppColors.GREY,
  },
  yearText: {
    alignSelf: 'flex-end',
    marginVertical: 5,
    fontFamily: Fonts.Bold700,
    color: AppColors.PRIMARY,
  },
});

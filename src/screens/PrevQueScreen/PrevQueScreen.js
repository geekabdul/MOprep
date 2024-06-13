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
import {BASE_URL, USER_DATA, USER_TOKEN} from '../../helper/helper';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import HTML from 'react-native-render-html';
import Loader from '../../components/Loader/Loader';
import {useNavigation} from '@react-navigation/native';
import base64 from 'react-native-base64';
import WebView from 'react-native-webview';
import TableRenderer, {tableModel} from '@native-html/table-plugin';
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
};
const htmlProps = {
  WebView,
  td: {
    borderColor: 'black',
    borderWidth: 1,
  },
  renderers: {
    table: TableRenderer,
    td: {
      borderColor: 'black',
      borderWidth: 1,
    },
  },
  renderersProps: {
    table: {
      td: {
        borderColor: 'black',
        borderWidth: 1,
      },

      // Put the table config here
    },
  },
  customHTMLElementModels: {
    table: tableModel,
    td: {
      borderColor: 'black',
      borderWidth: 1,
    },
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
  renderers: {
    table: TableRenderer,
    td: {
      borderColor: 'black',
      borderWidth: 1,
    },
  },
  renderersProps: {
    table: {
      td: {
        borderColor: 'black',
        borderWidth: 1,
      },

      // Put the table config here
    },
  },
  customHTMLElementModels: {
    table: tableModel,
    td: {
      borderColor: 'black',
      borderWidth: 1,
    },
  },
};
//RENDER HEADER ICONS
const RenderRightIcon = ({
  setModalVisible,
  BookmarkAddorRemove,
  AllquesData,
  currentQuestionIndex,
  QuizSummary,
  ansDetails
}) => {
  const currentQuestion = AllquesData[currentQuestionIndex];

  return (
    <RowContainer>
      {
        !!ansDetails && 
        <TouchableOpacity
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
      </TouchableOpacity>
      }
 
      <TouchableOpacity
        onPress={async () => {
          await QuizSummary();
          setModalVisible(true);
        }}
        style={{marginHorizontal: 10}}>
        <Ionicons
          name="pause-circle-sharp"
          size={25}
          color={AppColors.PRIMARY}
        />
      </TouchableOpacity>
    </RowContainer>
  );
};

// const {width} = Dimensions.get('screen');
const PrevQueScreen = props => {
  const {totalque, part_id, nextIndex} = props?.route?.params;
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [AllquesData, SetAllquesData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(nextIndex);
  const [ansDetails, setansDetails] = useState(null);
  const [summaryData, setsummaryData] = useState(null);
  const [totalScore, settotalScore] = useState(null);
  const [disabled, setdisabled] = useState(false);
  const [shouldGo, setshouldGo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleBackButton = () =>{
    setModalVisible2(true)
    return true
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);


  useEffect(() => {
    AllPrevquesDataFunc();
  }, []);

  const AllPrevquesDataFunc = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {part_id: part_id};

      const response = await axios.post(
        `${BASE_URL}previousYearQuestions`,
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
  const QuizSummary = async endQuestion => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {part_id: part_id};
      const response = await axios.post(
        `${BASE_URL}previousYearPause`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response?.data?.error) {
        console.log(
          'QuizSummaryQuizSummaryQuizSummaryQuizSummaryQuizSummary',
          response?.data,
        );
        let TimelineData = [
          {count: response?.data?.correct_questions, status: 'Correct'},
          {count: response?.data?.incorrect_questions, status: 'Incorrect'},
          {count: response?.data?.missed_questions, status: 'Missed'},
          {count: response?.data?.unattempted_questions, status: 'Unattempted'},
        ];
        setsummaryData({...response?.data, TimelineData});
        totalScoreFunc(
          response?.data?.correct_questions,
          response?.data?.incorrect_questions,
        );
        if (!!endQuestion) {
          await QuitSummarySave({...response?.data, TimelineData});
        }

        setdisabled(false);
      }
    } catch (err) {
      console.log(err?.response?.data);
      setdisabled(false);
    }
  };
  // const AllPrevquesDataFunc = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem(USER_TOKEN);
  //     const params = {part_id: part_id};

  //     const response = await axios.post(
  //       `${BASE_URL}previousYearQuestions`,
  //       params,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //     if (!response?.data?.error) {
  //       SetAllquesData(response?.data?.result);
  //     }
  //   } catch (err) {
  //     console.log(err?.response?.data);
  //   }
  // };
  // const QuizSummary = async (endQuestion) => {
  //   try {
  //     const token = await AsyncStorage.getItem(USER_TOKEN);
  //     const params = {part_id: part_id};
  //     const response = await axios.post(
  //       `${BASE_URL}previousYearPause`,
  //       params,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     if (!response?.data?.error) {
  //       console.log("QuizSummaryQuizSummaryQuizSummaryQuizSummaryQuizSummary",response?.data)
  //       let TimelineData = [
  //         {count: response?.data?.correct_questions, status: 'Correct'},
  //         {count: response?.data?.incorrect_questions, status: 'Incorrect'},
  //         {count: response?.data?.missed_questions, status: 'Missed'},
  //         {count: response?.data?.unattempted_questions, status: 'Unattempted'},
  //       ];
  //       setsummaryData({...response?.data, TimelineData});
  //       totalScoreFunc(
  //         response?.data?.correct_questions,
  //         response?.data?.incorrect_questions,
  //       );
  //       if(!!endQuestion){

  //         await QuitSummarySave({...response?.data, TimelineData});
  //       }

  //       setdisabled(false)

  //     }
  //   } catch (err) {
  //     console.log(err?.response?.data);
  //     setdisabled(false)

  //   }
  // };
  const totalScoreFunc = (correctQuestions, incorrectQuestions) => {
    const CORRECT_SCORE = 2.083;
    const INCORRECT_SCORE = -0.69;

    // Calculate scores
    const correctScore = correctQuestions * CORRECT_SCORE;
    const incorrectScore = incorrectQuestions * INCORRECT_SCORE;

    // Calculate total score
    const totalScore = correctScore + incorrectScore;
    settotalScore(totalScore);
  };

  const QuitSummarySave = async summaryData => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {
        part_id: part_id,
        topic_name: summaryData?.topic_name,
        total_questions: summaryData?.total_questions,
        attempted_questions: summaryData?.attempted_questions,
        correct_questions: summaryData?.correct_questions,
        incorrect_questions: summaryData?.incorrect_questions,
        missed_questions: summaryData?.missed_questions,
        unattempted_questions: summaryData?.unattempted_questions,
        correct_percentage: summaryData?.correct_percentage,
      };
      const response = await axios.post(`${BASE_URL}previousYearQuit`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(
        'responseresponseresponseresponse---------------------',
        response?.data,
        params,
      );
      if (!response?.data?.error) {
        setModalVisible(false);
        navigation.navigate('PrevYearQuestionScreen');
      }
    } catch (err) {
      console.log('errrrrr', err);
      console.log(err?.response?.data);
    }
  };

  const CheckAnswer = async (user_answer, question_id, plusindex) => {
    setdisabled(true);
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {
        part_id: part_id,
        question_id: question_id,
        user_answer: user_answer,
      };
      console.log('paramsparamsparamsparams', params);
      const response = await axios.post(
        `${BASE_URL}previousYearAnswers`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response?.data?.error) {
        if (user_answer != 'm') setansDetails(response?.data);
        if (plusindex) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      }
      setshouldGo(true);
      // await QuizSummary();
      setdisabled(false);
    } catch (err) {
      console.log(err?.response?.data);
      setdisabled(false);
      setshouldGo(true);
    }
    setIsLoading(false);
  };
  //
  const renderCurrentQuestion = () => {
    const currentQuestion = AllquesData[currentQuestionIndex];
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
                  (ansDetails &&
                    ansDetails.result.right_option == optionData.optionType) ||
                  (ansDetails?.result.user_answer == optionData.optionType &&
                    ansDetails.result.user_answer !=
                      ansDetails.result.right_option)
                    ? 1
                    : 0,
                borderColor:
                  ansDetails &&
                  ansDetails.result.right_option == optionData.optionType
                    ? AppColors.SUCCESS
                    : ansDetails?.result.user_answer == optionData.optionType &&
                      ansDetails.result.user_answer !=
                        ansDetails.result.right_option
                    ? AppColors.DANGER
                    : AppColors.PLACEHOLDER_TEXT,
              }}
              key={index}>
              <TouchableOpacity
                onPress={() => {
                  // if (!selectedAnswer) {
                  // setSelectedAnswer(optionData);
                  // }
                  if (ansDetails == null) {
                    setIsLoading(true);

                    CheckAnswer(optionData?.optionType, currentQuestion?.id);
                  }
                }}>
                <RowContainer>
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 999,
                      borderWidth: 2,
                      borderColor:
                        ansDetails &&
                        ansDetails.result.right_option == optionData.optionType
                          ? AppColors.SUCCESS
                          : ansDetails?.result.user_answer ==
                              optionData.optionType &&
                            ansDetails.result.user_answer !=
                              ansDetails.result.right_option
                          ? AppColors.DANGER
                          : AppColors.PLACEHOLDER_TEXT,
                      marginRight: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {ansDetails &&
                      ansDetails.result.right_option ==
                        optionData.optionType && (
                        <View
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            backgroundColor:
                              ansDetails.result.right_option ==
                              optionData.optionType
                                ? AppColors.SUCCESS
                                : 'transparent',
                          }}
                        />
                      )}
                    {ansDetails?.result.user_answer == optionData.optionType &&
                      ansDetails.result.user_answer !=
                        ansDetails.result.right_option && (
                        <View
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            backgroundColor:
                              ansDetails.result.user_answer !=
                              ansDetails.result.right_option
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
                </RowContainer>
              </TouchableOpacity>
            </ShadowContainer>

            {ansDetails &&
              ansDetails.result.right_option == optionData.optionType && (
                <Text
                  style={{
                    alignSelf: 'flex-end',
                    fontSize: 12,
                    fontFamily: Fonts.MulishExtraBold800,
                    marginRight: 10,
                    color: AppColors.SUCCESS,
                    marginBottom: 10,
                  }}>
                  {ansDetails.rightPercentage}% got this correct
                </Text>
              )}

            {ansDetails?.result.user_answer == optionData.optionType &&
              ansDetails.result.user_answer !=
                ansDetails.result.right_option && (
                <Text
                  style={{
                    alignSelf: 'flex-end',
                    fontSize: 12,
                    fontFamily: Fonts.MulishExtraBold800,
                    marginRight: 10,
                    color: AppColors.DANGER,
                    marginBottom: 10,
                  }}>
                  {ansDetails.wrongPercentage}% marked this
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
        part_id: part_id,
        question_id: currentQuestion?.id,
      };
      const response = await axios.post(
        `${BASE_URL}previousYearBookmark`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response?.data?.error) {
        AllPrevquesDataFunc();
      }
    } catch (err) {
      console.log(err?.response?.data);
    }
  };
  const nextHandler = async () => {
    if (currentQuestionIndex + 1 >= totalque) {
      if (ansDetails == null) {
        const currentQuestion = AllquesData[currentQuestionIndex];
        await CheckAnswer('m', currentQuestion?.id);
      } else {
        setansDetails(null);
      }
      await QuizSummary(true);
    } else {
      let shouldUpdateIndex = false;
      setdisabled(true);
      if (ansDetails == null) {
        const currentQuestion = AllquesData[currentQuestionIndex];
        await CheckAnswer('m', currentQuestion?.id, true);
        shouldUpdateIndex = true;
      } else {
        setansDetails(null);
        console.log(
          'ansDetailsansDetailsansDetails================333333',
          ansDetails,
        );
        // setTimeout(()=>{
        shouldUpdateIndex = true;
        setdisabled(false);
        if (shouldUpdateIndex) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        // },1000)
      }
    }
    setIsLoading(false);
  };
  const backOnPress = () => {
    setModalVisible2(true);
  };
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
                  QuizSummary={QuizSummary}
                  ansDetails={ansDetails}
                />
              }
            />

            {renderCurrentQuestion()}
             </SubContainer>
            {ansDetails && (
              <View style={{marginVertical: 20,marginHorizontal:4}}>
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
                    Correct Option {ansDetails.result?.right_option}:{' '}
                  </Text>
                </View>
                <MathJax
                  mathJaxOptions={mmlOptions}
                  contentWidth={width}
                  html={ansDetails?.explaination}
                  {...htmlProps}
                />
                
              </View>
            )}
         
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
            setIsLoading(true);
            nextHandler();
          }}
        />
      </MainContainer>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <MainContainer>
            <View style={{flex: 1, padding: 20}}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons
                  name="close"
                  size={30}
                  color={AppColors.PRIMARY_DARK}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: Fonts.SemiBold600,
                  marginVertical: 10,
                  color: AppColors.PRIMARY_DARK,
                }}>
                Development Timeline..
              </Text>
              <ShadowContainer style={{padding: 15}}>
                <RowContainer>
                  <RowContainer
                    style={{
                      flex: 1,
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}>
                    {summaryData?.TimelineData?.map((timeLine, i) => (
                      <RowContainer style={{width: '45%', marginVertical: 5}}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: Fonts.MulishBold700,
                            color:
                              timeLine.status === 'Correct'
                                ? AppColors.SUCCESS
                                : timeLine.status === 'Incorrect'
                                ? AppColors.DANGER
                                : timeLine.status === 'Missed'
                                ? AppColors.WARNING
                                : AppColors.GREY,
                          }}>
                          {timeLine.count}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{
                            marginLeft: 5,
                            fontFamily: Fonts.MulishRegular400,
                            width: '80%',
                            color: AppColors.PRIMARY_DARK,
                          }}>
                          {timeLine.status}
                        </Text>
                      </RowContainer>
                    ))}
                  </RowContainer>
                  <View
                    style={{
                      width: 1,
                      backgroundColor: AppColors.VERTICAL_LINE,
                      height: '100%',
                      marginHorizontal: 20,
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: Fonts.MulishBold700,
                        color: AppColors.PRIMARY_DARK,
                      }}>
                      {summaryData?.correct_percentage}%
                    </Text>
                    <Text
                      style={{
                        fontFamily: Fonts.MulishRegular400,
                        color: AppColors.GREY,
                      }}>
                      Correct
                    </Text>
                  </View>
                </RowContainer>
              </ShadowContainer>
              <RowContainer
                style={{
                  justifyContent: 'space-between',
                  // marginVertical: 20,
                  marginTop: 50,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: Fonts.MulishSemiBold600,
                    color: AppColors.PRIMARY_DARK,
                  }}>
                  Your Score
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.Bold700,
                    color: AppColors.GREY,
                    fontSize: 18,
                  }}>
                  {totalScore ? totalScore.toFixed(2) : 0}
                </Text>
              </RowContainer>
              <View
                style={{
                  marginTop: 15,
                  marginBottom: 20,
                  backgroundColor: AppColors?.BORDER_LINE2,
                  padding: 6,
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.MulishRegular400,
                    color: AppColors.PRIMARY_DARK,
                  }}>
                  Marking scheme - Correct{' '}
                  <Text style={{color: AppColors?.SUCCESS}}>+2.083 </Text>{' '}
                  Incorrect{' '}
                  <Text style={{color: AppColors?.DANGER}}>-0.69 </Text>
                </Text>
              </View>
              <RowContainer
                style={{
                  justifyContent: 'space-between',
                  marginVertical: 20,
                  marginTop: 30,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: Fonts.MulishSemiBold600,
                    color: AppColors.PRIMARY_DARK,
                  }}>
                  Summary
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.MulishRegular400,
                    color: AppColors.GREY,
                  }}>
                  {summaryData?.attempted_questions} /{' '}
                  {summaryData?.total_questions} attempted
                </Text>
              </RowContainer>
              <RowContainer style={{flexWrap: 'wrap', gap: 20}}>
                {summaryData?.result?.map((ques, i) => (
                  <View
                    key={i}
                    style={{
                      borderWidth: 1,
                      borderColor:
                        ques.status === 'Correct'
                          ? AppColors.SUCCESS
                          : ques.status === 'Incorrect'
                          ? AppColors.DANGER
                          : ques.status === 'Missed'
                          ? AppColors.WARNING
                          : AppColors.GREY_LIGHT_PRIMARY,
                      borderRadius: 8,
                      width: width / 5.4,
                      height: width / 7,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: Fonts.MulishBold700,
                        color:
                          ques.answer_status == 1
                            ? AppColors.SUCCESS
                            : ques.answer_status == 2
                            ? AppColors.DANGER
                            : ques.answer_status == 3
                            ? AppColors.WARNING
                            : ques.answer_status == 4
                            ? AppColors.GREY
                            : 'white',
                      }}>
                      {ques.serial_number}
                    </Text>
                  </View>
                ))}
              </RowContainer>

              <RowContainer
                style={{
                  // position: 'absolute',
                  // bottom: 20,
                  // right: 20,
                  justifyContent: 'flex-end',
                  marginTop: 30,
                  gap: 10,
                }}>
                <SecondaryButton
                  title={'Quit'}
                  onPress={() => QuitSummarySave()}
                />
                <SecondaryButton
                  title={'Resume'}
                  type="filled"
                  onPress={() => setModalVisible(false)}
                />
              </RowContainer>
            </View>
          </MainContainer>
        </ScrollView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          <View
            style={{
              // margin: 20,
              backgroundColor: 'white',
              borderRadius: 18,
              // height: '60%',
              width: '90%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
              {/* <MainContainer> */}
                <View
                  style={{
                    alignItems: 'center',
                    marginVertical: 30,
                    marginHorizontal: 15,
                  }}>
                  {/* <TouchableOpacity onPress={() => setModalVisible2(false)}>
                    <Ionicons
                      name="close"
                      size={30}
                      color={AppColors.PRIMARY_DARK}
                    />
                  </TouchableOpacity> */}
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: Fonts.SemiBold600,
                      marginVertical: 4,
                      color: AppColors.PRIMARY_DARK,
                      lineHeight:24,
                      textAlign:'center'
                    }}>
                  Return to the main menu. You can resume your test from this point at any time
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 30,
                    marginBottom: 20,
                  }}>
                  <PrimaryButton
                    title={'Cancel'}
                    iconPosition="not"
                    customContainerStyle={{
                      // position: 'absolute',
                      // bottom: 20,
                      // right: 20,
                      width: '40%',
                    }}
                    circleHeight={28}
                    circleWidth={28}
                    iconSize={20}
                    onPress={async () => {
                      setModalVisible2(false);
                    }}
                  />
                  <PrimaryButton
                    title={'Quit'}
                    iconPosition="not"
                    customContainerStyle={{
                      // position: 'absolute',
                      // bottom: 20,
                      // right: 20,
                      width: '40%',
                    }}
                    circleHeight={28}
                    circleWidth={28}
                    iconSize={20}
                    onPress={async () => {
                      QuizSummary(true);
                      setModalVisible2(false)
                    }}
                  />
                </View>
              {/* </MainContainer> */}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PrevQueScreen;

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

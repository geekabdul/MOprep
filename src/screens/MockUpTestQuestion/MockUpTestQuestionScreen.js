import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  useWindowDimensions,
  Alert,
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
//RENDER HEADER ICONS
const RenderRightIcon = ({
  setModalVisible,
  BookmarkAddorRemove,
  AllquesData,
  currentQuestionIndex,
  QuizSummary,
  minutes,
  seconds,
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
      <View>
        <Text>
          {minutes < 10 ? '0' : ''}
          {minutes}:{seconds < 10 ? '0' : ''}
          {seconds}
        </Text>
      </View>
      <Text></Text>
    </RowContainer>
  );
};

// const {width} = Dimensions.get('screen');
const MockUpTestQuestionScreen = props => {
  const {totalque, mock_id} = props?.route?.params;
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [AllquesData, SetAllquesData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [ansDetails, setansDetails] = useState(null);
  const [summaryData, setsummaryData] = useState(null);
  const [disabled, setdisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const durationParts = durationFromAPI.split(' ');
  // const durationValue = parseInt(durationParts[0]); // Extract the number part
  // const durationUnit = durationParts[1]; // Extract the unit part

  // // Convert duration to milliseconds
  // let durationInMilliseconds;
  // if (durationUnit.toLowerCase() === 'mins') {
  //   durationInMilliseconds = durationValue * 60 * 1000; // Convert minutes to milliseconds
  // } else {
  //   // Handle other units if needed (e.g., hours, seconds)
  //   durationInMilliseconds = 0; // Default value if unit is not supported
  // }

  // console.log(
  //   'durationInMillisecondsdurationInMillisecondsdurationInMillisecondsdurationInMilliseconds',
  //   durationInMilliseconds,
  // );
  const [timeLeft, setTimeLeft] = useState(null);
  useEffect(() => {
    const timer = setInterval(() => {
      // Decrement timeLeft by 1 second
      if (timeLeft != null) {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1000);
        if (timeLeft <= 0) {
          clearInterval(timer);
          showToast('Sorry You Sort of Time Test Will be Saved');
          QuitSummarySave();
        }
      }
    }, 1000); // Run every second

    return () => clearInterval(timer); // Clean up the timer when component unmounts
  }, [timeLeft]);
  useEffect(() => {
    AllPrevquesDataFunc();
  }, []);

  const AllPrevquesDataFunc = async notUpdateDuration => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {mock_id: mock_id};

      const response = await axios.post(
        `${BASE_URL}mockTestQuestions`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('AllquesDataFuncAllquesDataFunc', response?.data);
      if (!response?.data?.error) {
        if (response?.data?.duration <= 0) {
          let durationInMilliseconds = response?.data?.duration * 60 * 1000;
          setTimeLeft(response?.data?.duration);
        } else {
          if (notUpdateDuration) {
            SetAllquesData(response?.data?.result);
          } else {
            SetAllquesData(response?.data?.result);
            let durationInMilliseconds = response?.data?.duration * 60 * 1000;
            setTimeLeft(durationInMilliseconds);
            setCurrentQuestionIndex(response?.data?.question_index);
          }
        }
      }
    } catch (err) {
      console.log(err?.response?.data);
    }
  };
  const QuizSummary = async endQuestion => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {mock_id: mock_id};
      const response = await axios.post(`${BASE_URL}mockTestPause`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response?.data?.error) {
        let TimelineData = [
          {count: response?.data?.attempted_questions, status: 'Attempted'},
          {count: response?.data?.skipped_questions, status: 'Skipped'},
          {count: response?.data?.notvisited_questions, status: 'Not visited'},
        ];
        setsummaryData({...response?.data, TimelineData});
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
  const QuitSummarySave = async summaryData => {
    try {
      const minutes = Math.floor(timeLeft / 60000);
      const seconds = ((timeLeft % 60000) / 1000).toFixed(0);
      let avg_time = `${minutes}:${seconds}`;
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {
        mock_id: mock_id,
        average_time: avg_time,
      };
      const response = await axios.post(`${BASE_URL}mockTestEnd`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response?.data?.error) {
        setModalVisible(false);
        showToast('Test Save SuccesFully');
        navigation.navigate('TestScreen');
      }
    } catch (err) {
      console.log(err?.response?.data);
      navigation.navigate('TestScreen');
    }
  };

  const CheckAnswer = async (user_answer, question_id) => {
    setdisabled(true);

    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {
        mock_id: mock_id,
        question_id: question_id,
        user_answer: user_answer,
        question_index: currentQuestionIndex,
      };
      console.log('paramsparamsparamsparams', params);
      const response = await axios.post(`${BASE_URL}mockTestAnswers`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response?.data?.error) {
        if (user_answer != 'm') {
          setansDetails(response?.data);
        }
      }
      AllPrevquesDataFunc(true);
      setdisabled(false);
    } catch (err) {
      console.log(err?.response?.data);
      setdisabled(false);
    }
    setIsLoading(false);
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
      console.log(
        'BookmarkAddorRemoveBookmarkAddorRemove-------------',
        response?.data,
      );
      if (!response?.data?.error) {
        // AllPrevquesDataFunc();
      }
    } catch (err) {
      console.log(err?.response?.data, 'errrorrrr');
    }
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
    const renderCorrectAns = optionData => {
      if (currentQuestion.user_answer == optionData.optionType) {
        return (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              backgroundColor:
                currentQuestion.user_answer == optionData.optionType ||
                currentQuestion.user_answer != 'm'
                  ? AppColors.BLUE_NEW
                  : 'transparent',
            }}
          />
        );
      } else {
        return (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              backgroundColor: 'transparent',
            }}
          />
        );
      }
    };

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
              }}
              key={index}>
              <TouchableOpacity
                onPress={() => {
                  // if (!selectedAnswer) {
                  // setSelectedAnswer(optionData);
                  // }
                  // if (ansDetails == null) {
                  setIsLoading(true);

                  CheckAnswer(
                    optionData?.optionType,
                    currentQuestion?.question_id,
                  );
                  // }
                }}>
                <RowContainer>
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 999,
                      borderWidth: 2,
                      borderColor: AppColors.PLACEHOLDER_TEXT,
                      marginRight: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {renderCorrectAns(optionData)}
                    {/* {ansDetails &&
                    ansDetails?.result.user_answer == optionData.optionType ? (
                      <View
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          backgroundColor:
                          ansDetails && ansDetails?.result?.user_answer ==
                            optionData?.optionType || (currentQuestion.user_answer == optionData.optionType ||
                            currentQuestion.user_answer != 'm')
                              ? AppColors.BLUE_NEW
                              : 'transparent',
                        }}
                      />
                    ) : currentQuestion.user_answer == optionData.optionType ||
                      currentQuestion.user_answer != 'm' ? (
                      <View
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          backgroundColor:
                          ansDetails && ansDetails?.result?.user_answer ==
                          optionData?.optionType || (currentQuestion.user_answer == optionData.optionType ||
                          currentQuestion.user_answer != 'm')
                              ? AppColors.BLUE_NEW
                              : 'transparent',
                        }}
                      />
                    ) : null} */}
                    {/* {ansDetails?.result.user_answer == optionData.optionType &&
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
                      )} */}
                  </View>
                  <RenderHtml
                    contentWidth={width}
                    source={{html: optionData?.option}}
                    tagsStyles={tagStyleforOptions}
                  />
                </RowContainer>
              </TouchableOpacity>
            </ShadowContainer>
          </>
        ))}
      </>
    );
  };
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = ((timeLeft % 60000) / 1000).toFixed(0);
  return (
    <>
      {isLoading && <LoaderFull />}

      <MainContainer>
        {timeLeft == '0' ? (
          <View>
            <Text
              style={{
                fontSize: 20,
                fontFamily: Fonts.SemiBold600,
                marginVertical: 10,
                color: AppColors.PRIMARY_DARK,
                textAlign: 'center',
              }}>
              Sorry You Sort of Time Test Will be Saved
            </Text>
          </View>
        ) : (
          <>
            <ScrollView>
              <SubContainer style={styles.container}>
                <BackRightIconHeader
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
                      minutes={minutes}
                      seconds={seconds}
                      ansDetails={ansDetails}
                    />
                  }
                />

                {renderCurrentQuestion()}
                {/* RENDER SOLUTION AFTER SELECT OPTION */}
              </SubContainer>
            </ScrollView>
            <RowContainer
              style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                gap: 10,
                width: '70%',
              }}>
              {currentQuestionIndex != 0 ? (
                <PrimaryButton
                  title={'Previous'}
                  customContainerStyle={{flex: 1}}
                  circleHeight={28}
                  circleWidth={28}
                  iconSize={20}
                  iconPosition={'left'}
                  onPress={async () => {
                    await AllPrevquesDataFunc();
                    setCurrentQuestionIndex(currentQuestionIndex - 1);
                  }}
                />
              ) : (
                <View style={{width: '40%'}}></View>
              )}

              <PrimaryButton
                title={currentQuestionIndex + 1 >= totalque ? 'Done' : 'Next'}
                disabled={disabled}
                customContainerStyle={{flex: 1}}
                circleHeight={28}
                circleWidth={28}
                iconSize={20}
                onPress={async () => {
                  setIsLoading(true);

                  if (currentQuestionIndex + 1 >= totalque) {
                    if (ansDetails == null) {
                      const currentQuestion = AllquesData[currentQuestionIndex];
                      await CheckAnswer('m', currentQuestion?.question_id);
                    } else {
                      setansDetails(null);
                    }
                    await QuizSummary(true);
                  } else {
                    let shouldUpdateIndex = false;
                    setdisabled(true);
                    if (ansDetails == null) {
                      const currentQuestion = AllquesData[currentQuestionIndex];
                      let AlreadySelectedoption =
                        currentQuestion?.user_answer != ''
                          ? currentQuestion?.user_answer
                          : 'm';
                      CheckAnswer(
                        AlreadySelectedoption,
                        currentQuestion?.question_id,
                      );
                      shouldUpdateIndex = true;
                    } else {
                      setansDetails(null);
                      shouldUpdateIndex = true;
                      setdisabled(false);
                    }
                    if (shouldUpdateIndex) {
                      setCurrentQuestionIndex(currentQuestionIndex + 1);
                    }
                  }
                  setIsLoading(false);
                }}
              />
            </RowContainer>
          </>
        )}
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
                      // flexWrap: 'wrap',
                      // justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    {summaryData?.TimelineData?.map((timeLine, i) => (
                      <RowContainer style={{width: '34%', marginVertical: 5}}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: Fonts.MulishBold700,
                            color:
                              timeLine.status === 'Attempted'
                                ? AppColors.SUCCESS
                                : timeLine.status === 'Skipped'
                                ? AppColors.BLUE_NEW
                                : timeLine.status === 'Not visited'
                                ? AppColors.GRAY_NEW
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
                  {/* <View
                    style={{
                      width: 1,
                      backgroundColor: AppColors.VERTICAL_LINE,
                      height: '100%',
                      marginHorizontal: 20,
                    }}
                  /> */}
                  {/* <View>
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
                  </View> */}
                </RowContainer>
              </ShadowContainer>
              <RowContainer
                style={{
                  justifyContent: 'space-between',
                  marginVertical: 20,
                  marginTop: 50,
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
                  <TouchableOpacity
                    onPress={() => {
                      setCurrentQuestionIndex(i);
                      setModalVisible(false);
                    }}
                    key={i}
                    style={{
                      borderWidth: 1,
                      borderColor:
                        ques.answer_status == 1 || ques.answer_status == 2
                          ? AppColors.SUCCESS
                          : ques.answer_status === 3
                          ? AppColors.BLUE_NEW
                          : ques.attempt_status === 'not_visited'
                          ? AppColors.GRAY_NEW
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
                          ques.answer_status == 1 || ques.answer_status == 2
                            ? AppColors.SUCCESS
                            : ques.answer_status === 3
                            ? AppColors.BLUE_NEW
                            : ques.attempt_status === 'not_visited'
                            ? AppColors.GRAY_NEW
                            : AppColors.GREY_LIGHT_PRIMARY,
                      }}>
                      {ques.serial_number}
                    </Text>
                  </TouchableOpacity>
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
                  title={'End Test'}
                  onPress={() => QuitSummarySave()}
                />
              </RowContainer>
            </View>
          </MainContainer>
        </ScrollView>
      </Modal>
    </>
  );
};

export default MockUpTestQuestionScreen;

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

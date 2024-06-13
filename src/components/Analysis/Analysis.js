import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Fonts from '../../assets/fonts';
import {AppColors} from '../../constants/colors';
import {AppImages} from '../../assets/images';
import Dot from '../common/Dot/Dot';
import RowContainer from '../common/RowContainer/RowContainer';
import ShadowContainer from '../common/ShadowContainer/ShadowContainer';
import {BarChart, PieChart} from 'react-native-gifted-charts';

const answerIndicators = [
  {indicates: 'Correct', color: AppColors.CORRECT},
  {indicates: 'Incorrect', color: AppColors.INCORRECT},
  {indicates: 'Unattempted', color: AppColors.UNATTEMPTED},
];
const leaderboardData = [
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'James S. Fernandes',
    marks: 85,
    correctAnswer: 17,
    rank: 1,
  },
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'Bob',
    marks: 78,
    correctAnswer: 15,
    rank: 2,
  },
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'Charlie',
    marks: 92,
    correctAnswer: 19,
    rank: 3,
  },
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'Diana',
    marks: 65,
    correctAnswer: 12,
    rank: 4,
  },
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'Ethan',
    marks: 80,
    correctAnswer: 16,
    rank: 5,
  },
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'Fiona',
    marks: 72,
    correctAnswer: 14,
    rank: 6,
  },
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'Gabriel',
    marks: 90,
    correctAnswer: 18,
    rank: 7,
  },
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'Hannah',
    marks: 58,
    correctAnswer: 10,
    rank: 8,
  },
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'Isaac',
    marks: 83,
    correctAnswer: 16,
    rank: 9,
  },
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'Jessica',
    marks: 75,
    correctAnswer: 13,
    rank: 10,
  },
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'Kevin',
    marks: 88,
    correctAnswer: 18,
    rank: 11,
  },
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'Liam',
    marks: 68,
    correctAnswer: 11,
    rank: 12,
  },
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'Mia',
    marks: 95,
    correctAnswer: 19,
    rank: 13,
  },
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'Noah',
    marks: 81,
    correctAnswer: 17,
    rank: 14,
  },
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'Olivia',
    marks: 70,
    correctAnswer: 13,
    rank: 15,
  },
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'Sophia',
    marks: 87,
    correctAnswer: 17,
    rank: 16,
  },
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'William',
    marks: 62,
    correctAnswer: 9,
    rank: 17,
  },
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'Charlotte',
    marks: 79,
    correctAnswer: 15,
    rank: 18,
  },
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'James',
    marks: 82,
    correctAnswer: 16,
    rank: 19,
  },
  {
    profile: AppImages.DEFAULT_PROFILE,
    name: 'Ava',
    marks: 73,
    correctAnswer: 14,
    rank: 20,
  },
];


const Analysis = ({analysisALlData}) => {
  const pieData = [
    {value: analysisALlData?.incorrect, color: AppColors.INCORRECT, shiftX: 0, shiftY: 0},
    {value: analysisALlData?.unattempted, color: AppColors.UNATTEMPTED, shiftX: 0, shiftY: 0},
    {value: analysisALlData?.correct, color: AppColors.CORRECT, shiftX: 0, shiftY: 0},
  ];
  return (
    <View>
      <Text
        style={{
          marginVertical: 10,
          marginTop: 20,
          fontFamily: Fonts.Medium500,
          fontSize: 16,
          color: AppColors.GREY,
        }}>
        Presents test analysis and results
      </Text>

      <ShadowContainer style={{padding: 20}}>
        <Text
          style={{
            fontFamily: Fonts.MulishSemiBold600,
            fontSize: 20,
            color: AppColors.PRIMARY_DARK,
            width: '45%',
          }}>
          Total Questions {analysisALlData?.total_questions}
        </Text>
        <RowContainer
          style={{
            marginTop: -30,
            justifyContent: 'space-between',
          }}>
          <View style={{marginTop: 40}}>
            {answerIndicators.map((value, i) => (
              <RowContainer style={{gap: 10, marginVertical: 5}} key={i}>
                <View
                  style={{
                    height: 12,
                    width: 12,
                    backgroundColor: value.color,
                    borderRadius: 2,
                  }}
                />
                <Text
                  style={{
                    fontFamily: Fonts.MulishExtraBold800,
                    fontSize: 12,
                    color: AppColors.PRIMARY_DARK,
                  }}>
                  {value.indicates}
                </Text>
              </RowContainer>
            ))}
          </View>
          {/* <Image source={AppImages.PIE_CHART} /> */}
          <PieChart
            strokeColor="white"
            strokeWidth={2}
            data={pieData}
            radius={90}
            // innerCircleColor="#414141"
            // innerCircleBorderWidth={4}
            // innerCircleBorderColor={'white'}
          />
        </RowContainer>
      </ShadowContainer>

      <ShadowContainer style={{padding: 20}}>
        <View style={{marginVertical: 10}}>
          <RowContainer style={{gap: 10}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Fonts.MulishSemiBold600,
                color: AppColors.PRIMARY_DARK,
              }}>
              Rank
            </Text>
            <Image source={AppImages.START_GOLD_CUP} />
          </RowContainer>
          <Text
            style={{
              fontFamily: Fonts.MulishSemiBold600,
              color: AppColors.GREY,
            }}>
            {analysisALlData?.student_rank} / {analysisALlData?.total_students} Students
          </Text>
        </View>
        <View style={{marginVertical: 10}}>
          <RowContainer style={{gap: 10}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Fonts.MulishSemiBold600,
                color: AppColors.PRIMARY_DARK,
              }}>
              Average time
            </Text>
            <Image source={AppImages.ALARM_CLOCK} />
          </RowContainer>
          <Text
            style={{
              fontFamily: Fonts.MulishSemiBold600,
              color: AppColors.GREY,
            }}>
            {analysisALlData?.average_time} mins
          </Text>
        </View>
      </ShadowContainer>

      <ShadowContainer style={{padding: 20}}>
        <RowContainer style={{justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.MulishSemiBold600,
              color: AppColors.PRIMARY_DARK,
            }}>
            Leaderboard
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Regular400,
              color: AppColors.GREY,
            }}>
            Total {analysisALlData?.total_marks} marks
          </Text>
        </RowContainer>

        <View
          style={{
            borderWidth: 1,
            borderColor: AppColors.BORDER_LINE,
            borderRadius: 7,
          }}>
          {analysisALlData?.result?.map((student, index) => (
            <RowContainer
              style={{justifyContent: 'space-between', padding: 10}}
              key={index}>
              <RowContainer style={{gap: 10}}>
                <Image source={ !!student?.avatar  ? { uri: student?.avatar } : student.profile}  style={{height:45,width:45}}/>

                <View>
                  <Text
                    style={{
                      fontFamily: Fonts.MulishSemiBold600,
                      fontSize: 12,
                      color: AppColors.PRIMARY_DARK,
                    }}>
                    {student.student_name}
                  </Text>
                  <RowContainer style={{marginTop: 5}}>
                    <Text
                      style={{
                        fontFamily: Fonts.MulishSemiBold600,
                        fontSize: 12,
                        color: AppColors.GREY,
                      }}>
                      {student.marks} marks
                    </Text>
                    <Dot color={AppColors.GREY} size={5} />
                    <Text
                      style={{
                        fontFamily: Fonts.MulishSemiBold600,
                        fontSize: 12,
                        color: AppColors.GREY,
                      }}>
                      {student.correct} correct
                    </Text>
                  </RowContainer>
                </View>
              </RowContainer>
              {index + 1  <= 3 ? (
                <Image
                  source={
                    index + 1 === 1
                      ? AppImages.RANK_1
                      : index + 1  === 2
                      ? AppImages.RANK_2
                      : AppImages.RANK_3
                  }
                />
              ) : (
                <View
                  style={{
                    width: 23,
                    height: 23,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: AppColors.GREY_LIGHT_PRIMARY,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: Fonts.MulishSemiBold600,
                      color: AppColors.PRIMARY_DARK,
                    }}>
                    {index + 1 }
                  </Text>
                </View>
              )}
            </RowContainer>
          ))}
        </View>
      </ShadowContainer>
    </View>
  );
};

export default Analysis;

const styles = StyleSheet.create({});

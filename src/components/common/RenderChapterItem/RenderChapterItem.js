import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from '../../../constants/colors';
import Fonts from '../../../assets/fonts';
import RowContainer from '../RowContainer/RowContainer';
import {AppImages} from '../../../assets/images';

const RenderChapterItem = ({item, subject_id}) => {
  const navigation = useNavigation();
  const [chapterNumber, chapterTitle] = item.chapter_name.split(' - ');
  return (
    <View
      style={{
        marginVertical: 10,
        flex: 1,
      }}>
      <Text
        style={{
          fontSize: 15,
          paddingHorizontal: 20,
          marginVertical: 10,
          fontFamily: Fonts.SemiBold600,
          color: AppColors.PRIMARY_DARK,
        }}>
        {chapterNumber} -{' '}
        <Text
          style={{
            color: AppColors.PRIMARY,
          }}>
          {chapterTitle}
        </Text>
      </Text>
      {item?.topic_data?.map((topic, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate('TopicQuestionsScreen', {
              data: topic,
              subject_id: subject_id,
              chapter_id: item?.chapter_id,
              topic_id: topic?.topic_id,
            })
          }>
          <RowContainer
            style={{
              borderBottomWidth: 1,
              borderBottomColor: AppColors.BORDER_LINE,
              padding: 20,
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <RowContainer style={{flex: 2 / 2}}>
              <ImageBackground
                source={AppImages.OVAL}
                style={{
                  height: 46,
                  width: 46,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.SemiBold600,
                    color: AppColors.PRIMARY_DARK,
                  }}>
                  {topic?.topic_sequence}
                </Text>
              </ImageBackground>

              <View style={{margin: 5, flex: 1}}>
                <Text
                  style={{
                    fontFamily: Fonts.SemiBold600,
                    fontSize: 16,
                    color: AppColors.PRIMARY_DARK,
                  }}
                  numberOfLines={1}>
                  {topic?.topic_name}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.MulishBold700,
                    fontSize: 13,
                    color: AppColors.GREY,
                  }}>
                  {topic?.questions} Ques
                </Text>
              </View>
            </RowContainer>
            <View style={{flexDirection: 'row'}}>
              {
                topic?.pause_status == 'complete' ?
                <Ionicons
                name="checkmark-circle"
                size={25}
                style={{paddingRight: 16}}
                color={'green'}
              /> : null
              }
              
              <Ionicons name="chevron-forward-sharp" size={25} />
            </View>
          </RowContainer>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default RenderChapterItem;

const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import RowContainer from '../RowContainer/RowContainer';
import {AppColors} from '../../../constants/colors';
import Fonts from '../../../assets/fonts';
import Dot from '../Dot/Dot';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
const RenderQuestion = ({
  item,
  isBookmarked = false,
  customContainerStyle,
  onPress,
  index,
  mock_id,
  totalque,
  checkapi,
  bookmarkRemove
}) => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  console.log('indexindexindexindexindex', item);
  const tagStyle = {
    p: {
      color: 'black',
      padding: 0,
      fontWeight: '600',
      marginTop: 0,
    },
    td: {
      borderColor: 'black',
      borderWidth: 1,
    },
  };

  return (
    <TouchableOpacity
      onPress={() => {
        !!onPress
          ? navigation.navigate('BookmarkSolution', {
              data: item,
              nextIndex: index,
              mock_id: mock_id,
              totalque: totalque,
              checkapi:checkapi,
              alldata : !!item?.type ? true : false
            })
          : null;
      }}>
      <RowContainer style={[styles.container, customContainerStyle]}>
        <View style={styles.questionNumberContainer}>
          <Text style={styles.questionNumberText}>{item?.sno}</Text>
        </View>
        <RowContainer style={styles.questionDetailsContainer}>
          <View style={styles.questionDetails}>
            <RenderHtml
              contentWidth={width}
              source={{html: item.question}}
              tagsStyles={tagStyle}
            />
            {/* <Text numberOfLines={3} style={styles.questionText}>
              {item.question}
            </Text> */}
            <RowContainer style={styles.additionalInfo}>
              <Text style={styles.infoText}>{item?.attempt_status}</Text>
              <Dot color={AppColors.GREY_LIGHT} size={6} />
              <Text style={styles.infoText}>{item?.subject_name || item?.part_name || item?.year}</Text>
            </RowContainer>
          </View>
        </RowContainer>
        {isBookmarked && (
          <TouchableOpacity style={{marginLeft: 20}}
          onPress={()=>{
            bookmarkRemove(item)
          }}
          >
            <Ionicons
              name="bookmark-sharp"
              size={25}
              color={AppColors.PRIMARY}
            />
          </TouchableOpacity>
        )}
      </RowContainer>
    </TouchableOpacity>
  );
};

export default RenderQuestion;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.BORDER_LINE,
    paddingVertical: 10,
  },
  questionNumberContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: AppColors.PRIMARY_DARK,
    alignSelf: 'flex-start',
    marginTop: 5,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionNumberText: {
    fontSize: 12,
    fontFamily: Fonts.SemiBold600,
    color: AppColors.PRIMARY_DARK,
  },
  questionDetailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  questionDetails: {
    flex: 1,
  },
  questionText: {
    fontFamily: Fonts.MulishSemiBold600,
    color: AppColors.PRIMARY_DARK,
  },
  additionalInfo: {
    marginVertical: 3,
  },
  infoText: {
    fontSize: 13,
    fontFamily: Fonts.MulishRegular400,
    color: AppColors.GREY,
  },
});

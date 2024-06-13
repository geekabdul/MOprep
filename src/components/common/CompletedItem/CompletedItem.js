import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RowContainer from '../RowContainer/RowContainer';
import Fonts from '../../../assets/fonts';
import {AppColors} from '../../../constants/colors';
import {AppImages} from '../../../assets/images';

const CompletedItem = ({item}) => {
  return (
    <RowContainer style={styles.container}>
      <RowContainer style={styles.contentContainer}>
        <View style={styles.imageMainContainer}>
          <View style={styles.verticalDottedLine} />
          <Image source={item.img} style={styles.image} />
          <View style={styles.verticalDottedLine} />
        </View>

        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.details}>{item.numberOfQues} Ques</Text>
        </View>
      </RowContainer>
      <View style={styles.completeImageContainer}>
        <Image source={AppImages.CHECKMARK} />
        <Text style={styles.completedText}>Completed</Text>
      </View>
    </RowContainer>
  );
};

export default CompletedItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    gap: 10,
  },
  imageMainContainer: {
    alignItems: 'center',
  },
  verticalDottedLine: {
    height: 10, // Adjust height as needed
    borderLeftWidth: 1,
    borderColor: AppColors.PRIMARY,
    borderStyle: 'dotted',
  },
  image: {
    height: 46,
    width: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.SemiBold600,
    color: AppColors.PRIMARY_DARK,
  },
  details: {
    fontSize: 13,
    fontFamily: Fonts.MulishBold700,
    color: AppColors.PLACEHOLDER_TEXT,
  },
  completeImageContainer: {alignItems: 'center'},
  completedText: {
    fontSize: 11,
    fontFamily: Fonts.MulishExtraBold800,
    color: AppColors.GREY,
  },
});

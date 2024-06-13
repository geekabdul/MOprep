import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppColors} from '../../../constants/colors';
import Fonts from '../../../assets/fonts';
import RowContainer from '../RowContainer/RowContainer';
import {useNavigation} from '@react-navigation/native';

const RenderExamsItem = ({item, path, activeOpacity}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      disabled={item?.active_status == 0 ? true : false}
      activeOpacity={activeOpacity}
      onPress={() => {
        if (path) {
          navigation.navigate(path, {data: item});
        }
      }}>
      <RowContainer style={styles.container}>
        <RowContainer style={styles.contentContainer}>
          <Image source={{uri: item.image}} style={styles.image} />

          <View>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.details}>{item.questions} Ques</Text>
          </View>
        </RowContainer>
        {path && (
          <Text style={styles.duration}>
            {item.live_on}
          </Text>
        )}
      </RowContainer>
    </TouchableOpacity>
  );
};

export default RenderExamsItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.BORDER_LINE,
    padding: 20,
    justifyContent: 'space-between',
  },
  contentContainer: {
    gap: 10,
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
  duration: {
    fontSize: 11,
    fontFamily: Fonts.MulishExtraBold800,
    color: AppColors.GREY,
  },
});

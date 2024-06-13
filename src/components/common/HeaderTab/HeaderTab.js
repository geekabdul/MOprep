import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import RowContainer from '../RowContainer/RowContainer';
import {AppColors} from '../../../constants/colors';
import Fonts from '../../../assets/fonts';

const HeaderTab = ({
  data,
  selectedHeaderTab,
  setSelectedHeaderTab,
  customContainerStyle,
}) => {
  return (
    <RowContainer style={[styles.container, customContainerStyle]}>
      {data.map((row, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => setSelectedHeaderTab(row)}
          style={[
            styles.tab,
            {
              backgroundColor:
                selectedHeaderTab === row
                  ? AppColors.PRIMARY
                  : AppColors.PRIMARY_LIGHT,
              elevation: selectedHeaderTab === row ? 8 : 0,
            },
          ]}>
          <Text
            style={[
              styles.tabText,
              {
                color:
                  selectedHeaderTab === row ? AppColors.WHITE : AppColors.BLACK,
              },
            ]}>
            {row}
          </Text>
        </TouchableOpacity>
      ))}
    </RowContainer>
  );
};

export default HeaderTab;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    borderBottomWidth: 1,
    borderColor: AppColors.BORDER_LINE2,
  },
  tab: {
    padding: 10,
    paddingHorizontal: 25,
    marginBottom: 1,
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
  },
  tabText: {
    fontFamily: Fonts.SemiBold600,
    fontSize: 16,
  },
});

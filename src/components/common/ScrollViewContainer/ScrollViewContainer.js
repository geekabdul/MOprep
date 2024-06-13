import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {AppColors} from '../../../constants/colors';

const ScrollViewContainer = ({
  children,
  style,
  showsVerticalScrollIndicator = false,
  contentContainerStyle,
  refreshControl,
  enable =true
}) => {
  return (
    <ScrollView
    scrollEnabled={enable}
    refreshControl={refreshControl}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      style={[
        {
          backgroundColor: AppColors.PRIMARY_LIGHT,
        },
        style,
      ]}>
      {children}
    </ScrollView>
  );
};

export default ScrollViewContainer;

const styles = StyleSheet.create({});

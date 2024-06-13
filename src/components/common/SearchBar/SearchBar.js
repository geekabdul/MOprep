import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ShadowContainer from '../ShadowContainer/ShadowContainer';
import Fonts from '../../../assets/fonts';
import {AppColors} from '../../../constants/colors';
import RowContainer from '../RowContainer/RowContainer';
import Feather from 'react-native-vector-icons/Feather';

const SearchBar = ({placeholder, inputValue, setInputValue,funcCall}) => {
  return (
    <ShadowContainer
      style={{padding: 5, paddingHorizontal: 10, borderRadius: 15}}>
      <RowContainer style={{justifyContent: 'space-between'}}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={AppColors.PLACEHOLDER_TEXT}
          style={{
            flex: 1,
            fontSize: 16,
            fontFamily: Fonts.MulishBold700,
            color: AppColors.PRIMARY_DARK,
          }}
          onChangeText={(text)=>{
            setInputValue(text)
            }}
          value={inputValue}
          onSubmitEditing={event => funcCall()}

        />
        <TouchableOpacity
        onPress={()=>funcCall()}
          style={{
            backgroundColor: AppColors.PRIMARY,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            padding: 10,
          }}>
          <Feather name="search" size={20} color={AppColors.WHITE} />
        </TouchableOpacity>
      </RowContainer>
    </ShadowContainer>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});

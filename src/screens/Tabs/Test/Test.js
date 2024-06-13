import {FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScrollViewContainer from '../../../components/common/ScrollViewContainer/ScrollViewContainer';
import BackHeader from '../../../components/common/BackHeader/BackHeader';
import SearchBar from '../../../components/common/SearchBar/SearchBar';
import RowContainer from '../../../components/common/RowContainer/RowContainer';
import Fonts from '../../../assets/fonts';
import {AppColors} from '../../../constants/colors';
import ShadowContainer from '../../../components/common/ShadowContainer/ShadowContainer';
import {AppImages} from '../../../assets/images';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import RenderExamsItem from '../../../components/common/RenderExamsItem/RenderExamsItem';
import SubContainer from '../../../components/common/SubContainer/SubContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL, USER_TOKEN} from '../../../helper/helper';
import Loader from '../../../components/Loader/Loader';


const Test = () => {
  const navigation = useNavigation();
  const focus = useIsFocused()
  const [mockTestData, SetmockTestData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading,setisLoading] = useState(false);
  const [searchText, setsearchText] = useState('');

  useEffect(() => {
    mockTestFunc();
    return () => {
      setsearchText('');
    };
  }, [focus]);
  const mockTestFunc = async () => {
    setisLoading(true)
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const response = await axios.get(`${BASE_URL}mockTestUpcomming`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response?.data?.error) {
        console.log("mockTestFuncmockTestFuncmockTestFunc",response?.data)
        SetmockTestData(response?.data?.result);
    setRefreshing(false);
    setisLoading(false)

      }
    } catch (err) {
      console.log("mockTestF error",err?.response?.data);
    setRefreshing(false);
    setisLoading(false)


    }
  };
  const handleRefresh = () => {
    setRefreshing(true);
    mockTestFunc();
  };
  const funcCall = async () => {
    // try {
    //   console.log('texttexttexttext');
    //   const token = await AsyncStorage.getItem(USER_TOKEN);
    //   const params = {
    //     title: searchText,
    //   };
    //   const response = await axios.post(
    //     `${BASE_URL}questionBankSearchSubject`,
    //     params,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   );
    //   console.log('responseresponseresponseresponse', response?.data);
    //   if (!response?.data?.error) {
    //     SetsearchTopics(response?.data?.result);
    //   }
    // } catch (err) {
    //   console.log('dndshdhsdhshdhd0000000000', err?.response?.data);
    // }
  };
  return (
    <ScrollViewContainer refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
    }>
      <SubContainer>
        <BackHeader />
        <SearchBar placeholder={'Search'}     inputValue={searchText}
            setInputValue={text => setsearchText(text)}
            funcCall={text => funcCall(text)
            }/>
        <RowContainer style={styles.header}>
          <Text style={styles.headerText}>Mockup Tests</Text>
          {/* <TouchableOpacity onPress={() => navigation.navigate('PastExams')}>
            <Text style={styles.headerText}>Past Exams</Text>
          </TouchableOpacity> */}
        </RowContainer>
        {mockTestData.length ? (
          <ShadowContainer>
            <FlatList
              scrollEnabled={false}
              data={mockTestData}
              renderItem={({item}) => (
                <RenderExamsItem
                  item={item}
                  path="TestInstructionScreen"
                  activeOpacity={0.5}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </ShadowContainer>
        ) : (
          <Text style={[styles.headerText,{textAlign:'center',marginTop:30}]}>
            No Data at a Moment
          </Text>
        )}
      </SubContainer>
      {/* <Text>Test screen</Text> */}
      {
      isLoading &&  <Loader />
      }
    </ScrollViewContainer>
  );
};

export default Test;

const styles = StyleSheet.create({
  header: {
    gap: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontFamily: Fonts.MulishBold700,
    color: AppColors.PRIMARY_DARK,
  },
});

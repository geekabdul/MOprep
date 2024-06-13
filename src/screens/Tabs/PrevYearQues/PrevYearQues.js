import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ShadowContainer from '../../../components/common/ShadowContainer/ShadowContainer';
import RenderChapterItem from '../../../components/common/RenderChapterItem/RenderChapterItem';
import SearchBar from '../../../components/common/SearchBar/SearchBar';
import {AppColors} from '../../../constants/colors';
import BackRightIconHeader from '../../../components/common/BackRightIconHeader/BackRightIconHeader';
import SubContainer from '../../../components/common/SubContainer/SubContainer';
import ScrollViewContainer from '../../../components/common/ScrollViewContainer/ScrollViewContainer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, USER_DATA, USER_TOKEN} from '../../../helper/helper';
import axios from 'axios';
import RenderPrevQueItem from '../../../components/common/RenderPrevQueItem/RenderPrevQueItem';
import Loader from '../../../components/Loader/Loader';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Fonts from '../../../assets/fonts';
import BackHeader from '../../../components/common/BackHeader/BackHeader';
import { ScrollView } from 'react-native-gesture-handler';
const chapterData = [
  {
    chapterNo: '01',
    chapterName: '2024',
    chaptertopic: [
      {
        topicNo: '01',
        topicTitle: 'Development Timeline & Gaming',
        totalQues: '15',
      },
      {
        topicNo: '02',
        topicTitle: 'Developmental Period 1, 2 & 3',
        totalQues: '28',
      },
    ],
  },
  {
    chapterNo: '02',
    chapterName: '2023',
    chaptertopic: [
      {
        topicNo: '03',
        topicTitle: 'Epithelial Tissue',
        totalQues: '12',
      },
      {
        topicNo: '04',
        topicTitle: 'Glands',
        totalQues: '3',
      },
      {
        topicNo: '05',
        topicTitle: 'Connective Tissue',
        totalQues: '10',
      },
      {
        topicNo: '06',
        topicTitle: 'Lymphoid Organs & Tissue',
        totalQues: '5',
      },
    ],
  },
  {
    chapterNo: '03',
    chapterName: '2022',
    chaptertopic: [
      {
        topicNo: '07',
        topicTitle: 'Arthology & Osteology',
        totalQues: '12',
      },
      {
        topicNo: '08',
        topicTitle: 'Joints',
        totalQues: '6',
      },
    ],
  },
];
const PrevYearQues = () => {
  const navigation = useNavigation();
  const focus = useIsFocused();
  const [prevquesBank, SetprevquesBank] = useState([]);
  const [searchTopics, SetsearchTopics] = useState([]);

  const [searchText, setsearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    PrevYearQue();
    return () => {
      SetsearchTopics([]);
      setsearchText('');
    };
  }, [focus]);
  const PrevYearQue = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const response = await axios.get(`${BASE_URL}previousYearTopics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response?.data?.error) {
        SetprevquesBank(response?.data?.result);
        setRefreshing(false);
      }
    } catch (err) {
      console.log(err?.response?.data);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    if (searchText.length >= 3) {
      SetsearchTopics([]);
      funcCall();
    } else {
      SetsearchTopics([]);
    }
  }, [searchText]);
  const funcCall = async () => {
    try {
      console.log('texttexttexttext');
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {
        title: searchText,
      };
      const response = await axios.post(
        `${BASE_URL}previousYearSearch`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('responseresponseresponseresponse', response?.data);
      if (!response?.data?.error) {
        SetsearchTopics(response?.data?.result);
      }
    } catch (err) {
      console.log('dndshdhsdhshdhd0000000000', err?.response?.data);
    }
  };
  const handleRefresh = () => {
    setRefreshing(true);
    PrevYearQue();
  };
  return (
    <ScrollViewContainer
      enable={searchTopics.length ? false : true}
      contentContainerStyle={{flexGrow: 1}}

      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={{paddingHorizontal: 20}}>
        <BackRightIconHeader headerTitle={'Previous Year Que.'} />

        <View style={{}}> 
          <SearchBar
            placeholder={'Search for QBank'}
            inputValue={searchText}
            setInputValue={text => setsearchText(text)}
            funcCall={text => funcCall(text)}
          />
          {searchText.length >= 3 ? (
            searchTopics.length ? (
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                // scrollEnabled={true}
                style={{
                  position: 'absolute',
                  width: '100%',
                  top: 72,
                  zIndex: 99999999,
                  flex: 1,
                  height: 200,
                }}>
                <View
                  style={{
                    backgroundColor: AppColors?.PRIMARY_LIGHT2,
                    paddingVertical: 20,
                    borderRadius: 16,
                  }}>
                  {searchTopics.map(item => {
                    return (
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            Keyboard.dismiss();
                            navigation.navigate('TopicPrevQuestionsScreen', {
                              data: item,
                              part_id: item?.part_id,
                            });
                            SetsearchTopics([]);
                            setsearchText('');
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: Fonts.SemiBold600,
                              color: AppColors.PRIMARY_DARK,
                              marginVertical: 3,
                              paddingHorizontal: 10,
                            }}>
                            {item.part_name}
                          </Text>
                        </TouchableOpacity>

                        <View
                          style={{
                            height: 1,
                            width: '100%',
                            backgroundColor: 'lightgrey',
                            marginVertical: 4,
                          }}></View>
                      </>
                    );
                  })}
                </View>
              </ScrollView>
            ) : (
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                style={{
                  position: 'absolute',
                  width: '100%',
                  top: 72,
                  zIndex: 1,
                  flex: 1,
                  height: 200,
                }}>
                <View
                  style={{
                    backgroundColor: AppColors?.PRIMARY_LIGHT2,
                    paddingVertical: 20,
                    borderRadius: 16,
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.SemiBold600,
                      color: AppColors.PRIMARY_DARK,
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                    No Result Found
                  </Text>
                </View>
              </ScrollView>
            )
          ) : null}
        </View>
        {prevquesBank.length ? (
          <ShadowContainer style={{paddingVertical: 20}}>
            <FlatList
              scrollEnabled={false}
              data={prevquesBank}
              renderItem={({item}) => <RenderPrevQueItem item={item} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </ShadowContainer>
        ) : (
          <Loader />
        )}
      </View>
    </ScrollViewContainer>
  );
};

export default PrevYearQues;

const styles = StyleSheet.create({});

import {
  FlatList,
  Image,
  Keyboard,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScrollViewContainer from '../../../components/common/ScrollViewContainer/ScrollViewContainer';
import BackHeader from '../../../components/common/BackHeader/BackHeader';
import SearchBar from '../../../components/common/SearchBar/SearchBar';
import Fonts from '../../../assets/fonts';
import {AppColors} from '../../../constants/colors';
import {AppImages} from '../../../assets/images';
import RowContainer from '../../../components/common/RowContainer/RowContainer';
import ItemShadowContainer from '../../../components/common/ItemShadowContainer/ItemShadowContainer';
import * as Progress from 'react-native-progress';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, USER_DATA, USER_TOKEN} from '../../../helper/helper';
import axios from 'axios';
import Loader from '../../../components/Loader/Loader';

const RenderSubjectItem = ({item}) => {
  const navigation = useNavigation();

  return (
    <ItemShadowContainer
      style={{marginHorizontal: 3, marginBottom: 10, paddingHorizontal: 0}}
      onPress={async() => 
        {
          await AsyncStorage.setItem('storeData',JSON.stringify(item))
          navigation.navigate('ChapterScreen', {data: item})}
        }
      activeOpacity={0.6}>
      <RowContainer style={{}}>
        <Image
          source={{uri: item.image}}
          style={{
            width: 94,
            height: 93,
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
          }}
          resizeMode="contain"
        />
        <View style={{marginLeft: 20, width: '100%'}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.SemiBold600,
              color: AppColors.PRIMARY_DARK,
              marginVertical: 3,
            }}>
            {item.name}
          </Text>

          <Progress.Bar
            progress={1 - item.left_questions / item.total_questions}
            width={200}
            color={item.barColor}
            borderColor={AppColors.BORDER_LINE}
            unfilledColor={AppColors.PRIMARY_LIGHT}
          />
          <Text
            style={{
              fontFamily: Fonts.MulishExtraBold800,
              fontSize: 11,
              color: AppColors.PRIMARY_DARK,
              marginVertical: 5,
            }}>
            {item.completed_questions}/{item.total_questions} completed Question
          </Text>
        </View>
      </RowContainer>
    </ItemShadowContainer>
  );
};
const QBank = () => {
  const navigation = useNavigation();
  const focus = useIsFocused();
  const [quesBank, SetquesBank] = useState([]);
  const [searchTopics, SetsearchTopics] = useState([]);
  const [searchText, setsearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    QuesBankFunc();
    return () => {
      SetsearchTopics([]);
      setsearchText('');
    };
  }, [focus]);
  const QuesBankFunc = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const response = await axios.get(`${BASE_URL}questionBank`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response?.data?.error) {
        SetquesBank(response?.data?.result);
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
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {
        title: searchText,
      };
      const response = await axios.post(
        `${BASE_URL}questionBankSearch`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response?.data?.error) {
        SetsearchTopics(response?.data?.result);
      }
    } catch (err) {
      console.log('err-', err?.response?.data);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    QuesBankFunc();
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
        <BackHeader />
        <View style={{}}>
          <SearchBar
            placeholder={'Search for Subjects'}
            inputValue={searchText}
            setInputValue={text => setsearchText(text)}
            funcCall={text => funcCall(text)
            }
          />
          {searchText.length >= 3 ? (
            searchTopics.length ? (
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
                  {searchTopics.map(item => {
                    return (
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            Keyboard.dismiss();
                            navigation.navigate('TopicQuestionsScreen', {
                              chapterData: item,
                              subject_id: item.subject_id,
                              chapter_id: item?.chapter_id,
                              topic_id: item?.topic_id,
                              data:item
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
                            {item.topic_name}
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

        <Text
          style={{
            marginTop: 20,
            fontSize: 21,
            fontFamily: Fonts.SemiBold600,
            color: AppColors.PRIMARY_DARK,
          }}>
          Subjects
        </Text>
        {quesBank.length ? (
          <View>
            <FlatList
              scrollEnabled={false}
              data={quesBank}
              renderItem={({item}) => <RenderSubjectItem item={item} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : (
          <Loader />
        )}
      </View>
    </ScrollViewContainer>
  );
};

export default QBank;

const styles = StyleSheet.create({});

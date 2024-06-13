import {
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Keyboard,
  Share,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScrollViewContainer from '../../components/common/ScrollViewContainer/ScrollViewContainer';
import BackRightIconHeader from '../../components/common/BackRightIconHeader/BackRightIconHeader';
import {useRoute, useNavigation, useIsFocused} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AppColors} from '../../constants/colors';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import ShadowContainer from '../../components/common/ShadowContainer/ShadowContainer';
import RenderChapterItem from '../../components/common/RenderChapterItem/RenderChapterItem';
import SubContainer from '../../components/common/SubContainer/SubContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, USER_DATA, USER_TOKEN} from '../../helper/helper';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import Fonts from '../../assets/fonts';

const ChapterScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const focus = useIsFocused();
  const prevdata = route.params?.data;
  const [chapterData, SetchapterData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setsearchText] = useState('');
  const [searchTopics, SetsearchTopics] = useState([]);
  const [data, setAsyncData] = useState(prevdata);

  useEffect(() => {
    const getDataAsyncData = async () => {
      let data = await AsyncStorage.getItem('storeData')
      let parseData = JSON.parse(data)
      setAsyncData(parseData)
    };
    getDataAsyncData()
  }, [prevdata]);

  useEffect(() => {
    if (searchText.length >= 3) {
      SetsearchTopics([]);
      funcCall();
    } else {
      SetsearchTopics([]);
    }
  }, [searchText]);
  useEffect(() => {
    chapterDataFunc();
  }, [focus]);
  const chapterDataFunc = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {
        subject_id: data?.id || data?.subject_id,
      };
      const response = await axios.post(
        `${BASE_URL}chapterQuestionBank`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response?.data?.error) {
        SetchapterData(response?.data?.result);
        setRefreshing(false);
      }
    } catch (err) {
      console.log(err?.response?.data);
      setRefreshing(false);
    }
  };
  const handleRefresh = () => {
    setRefreshing(true);
    chapterDataFunc();
  };
  const funcCall = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {
        title: searchText,
        subject_id: data?.id || data?.subject_id,
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
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'App link',
        message:
          'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
        url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <ScrollViewContainer
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
      <SubContainer>
        <BackRightIconHeader
          headerTitle={data?.name}
          rightIcon={
            <TouchableOpacity
              onPress={() => {
                onShare();
              }}>
              <MaterialIcons name="share" size={22} color={AppColors.GREY} />
            </TouchableOpacity>
          }
        />
        <View>
          <SearchBar
            placeholder={'Search for Questions & Topics'}
            inputValue={searchText}
            setInputValue={text => setsearchText(text)}
            funcCall={text => funcCall(text)}
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
                              data: item,
                              subject_id: item.subject_id,
                              chapter_id: item?.chapter_id,
                              topic_id: item?.topic_id,
                              chapterData: data,
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

        {chapterData.length ? (
          <ShadowContainer style={{paddingVertical: 20}}>
            <FlatList
              scrollEnabled={false}
              data={chapterData}
              renderItem={({item}) => (
                <RenderChapterItem item={item} subject_id={data?.id} />
              )}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={<Loader />}
            />
          </ShadowContainer>
        ) : (
          <Loader />
        )}
      </SubContainer>
    </ScrollViewContainer>
  );
};

export default ChapterScreen;

const styles = StyleSheet.create({});

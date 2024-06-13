import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Fonts from '../../../assets/fonts';
import {AppColors} from '../../../constants/colors';
import ShadowContainer from '../../../components/common/ShadowContainer/ShadowContainer';
import {AppImages} from '../../../assets/images';
import RowContainer from '../../../components/common/RowContainer/RowContainer';
import ItemShadowContainer from '../../../components/common/ItemShadowContainer/ItemShadowContainer';
import ScrollViewContainer from '../../../components/common/ScrollViewContainer/ScrollViewContainer';
import {SliderBox} from 'react-native-image-slider-box';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as Progress from 'react-native-progress';
import SubContainer from '../../../components/common/SubContainer/SubContainer';
import {BASE_URL, USER_DATA, USER_TOKEN} from '../../../helper/helper';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const renderUnCompleteItem = (item, navigation) => (
  <ItemShadowContainer
    style={{marginHorizontal: 3, marginBottom: 10}}
    activeOpacity={0.6}
    onPress={() => {
      navigation.navigate('ChapterScreen', {data: item});
    }}>
    <RowContainer
      style={{
        marginVertical: 10,
      }}>
      <Image source={{uri: item.image}} style={{height: 50, width: 50}} />
      <View style={{marginLeft: 20}}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Fonts.SemiBold600,
            color: AppColors.PRIMARY_DARK,
          }}>
          {item.name}
        </Text>
        <RowContainer style={{marginTop: 10}}>
          <Progress.Bar
            progress={1 - item.left_questions / item.total_questions}
            width={85}
            color={AppColors.BAR_COLOR}
            borderColor={AppColors.BORDER_LINE}
          />
          <Text
            style={{
              marginLeft: 10,
              fontFamily: Fonts.MulishExtraBold800,
              fontSize: 11,
              color: AppColors.PRIMARY_DARK,
            }}>
            {item.left_questions} Ques Left
          </Text>
        </RowContainer>
      </View>
    </RowContainer>
  </ItemShadowContainer>
);

const renderUpcomingItem = ({item}) => (
  <RowContainer
    style={{
      borderBottomWidth: 1,
      borderBottomColor: AppColors.BORDER_LINE,
      padding: 20,
    }}>
    <ImageBackground
      source={AppImages.OVAL}
      style={{
        height: 46,
        width: 46,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{fontFamily: Fonts.SemiBold600, color: AppColors.PRIMARY_DARK}}>
        0{item.id}
      </Text>
    </ImageBackground>
    <View style={{marginLeft: 10}}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: Fonts.SemiBold600,
          color: AppColors.PRIMARY_DARK,
        }}>
        {item.name}
      </Text>
      <Text
        style={{
          fontSize: 13,
          fontFamily: Fonts.MulishBold700,
          color: AppColors.GREY,
        }}>{`Live on ${item?.live_on} | ${item.duration} mins`}</Text>
    </View>
  </RowContainer>
);

// const bannerImages = [
//   AppImages.HOME_BANNER1,
//   AppImages.HOME_BANNER1,
//   AppImages.HOME_BANNER1,
// ];
const ScreenWidth = Dimensions.get('screen').width;

const Home = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState();
  const [BannerData, setBannerData] = useState([]);
  const [bannerImages, setBannerImages] = useState([]);
  const [uncompleteData, setuncompleteData] = useState([]);
  const [upcomingMockTests, setupcomingMockTests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getUserDetails();
    getBannerData();
    getUncompltedQuestion();
    getupcomingmockTest();
  }, []);
  const getUserDetails = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const response = await axios.get(`${BASE_URL}userProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('ProfileDetailsProfileDetailsProfileDetails', response?.data);
      if (!response?.data?.error) {
        setUserDetails(response?.data?.result);
      }
    } catch (err) {
      // showToast(err?.response?.data?.message)
      setRefreshing(false);
    }
  };
  const getBannerData = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const response = await axios.get(`${BASE_URL}bannerList`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response?.data?.error) {
        const imageUrls = response.data?.result?.map(item => item.image);
        console.log('imageUrlsimageUrls', response.data?.result);
        setBannerData(response.data?.result);
        setBannerImages(imageUrls);
      }
    } catch (err) {
      console.log(err?.response?.data);
    }
  };
  const getUncompltedQuestion = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const response = await axios.get(`${BASE_URL}uncompletedQuestionBank`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response?.data?.error) {
        setuncompleteData(response?.data?.result);
        // console.log(
        //   'response?.data?.resultresponse?.data?.resultresponse?.data?.result',
        //   response?.data?.result,
        // );
      }
    } catch (err) {
      console.log(err?.response?.data);
    }
  };
  const getupcomingmockTest = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      console.log("tokentokentokentoken",token)
      const response = await axios.get(`${BASE_URL}upcomingMockTests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response?.data?.error) {
        setupcomingMockTests(response?.data?.result);
        setRefreshing(false);
      }
    } catch (err) {
      console.log(err?.response?.data);
      setRefreshing(false);
    }
  };
  const onImagePressed = index => {
    const redirectToData = BannerData[index].redirect_to;
    console.log('Redirect to data:', redirectToData);
    if (redirectToData == 1) {
      navigation.navigate('QBankScreen');
    } else if (redirectToData == 2) {
      navigation.navigate('PrevYearQuestionScreen');
    } else if (redirectToData == 3) {
      navigation.navigate('TestScreen');
    } else if (redirectToData == 4) {
      navigation.navigate('SubscriptionScreen');
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getUserDetails();
    getBannerData();
    getUncompltedQuestion();
    getupcomingmockTest();
  };
  return (
    <ScrollViewContainer
      style={{paddingHorizontal: 0}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
      <SubContainer style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <View style={{marginVertical: 20}}>
          <Text
            style={{
              marginVertical: 5,
              fontSize: 24,
              fontFamily: Fonts.SemiBold600,
              color: AppColors.PRIMARY_DARK,
            }}>
            Hi, {userDetails?.name}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: Fonts.MulishBold700,
              color: AppColors.GREY,
            }}>
            What Would you like to learn Today?{' '}
          </Text>
        </View>
        <TouchableOpacity
        activeOpacity={0.8}
          onPress={()=>{
        navigation.navigate('BookmarkScreen')
          }}
          >
            <Ionicons
              name="bookmark-sharp"
              size={25}
              color={AppColors.PRIMARY}
            />
          </TouchableOpacity>
      </SubContainer>

      {/* <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 20}}>
        <RowContainer style={{gap: 20}}>
          {[
            AppImages.HOME_BANNER1,
            AppImages.HOME_BANNER1,
            AppImages.HOME_BANNER1,
          ].map(banner => (
            <View>
              <Image source={banner} />
            </View>
          ))}
        </RowContainer>
      </ScrollView> */}

      <SliderBox
        autoplay
        circleLoop
        images={bannerImages}
        ImageComponentStyle={{width: ScreenWidth / 1.1}}
        resizeMode={'contain'}
        onCurrentImagePressed={onImagePressed}
        dotStyle={{
          width: 0,
          height: 0,
          borderRadius: 0,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
        }}
      />

      <SubContainer>
        <ShadowContainer style={{paddingVertical: 10, paddingHorizontal: 20}}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: Fonts.SemiBold600,
              color: AppColors.PRIMARY_DARK,
              marginVertical: 20,
            }}>
            Uncompleted question banks
          </Text>

          <FlatList
            scrollEnabled={false}
            data={uncompleteData}
            renderItem={({item}) => renderUnCompleteItem(item, navigation)}
            keyExtractor={(item, index) => index.toString()}
          />
        </ShadowContainer>

        <ShadowContainer style={{paddingVertical: 10}}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: Fonts.SemiBold600,
              color: AppColors.PRIMARY_DARK,
              marginVertical: 20,
              paddingHorizontal: 20,
            }}>
            Upcoming mock tests
          </Text>

          <FlatList
            scrollEnabled={false}
            data={upcomingMockTests}
            renderItem={renderUpcomingItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: Fonts.SemiBold600,
                    color: AppColors.PRIMARY_DARK,
                  }}>
                  No Data at a Moment{' '}
                </Text>
              </View>
            }
          />
        </ShadowContainer>
      </SubContainer>
    </ScrollViewContainer>
  );
};

export default Home;

const styles = StyleSheet.create({});

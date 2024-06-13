import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackHeader from '../../components/common/BackHeader/BackHeader';
import SubContainer from '../../components/common/SubContainer/SubContainer';
import ScrollViewContainer from '../../components/common/ScrollViewContainer/ScrollViewContainer';
import Fonts from '../../assets/fonts';
import {AppColors} from '../../constants/colors';
import PrimaryLinearGradient from '../../components/PrimaryLinearGradient/PrimaryLinearGradient';
import RowContainer from '../../components/common/RowContainer/RowContainer';
import {AppImages} from '../../assets/images';
import PrimaryButton from '../../components/common/PrimaryButton/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, USER_TOKEN} from '../../helper/helper';
import axios from 'axios';
import RenderHTML from 'react-native-render-html';
const tagStyle = {
  li: {
    padding: 0,
    marginTop: 0,
    marginLeft: 10,
    color: AppColors.WHITE,
    fontSize: 20,
    fontFamily: Fonts.Medium500,
  },
  ul: {
    padding: 0,
    marginTop: 0,
    fontSize: 20,
    marginLeft: 5,
    fontFamily: Fonts.MulishSemiBold600,
    color: AppColors.WHITE,
  },
  p:{
    padding: 0,
    marginTop: 0,
    fontSize: 20,
    marginLeft: 5,
    fontFamily: Fonts.MulishSemiBold600,
    color: AppColors.WHITE,
  }
};
// const plansData = [
//   {
//     title: 'Economy plan',
//     planBenefit: [
//       '1 month Subscription: ₹299',
//       'Access to all premium features for 1 month.',
//       'Get access subject and year wise questions.',
//     ],
//     price: '299/month',
//   },
//   {
//     title: 'Value plan',
//     planBenefit: [
//       '3 month Subscription: ₹699',
//       'Save 198 compared to the monthly plan.',
//       'Access to all premium features for 3 months.',
//       'Get access subject and year wise questions.',
//     ],
//     price: '699/month',
//   },
//   {
//     title: 'Saver plan',
//     planBenefit: [
//       '3 month Subscription: ₹699',
//       'Save 198 compared to the monthly plan.',
//       'Access to all premium features for 3 months.',
//       'Get access subject and year wise questions.',
//     ],
//     price: '999/month',
//   },
// ];

const screenHeight = Dimensions.get('screen').height;

const SubscriptionScreen = () => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();

  const [plansData, setplansData] = useState([]);

  useEffect(() => {
    SubscriptionData();
  }, []);
  const SubscriptionData = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const response = await axios.get(`${BASE_URL}subscriptionPlansList`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response?.data?.error) {
        setplansData(response?.data?.result);
      }
    } catch (err) {
      console.log(err?.response?.data);
    }
  };
  return (
    <ScrollViewContainer contentContainerStyle={{flexGrow: 1}}>
      <SubContainer style={{flex: 0}}>
        <BackHeader />
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 48,
            fontFamily: Fonts.MulishExtraBold800,
            color: AppColors.PRIMARY_DARK,
          }}>
          Basic
        </Text>
      </SubContainer>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 40,
          paddingHorizontal: 20,
          paddingBottom: 70,
        }}>
        <RowContainer style={{gap: 10}}>
          {plansData?.map((plan, id) => (
            <PrimaryLinearGradient key={id} customContainerStyle={{flex: 1,overflow:'visible'}}>
              <Text
                style={{
                  marginVertical: 10,
                  color: AppColors.WHITE,
                  fontSize: 32,
                  fontFamily: Fonts.Medium500,
                }}>
                {plan.name}
              </Text>

              <View style={{flex: 1, justifyContent: 'space-between'}}>
                <View>
                  <RenderHTML
                    contentWidth={width}
                    source={{html: plan.description}}
                    tagsStyles={tagStyle}
                  />
                  {/* // <RowContainer
                    //   key={i}
                    //   style={{
                    //     gap: 10,
                    //     marginVertical: 8,
                    //     alignItems: 'flex-start',
                    //   }}>
                    //   <Image source={AppImages.CHECKMARK_SQUARE} />
                    //   <Text
                    //     style={{
                    //       flex: 1,
                    //       fontSize: 16,
                    //       fontFamily: Fonts.Medium500,
                    //       color: AppColors.WHITE,
                    //     }}>
                    //     {benefit}
                    //   </Text>
                    // </RowContainer> */}
                </View>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: 1,
                      backgroundColor: AppColors.WHITE,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: Fonts.Medium500,
                      fontSize: 20,
                      color: AppColors.WHITE,
                      marginVertical: 30,
                    }}>
                    {plan.price}/month
                  </Text>
                </View>
              </View>

              <PrimaryButton
                title={'BUY NOW'}
                customContainerStyle={{
                  position: 'absolute',
                  bottom: -35,
                  alignSelf: 'center',
                  elevation: 5,
                  shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
                }}
                isOpposite={true}
                onPress={() => navigation.navigate('PlanScreen', {data: plan})}
              />

              {/* <View style={{backgroundColor:'green',bottom:-10, overflow:'visible',position:'absolute',}}> 
                <Text>dkfjsdlf</Text>
              </View> */}
            </PrimaryLinearGradient>
          ))}
        </RowContainer>
      </ScrollView>
    </ScrollViewContainer>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({});

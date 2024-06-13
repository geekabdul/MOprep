import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import MainContainer from '../../components/common/MainContainer/MainContainer';
import {useRoute} from '@react-navigation/native';
import {AppColors} from '../../constants/colors';
import Fonts from '../../assets/fonts';
import ShadowContainer from '../../components/common/ShadowContainer/ShadowContainer';
import SubContainer from '../../components/common/SubContainer/SubContainer';
import {AppImages} from '../../assets/images';
import RowContainer from '../../components/common/RowContainer/RowContainer';
import PrimaryButton from '../../components/common/PrimaryButton/PrimaryButton';
import ScrollViewContainer from '../../components/common/ScrollViewContainer/ScrollViewContainer';
import RenderHTML from 'react-native-render-html';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BASE_URL,
  RAZORPAY_TEST,
  USER_DATA,
  USER_TOKEN,
  showToast,
} from '../../helper/helper';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
const tagStyle = {
  li: {
    padding: 0,
    marginTop: 0,
    marginLeft: 10,
    color: AppColors.BLACK,
    fontSize: 20,
    fontFamily: Fonts.Medium500,
  },
  ul: {
    padding: 0,
    marginTop: 0,
    fontSize: 20,
    marginLeft: 5,
    fontFamily: Fonts.MulishSemiBold600,
    color: AppColors.BLACK,
  },
  p: {
    padding: 0,
    marginTop: 0,
    fontSize: 20,
    marginLeft: 5,
    fontFamily: Fonts.MulishSemiBold600,
    color: AppColors.BLACK,
  },
};

const PlanScreen = () => {
  const route = useRoute();
  const {width} = useWindowDimensions();

  const {data} = route.params;
  console.log(data);
  const dataArray = [
    {title: 'Plan', value: data?.name},
    {title: 'Subtotal', value: `₹${data?.price}`},
    {title: 'Discount', value: 'NA'},
    {title: 'Final price', value: `₹${data?.price}`},
  ];
  // const BuySub = async () => {
  //   try {
  //     const params = {
  //       subscription_id: data?.id,
  //     };
  //     // console.log("paramsss",params)
  //     const token = await AsyncStorage.getItem(USER_TOKEN);
  //     const response = await axios.post(
  //       `${BASE_URL}subscriptionPlansDetail`,
  //       params,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //     // console.log(response?.data,'check')
  //     if (!response?.data?.error) {
  //       // postSubscription();
  //       // showToast('Subscription Purchase Successfully')
  //     }
  //   } catch (err) {
  //     console.log(err?.response?.data);
  //     showToast(err?.response?.data?.message);
  //   }
  // };

  const postSubscription = async () => {
    try {
      const params = {
        subscription_id: data?.id,
      };
      console.log('paramsss>>>', params);
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const response = await axios.post(
        `${BASE_URL}requestPackageSubscriptionRazor`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(
        response?.data,
        'requestPackageSubscriptionRazorrequestPackageSubscriptionRazor',
      );
      razorpay(response?.data?.data);
      // if (!response?.data?.error) {

      //   showToast('Subscription Purchase Successfully')

      // }
    } catch (err) {
      console.log(err?.response?.data);
      showToast(err?.response?.data?.message);
    }
  };

  const razorpay = async param => {
    const userData = await AsyncStorage.getItem(USER_DATA);
    const parseData = JSON.parse(userData);
    console.log(parseData, 'jjjjjj');

    console.log('razorpayparam-------------------', param);
    var options = {
      description: 'Credits towards consultation',
      image: AppImages.LOGO,
      currency: 'INR',
      key: RAZORPAY_TEST, // Your api key
      amount: param?.amount,
      order_id: param?.id,
      name: 'MOprep',
      prefill: {
        email: parseData.email,
        contact: parseData.whatsapp_number,
        name: parseData.name,
      },
      theme: {color: AppColors.PRIMARY},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        console.log(data, 'dataaaaaaaaa>>>');
        postResponseRazor(data);

        // alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        console.log(JSON.stringify(error), 'razorpayerror>--------------------9999>>');
        postResponseRazor(error?.details?.metadata);

      // showToast(error?.description);

        // alert(`Error: ${error.code} | ${error.description}`);
      });
    console.log('end000000-------------------', param?.data);
  };

  const postResponseRazor = async param => {
    try {
      const params = {
        razorpay_payment_id: param.razorpay_payment_id || param?.payment_id ,
        razorpay_order_id: param.razorpay_order_id || param?.order_id,
        razorpay_signature: param.razorpay_signature || '',
      };
      console.log('paramsss>>>', params);
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const response = await axios.post(
        `${BASE_URL}responsePackageSubscriptionRazor`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(
        response?.data,
        'responsePackageSubscriptionRazor>>>>>>',
      );
      showToast(response?.data?.message);
    } catch (err) {
      console.log(err?.response?.data,'hshehdhhhd');
      showToast(err?.response?.data?.message);
    }
  };
  return (
    <ScrollViewContainer
      contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}>
      <SubContainer>
        <Text
          style={{
            alignSelf: 'center',
            marginVertical: 40,
            color: AppColors.PRIMARY_DARK,
            fontSize: 28,
            fontFamily: Fonts.MulishBold700,
          }}>
          {data.name}
        </Text>

        <ShadowContainer style={{padding: 30}}>
          <Text
            style={{
              color: AppColors.GREY,
              fontSize: 16,
              fontFamily: Fonts.MulishExtraBold800,
            }}>
            Benifits:
          </Text>

          <View style={{marginVertical: 20}}>
            <RenderHTML
              contentWidth={width}
              source={{html: data.description}}
              tagsStyles={tagStyle}
            />
            {/* {data.planBenefit.map((benefit, i) => (
              <RowContainer
                key={i}
                style={{
                  gap: 10,
                  marginVertical: 8,
                  alignItems: 'flex-start',
                }}>
                <Image source={AppImages.CHECKMARK_SQUARE} />
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontFamily: Fonts.Medium500,
                    color: AppColors.PRIMARY_DARK,
                  }}>
                  {benefit}
                </Text>
              </RowContainer>
            ))} */}
          </View>
        </ShadowContainer>

        <ShadowContainer style={{padding: 20}}>
          <Text
            style={{
              color: AppColors.PRIMARY_DARK,
              fontSize: 20,
              fontFamily: Fonts.MulishExtraBold800,
            }}>
            Purchase Summary
          </Text>

          <View style={{marginVertical: 30}}>
            {dataArray.map((item, index) => (
              <RowContainer
                key={index}
                style={{
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Text style={{fontSize: 20, fontFamily: 'Mulish-Medium'}}>
                  {item.title}
                </Text>
                <Text style={{fontSize: 20, fontFamily: 'Mulish-Medium'}}>
                  {item.value}
                </Text>
              </RowContainer>
            ))}
          </View>

          <PrimaryButton
            title={'BUY NOW'}
            customContainerStyle={{
              position: 'absolute',
              bottom: -30,
              alignSelf: 'center',
              width: '90%',
            }}
            onPress={() => postSubscription()}
          />
        </ShadowContainer>
      </SubContainer>
    </ScrollViewContainer>
  );
};

export default PlanScreen;

const styles = StyleSheet.create({});

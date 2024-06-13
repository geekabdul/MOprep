import {
  Button,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScrollViewContainer from '../../../components/common/ScrollViewContainer/ScrollViewContainer';
import BackHeader from '../../../components/common/BackHeader/BackHeader';
import SubContainer from '../../../components/common/SubContainer/SubContainer';
import ShadowContainer from '../../../components/common/ShadowContainer/ShadowContainer';
import Fonts from '../../../assets/fonts';
import {AppColors} from '../../../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import RowContainer from '../../../components/common/RowContainer/RowContainer';
import {AppImages} from '../../../assets/images';
import CompletedItem from '../../../components/common/CompletedItem/CompletedItem';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BASE_URL,
  USER_DATA,
  USER_TOKEN,
  showToast,
} from '../../../helper/helper';
import axios from 'axios';
import {CommonActions} from '@react-navigation/native';
import PrimaryButton from '../../../components/common/PrimaryButton/PrimaryButton';
const profileItemsList = [
  {title: 'Edit Profile', iconName: 'user', path: 'EditProfileScreen'},
  {title: 'Notifications', iconName: 'bell', path: 'NotificationScreen'},
  {title: 'Bookmark', iconName: 'bookmark', path: 'BookmarkScreen'},
  {title: 'Subscription', iconName: 'mail', path: 'SubscriptionScreen'},
  {title: 'Transaction', iconName: 'wallet', path: ''},
  {title: 'Contact Us', iconName: 'phone-call', path: 'ContactUsScreen'},
  {title: 'T&C,Refund and Privacy policy', iconName: 'file-text', path: 'Privacy'},
  {title: 'Reset Account', iconName: 'trash', path: ''},
  {title: 'Logout', iconName: 'logout', path: ''},
];
const completeQuestionBankData = [
  {
    img: AppImages.PSM,
    title: 'PSM',
    numberOfQues: '45',
  },
  {
    img: AppImages.PEDIATRICS_CIRCLE,
    title: 'Pediatrics',
    numberOfQues: '35',
  },
];

const completedMockTestData = [
  {title: 'Correct', count: '8'},
  {title: 'Incorrect', count: '5'},
  {title: 'Unattempt', count: '2'},
];
const Profile = () => {
  const navigation = useNavigation();
  const focus = useIsFocused();
  const [profileData, setprofileData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  useEffect(() => {
    ProfileDetails();
  }, [focus]);
  const ProfileDetails = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const response = await axios.get(`${BASE_URL}userProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('ProfileDetailsProfileDetailsProfileDetails', response?.data);
      if (!response?.data?.error) {
        setprofileData(response?.data?.result);
        setRefreshing(false);
      }
    } catch (err) {
      // showToast(err?.response?.data?.message)
      setRefreshing(false);
    }
  };

  const DeleteAccount = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const response = await axios.post(`${BASE_URL}deleteAccount`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('DeleteAccountDeleteAccountDeleteAccount', response?.data);
      if (!response?.data?.error) {
        setModalVisible2(false)
        await AsyncStorage.removeItem(USER_TOKEN);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}],
          }),
        );
      }
    } catch (err) {
      // showToast(err?.response?.data?.message)
      console.log("errerrerrerrerrerrerrerrerrerr-----",err?.response?.data)
      setRefreshing(false);
      setModalVisible2(false)

    }
  };
  const handleRefresh = () => {
    setRefreshing(true);
    ProfileDetails();
  };
  return (
    <ScrollViewContainer
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
      <SubContainer>
        <BackHeader headerTitle={'Profile'} />
        <ShadowContainer
          style={{paddingVertical: 20, paddingHorizontal: 30, marginTop: 25}}>
          <View
            style={{
              borderColor: AppColors.DARK_GREEN,
              alignSelf: 'center',
              borderRadius: 999,
              position: 'absolute',
              top: -50,
            }}>
            <Image
              source={{uri: profileData?.avatar}}
              style={{
                height: 101,
                width: 101,
                borderWidth: 3,
                borderColor: AppColors.DARK_GREEN,
                borderRadius: 999,
              }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{alignItems: 'center', marginVertical: 20, marginTop: 50}}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: Fonts.SemiBold600,
                color: AppColors.PRIMARY_DARK,
              }}>
              {profileData?.name}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: Fonts.MulishBold700,
                color: AppColors.GREY,
              }}>
              {profileData?.email}
            </Text>
          </View>
          <View style={{marginVertical: 10}}>
            {profileItemsList?.map((list, i) => (
              <TouchableOpacity
                onPress={async () => {
                  if (list.path == 'EditProfileScreen') {
                    navigation.navigate(list.path, {
                      profileData: profileData,
                    });
                  } else if (list.title == 'Logout') {
                    await AsyncStorage.removeItem(USER_TOKEN);
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{name: 'LoginScreen'}],
                      }),
                    );
                  } else if (
                    list.title == 'Transaction' 
                  ) {
                    showToast('This feature will be available soon');
                  } else if (list.title == 'Reset Account') {
                    setModalVisible2(true);
                  } else {
                    navigation.navigate(list.path);
                  }
                }}
                key={i}>
                <RowContainer
                  style={{justifyContent: 'space-between', marginVertical: 10}}>
                  <RowContainer style={{gap: 10}}>
                    {list.title === 'Transaction' || list.title === 'Logout' ? (
                      <AntDesign
                        name={list.iconName}
                        size={20}
                        color={AppColors.PRIMARY_DARK}
                      />
                    ) : (
                      <Feather
                        name={list.iconName}
                        size={20}
                        color={AppColors.PRIMARY_DARK}
                      />
                    )}
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: Fonts.MulishBold700,
                        color: AppColors.PRIMARY_DARK,
                      }}>
                      {list.title}
                    </Text>
                  </RowContainer>
                  <Entypo
                    name={'chevron-right'}
                    size={20}
                    color={AppColors.PRIMARY_DARK}
                  />
                </RowContainer>
              </TouchableOpacity>
            ))}
          </View>
        </ShadowContainer>
        {/* <ShadowContainer style={{paddingVertical: 20, paddingHorizontal: 30}}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: Fonts.MulishSemiBold600,
              color: AppColors.PRIMARY_DARK,
              marginVertical: 10,
            }}>
            Completed QBanks
          </Text>
          {completeQuestionBankData?.map((complete, i) => (
            <CompletedItem item={complete} key={i} />
          ))}
        </ShadowContainer>
        <ShadowContainer style={{paddingVertical: 20, paddingHorizontal: 30}}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: Fonts.MulishSemiBold600,
              color: AppColors.PRIMARY_DARK,
              marginVertical: 10,
            }}>
            Completed Mockup Tests
          </Text>
          <View
            style={{
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: Fonts.SemiBold600,
                color: AppColors.PRIMARY_DARK,
              }}>
              1
            </Text>
            <RowContainer style={{gap: 5}}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.MulishBold700,
                  color: AppColors.PLACEHOLDER_TEXT,
                }}>
                Test completed
              </Text>
              <Image source={AppImages.CHECKMARK} />
            </RowContainer>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: AppColors.BORDER_LINE,
              borderRadius: 7,
              padding: 10,
            }}>
            <RowContainer style={{gap: 10}}>
              <Image source={AppImages.TWO_SHEET_PAPER} />
              <View>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: Fonts.MulishBold700,
                    color: AppColors.PLACEHOLDER_TEXT,
                  }}>
                  Questions attempted
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.SemiBold600,
                    color: AppColors.PRIMARY_DARK,
                  }}>
                  15
                </Text>
              </View>
            </RowContainer>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: AppColors.BORDER_LINE,
                marginVertical: 10,
              }}
            />
            <RowContainer style={{justifyContent: 'space-between'}}>
              {completedMockTestData?.map((complete, id) => (
                <>
                  <View key={id} style={{alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: Fonts.MulishBold700,
                        color: AppColors.PLACEHOLDER_TEXT,
                      }}>
                      {complete.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: Fonts.SemiBold600,
                        color: AppColors.PRIMARY_DARK,
                      }}>
                      {complete.count}
                    </Text>
                  </View>
                  {id < completedMockTestData.length - 1 && (
                    <View
                      style={{
                        height: '100%',
                        width: 1,
                        backgroundColor: AppColors.BORDER_LINE,
                      }}
                    />
                  )}
                </>
              ))}
            </RowContainer>
          </View>
        </ShadowContainer> */}
      </SubContainer>
      {/* <Text style={{color: 'black'}}>userProfile</Text>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '50%',
          alignSelf: 'center',
          marginTop: 40,
        }}>
        <PrimaryButton
          title={'LogOut'}
          customContainerStyle={{marginTop: 0}}
          onPress={async () => {
            console.log('khrkkhdevdk7wg');
            await AsyncStorage.removeItem(USER_TOKEN);
            navigation.navigate('LoginScreen');
          }}
        />
      </View> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          <View
            style={{
              // margin: 20,
              backgroundColor: 'white',
              borderRadius: 18,
              // height: '60%',
              width: '90%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            {/* <MainContainer> */}
            <View
              style={{
                alignItems: 'center',
                marginVertical: 30,
                marginHorizontal: 15,
              }}>
              {/* <TouchableOpacity onPress={() => setModalVisible2(false)}>
                    <Ionicons
                      name="close"
                      size={30}
                      color={AppColors.PRIMARY_DARK}
                    />
                  </TouchableOpacity> */}
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: Fonts.SemiBold600,
                  marginVertical: 4,
                  color: AppColors.PRIMARY_DARK,
                  lineHeight: 24,
                  textAlign: 'center',
                }}>
                Are you sure you want to reset your account? This action is
                irreversible, and all your data will be permanently deleted.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 30,
                marginBottom: 20,
              }}>
              <PrimaryButton
                title={'Cancel'}
                iconPosition="not"
                customContainerStyle={{
                  // position: 'absolute',
                  // bottom: 20,
                  // right: 20,
                  width: '40%',
                }}
                circleHeight={28}
                circleWidth={28}
                iconSize={20}
                onPress={async () => {
                  setModalVisible2(false);
                }}
              />
              <PrimaryButton
                title={'Quit'}
                iconPosition="not"
                customContainerStyle={{
                  // position: 'absolute',
                  // bottom: 20,
                  // right: 20,
                  width: '40%',
                }}
                circleHeight={28}
                circleWidth={28}
                iconSize={20}
                onPress={async () => {
                  DeleteAccount()
                }}
              />
            </View>
            {/* </MainContainer> */}
          </View>
        </View>
      </Modal>
    </ScrollViewContainer>
  );
};

export default Profile;

const styles = StyleSheet.create({});

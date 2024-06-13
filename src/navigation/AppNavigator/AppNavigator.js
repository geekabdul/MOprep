import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from '../../screens/Register/RegisterScreen';
import LoginScreen from '../../screens/Login/LoginScreen';
import ForgotPasswordScreen from '../../screens/ForgotPassword/ForgotPasswordScreen';
import CreateNewPasswordScreen from '../../screens/CreateNewPassword/CreateNewPasswordScreen';
import CongratulationsScreen from '../../screens/Congratulations/CongratulationsScreen';
import BottomNavigator from '../BottomNavigator/BottomNavigator';
import ChapterScreen from '../../screens/Chapter/ChapterScreen';
import TopicQuestionsScreen from '../../screens/TopicQuestions/TopicQuestionsScreen';
import QuestionScreen from '../../screens/Question/QuestionScreen';
import TestInstructionScreen from '../../screens/TestInstruction/TestInstructionScreen';
import MockUpTestQuestionScreen from '../../screens/MockUpTestQuestion/MockUpTestQuestionScreen';
import AnalysisScreen from '../../screens/Analysis/AnalysisScreen';
import PastExams from '../../screens/PastExams/PastExams';
import EditProfileScreen from '../../screens/EditProfile/EditProfileScreen';
import NotificationScreen from '../../screens/Notification/NotificationScreen';
import ContactUsScreen from '../../screens/ContactUs/ContactUsScreen';
import BookmarkScreen from '../../screens/Bookmark/BookmarkScreen';
import BookmarkedAnalysisScreen from '../../screens/BookmarkedAnalysis/BookmarkedAnalysisScreen';
import SubscriptionScreen from '../../screens/Subscription/SubscriptionScreen';
import PlanScreen from '../../screens/PlanScreen/PlanScreen';
import Loader from '../../components/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_TOKEN} from '../../helper/helper';
import TopicPrevQuestionsScreen from '../../screens/TopicPrevQuestionsScreen/TopicPrevQuestionsScreen';
import PrevQueScreen from '../../screens/PrevQueScreen/PrevQueScreen';
import BookmarkSolution from '../../screens/BookmarkSolution/BookmarkSolution';
import Privacy from '../../screens/Privacy/Privacy';
import CustomDialPad from '../../components/CustomDialPad/CustomDialPad';

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  const [isToken, setIsToken] = useState('loading');

  useEffect(() => {
    const getTokenfunc = async () => {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      setIsToken(token);
    };
    getTokenfunc();
  }, []);
  console.log("isTokenisTokenisTokenisToken",isToken)
  return (
    <>
      {isToken != 'loading' ? (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={!!isToken ? 'BottomNavigator' : 'LoginScreen'}>
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name="CreateNewPasswordScreen"
              component={CreateNewPasswordScreen}
            />
            <Stack.Screen
              name="CongratulationsScreen"
              component={CongratulationsScreen}
            />
            <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
            <Stack.Screen name="ChapterScreen" component={ChapterScreen} />
            <Stack.Screen
              name="TopicQuestionsScreen"
              component={TopicQuestionsScreen}
            />
            <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
            <Stack.Screen
              name="TestInstructionScreen"
              component={TestInstructionScreen}
            />
            <Stack.Screen
              name="MockUpTestQuestionScreen"
              component={MockUpTestQuestionScreen}
            />
            <Stack.Screen name="AnalysisScreen" component={AnalysisScreen} />
            <Stack.Screen name="PastExams" component={PastExams} />
            <Stack.Screen
              name="EditProfileScreen"
              component={EditProfileScreen}
            />
            <Stack.Screen
              name="NotificationScreen"
              component={NotificationScreen}
            />
            <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
            <Stack.Screen name="BookmarkScreen" component={BookmarkScreen} />
            <Stack.Screen
              name="BookmarkedAnalysisScreen"
              component={BookmarkedAnalysisScreen}
            />
            <Stack.Screen
              name="SubscriptionScreen"
              component={SubscriptionScreen}
            />
            <Stack.Screen
              name="TopicPrevQuestionsScreen"
              component={TopicPrevQuestionsScreen}
            />
            <Stack.Screen name="PrevQueScreen" component={PrevQueScreen} />
            <Stack.Screen name="BookmarkSolution" component={BookmarkSolution} />

            

            <Stack.Screen name="PlanScreen" component={PlanScreen} />
            <Stack.Screen name="Privacy" component={Privacy} />
            <Stack.Screen name="CustomDialPad" component={CustomDialPad} />


            
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AppNavigator;

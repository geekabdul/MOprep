import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Tabs/Home/Home';
import QBank from '../../screens/Tabs/QBank/QBank';
import PrevYearQues from '../../screens/Tabs/PrevYearQues/PrevYearQues';
import Test from '../../screens/Tabs/Test/Test';
import Profile from '../../screens/Tabs/Profile/Profile';
import {AppColors} from '../../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fonts from '../../assets/fonts';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator();

const HomeIcon = ({color}) => <AntDesign name="home" color={color} size={25} />;
const QBankIcon = ({color}) => (
  <Ionicons name="document-text-outline" color={color} size={25} />
);
const PrevYearQuesIcon = ({color}) => (
  <AntDesign name="message1" color={color} size={25} />
);
const TestIcon = ({color}) => (
  <AntDesign name="wallet" color={color} size={25} />
);
const ProfileIcon = ({color}) => (
  <AntDesign name="user" color={color} size={25} />
);
const CustomTabLabel = ({label, focused}) => (
  <Text
    style={{
      fontSize: 9,
      fontFamily: Fonts.MulishExtraBold800,
      textAlign: 'center',
      marginBottom: -11,
      color: focused ? AppColors.PRIMARY : 'black',
    }}>
    {label}
  </Text>
);
// const LongTabLabel = ({label}) => {
//     return (
//       <View style={{flexDirection: 'column', alignItems: 'center'}}>
//         <Text style={{fontSize: 8, textAlign: 'center'}}>
//           {label.slice(0, 11)}
//         </Text>
//         {label.length > 11 && (
//           <Text style={{fontSize: 8, textAlign: 'center'}}>
//             {label.slice(11)}
//           </Text>
//         )}
//       </View>
//     );
//   };
const BottomNavigator = () => {
  return (
    <Tab.Navigator
      // initialRouteName="QBankScreen"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.PRIMARY,
        tabBarInactiveTintColor: AppColors.PRIMARY_DARK,
        tabBarLabelStyle: {
          fontSize: 9,
          fontFamily: Fonts.MulishExtraBold800,
          textAlign: 'center',
        },
        tabBarStyle: {
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <HomeIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="QBankScreen"
        component={QBank}
        options={{
          tabBarLabel: 'QBANK',
          tabBarIcon: ({color}) => <QBankIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="PrevYearQuestionScreen"
        component={PrevYearQues}
        options={{
          tabBarLabel: ({focused}) => (
            <CustomTabLabel label="PREV. YEAR QUESTION" focused={focused} />
          ),
          tabBarIcon: ({color}) => <PrevYearQuesIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="TestScreen"
        component={Test}
        options={{
          tabBarLabel: 'TEST',
          tabBarIcon: ({color}) => <TestIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          tabBarLabel: 'PROFILE',
          tabBarIcon: ({color}) => <ProfileIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MainContainer from '../../components/common/MainContainer/MainContainer';
import BackHeader from '../../components/common/BackHeader/BackHeader';
import RowContainer from '../../components/common/RowContainer/RowContainer';
import {AppColors} from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ScrollViewContainer from '../../components/common/ScrollViewContainer/ScrollViewContainer';
import HeaderTab from '../../components/common/HeaderTab/HeaderTab';
import Fonts from '../../assets/fonts';

import ShadowContainer from '../../components/common/ShadowContainer/ShadowContainer';
import {AppImages} from '../../assets/images';
import Dot from '../../components/common/Dot/Dot';
import Analysis from '../../components/Analysis/Analysis';
import RenderQuestion from '../../components/common/RenderQuestion/RenderQuestion';

const RenderRightIcon = () => {
  return (
    <RowContainer style={{gap: 10}}>
      <Ionicons name="bookmark-sharp" size={25} color={AppColors.PRIMARY} />
      <MaterialIcons name="share" size={22} color={AppColors.GREY} />
    </RowContainer>
  );
};

const headerTabData = ['Analysis', 'Solution'];
const TopicQuestionsData = [
  {
    quesNo: 'Q.1',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
  {
    quesNo: 'Q.2',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
  {
    quesNo: 'Q.3',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
  {
    quesNo: 'Q.4',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
  {
    quesNo: 'Q.5',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
  {
    quesNo: 'Q.6',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
  {
    quesNo: 'Q.7',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
];

const AnalysisScreen = () => {
  const [selectedHeaderTab, setSelectedHeaderTab] = useState('Analysis');
  return (
    <ScrollViewContainer>
      <View style={{paddingHorizontal: 20}}>
        <BackHeader rightIcon={<RenderRightIcon />} />
        <HeaderTab
          data={headerTabData}
          selectedHeaderTab={selectedHeaderTab}
          setSelectedHeaderTab={setSelectedHeaderTab}
        />
        {selectedHeaderTab === 'Analysis' ? (
          <Analysis />
        ) : (
          <FlatList
            scrollEnabled={false}
            data={TopicQuestionsData}
            renderItem={({item}) => (
              <RenderQuestion
                item={item}
                customContainerStyle={{paddingHorizontal: 20}}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        )}
      </View>
    </ScrollViewContainer>
  );
};

export default AnalysisScreen;

const styles = StyleSheet.create({});

import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScrollViewContainer from '../../components/common/ScrollViewContainer/ScrollViewContainer';
import SubContainer from '../../components/common/SubContainer/SubContainer';
import BackHeader from '../../components/common/BackHeader/BackHeader';
import HeaderTab from '../../components/common/HeaderTab/HeaderTab';
import RowContainer from '../../components/common/RowContainer/RowContainer';
import {AppColors} from '../../constants/colors';
import Fonts from '../../assets/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RenderQuestion from '../../components/common/RenderQuestion/RenderQuestion';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, USER_TOKEN} from '../../helper/helper';
import axios from 'axios';
import {MultiSelect} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];
const tabData = ['Questions', 'Mock results'];
const filterType = ['All', 'Subject', 'Year'];

const width = Dimensions.get('screen').width;

const TopicQuestionsData = [
  {
    quesNo: '01',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
  {
    quesNo: '02',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
  {
    quesNo: '03',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
  {
    quesNo: '04',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
  {
    quesNo: '05',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
  {
    quesNo: '06',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
  {
    quesNo: '07',
    ques: 'Spermatogenesis is a process in which spermatogonium undergoes mitotic division to form primary spermatocytes. It is an important pathway by which sperms are generated. Which of the following statements is true about spermatogenesis? ',
    quesStatus: 'Unattempted',
    subject: 'Internal Medicine',
  },
];

// const analysisData = [
//   {sno: '01', title: 'Mockup Test 2019 '},
//   {sno: '02', title: 'Mockup Test 2021 '},
//   {sno: '03', title: 'Mockup Test 2022 '},
//   {sno: '04', title: 'Mockup Test 2023 '},
// ];
const BookmarkScreen = () => {
  const navigation = useNavigation();
  const [selectedHeaderTab, setSelectedHeaderTab] = useState('Questions');
  const [selectedFilters, setSelectedFilters] = useState(['All']);
  const [analysisData, setanalysisData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);
  const [subjectListData, setsubjectListData] = useState([]);
  const [yearListData, setyearListData] = useState([]);
  const [TopicQuestionsData, setTopicQuestionsData] = useState([]);
  const [selectedState, setselectedState] = useState('all');

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };
  const toggleFilter = filter => {
    if (filter === 'All') {
      setSelectedFilters(['All']);
    } else {
      if (selectedFilters.includes('All')) {
        setSelectedFilters([filter]);
      } else {
        if (selectedFilters.includes(filter)) {
          setSelectedFilters(selectedFilters.filter(item => item !== filter));
        } else {
          setSelectedFilters([...selectedFilters, filter]);
        }
      }
    }
  };

  useEffect(() => {
    AllquesDataFunc();
    getanalysisData();
    subjectList();
    yearList();
  }, []);
  const getanalysisData = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);

      const response = await axios.get(`${BASE_URL}mockTestResultAnalysis`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('getanalysisDatagetanalysisData------------', response?.data);
      if (!response?.data?.error) {
        setanalysisData(response?.data?.result);
      }
    } catch (err) {
      console.log(err?.response?.data, '09890988900');
    }
  };
  const subjectList = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);

      const response = await axios.get(`${BASE_URL}bookmarkedSubjectList`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('getanalysisDatagetanalysisData', response?.data);
      if (!response?.data?.error) {
        const transformedData = response?.data?.result.map(item => ({
          value: item.subject_id,
          label: item.subject_name,
        }));
        setsubjectListData(transformedData);
      }
    } catch (err) {
      console.log(err?.response?.data, 'errr');
    }
  };
  const yearList = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);

      const response = await axios.get(`${BASE_URL}bookmarkedYearList`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('getanalysisDatagetanalysisData', response?.data);
      if (!response?.data?.error) {
        const transformedData = response?.data?.result.map(item => ({
          value: item.year_id,
          label: item.year_name,
        }));
        setyearListData(transformedData);
      }
    } catch (err) {
      console.log(err?.response?.data, 'errr');
    }
  };
  const subjectData = async id => {
    console.log('iddddddddd', id);
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);

      const params = {subject_id: id[id.length - 1]};
      console.log('paramsparamsparams', params);
      const response = await axios.post(
        `${BASE_URL}bookmarkedSubjectQuestions`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('getanalysisDatagetanalysisData', response?.data);
      if (!response?.data?.error) {
        setTopicQuestionsData(response?.data?.result[0]?.question_data);
      }
    } catch (err) {
      console.log(err?.response?.data, 'errr');
    }
  };
  const yearData = async id => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const params = {year_id: id[id.length - 1]};

      const response = await axios.post(
        `${BASE_URL}bookmarkedYearQuestions`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('getanalysisDatagetanalysisData', response?.data);
      if (!response?.data?.error) {
        setTopicQuestionsData(response?.data?.result[0]?.year_data);
      }
    } catch (err) {
      console.log(err?.response?.data, 'errr');
    }
  };
  const AllquesDataFunc = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      const response = await axios.get(`${BASE_URL}allBookmarkedQuestions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(
        'AllquesDataAllquesDataAllquesData-------------',
        response?.data,
      );
      if (!response?.data?.error) {
        setTopicQuestionsData(response?.data?.result);
      }
    } catch (err) {
      console.log(err?.response?.data, 'errr---------------------');
    }
  };
  const bookmarkRemove = async data => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      console.log('datadatadatadatadatadatadatadatadata----------', data);
      const params = {
        table_id: data?.table_id,
        table_name: data?.table_name,
      };
      const response = await axios.post(
        `${BASE_URL}deleteBookmarkedQuestions`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(
        'bookmarkRemovebookmarkRemovebookmarkRemovebookmarkRemove',
        response?.data,
      );
      if (!response?.data?.error) {
        AllquesDataFunc();
        setSelectedSubject([]);
        setSelectedYear([]);
        setselectedState('all');
      }
    } catch (err) {
      console.log(err?.response?.data, 'errr');
    }
  };
  return (
    <ScrollViewContainer>
      <SubContainer>
        <BackHeader />
        <Text
          style={{
            fontFamily: Fonts?.MulishSemiBold600,
            fontSize: 20,
            lineHeight: 26,
            color: '#202244',
            marginBottom: 18,
          }}>
          Bookmarked
        </Text>

        <HeaderTab
          data={tabData}
          selectedHeaderTab={selectedHeaderTab}
          setSelectedHeaderTab={setSelectedHeaderTab}
        />

        {selectedHeaderTab == 'Questions' && (
          <>
            {/* <RowContainer
              style={{paddingVertical: 30, gap: 10, flexWrap: 'wrap'}}>
              {filterType?.map((filter, index) => (
                <TouchableOpacity onPress={() => toggleFilter(filter)}>
                  <RowContainer
                    key={index}
                    style={{
                      borderWidth: selectedFilters !== filter ? 1 : 0,
                      borderRadius: 5,
                      borderColor: AppColors.GREY_BORDER,
                      width: filter === 'All' ? width / 6 : width / 3.5,
                      padding: 5,
                      // alignItems: 'center',
                      justifyContent:
                        filter === 'All' ? 'center' : 'space-between',
                      backgroundColor: selectedFilters.includes(filter)
                        ? AppColors.PRIMARY
                        : 'transparent',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts.SemiBold600,
                        fontSize: 16,
                        color: selectedFilters.includes(filter)
                          ? AppColors.WHITE
                          : AppColors.GREY,
                      }}>
                      {filter}
                    </Text>
                    {filter !== 'All' && (
                      <FontAwesome
                        name="filter"
                        size={23}
                        color={
                          selectedFilters.includes(filter)
                            ? AppColors.WHITE
                            : AppColors.GREY
                        }
                      />
                    )}
                  </RowContainer>
                </TouchableOpacity>
              ))}
            </RowContainer> */}
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => {
                  AllquesDataFunc();
                  setSelectedSubject([]);
                  setSelectedYear([]);
                  setselectedState('all');
                }}
                style={{
                  height: 50,
                  width: '20%',
                  backgroundColor: selectedState == 'all' ? '#0961F5' : 'white',
                  borderRadius: 12,
                  padding: 12,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,

                  elevation: 2,
                }}>
                <Text
                  style={{
                    color: selectedState == 'all' ? 'white' : 'black',
                  }}>
                  All
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  width: '35%',
                }}>
                <MultiSelect
                  style={[
                    styles.dropdown,
                    {
                      backgroundColor:
                        selectedState == 'subject' ? '#0961F5' : 'white',
                    },
                  ]}
                  placeholderStyle={[
                    styles.placeholderStyle,
                    {
                      color: selectedState == 'subject' ? 'white' : 'black',
                    },
                  ]}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={subjectListData}
                  labelField="label"
                  valueField="value"
                  placeholder="Subject"
                  value={selectedSubject}
                  search
                  searchPlaceholder="Search..."
                  onChange={item => {
                    setSelectedSubject(item);
                    setSelectedYear([]);
                    subjectData(item);
                    setselectedState('subject');
                  }}
                  // renderLeftIcon={() => (
                  //   <AntDesign
                  //     style={styles.icon}
                  //     color="black"
                  //     name="Safety"
                  //     size={20}
                  //   />
                  // )}
                  renderItem={renderItem}
                  renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity
                      onPress={() => unSelect && unSelect(item)}
                      activeOpacity={0.9}>
                      <View style={styles.selectedStyle}>
                        <Text style={styles.textSelectedStyle}>
                          {item.label}
                        </Text>
                        <AntDesign color="black" name="close" size={17} />
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <View
                style={{
                  width: '35%',
                }}>
                <MultiSelect
                  style={[
                    styles.dropdown,
                    {
                      backgroundColor:
                        selectedState == 'year' ? '#0961F5' : 'white',
                    },
                  ]}
                  placeholderStyle={[
                    styles.placeholderStyle,
                    {
                      color: selectedState == 'year' ? 'white' : 'black',
                    },
                  ]}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={yearListData}
                  labelField="label"
                  valueField="value"
                  placeholder="Year"
                  value={selectedYear}
                  search
                  searchPlaceholder="Search..."
                  onChange={item => {
                    setSelectedYear(item);
                    setSelectedSubject([]);
                    yearData(item);
                    setselectedState('year');
                  }}
                  // renderLeftIcon={() => (
                  //   <AntDesign
                  //     style={styles.icon}
                  //     color="black"
                  //     name="Safety"
                  //     size={20}
                  //   />
                  // )}
                  renderItem={renderItem}
                  renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity
                      onPress={() => unSelect && unSelect(item)}
                      activeOpacity={0.9}>
                      <View style={styles.selectedStyle}>
                        <Text style={styles.textSelectedStyle}>
                          {item.label}
                        </Text>
                        <AntDesign color="black" name="close" size={17} />
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>

            {/*  */}
            <RowContainer style={{gap: 10}}>
              {selectedFilters.includes('Subject') && (
                <RowContainer
                  style={{
                    backgroundColor: AppColors.PRIMARY_TAB,
                    gap: 20,
                    padding: 5,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: Fonts.SemiBold600,
                      color: AppColors.PRIMARY_DARK,
                    }}>
                    Internal Medicine
                  </Text>
                  <Text>X</Text>
                </RowContainer>
              )}
              {selectedFilters.includes('Year') && (
                <RowContainer
                  style={{
                    backgroundColor: AppColors.PRIMARY_TAB,
                    gap: 20,
                    padding: 5,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: Fonts.SemiBold600,
                      color: AppColors.PRIMARY_DARK,
                    }}>
                    2021
                  </Text>
                  <Text>X</Text>
                </RowContainer>
              )}
            </RowContainer>

            <FlatList
              scrollEnabled={false}
              data={TopicQuestionsData}
              renderItem={({item, index}) => (
                // <RenderQuestion item={item} isBookmarked={true} />
                <RenderQuestion
                  item={item}
                  customContainerStyle={{paddingHorizontal: 20}}
                  onPress={true}
                  index={index}
                  mock_id={item.subject_id || item.year_id}
                  totalque={TopicQuestionsData.length}
                  isBookmarked={true}
                  checkapi={selectedSubject}
                  bookmarkRemove={bookmarkRemove}
                />
              )}
              keyExtractor={(_, index) => index.toString()}
            />
          </>
        )}

        {selectedHeaderTab === 'Mock results' && (
          <View style={{marginVertical: 40}}>
            {analysisData?.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('BookmarkedAnalysisScreen', {
                    data: item,
                  })
                }>
                <RowContainer
                  key={index}
                  style={{
                    gap: 20,
                    paddingVertical: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: AppColors.BORDER_LINE2,
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: AppColors.PRIMARY_DARK,
                      height: 33,
                      width: 33,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: Fonts.SemiBold600,
                        color: AppColors.PRIMARY_DARK,
                      }}>
                      {item.s_no}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: Fonts.MulishSemiBold600,
                      color: AppColors.PRIMARY_DARK,
                    }}>
                    {item?.name}
                  </Text>
                </RowContainer>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </SubContainer>
    </ScrollViewContainer>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  dropdown: {
    height: 50,
    width: '100%',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    // flexDirection: 'column',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'rgba(9, 97, 245,0.4)',
    // shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    // elevation: 2
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});

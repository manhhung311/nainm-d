import _mock from './_mock';


export const namestudent = [
  'Saewoong Oh',
  'Syed Sheraz Ali',
  'PDaniel Saatchi',
  'Jiseok Kim',
  'aewon Na',
];

export const dataStudent = [
  [
    'Soft ionic actuators',
    'Ph.D. candidate (2019-present)',
    'M.S. National University of Sciences and Technology, Pakistan (2015)',
    'B.S. National University of Sciences and Technology, Pakistan (2013)',
  ],
  [
    'Korea Advanced Institute of Science and Technology, Daejeon, Republic of Korea',
    'Korea Advanced Institute of Science and Technology',
    'Chonnam National University, Gwangju, Republic of Korea',
    'LG Electronics Co.,LTD., Seoul, Republic of Korea',
  ],
  [
    'Soft ionic actuators',
    'Ph.D. candidate (2019-present)',
    'M.S. National University of Sciences and Technology, Pakistan (2015)',
    'B.S. National University of Sciences and Technology, Pakistan (2013)',
  ],
  [
    'Korea Advanced Institute of Science and Technology, Daejeon, Republic of Korea',
    'Korea Advanced Institute of Science and Technology',
    'Chonnam National University, Gwangju, Republic of Korea',
    'LG Electronics Co.,LTD., Seoul, Republic of Korea',
  ],
  [
    'Soft ionic actuators',
    'Ph.D. candidate (2019-present)',
    'M.S. National University of Sciences and Technology, Pakistan (2015)',
    'B.S. National University of Sciences and Technology, Pakistan (2013)',
  ],
];


export const _studentData = [...Array(namestudent.length)].map((_, index) => ({
  id: _mock.id(index),
  title: namestudent[index],
  data: dataStudent[index],
  image:_mock.image.avatar(index),
}));
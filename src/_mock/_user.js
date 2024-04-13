import _mock from './_mock';
import { randomNumberRange, randomInArray } from './funcs';

// ----------------------------------------------------------------------

export const _userAbout = {
  id: _mock.id(1),
  cover: _mock.image.cover(1),
  position: 'UI Designer',
  follower: randomNumberRange(999, 99999),
  following: randomNumberRange(999, 99999),
  quote: 'Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..',
  country: _mock.address.country(1),
  email: _mock.email(1),
  company: _mock.company(1),
  school: _mock.company(2),
  role: 'Manager',
  facebookLink: `https://www.facebook.com/caitlyn.kerluke`,
  instagramLink: `https://www.instagram.com/caitlyn.kerluke`,
  linkedinLink: `https://www.linkedin.com/in/caitlyn.kerluke`,
  twitterLink: `https://www.twitter.com/caitlyn.kerluke`,
};

export const _userFollowers = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  name: _mock.name.fullName(index),
  country: _mock.address.country(index),
  isFollowed: _mock.boolean(index),
}));

export const _userFriends = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  name: _mock.name.fullName(index),
  role: _mock.role(index),
}));

export const _userGallery = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.text.title(index),
  postAt: _mock.time(index),
  imageUrl: _mock.image.cover(index),
}));

export const _userFeeds = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  author: {
    id: _mock.id(8),
    avatarUrl: _mock.image.avatar(1),
    name: 'Caitlyn Kerluke',
  },
  isLiked: true,
  createdAt: _mock.time(index),
  media: _mock.image.feed(index),
  message: _mock.text.sentence(index),
  personLikes: [...Array(36)].map((_, index) => ({
    name: _mock.name.fullName(index),
    avatarUrl: _mock.image.avatar(index + 2),
  })),
  comments: (index === 2 && []) || [
    {
      id: _mock.id(7),
      author: {
        id: _mock.id(8),
        avatarUrl: _mock.image.avatar(randomInArray([2, 3, 4, 5, 6]) || 2),
        name: _mock.name.fullName(index + 5),
      },
      createdAt: _mock.time(2),
      message: 'Praesent venenatis metus at',
    },
    {
      id: _mock.id(9),
      author: {
        id: _mock.id(10),
        avatarUrl: _mock.image.avatar(randomInArray([7, 8, 9, 10, 11]) || 7),
        name: _mock.name.fullName(index + 6),
      },
      createdAt: _mock.time(3),
      message:
        'Etiam rhoncus. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed lectus.',
    },
  ],
}));

export const _userCards = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  cover: _mock.image.cover(index),
  name: _mock.name.fullName(index),
  follower: randomNumberRange(999, 99999),
  following: randomNumberRange(999, 99999),
  totalPost: randomNumberRange(999, 99999),
  position: _mock.role(index),
}));

export const _userPayment = [...Array(2)].map((_, index) => ({
  id: _mock.id(index),
  cardNumber: ['**** **** **** 1234', '**** **** **** 5678', '**** **** **** 7878'][index],
  cardType: ['master_card', 'visa', 'master_card'][index],
}));

export const _userAddressBook = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  phone: _mock.phoneNumber(index),
  country: _mock.address.country(index),
  state: 'New Hampshire',
  city: 'East Sambury',
  street: '41256 Kamille Turnpike',
  zipCode: '85807',
}));

export const _userInvoices = [...Array(10)].map((_, index) => ({
  id: _mock.id(index),
  createdAt: _mock.time(index),
  price: _mock.number.price(index),
}));

export const _userList = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  phoneNumber: _mock.phoneNumber(index),
  address: '908 Jack Locks',
  country: _mock.address.country(index),
  state: 'Virginia',
  city: 'Rancho Cordova',
  zipCode: '85807',
  company: _mock.company(index),
  isVerified: _mock.boolean(index),
  status: randomInArray(['active', 'banned']),
  role: _mock.role(index),
}));

export const titlePeole = [
  'EDUCATION',
  'WORK EXPERIENCE',
  'PROFESSIONAL MEMBERSHIP & DIRECTORSHIP',
  'JOURNAL EDITORIAL BOARD',
  'AWARDS AND HONORS',
];

export const dataPeole = [
  [
    'Ph.D. KAIST, Mechanical Engineering, Aug. 2001',
    'M.S. KAIST, Aerospace Engineering, Feb. 1997',
    'B.S. Inha University, Aerospace Engineering, Feb. 1995',
  ],
  [
    'Korea Advanced Institute of Science and Technology, Daejeon, Republic of Korea',
    'Korea Advanced Institute of Science and Technology',
    'Chonnam National University, Gwangju, Republic of Korea',
    'LG Electronics Co.,LTD., Seoul, Republic of Korea',
  ],
  [
    'Member of American Society of Mechanical Engineers (ASME)',
    'Member of International Society for Optics and Photonics (SPIE)',
    'Member of Korean Society of Mechanical Engineers (KSME)',
    'Member of Korean Society for Noise and Vibration Engineering (KSNVE)',
    'Member of Korea Nano Technology Research Society (KoNTRS)',
    'Member of Korean Society for Composite Materials (KSCM)',
    'Member of The Polymer Society of Korea (PSK)',
    'General Director of Dynamics & Control Section in Korean Society of Mechanical Engineers (KSME), 2019.01.01~ Present',
    'Finance Director, Korean Society for Composite Materials (KSCM), 2019.01.01~Present',
    'Editorial Director, Korean Society for Noise and Vibration Engineering, 2013.03.01~2015.12.31',
    'Academic Director, Dynamics & Control Section in Korean Society of Mechanical Engineers (KSME), 2013~ Present',
    'Editorial Director, Dynamics & Control Section in Korean Society of Mechanical Engineers (KSME), 2015.01.01~ 2018.12.31',
    'General Director, Korean Society for Noise and Vibration Engineering, 2015.01.01~2016.12.31',
    'Editorial Director, Korean Society for Composite Materials, 2014.01.01~2018.12.31',
  ],
  [
    'Associate Editor, Frontiers in Materials, Smart Materials Section, 2014~Present',
    'Associate Editor, Frontiers in Bioengineering and Biotechnology, Biomimetics and Bionics Section, 2019~Present',
    'Associate Editor, International Journal of Smart and Nano Materials, 2017~Present',
    'Editor, Functional Composites and Structures (IOP), 2019~Present',
    'Editorial Board, Scientific Reports (Nature), 2016.10.1 ~ Present',
    'Editorial Board, Composites Part B: Engineering, 2019~Present',
    'Editorial Board, Actuators, 2012.01.01 ~ Present',
    'Editorial Board, Advances in Nano Research, 2013~Present',
    'Editorial Board, GRAPHENE (ASP, ISSN: 2167-275X), 2013~Present',
    'Editorial Board, International Journal of Precision Engineering and Manufacturing-Green Technology (IJPEM-GT), 2017.1.1~2019.12.31',
    'Editorial Board, Korean Society for Composite Materials, 2010.03.01~2018.12.31',
    'Editor, Korean Society for Noise and Vibration Engineering, 2015.01.01~2016.12.31',
  ],
  [
    '2021 KAIST Impact Research Award (KAIST), 2021.02.15',
    '2020 KSCM Academic Award (Korean Society of Composite Materials), 2020.11.5',
    '2020 Innovation Award for Basic Science, Minister Award of MSIT, 2020.12.31',
    '2018 KAIST Academic Award (KAIST), 2018.02.12.',
    '2018 Technology Innovation Award (KAIST Engineering), 2018.12.26.',
    '2018 Academic Contribution Award (KSCM), 2018.11.22.',
    '2018 Young Scientist Award (Inha University), 2018.12.20.',
    '2014 TOP50 Outstanding Academic Achievement Award in Basic Research, Development of biomimetic 3D motion actuators based on multi-dimensional smart carbon-nanostructures , Minister of Education, Science and Technology (MEST)-National Research Foundation of Korea',
    '2014 Innovation Award in Energy Technology (에너지기술혁신대상, KETEP), 28 August 2014.',
    'Selected as 2014’ TOP 15 Fusion Technology (KIST Convergence Research Policy Center)',
    '2012 TOP50 Outstanding Academic Achievement Award in Basic Research, Development of Bio-mimetic Artificial muscle Actuators based on Smart Carbon Nano- Material, September 13, 2012 Minister of Education, Science and Technology (MEST), Republic of Korea',
    '2010 TOP100 Outstanding Academic Achievement Award in Basic Research, Development of Bio-mimetic and Bio-compatible Electro-Mechanical Polymer Actuators, October 26, 2010 Minister of Education, Science and Technology (MEST), Republic of Korea',
    '2010 TOP100 National Excellent Research & Development Achievement Award, December 6, 2010 Minister of Education, Science and Technology (MEST), Republic of Korea',
    'Best Paper Award, Study on Water Floatable Artificial Muscles with Hydrophobic and Liquid-impermeable Garphene Paper Electrodes, BAMN2013 The 7th World Congress on Biomimetics, Artifical Muscles and Nano-Bio, Jeju Island, Korea, 2013.08.26-30.',
    'Best Paper Award, Bio-inspired Three Dimensional Carbon Nanostructures for High Performance Lithium Ion Battery, BAMN2013 The 7th World Congress on Biomimetics, Artifical Muscles and Nano-Bio, Jeju Island, Korea, 2013.08.26-30.',
    'Best Paper Award (First Ranked), The Korean Society for Composite Materials (KSCM), (Helical stents based on shape memory polymer with ferromagnetic nanoparticle-decorated graphene flakes), Fall 2012',
    'Best Presentation Award, Korean Society for Noise and Vibration Engineering (KSNVE), (Characteristics of Wave Propagations through Phononic Structure Having Cloaking Zone), Fall 2012',
    'Best Presentation Award, Korean Society for Noise and Vibration Engineering (KSNVE), (Development of Bacterial Cellulose Actuators), Fall 2009',
    'Best Presentation Award, Korean Society for Noise and Vibration Engineering (KSNVE), (Fullerene-based Ionic Polymer Transducers), Spring 2009',
    "Marquis Who's Who in Science and Engineering, 2006",
    "Marquis Who's Who in the world, 2007",
    'Award of Excellence in Research, Chonnam National University, 2006',
    'TL2005 Gold Medal, LG Electronics Inc., March 2002',
    'Scholarship Award of LG Electronics Company, May 2000~Aug. 2001',
    'Best Paper Award in M.S. thesis, Mechanical Engineering, KAIST, March 1997',
  ],
];

export const _peopleData = [...Array(titlePeole.length)].map((_, index) => ({
  id: _mock.id(index),
  title: titlePeole[index],
  data: dataPeole[index],
}));

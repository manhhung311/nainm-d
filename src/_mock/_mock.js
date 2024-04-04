// noinspection JSCheckFunctionSignatures

import { sub } from 'date-fns';
import { role } from './role';
import { email } from './email';
import { boolean } from './boolean';
import { company } from './company';
import { phoneNumber } from './phoneNumber';
import { fullAddress, country } from './address';
import { firstName, lastName, fullName } from './name';
import { title, sentence, description, paperTitle, paperTitlePDF, paperTitleHDBDPDF } from './text';
import { price, rating, age, percent } from './number';

// ----------------------------------------------------------------------

const _mock = {
  id: (index) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  email: (index) => email[index],
  phoneNumber: (index) => phoneNumber[index],
  time: (index) => sub(new Date(), { days: index, hours: index }),
  boolean: (index) => boolean[index],
  role: (index) => role[index],
  company: (index) => company[index],
  address: {
    fullAddress: (index) => fullAddress[index],
    country: (index) => country[index],
  },
  name: {
    firstName: (index) => firstName[index],
    lastName: (index) => lastName[index],
    fullName: (index) => fullName[index],
  },
  text: {
    title: (index) => title[index],
    sentence: (index) => sentence[index],
    description: (index) => description[index],
  },
  number: {
    percent: (index) => percent[index],
    rating: (index) => rating[index],
    age: (index) => age[index],
    price: (index) => price[index],
  },
  image: {
    cover: (index) => `/static/mock-images/covers/cover_${index + 1}.jpg`,
    customerCover: (index) => `/static/mock-images/covers/cover_${index + 1}.jpg`,
    feed: (index) => `/static/mock-images/feeds/feed_${index + 1}.jpg`,
    product: (index) => `/static/mock-images/products/product_${index + 1}.jpg`,
    avatar: (index) => `/static/mock-images/avatars/user-avatar_${index + 1}.jpg`,
    PDF: (index) => `/static/mock-images/PDF/anhPDF_${index + 1}.jpg`,
    HDBHPDF: (index) => `/static/mock-images/sales-guide/HDBH_${index + 1}.jpg`,
    recruitment: (index) => `/static/mock-images/recruitments/anh_${index + 1}.jpg`,
  },
  papers: {
    name: (index) => paperTitle[index],
    file: (index) => `/static/mock-images/docs/hoa-don-${index + 1}.jpg`,
  },
  papersPDF: {
    name: (index) => paperTitlePDF[index],
    file: (index) => `/static/mock-images/PDF/HSNL-${index + 1}.jpg`,
  },
  paperHDBHPDF: {
    name: (index) => paperTitleHDBDPDF[index],
    file: (index) => `/static/mock-images/sales-guide/HDBH-${index + 1}.jpg`,
  },
};

export default _mock;

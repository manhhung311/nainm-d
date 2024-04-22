import _mock from './_mock';
// ----------------------------------------------------------------------
export const dataNews = [[''], [''], [''], [' '], [''], [''], [''], [''], [' '], ['']];
export const titleNews = [[''], [''], [''], [' '], [''], [''], [''], [''], [' '], ['']];

export const _newsData = [...Array(titleNews.length)].map((_, index) => ({
  id: _mock.id(index),
  title: titleNews[index],
  data: dataNews[index],
  image: _mock.image.cover(index),
}));

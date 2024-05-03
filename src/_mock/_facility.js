import _mock from './_mock';
// ----------------------------------------------------------------------
export const dataFacility = [[''], [''], [''], [' '], [''], [''], [''], [''], [' '], ['']];
export const titleFacility = [[''], [''], [''], [' '], [''], [''], [''], [''], [' '], ['']];

export const _facilityData = [...Array(titleFacility.length)].map((_, index) => ({
    id: _mock.id(index),
    title: titleFacility[index],
    data: dataFacility[index],
    image: _mock.image.cover(index),
  }));
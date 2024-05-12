// noinspection JSUnresolvedVariable,DuplicatedCode,JSCheckFunctionSignatures

import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Autocomplete, Chip, TextField, Typography } from '@mui/material';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { defaultCollectionVN } from '../../constant';

// ----------------------------------------------------------------------
const GET_COLLECTIONS = loader('../../graphql/queries/collections/ListCollections.graphql');

RHFAutocompleteCollectionVN.propTypes = {
  name: PropTypes.string,
  typeCollection: PropTypes.number,
  statusCollection: PropTypes.number,
  isDisabledAutocomplete: PropTypes.bool,
};

export default function RHFAutocompleteCollectionVN({
  name,
  typeCollection,
  statusCollection,
  isDisabledAutocomplete = false,
  ...other
}) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const [collections, setCollections] = useState([]);
  const [defaultValue, setDefaultValue] = useState(null); // Thêm state để lưu trữ giá trị mặc định

  const { error, data } = useQuery(GET_COLLECTIONS, {
    variables: {
      input: {
        status_collection: statusCollection,
        type_collection: typeCollection,
        page: 1,
        limit: 999,
      },
    },
    fetchPolicy: 'cache-and-network',
  });
  const { control } = useFormContext();

  useEffect(() => {
    if (data) {
      // Lọc ra các phần tử có title không rỗng
      const filteredCollections = [defaultCollectionVN, ...data.collections.filter((el) => el.title !== '')];
      setCollections(filteredCollections);

      // Thiết lập giá trị mặc định nếu collections không rỗng
      if (filteredCollections.length > 0) {
        setDefaultValue(filteredCollections[0]); // Sử dụng phần tử đầu tiên trong danh sách làm giá trị mặc định
      }
    }
  }, [data]);

  return (
    <>
      {data && (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Autocomplete
              {...field}
              defaultValue={defaultValue}
              noOptionsText="Không có lựa chọn tương ứng"
              isOptionEqualToValue={(option, value) =>
                Number(option.id) === Number(value.id) && option.title === value.title
              }
              getOptionLabel={(option) => option.title}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  field.onChange(newValue);
                }
              }}
              options={collections.map((option) => option)}
              disabled={isDisabledAutocomplete}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip {...getTagProps({ index })} key={Number(option.id)} size="small" label={option.title} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  label="Nghiên cứu"
                  InputLabelProps={{ shrink: true, style: { color: isLight ? '#000' : '#fff' } }}
                  {...params}
                  error={!!error}
                  helperText={error?.message}
                  {...other}
                />
              )}
            />
          )}
        />
      )}
      {error && <Typography variant="h6">Không lấy được dữ liệu</Typography>}
    </>
  );
}

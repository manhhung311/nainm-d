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
import { defaultTapENG } from '../../constant';

// ----------------------------------------------------------------------
const LIST_TAP = loader('../../graphql/queries/tap/listTap.graphql');

RHFAutocompleteTapENG.propTypes = {
  name: PropTypes.string,
  typeCollection: PropTypes.number,
  statusCollection: PropTypes.number,
  isDisabledAutocomplete: PropTypes.bool,
};

export default function RHFAutocompleteTapENG({
  name,
  typeCollection,
  statusCollection,
  isDisabledAutocomplete = false,
  ...other
}) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const [taps, setTaps] = useState([]);
  const [defaultValue, setDefaultValue] = useState(null); // Thêm state để lưu trữ giá trị mặc định

  const { error, data } = useQuery(LIST_TAP, {
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
      const filteredCollections = [
        defaultTapENG,
        ...data.collections_research_publication.filter((el) => el.nameElg !== ''),
      ];
      setTaps(filteredCollections);

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
              noOptionsText="There is no corresponding option"
              isOptionEqualToValue={(option, value) =>
                Number(option.id) === Number(value.id) && option.nameElg === value.nameElg
              }
              getOptionLabel={(option) => option.nameElg}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  field.onChange(newValue);
                }
              }}
              options={taps.map((option) => option)}
              disabled={isDisabledAutocomplete}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip {...getTagProps({ index })} key={Number(option.id)} size="small" label={option.nameElg} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  label="Tap"
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
      {error && <Typography variant="h6">Could not get data</Typography>}
    </>
  );
}

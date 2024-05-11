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
import { defaultUserOptions } from '../../constant';

// ----------------------------------------------------------------------
const LIST_USER = loader('../../graphql/queries/user/ListUsers.graphql');

RFHAutocompleteUser.propTypes = {
  name: PropTypes.string,
  isDisabledAutocomplete: PropTypes.bool,
};

export default function RFHAutocompleteUser({ name, isDisabledAutocomplete = false, ...other }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const [districts, setDistricts] = useState([]);

  const { error, data } = useQuery(LIST_USER, {
    variables: {},
    fetchPolicy: 'cache-and-network',
  });
  const { control } = useFormContext();

  useEffect(() => {
    if (data) {
      const newDistricts = [defaultUserOptions, ...data.users];
      setDistricts(newDistricts);
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
              noOptionsText="Không có lựa chọn tương ứng"
              isOptionEqualToValue={(option, value) =>
                (option.id === value.id && option.fullName === value.fullName) ||
                value.fullName === defaultUserOptions.fullName
              }
              getOptionLabel={(option) => option.fullName}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  field.onChange(newValue);
                } else {
                  field.onChange(defaultUserOptions);
                }
              }}
              options={districts.map((option) => option)}
              disabled={isDisabledAutocomplete}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip {...getTagProps({ index })} key={option.id} size="small" label={option.name} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  InputLabelProps={{ shrink: true, style: { color: isLight ? '#000' : '#fff' } }}
                  label="DANH SÁCH USER"
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

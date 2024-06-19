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
import { defaultUserOptions, defaultUserOptionsENG, Language } from '../../constant';
import useLocales from '../../locals/useLocals';

// ----------------------------------------------------------------------
const LIST_USER = loader('../../graphql/queries/user/ListUsers.graphql');

RFHAutocompleteUser.propTypes = {
  name: PropTypes.string,
  isDisabledAutocomplete: PropTypes.bool,
  language: PropTypes.string,
  tap: PropTypes.number,
};

export default function RFHAutocompleteUser({ name, language, tap, isDisabledAutocomplete = false, ...other }) {
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
      const userVN = data.users.filter(
        (el) =>
          el?.user_information_Vietnamese === '' ||
          el?.user_information_Vietnamese === '<p><br></p>' ||
          !el?.user_information_Vietnamese
      );
      const userENG = data.users.filter(
        (el) =>
          el?.user_information_English === '' ||
          el?.user_information_English === '<p><br></p>' ||
          !el?.user_information_English
      );
      const newDistricts = [
        language === Language.VietNam ? defaultUserOptions : defaultUserOptionsENG,
        ...(tap === 1 ? userVN : userENG),
      ];
      setDistricts(newDistricts);
    }
  }, [language, data, tap]);

  const { t } = useLocales();

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
                Number(option.id) === Number(value.id) && option.fullName === value.fullName
              }
              getOptionLabel={(option) => option.fullName}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  field.onChange(newValue);
                } else {
                  field.onChange(language === Language.VietNam ? defaultUserOptions.fullName : defaultUserOptionsENG);
                }
              }}
              options={districts.map((option) => option)}
              disabled={isDisabledAutocomplete}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip {...getTagProps({ index })} key={Number(option.id)} size="small" label={option.fullName} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  InputLabelProps={{ shrink: true, style: { color: isLight ? '#000' : '#fff' } }}
                  label={t('user.pageList')}
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

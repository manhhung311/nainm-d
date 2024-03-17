import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Checkbox, FormGroup, FormControlLabel, FormHelperText } from '@mui/material';

// ----------------------------------------------------------------------

RHFCheckbox.propTypes = {
  name: PropTypes.string,
};

export function RHFCheckbox({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <>
      <FormControlLabel
        control={
          <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                {!!error && (
                  <FormHelperText error sx={{ px: 1 }}>
                    {error.message}
                  </FormHelperText>
                )}

                <Checkbox {...field} checked={field.value} size="small" />
              </>
            )}
          />
        }
        {...other}
      />
    </>
  );
}

// ----------------------------------------------------------------------

RHFMultiCheckbox.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
};

export function RHFMultiCheckbox({ name, options, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option) =>
          field.value.includes(option) ? field.value.filter((value) => value !== option) : [...field.value, option];

        return (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={field.value.includes(option)}
                    onChange={() => field.onChange(onSelected(option))}
                  />
                }
                label={option}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}

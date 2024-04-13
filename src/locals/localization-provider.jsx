// @mui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//
import PropTypes from 'prop-types';
import useLocales from './useLocals';

// ----------------------------------------------------------------------

LocalizationProvider.propTypes = {
  children: PropTypes.node,
};

export default function LocalizationProvider({ children }) {
  const { currentLang } = useLocales();

  return (
    <MuiLocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={currentLang.adapterLocale}>
      {children}
    </MuiLocalizationProvider>
  );
}

// @mui
import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@mui/material';
//
import EmptyContent from '../EmptyContent';
import useLocales from '../../locals/useLocals';

// ----------------------------------------------------------------------

TableNoData.propTypes = {
  isNotFound: PropTypes.bool,
};

export default function TableNoData({ isNotFound }) {
  const { t } = useLocales();
  return (
    <>
      {isNotFound ? (
        <TableRow>
          <TableCell colSpan={6}>
            <EmptyContent title={t('error.noData')} />
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell colSpan={6} sx={{ p: 0 }} />
        </TableRow>
      )}
    </>
  );
}

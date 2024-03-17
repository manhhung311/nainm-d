// noinspection JSValidateTypes

import PropTypes from 'prop-types';
import { AnimatePresence, m } from 'framer-motion';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import { fData } from '../../utils/formatNumber';
import Iconify from '../Iconify';
import { varFade } from '../animate';

// ----------------------------------------------------------------------

const getFileData = (file) => {
  if (typeof file === 'string') {
    return {
      key: file,
    };
  }
  return {
    key: file?.name,
    name: file?.name,
    size: file?.size,
    preview: file?.preview,
  };
};

// ----------------------------------------------------------------------

SingleFilePreview.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  showPreview: PropTypes.bool,
  updateFile: PropTypes.any,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
};

export default function SingleFilePreview({ showPreview = false, file, onRemove, updateFile }) {
  const { key, name, size } = getFileData(file);

  return (
    <>
      <List disablePadding sx={{ ...{ my: 3 } }}>
        <AnimatePresence>
          <>
            {showPreview && file !== null && (
              <ListItem
                key={key}
                component={m.div}
                {...varFade().inRight}
                sx={{
                  my: 1,
                  px: 2,
                  py: 0.75,
                  borderRadius: 0.75,
                  border: (theme) => `solid 1px ${theme.palette.divider}`,
                }}
              >
                <Iconify icon={'eva:file-fill'} sx={{ width: 28, height: 28, color: 'text.secondary', mr: 2 }} />

                <ListItemText
                  primary={updateFile === null ? file?.fileName : name}
                  secondary={updateFile === null ? file?.encoding : fData(size || 0)}
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />

                <IconButton edge="end" size="small" onClick={() => onRemove(file)}>
                  <Iconify icon={'eva:close-fill'} />
                </IconButton>
              </ListItem>
            )}
          </>
        </AnimatePresence>
      </List>
    </>
  );
}

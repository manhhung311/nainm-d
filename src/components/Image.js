import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Image.propTypes = {
  disabledEffect: PropTypes.bool,
  effect: PropTypes.string,
  ratio: PropTypes.oneOf([
    '4/3',
    '4/5',
    '3/4',
    '2/3',
    '6/4',
    '4/6',
    '16/9',
    '9/16',
    '21/9',
    '9/21',
    '1/1',
    '24/9',
    '28/9',
    '16/12',
    '14/9',
  ]),
  sx: PropTypes.object,
};

export default function Image({ ratio, disabledEffect = false, effect = 'blur', sx, ...other }) {
  if (ratio) {
    return (
      <Box
        component="span"
        sx={{
          width: 1,
          lineHeight: 0,
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          pt: getRatio(ratio),
          '& .wrapper': {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            lineHeight: 0,
            position: 'absolute',
            backgroundSize: 'cover !important',
          },
          ...sx,
        }}
      >
        <Box
          component={LazyLoadImage}
          wrapperClassName="wrapper"
          effect={disabledEffect ? undefined : effect}
          placeholderSrc="/static/placeholder.svg"
          sx={{ width: 1, height: 1, objectFit: 'cover' }}
          {...other}
        />
      </Box>
    );
  }

  return (
    <Box
      component="span"
      sx={{
        lineHeight: 0,
        display: 'block',
        overflow: 'hidden',
        '& .wrapper': {
          width: 1,
          height: 1,
          backgroundSize: 'cover !important',
        },
        ...sx,
      }}
    >
      <Box
        component={LazyLoadImage}
        wrapperClassName="wrapper"
        effect={disabledEffect ? undefined : effect}
        placeholderSrc="/static/placeholder.svg"
        sx={{ width: 1, height: 1, objectFit: 'cover' }}
        {...other}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

function getRatio(ratio = '1/1') {
  return {
    '4/3': 'calc(100% / 4 * 3)',
    '3/4': 'calc(100% / 4 * 4)',
    '2/3': 'calc(100% / 1 * 1)',
    '6/4': 'calc(100% / 6 * 4)',
    '4/6': 'calc(100% / 4 * 6)',
    '16/9': 'calc(100% / 16 * 9)',
    '16/12': 'calc(100% / 16 * 12)',
    '9/16': 'calc(100% / 9 * 16)',
    '21/9': 'calc(100% / 21 * 9)',
    '24/9': 'calc(100% / 24 * 9)',
    '28/9': 'calc(100% / 28 * 9)',
    '9/21': 'calc(100% / 9 * 21)',
    '4/5': 'calc(100% / 4 * 5)',
    '14/9': 'calc(100% / 14 * 9)',
    '1/1': '100%',
  }[ratio];
}

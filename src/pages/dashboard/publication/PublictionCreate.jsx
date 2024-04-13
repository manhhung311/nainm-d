// @mui
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';
// @mui
import { LoadingButton } from '@mui/lab';
import { alpha } from '@mui/material/styles';
import { Box, Button, Container, Typography, DialogActions } from '@mui/material';
// components
import Image from '../../../components/Image';
import Markdown from '../../../components/Markdown';
import Scrollbar from '../../../components/Scrollbar';
import EmptyContent from '../../../components/EmptyContent';
import { DialogAnimate } from '../../../components/animate';
// components
import Page from '../../../components/Page';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));
// ----------------------------------------------------------------------

PublictionCreate.propTypes = {
  values: PropTypes.object,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default function PublictionCreate({ values, isValid, isSubmitting, isOpen, onClose, onSubmit }) {

  const { title, content, description } = values;

  const cover = isString(values.cover) ? values.cover : values.cover?.preview;

  const hasContent = title || description || content || cover;

  const hasHero = title || cover;


  return (
    <Page title="Tạo công bố dự án nghiên cứ">
      <h1>Tạo mới dự án</h1>
    </Page>
  );

  PreviewHero.propTypes = {
    cover: PropTypes.string,
    title: PropTypes.string,
  };
  
  function PreviewHero({ title, cover }) {
    return (
      <Box sx={{ position: 'relative' }}>
        <Container
          sx={{
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9,
            position: 'absolute',
            color: 'common.white',
            pt: { xs: 3, lg: 10 },
          }}
        >
          <Typography variant="h2" component="h1">
            {title}
          </Typography>
        </Container>
  
        <Box
          sx={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 8,
            position: 'absolute',
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
          }}
        />
        <Image alt="cover" src={cover} ratio="16/9" />
      </Box>
    );
  }
  
}

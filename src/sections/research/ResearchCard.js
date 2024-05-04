import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, CardContent, Link, MenuItem, Stack, Typography } from '@mui/material';
// routes
import { useState } from 'react';
import useResponsive from '../../hooks/useResponsive';
import { PATH_DASHBOARD } from '../../routes/paths';
import Iconify from '../../components/Iconify';
import { TableMoreMenu } from '../../components/table';
import TextMaxLine from '../../components/TextMaxLine';

import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

ResearchPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
  handleDeleteResearch: PropTypes.func,
};

export default function ResearchPostCard({ post, handleDeleteResearch }) {


  const {
    title,
    title_english: titleEnglish,
    description,
    description_english: descriptionEnglish,
    id,
  } = post;

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 80,
            height: 36,
            zIndex: 9,
            bottom: -15,
            position: 'absolute',
            color: 'background.paper',
          }}
        />
      </Box>

      <PostContent
        id={id}
        title={title}
        titleEnglish={titleEnglish}
        description={description}
        descriptionEnglish={descriptionEnglish}
        handleDeleteResearch={handleDeleteResearch}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

PostContent.propTypes = {
  index: PropTypes.number,
  title: PropTypes.string,
  titleEnglish: PropTypes.string,
  description: PropTypes.string,
  descriptionEnglish: PropTypes.string,
  id: PropTypes.number,
  handleDeleteResearch: PropTypes.func,
  createdAt: PropTypes.string,
};

export function PostContent({
                              title,
                              index,
                              id,
                              handleDeleteResearch,
                              description,
                            }) {
  const isDesktop = useResponsive('up', 'md');
  const [openMenu, setOpenMenuActions] = useState(null);
  const navigate = useNavigate();

  const handleEditResearch = (id) => {
    navigate(PATH_DASHBOARD.research.edit(id));
  };

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const linkTo = PATH_DASHBOARD.research.edit(id);

  const latestPostLarge = index === 0;

  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
        ...(latestPostLarge && {
          pt: 0,
          zIndex: 99,
          bottom: 0,
          position: 'absolute',
          color: 'common.white',
        }),
      }}
    >
      {!latestPostLarge && (
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
          }}
        >
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    handleDeleteResearch(id);
                  }}
                  sx={{ color: 'success' }}
                >
                  Duyệt
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    handleDeleteResearch(id);
                  }}
                  sx={{ color: 'error.main' }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                  Xóa
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleEditResearch(id);
                    handleCloseMenu();
                  }}
                >
                  <Iconify icon={'eva:edit-fill'} />
                  Sửa thông tin
                </MenuItem>
              </>
            }
          />
        </Box>
      )}

      <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
          ...(latestPostLarge && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      />

      <Stack spacing={1} flexGrow={1}>
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <TextMaxLine variant={isDesktop ? 'h5' : 'subtitle2'} line={2} persistent>
            {title}
          </TextMaxLine>
        </Link>
        <TextMaxLine variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </TextMaxLine>
      </Stack>

      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 3,
          mb: -1,
          color: 'text.disabled',
          ...(latestPostLarge && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      />
    </CardContent>
  );
}

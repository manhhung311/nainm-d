import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, CardContent, Link, MenuItem, Stack, Typography } from '@mui/material';
// routes
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
import { PATH_DASHBOARD } from '../../routes/paths';
import Iconify from '../../components/Iconify';
import { TableMoreMenu } from '../../components/table';
import TextMaxLine from '../../components/TextMaxLine';
import { StatusCollection } from '../../constant';
import useLocales from '../../locals/useLocals';

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  handleDeleteNews: PropTypes.func,
  onEditStatusCollection: PropTypes.func,
  currentLang: PropTypes.string,
};

export default function BlogPostCard({ post, handleDeleteNews, onEditStatusCollection, currentLang }) {
  const {
    title,
    title_english: titleEnglish,
    description,
    description_english: descriptionEnglish,
    status_collection: statusCollection,
    id,
  } = post;

  return (
    <Card>
      <PostContent
        id={id}
        title={title}
        titleEnglish={titleEnglish}
        description={description}
        descriptionEnglish={descriptionEnglish}
        statusCollection={statusCollection}
        handleDeleteNews={handleDeleteNews}
        onEditStatusCollection={onEditStatusCollection}
        currentLang={currentLang}
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
  currentLang: PropTypes.string,
  statusCollection: PropTypes.number,
  id: PropTypes.number,
  handleDeleteNews: PropTypes.func,
  onEditStatusCollection: PropTypes.func,
  createdAt: PropTypes.string,
};

export function PostContent({
  title,
  index,
  id,
  handleDeleteNews,
  onEditStatusCollection,
  description,
  currentLang,
  statusCollection,
  titleEnglish,
  createdAt,
  descriptionEnglish,
}) {
  const isDesktop = useResponsive('up', 'md');
  const [openMenu, setOpenMenuActions] = useState(null);
  const navigate = useNavigate();

  const handleEditBlog = (id) => {
    navigate(PATH_DASHBOARD.news.edit(id));
  };

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const linkTo = PATH_DASHBOARD.news.detail(id);

  const latestPostLarge = index === 0;
  const { t } = useLocales();
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
                {statusCollection === StatusCollection.Draft && (
                  <MenuItem
                    onClick={() => {
                      handleCloseMenu();
                      onEditStatusCollection(id, StatusCollection.Public);
                    }}
                    sx={{ color: 'success.main' }}
                  >
                    <Iconify icon={'heroicons-solid:check'} />
                    {t('card.Examine')}
                  </MenuItem>
                )}

                {statusCollection === StatusCollection.Public && (
                  <>
                    <MenuItem
                      onClick={() => {
                        handleCloseMenu();
                        onEditStatusCollection(id, StatusCollection.Hidden);
                      }}
                      // sx={{ color: 'success.main' }}
                    >
                      <Iconify icon={'dashicons:hidden'} />
                      {t('card.hidden')}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleCloseMenu();
                        onEditStatusCollection(id, StatusCollection.Draft);
                      }}
                      sx={{ color: 'warning.main' }}
                    >
                      <Iconify icon={'material-symbols:draft-outline'} />
                      {t('card.Draft')}
                    </MenuItem>
                  </>
                )}

                {statusCollection === StatusCollection.Hidden && (
                  <MenuItem
                    onClick={() => {
                      handleCloseMenu();
                      onEditStatusCollection(id, StatusCollection.Public);
                    }}
                    sx={{ color: 'success.main' }}
                  >
                    <Iconify icon={'heroicons-solid:check'} />
                    {t('card.publish')}
                  </MenuItem>
                )}

                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    handleDeleteNews(id);
                  }}
                  sx={{ color: 'error.main' }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                  {t('card.Erase')}
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleEditBlog(id);
                    handleCloseMenu();
                  }}
                >
                  <Iconify icon={'eva:edit-fill'} />
                  {t('card.Edit information')}
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
      >
        {/* {fddMMYYYYWithSlash(createdAt)} */}26/04/2024
      </Typography>

      <Stack spacing={1} flexGrow={1}>
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <TextMaxLine variant={isDesktop ? 'h5' : 'subtitle2'} line={2} persistent>
            {currentLang === 'vi' ? title : titleEnglish}
          </TextMaxLine>
        </Link>
        <TextMaxLine variant="body2" sx={{ color: 'text.secondary' }}>
          {currentLang === 'vi' ? description : descriptionEnglish}
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

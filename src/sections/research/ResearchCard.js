import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, CardContent, Link, MenuItem, Stack, Typography } from '@mui/material';
// routes
import { useState } from 'react';
import useResponsive from '../../hooks/useResponsive';
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
import Iconify from '../../components/Iconify';
import { TableMoreMenu } from '../../components/table';
import TextMaxLine from '../../components/TextMaxLine';
import { RoleId, StatusCollection } from '../../constant';
import useLocales from '../../locals/useLocals';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

ResearchPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  handleDeleteResearch: PropTypes.func,
  onEditStatusCollection: PropTypes.func,
  currentLang: PropTypes.string,
};

export default function ResearchPostCard({ post, handleDeleteResearch, onEditStatusCollection, currentLang }) {
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
        handleDeleteResearch={handleDeleteResearch}
        statusCollection={statusCollection}
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
  id: PropTypes.number,
  handleDeleteResearch: PropTypes.func,
  // createdAt: PropTypes.string,
  currentLang: PropTypes.string,
  statusCollection: PropTypes.number,
  onEditStatusCollection: PropTypes.func,
};

export function PostContent({
  title,
  index,
  id,
  handleDeleteResearch,
  onEditStatusCollection,
  description,
  currentLang,
  statusCollection,
  titleEnglish,
  // createdAt,
  descriptionEnglish,
}) {
  const isDesktop = useResponsive('up', 'md');
  const [openMenu, setOpenMenuActions] = useState(null);
  const navigate = useNavigate();

  const { user } = useAuth();

  const { pathname } = useLocation();
  const isDashboard = pathname.includes('dashboard');

  const handleEditResearch = (id) => {
    navigate(PATH_DASHBOARD.research.edit(id));
  };

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const linkTo = isDashboard ? PATH_DASHBOARD.research.detail(id) : PATH_PAGE.research.detail(id);

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
          {(user?.role === RoleId.admin || user?.role === RoleId.manager) && isDashboard && (
            <TableMoreMenu
              open={openMenu}
              onOpen={handleOpenMenu}
              onClose={handleCloseMenu}
              actions={
                <>
                  {statusCollection === StatusCollection.Draft && user?.role === RoleId.admin && (
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

                  {statusCollection === StatusCollection.Public && user?.role === RoleId.admin && (
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

                  {statusCollection === StatusCollection.Hidden && user?.role === RoleId.admin && (
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

                  {user?.role === RoleId.admin && (
                    <MenuItem
                      onClick={() => {
                        handleCloseMenu();
                        handleDeleteResearch(id);
                      }}
                      sx={{ color: 'error.main' }}
                    >
                      <Iconify icon={'eva:trash-2-outline'} />
                      {t('card.Erase')}
                    </MenuItem>
                  )}
                  {(user?.role === RoleId.admin || user?.role === RoleId.manager) && (
                    <MenuItem
                      onClick={() => {
                        handleEditResearch(id);
                        handleCloseMenu();
                      }}
                    >
                      <Iconify icon={'eva:edit-fill'} />
                      {t('card.Edit information')}
                    </MenuItem>
                  )}
                </>
              }
            />
          )}
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

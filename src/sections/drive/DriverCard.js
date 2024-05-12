import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, CardContent, Link, MenuItem, Stack, Typography } from '@mui/material';
// routes
import { useState } from 'react';
import useResponsive from '../../hooks/useResponsive';
import { PATH_DASHBOARD } from '../../routes/paths';
import Iconify from '../../components/Iconify';
import { TableMoreMenu } from '../../components/table';
import TextMaxLine from '../../components/TextMaxLine';
import { RoleId } from '../../constant';
import useLocales from '../../locals/useLocals';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

DriverPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  handleDeleteDriver: PropTypes.func,
  onEditStatusCollection: PropTypes.func,
  currentLang: PropTypes.string,
};

export default function DriverPostCard({ post, handleDeleteDriver, currentLang, onEditStatusCollection }) {
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
        handleDeleteDriver={handleDeleteDriver}
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
  handleDeleteDriver: PropTypes.func,
  createdAt: PropTypes.string,
  currentLang: PropTypes.string,
  statusCollection: PropTypes.number,
  onEditStatusCollection: PropTypes.func,
};

export function PostContent({
  title,
  index,
  id,
  handleDeleteDriver,
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

  const { user } = useAuth();

  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');

  const handleEditDriver = (id) => {
    navigate(PATH_DASHBOARD.drive.edit(id));
  };

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

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
                  <>
                    <MenuItem
                      onClick={() => {
                        handleCloseMenu();
                        handleDeleteDriver(id);
                      }}
                      sx={{ color: 'error.main' }}
                    >
                      <Iconify icon={'eva:trash-2-outline'} />
                      {t('card.Erase')}
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        handleEditDriver(id);
                        handleCloseMenu();
                      }}
                    >
                      <Iconify icon={'eva:edit-fill'} />
                      {t('card.Edit information')}
                    </MenuItem>
                  </>
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
        <Link
          to={currentLang === 'vi' ? description : descriptionEnglish}
          color="inherit"
          component={RouterLink}
          target="_blank"
        >
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

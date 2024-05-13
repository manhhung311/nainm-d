import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, Link, MenuItem, Stack } from '@mui/material';
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
import Image from '../../components/Image';

// ----------------------------------------------------------------------

FacilityPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  handleDeleteFacility: PropTypes.func,
  onEditStatusCollection: PropTypes.func,
  currentLang: PropTypes.string,
};

export default function FacilityPostCard({ post, handleDeleteFacility, currentLang, onEditStatusCollection }) {
  const {
    title,
    title_english: titleEnglish,
    description,
    description_english: descriptionEnglish,
    status_collection: statusCollection,
    id,
    imgURL,
  } = post;

  return (
    <Card>
      <PostContent
        id={id}
        title={title}
        titleEnglish={titleEnglish}
        description={description}
        descriptionEnglish={descriptionEnglish}
        imgURL={imgURL}
        handleDeleteFacility={handleDeleteFacility}
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
  // description: PropTypes.string,
  // descriptionEnglish: PropTypes.string,
  imgURL: PropTypes.string,
  id: PropTypes.number,
  handleDeleteFacility: PropTypes.func,
  // createdAt: PropTypes.string,
  currentLang: PropTypes.string,
  statusCollection: PropTypes.number,
  onEditStatusCollection: PropTypes.func,
};

export function PostContent({
  title,
  index,
  id,
  handleDeleteFacility,
  onEditStatusCollection,
  // description,
  imgURL,
  currentLang,
  statusCollection,
  titleEnglish,
  // createdAt,
  // descriptionEnglish,
}) {
  const isDesktop = useResponsive('up', 'md');
  const [openMenu, setOpenMenuActions] = useState(null);
  const navigate = useNavigate();

  const { user } = useAuth();

  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');

  const handleEditFacility = (id) => {
    navigate(PATH_DASHBOARD.facility.edit(id));
  };

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const linkTo = isDashboard ? PATH_DASHBOARD.facility.detail(id) : PATH_PAGE.facility.detail(id);

  const latestPostLarge = index === 0;
  const { t } = useLocales();
  return (
    <Card
      sx={{
        pt: 5,
        px: 3,
        // width: 1,
        ...(latestPostLarge && {
          pt: 0,
          zIndex: 99,
          bottom: 0,
          position: 'absolute',
          color: 'common.white',
        }),
      }}
    >
      <Box sx={{ borderRadius: 8 }}>
        <Image alt="cover" src={imgURL} sx={{ height: 280, borderRadius: 1 }} />
      </Box>

      {!latestPostLarge && (
        <Box
          sx={{
            position: 'absolute',
            top: 3,
            right: 1,
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
                        handleDeleteFacility(id);
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
                        handleEditFacility(id);
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

      {/* <Typography */}
      {/*  gutterBottom */}
      {/*  variant="caption" */}
      {/*  component="div" */}
      {/*  sx={{ */}
      {/*    color: 'text.disabled', */}
      {/*    ...(latestPostLarge && { */}
      {/*      opacity: 0.64, */}
      {/*      color: 'common.white', */}
      {/*    }), */}
      {/*  }} */}
      {/* /> */}

      <Stack spacing={1} flexGrow={1}>
        <Link to={linkTo} color="inherit" component={RouterLink} sx={{ pt: 3 }}>
          <TextMaxLine variant={isDesktop ? 'h5' : 'subtitle2'} line={2} persistent>
            {currentLang === 'vi' ? title : titleEnglish}
          </TextMaxLine>
        </Link>
        {/* <TextMaxLine variant="body2" sx={{ color: 'text.secondary' }}> */}
        {/*  {currentLang === 'vi' ? description : descriptionEnglish} */}
        {/* </TextMaxLine> */}
      </Stack>
    </Card>
  );
}

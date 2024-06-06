import React, { useState } from 'react';
// @mui

import { Box, Button, Grid, Typography } from '@mui/material';
// components

import Page from '../components/Page';
import Professor from '../sections/people/Professor';
import Student from '../sections/people/Students';

import useLocales from '../locals/useLocals';
import { TypeUser } from '../constant';

// ----------------------------------------------------------------------

export default function People() {
  const { t } = useLocales();
  const [currentTab, setCurrentTab] = useState(TypeUser.professor);

  const handleTabClick = (tabIndex) => {
    setCurrentTab(tabIndex);
  };
  return (
    <Page title={t('people.page')}>
      <Box>
        <Grid container justifyContent="center" alignItems="center" sx={{ mb: 8, mt: 1, pt: 5 }}>
          <Grid item xs={12} sm={6} md={2} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Button
              sx={{ width: '100%', height: '100%', borderRadius: 0 }}
              size="large"
              variant="outlined"
              style={
                currentTab === TypeUser.professor
                  ? { backgroundColor: '#4BD578', color: '#fff' }
                  : { backgroundColor: '#fff', color: '#000' }
              }
              onClick={() => handleTabClick(TypeUser.professor)}
              className={currentTab === TypeUser.professor ? 'active' : ''}
            >
              <Typography variant="h5" noWrap>
                {t('people.tab1')}
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={2} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Button
              sx={{ width: '100%', height: '100%', borderRadius: 0 }}
              size="large"
              variant="outlined"
              style={
                currentTab === TypeUser.member
                  ? { backgroundColor: '#4BD578', color: '#fff' }
                  : { backgroundColor: '#fff', color: '#000' }
              }
              onClick={() => handleTabClick(TypeUser.member)}
              className={currentTab === TypeUser.member ? 'active' : ''}
            >
              <Typography variant="h5" noWrap>
                {t('people.tab2')}
              </Typography>
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={2} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Button
              sx={{ width: '100%', height: '100%', borderRadius: 0 }}
              size="large"
              variant="outlined"
              style={
                currentTab === TypeUser.oldMember
                  ? { backgroundColor: '#4BD578', color: '#fff' }
                  : { backgroundColor: '#fff', color: '#000' }
              }
              onClick={() => handleTabClick(TypeUser.oldMember)}
              className={currentTab === TypeUser.oldMember ? 'active' : ''}
            >
              <Typography variant="h5" noWrap>
                {t('people.tab3')}
              </Typography>
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={2} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Button
              sx={{ width: '100%', height: '100%', borderRadius: 0 }}
              size="large"
              variant="outlined"
              style={
                currentTab === TypeUser.cooperator
                  ? { backgroundColor: '#4BD578', color: '#fff' }
                  : { backgroundColor: '#fff', color: '#000' }
              }
              onClick={() => handleTabClick(TypeUser.cooperator)}
              className={currentTab === TypeUser.cooperator ? 'active' : ''}
            >
              <Typography variant="h5" noWrap>
                {t('people.tab4')}
              </Typography>
            </Button>
          </Grid>
        </Grid>
        {currentTab === TypeUser.professor && (
          <Box>
            <Professor idProfessor={1} />
          </Box>
        )}
        {currentTab === TypeUser.member && (
          <Box>
            <Student typeUser={TypeUser.member} />
          </Box>
        )}

        {currentTab === TypeUser.oldMember && (
          <Box>
            <Student typeUser={TypeUser.oldMember} />
          </Box>
        )}

        {currentTab === TypeUser.cooperator && (
          <Box>
            <Student typeUser={TypeUser.cooperator} />
          </Box>
        )}
      </Box>
    </Page>
  );
}

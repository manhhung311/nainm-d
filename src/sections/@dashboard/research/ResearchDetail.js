import React, { useEffect, useState } from 'react';
import { Card, Container, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import Stack from '@mui/material/Stack';
import { useLocation, useParams } from 'react-router-dom';
import useLocales from '../../../locals/useLocals';
import useResponsive from '../../../hooks/useResponsive';
import Page from '../../../components/Page';
import Markdown from '../../../components/Markdown';
import { Language } from '../../../constant';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_PAGE } from '../../../routes/paths';

const RootStyle = styled('div')(({ theme, isDashboard }) => ({
  padding: isDashboard ? theme.spacing(0) : theme.spacing(12, 0),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  [theme.breakpoints.up('md')]: {
    padding: isDashboard ? theme.spacing(0) : theme.spacing(15, 7),
  },
}));

const RESEARCH_DETAIL = loader('../../../graphql/queries/collections/DetailCollection.graphql');

export default function ResearchDetail() {
  const { t, currentLang } = useLocales();

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { data: getPost } = useQuery(RESEARCH_DETAIL, {
    variables: {
      id: Number(id),
    },
  });

  useEffect(() => {
    if (getPost) {
      setPost(getPost?.collection);
    }
  }, [getPost]);

  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');
  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');
  return (
    <Page title={t('research.title')}>
      <RootStyle isDashboard={isDashboard}>
        <Grid container spacing={0} alignItems="center" sx={{ px: 3 }}>
          {isMobile ? (
            <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', pb: 3 }}>
              <Typography variant="h4"> {t('research.title')}</Typography>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h4">{t('research.title')}</Typography>
                {isDashboard ? (
                  <></>
                ) : (
                  <HeaderBreadcrumbs
                    links={[
                      { name: t('profile.Home'), href: '/' },
                      {
                        name: t('research.title'),
                        href: PATH_PAGE.research.list,
                      },
                      { name: post && (currentLang.value === Language.VietNam ? post?.title : post?.title_english) },
                    ]}
                  />
                )}
              </Stack>
            </Grid>
          )}
        </Grid>
        {currentLang.value === Language.VietNam && (
          <Container maxWidth={false}>
            {post && (
              <Card>
                <Box sx={{ p: { xs: 3, md: 5 } }}>
                  <Typography variant="h5" sx={{ mb: 5 }}>
                    {post.title}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 5 }}>
                    {post.description}
                  </Typography>
                  <Markdown children={post.collection_Vietnamese} />
                </Box>
              </Card>
            )}
          </Container>
        )}

        {currentLang.value === Language.English && (
          <Container maxWidth={false}>
            {post && (
              <Card>
                <Box sx={{ p: { xs: 3, md: 5 } }}>
                  <Typography variant="h5" sx={{ mb: 5 }}>
                    {post.title_english}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 5 }}>
                    {post.description_english}
                  </Typography>
                  <Markdown children={post.collection_English} />
                </Box>
              </Card>
            )}
          </Container>
        )}
      </RootStyle>
    </Page>
  );
}

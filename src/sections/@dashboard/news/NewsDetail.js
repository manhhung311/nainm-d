import React, { useEffect, useState } from 'react';
import { Card, Container, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { useLocation, useParams } from 'react-router-dom'; // Import _mock
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import _mock from '../../../_mock';
import useLocales from '../../../locals/useLocals';
import useResponsive from '../../../hooks/useResponsive';
import Image from '../../../components/Image';
import Page from '../../../components/Page';
import Markdown from '../../../components/Markdown';
import { Language } from '../../../constant';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  // paddingTop: theme.spacing(12),
  // [theme.breakpoints.up('md')]: {
  //   paddingTop: theme.spacing(16),
  // },
}));

const NEWS_DETAIL = loader('../../../graphql/queries/collections/DetailCollection.graphql');

export default function NewsDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { data: getPost } = useQuery(NEWS_DETAIL, {
    variables: {
      id: Number(id),
    },
  });
  useEffect(() => {
    if (getPost) {
      setPost(getPost?.collection);
    }
  }, [getPost]);

  console.log('post', post);

  const { t, currentLang } = useLocales();
  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');

  console.log('currentLang', currentLang);
  return (
    <Page title={t('news.page1')}>
      <RootStyle>
        <Grid container spacing={1} alignItems="center" sx={{paddingBottom:5, px: 3}}>
          {isMobile ? (
            <>
              <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <Typography variant="h4"> {t('news.title')}</Typography>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <Typography variant="h4">{t('news.title')}</Typography>
              </Grid>
            </>
          )}
        </Grid>

        {currentLang.value === Language.VietNam && post?.title !== '' && (
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

        {currentLang.value === Language.English && post?.title_english !== '' && (
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
                  <Markdown children={post.collection_Vietnamese} />
                </Box>
              </Card>
            )}
          </Container>
        )}
      </RootStyle>
    </Page>
  );
}

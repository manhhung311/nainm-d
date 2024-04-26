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

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  paddingTop: theme.spacing(12),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(16),
  },
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

  const { t } = useLocales();
  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');
  return (
    <Page title={t('news.page1')}>
      <RootStyle>
        <Container maxWidth={false}>
          {post && (
            <Card>
              <Box sx={{ p: { xs: 3, md: 5 } }}>
                <Typography variant="h6" sx={{ mb: 5 }}>
                  {post.description}
                </Typography>
                <Markdown children={post.collection_Vietnamese} />
              </Box>
            </Card>
          )}
        </Container>
        <Grid container spacing={5} alignItems="center">
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

          <Grid item xs={12}>
            {isMobile ? (
              <>
                <Grid item xs={12} sx={{ p: 0, border: 1, borderColor: '#D9D9D9', marginBottom: 5 }}>
                  <Box style={{ paddingTop: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box style={{ width: '100%' }}>
                      <Image
                        alt="avatar"
                        src={'https://tse1.mm.bing.net/th?id=OIP.5Q61x9JoEr1GSUt9m_ocZgHaEH&pid=Api&P=0&h=220'}
                      />
                    </Box>
                  </Box>
                  <Stack style={{ width: '100%', justifyContent: 'center', alignItems: 'center', minHeight: '30px' }}>
                    <Typography variant="caption" style={{ textAlign: 'center' }}>
                      {_mock.text.sentence(1)}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="description" style={{ textAlign: 'center' }}>
                    {_mock.text.description(1)}
                    {_mock.text.description(2)}
                    {_mock.text.description(3)}
                    {_mock.text.description(4)}
                  </Typography>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sx={{ p: 0, border: 1, borderColor: '#D9D9D9', marginBottom: 5 }}>
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box style={{ width: '100%' }}>
                      <Image
                        alt="avatar"
                        src={'https://tse1.mm.bing.net/th?id=OIP.5Q61x9JoEr1GSUt9m_ocZgHaEH&pid=Api&P=0&h=220'}
                      />
                    </Box>
                  </Box>
                  <Stack
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      minHeight: '50px',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography variant="caption" style={{ textAlign: 'center' }}>
                      {_mock.text.sentence(1)}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="description" style={{ textAlign: 'center' }}>
                    {_mock.text.description(1)}
                    {_mock.text.description(2)}
                    {_mock.text.description(3)}
                    {_mock.text.description(4)}
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </RootStyle>
    </Page>
  );
}

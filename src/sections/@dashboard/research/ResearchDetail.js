import React, { useEffect, useMemo, useState } from 'react';
import { Card, Container, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import { useLocation } from 'react-router-dom';
import useLocales from '../../../locals/useLocals';
import useResponsive from '../../../hooks/useResponsive';
import Page from '../../../components/Page';
import Markdown from '../../../components/Markdown';
import {
  defaultCollectionENG,
  defaultCollectionVN,
  Language,
  StatusCollection,
  TypeCollection as statusCollection,
  TypeCollection,
} from '../../../constant';
import RHFAutocompleteCollectionVN from '../../../components/hook-form/RHFAutocompleteCollectionVN';
import { FormProvider } from '../../../components/hook-form';
import RHFAutocompleteCollectionENG from '../../../components/hook-form/RHFAutocompleteCollectionENG';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_PAGE } from '../../../routes/paths';

const RootStyle = styled('div')(({ theme, isDashboard }) => ({
  padding: isDashboard ? theme.spacing(0) : theme.spacing(2, 0),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  [theme.breakpoints.up('md')]: {
    padding: isDashboard ? theme.spacing(0) : theme.spacing(5, 2),
  },
}));

const RESEARCH_DETAIL = loader('../../../graphql/queries/collections/DetailCollection.graphql');

export default function ResearchDetail() {
  const { t, currentLang } = useLocales();

  const defaultValues = useMemo(
    () => ({
      typeCollection: TypeCollection.Research,
      statusCollection: statusCollection.Research,
      research: currentLang.value === Language.VietNam ? defaultCollectionVN : defaultCollectionENG,
    }),
    [currentLang]
  );
  const methods = useForm({
    defaultValues,
  });
  const { watch, reset } = methods;

  const values = watch();
  const [post, setPost] = useState(null);
  const { data: getPost } = useQuery(RESEARCH_DETAIL, {
    variables: {
      id: Number(values?.research?.id),
    },
  });

  useEffect(() => {
    if (getPost && getPost.collection) {
      setPost(getPost.collection);
    } else if (values?.research?.id === 0) {
      setPost(null);
    }
  }, [getPost, values?.research?.id]);

  useEffect(() => {
    if (currentLang) {
      reset(defaultValues);
    }
  }, [currentLang, defaultValues, reset]);

  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');
  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');
  return (
    <FormProvider methods={methods}>
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
            {currentLang.value === Language.VietNam ? (
              <Grid item xs={12} md={3}>
                <RHFAutocompleteCollectionVN
                  name="research"
                  statusCollection={StatusCollection.Public}
                  typeCollection={TypeCollection.Research}
                  defaultValue={post} // Giá trị mặc định là bài viết từ query
                />
              </Grid>
            ) : (
              <Grid item xs={12} md={3}>
                <RHFAutocompleteCollectionENG
                  name="research"
                  statusCollection={StatusCollection.Public}
                  typeCollection={TypeCollection.Research}
                  defaultValue={post} // Giá trị mặc định là bài viết từ query
                />
              </Grid>
            )}
          </Grid>
          {currentLang.value === Language.VietNam && (
            <Container maxWidth={false}>
              {post && (
                <Card sx={{ pt: 3, px: 5, minHeight: 100, mt: 3 }}>
                  <Typography variant="h5">{post.title}</Typography>
                  <Typography variant="h6">{post.description}</Typography>
                  <Markdown children={post.collection_Vietnamese} />
                </Card>
              )}
            </Container>
          )}

          {currentLang.value === Language.English && (
            <Container maxWidth={false}>
              {post && (
                <Card sx={{ pt: 3, px: 5, minHeight: 100, mt: 3 }}>
                  <Typography variant="h5" sx={{ mb: 5 }}>
                    {post.title_english}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 5 }}>
                    {post.description_english}
                  </Typography>
                  <Markdown children={post.collection_English} allowFullScreen />
                </Card>
              )}
            </Container>
          )}

          {!post?.title_english && currentLang.value === Language.English && (
            <Container maxWidth={false}>
              <Card sx={{ pt: 3, px: 5, minHeight: 100, mt: 3 }}>
                <Typography textAlign={'center'} variant="h6">
                  {t('card.noPostsYet')}
                </Typography>
              </Card>
            </Container>
          )}

          {!post?.title && currentLang.value === Language.VietNam && (
            <Card sx={{ pt: 3, px: 5, minHeight: 100, mt: 3 }}>
              <Box sx={{ p: { xs: 3, md: 5 } }}>
                <Typography textAlign={'center'} variant="h6">
                  {t('card.noPostsYet')}
                </Typography>
              </Box>
            </Card>
          )}
        </RootStyle>
      </Page>
    </FormProvider>
  );
}

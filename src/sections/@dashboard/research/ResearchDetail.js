import React, { useEffect, useMemo, useState } from 'react';
import { Card, Container, Typography, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useForm } from 'react-hook-form';
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

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5),
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

  return (
    <FormProvider methods={methods}>
      <Page title={t('research.page1')}>
        <RootStyle>
          <Grid container spacing={1} alignItems="center" sx={{ paddingBottom: 5, px: 3 }}>
            {isMobile ? (
              <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <Typography variant="h4"> {t('research.title')}</Typography>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Typography variant="h4">{t('research.title')}</Typography>
              </Grid>
            )}
            {currentLang.value === Language.VietNam ? (
              <Grid item xs={12} md={4}>
                <RHFAutocompleteCollectionVN
                  name="research"
                  statusCollection={StatusCollection.Public}
                  typeCollection={TypeCollection.Research}
                  defaultValue={post} // Giá trị mặc định là bài viết từ query
                />
              </Grid>
            ) : (
              <Grid item xs={12} md={4}>
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
                    <Markdown children={post.collection_English} allowFullScreen />
                  </Box>
                </Card>
              )}
            </Container>
          )}

          {!post?.title_english && currentLang.value === Language.English && (
            <Card sx={{ pt: 3, px: 5, minHeight: 100, mt: 3, mx: 3 }}>
              <Typography textAlign={'center'} variant="h6">
                {t('card.noPostsYet')}
              </Typography>
            </Card>
          )}

          {!post?.title && currentLang.value === Language.VietNam && (
            <Card sx={{ pt: 3, px: 5, minHeight: 100, mt: 3, mx: 3 }}>
              <Typography textAlign={'center'} variant="h6">
                {t('card.noPostsYet')}
              </Typography>
            </Card>
          )}
        </RootStyle>
      </Page>
    </FormProvider>
  );
}

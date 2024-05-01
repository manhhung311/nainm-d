import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, Card, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom'; // Import _mock
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import _mock from '../../_mock';
import { _researchData } from '../../_mock/_research';
import useLocales from '../../locals/useLocals';
import useResponsive from '../../hooks/useResponsive';
import useAuth from '../../hooks/useAuth';
import useTabs from '../../hooks/useTabs';
import { TypeCollection } from '../../constant';
import { PATH_DASHBOARD } from '../../routes/paths';
import Iconify from '../../components/Iconify';
import Label from '../../components/Label';
import ResearchPostCard from './ResearchCard';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5),
  },
}));
const TABS = [
  {
    value: 1,
    label: 'Công bố',
    color: 'success',
  },
  {
    value: 0,
    label: 'Chờ Duyệt',
    color: 'info',
  },
  {
    value: 2,
    label: 'Ẩn',
    color: 'default',
  },
];
const LIST_ALL_RESEARCH = loader('../../graphql/queries/collections/ListCollections.graphql');

export default function ResearchMain() {
  const options = [
    { label: _mock.text.title(1), id: 1 }, // Lấy tiêu đề từ _mock
    { label: _mock.text.title(2), id: 2 },
    { label: _mock.text.title(3), id: 3 },
    { label: _mock.text.title(4), id: 4 },
    { label: _mock.text.title(5), id: 5 },
  ];
  const { t } = useLocales();

  const { user } = useAuth();

  const [research, setResearch] = useState([]);

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs(1);

  const { data: getAllPosts } = useQuery(LIST_ALL_RESEARCH, {
    variables: {
      input: {
        status_collection: filterStatus,
        type_collection: TypeCollection.Research,
      },
    },
  });
  useEffect(() => {
    if (getAllPosts) {
      setResearch(getAllPosts?.collections);
    }
  }, [getAllPosts]);

  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');

  console.log('_researchData', _researchData);
  const x = 'https://www.youtube.com/watch?v=ufYmo2z_Hls';
  return (
    <RootStyle>
      <Grid container spacing={5} alignItems="center">
        {isMobile ? (
          <>
            <Grid item xs={7}>
              <Typography variant="h4">{t('research.title')}</Typography>
            </Grid>

            <Grid item xs={5}>
              <Stack>
                {user && (
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to={PATH_DASHBOARD.research.new}
                    startIcon={<Iconify icon={'eva:plus-fill'} />}
                  >
                    Tạo mới
                  </Button>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={options}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Search" />}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={10}>
              <Typography variant="h4">{t('research.title')}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Stack>
                {user && (
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to={PATH_DASHBOARD.research.new}
                    startIcon={<Iconify icon={'eva:plus-fill'} />}
                  >
                    Tạo mới
                  </Button>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={options}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Search" />}
              />
            </Grid>
          </>
        )}
      </Grid>

      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={filterStatus}
        onChange={onFilterStatus}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        {TABS.map((tab, idx) => (
          <Tab
            disableRipple
            key={idx + 1}
            value={tab.value}
            label={
              <Stack spacing={1} direction="row" alignItems="center">
                <div>{tab.label}</div> <Label color={tab.color}> </Label>
              </Stack>
            }
          />
        ))}
      </Tabs>
      {research.length === 0 && (
        <Card sx={{ pt: 3, px: 5, minHeight: 100, mt: 3 }}>
          <Typography textAlign={'center'} variant="h6">
            Chưa có bài viết nào
          </Typography>
        </Card>
      )}

      <Grid container spacing={3}>
        {research.length > 0 &&
          research.map((post, index) => (
            <Grid key={post?.id} item xs={12} sm={6} md={4}>
              <ResearchPostCard post={post} index={index} />
            </Grid>
          ))}
      </Grid>
    </RootStyle>
  );
}

import { useQuery } from '@apollo/client';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { loader } from 'graphql.macro';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Image from '../../components/Image';
import { TypeCollection, StatusCollection, Language } from '../../constant';
import useResponsive from '../../hooks/useResponsive';
import useLocales from '../../locals/useLocals';

const LIST_ALL_PUBLICATION = loader('../../graphql/queries/collections/ListCollections.graphql');

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function HomeHero() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const { t, currentLang } = useLocales();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const [info, setInfo] = useState([]);

  const { data: collection } = useQuery(LIST_ALL_PUBLICATION, {
    variables: {
      input: {
        status_collection: StatusCollection.Public,
        type_collection: TypeCollection.Publication,
        stand_out: true,
        page: 1,
        limit: 999,
      },
    },
  });
  useEffect(() => {
    if (collection) {
      setInfo(collection?.collections);
    }
  }, [collection]);

  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');

  const newImages = info.map((item, index) => ({
    id: item.id,
    label: index + 1,
    title: item.title,
    titleEnglish: item.title_english,
    content: item.description,
    contentEnglish: item.description_english, // Trường 'description' sẽ lấy giá trị từ trường 'Content' của mỗi phần tử trong mảng 'images'
    imgPath: item.imgURL,
  }));
  const maxSteps = newImages.length;

  return (
    <Box
      style={{
        width: '100%',
        height: '810px',
        backgroundImage: 'url("https://smim.kaist.ac.kr/resources/wis-layout/images/main/section_bg.jpg")',
      }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '630px',
          width: '100%',
          maxWidth: '1680px',
          margin: '0 auto',
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {!isMobile && (
            <Grid item xs={1} md={1}>
              <IconButton size="large" onClick={handleBack} disabled={activeStep === 0}>
                <ArrowBackIosNewIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          )}
          <Grid item xs={12} sm={10} md={10}>
            <AutoPlaySwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {newImages.map((step, index) => (
                <Box key={index} sx={{ mx: 1 }}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Grid
                      container
                      spacing={5}
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        flexDirection: { sm: 'row', md: 'row' },
                        textAlign: { xs: 'center', sm: 'start', md: 'start' },
                      }}
                    >
                      {isMobile ? (
                        <>
                          <Grid item xs={12} sm={6} md={6}>
                            <Grid
                              container
                              alignItems="center"
                              justifyContent="center"
                              spacing={2}
                              sx={{
                                flexDirection: { xs: 'column', sm: 'row', md: 'row' },
                                textAlign: { xs: 'center', sm: 'start', md: 'start' },
                              }}
                            >
                              <Grid item xs={12}>
                                <Typography
                                  variant="h4"
                                  gutterBottom
                                  sx={{
                                    border: '1px solid #82f9d4',
                                    color: '#82f9d4',
                                    height: '50px',
                                    width: '50px',
                                    fontSize: '0.95rem',
                                    textAlign: 'center',
                                    lineHeight: '50px',
                                  }}
                                >
                                  {step.label}
                                </Typography>
                              </Grid>

                              <Grid item xs={12}>
                                <Typography variant="h3" color="#82f9d4">
                                  {currentLang.value === Language.VietNam ? step.title : step.titleEnglish}
                                </Typography>
                              </Grid>

                              <Grid item xs={12}>
                                <Typography variant="subtitle1" color="#fff">
                                  {currentLang.value === Language.VietNam ? step.content : step.contentEnglish}
                                </Typography>
                              </Grid>

                              <Grid item xs={12}>
                                <Link
                                  to={`/publication/${step.id}/detail`}
                                  style={{
                                    textDecoration: 'none',
                                    color: '#fff',
                                    '&:hover': {
                                      textDecoration: 'none',
                                      color: '#fff',
                                    },
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      height: '80%',
                                      width: '140px',
                                      color: '#fff',
                                      display: 'flex', // Sử dụng flexbox
                                      alignItems: 'center', // Căn chỉnh theo chiều dọc
                                      border: '1px solid #fff',
                                      padding: '4px 8px', // Khoảng cách viền và chữ
                                    }}
                                  >
                                    {t('user.MoreView')}
                                    <ArrowRightAltIcon sx={{ marginLeft: '8px' }} />
                                  </Typography>
                                </Link>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <Image ratio="16/9" src={step.imgPath} alt={step.label} />
                          </Grid>
                        </>
                      ) : (
                        <>
                          <Grid item xs={12} sm={6} md={6}>
                            <Image ratio="16/9" src={step.imgPath} alt={step.label} />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <Grid
                              container
                              alignItems="center"
                              justifyContent="center"
                              spacing={2}
                              sx={{
                                flexDirection: { xs: 'column', sm: 'row', md: 'row' },
                                textAlign: { xs: 'center', sm: 'start', md: 'start' },
                              }}
                            >
                              <Grid item xs={12}>
                                <Typography
                                  variant="h4"
                                  gutterBottom
                                  sx={{
                                    border: '1px solid #82f9d4',
                                    color: '#82f9d4',
                                    height: '50px',
                                    width: '50px',
                                    fontSize: '0.95rem',
                                    textAlign: 'center',
                                    lineHeight: '50px',
                                  }}
                                >
                                  {step.label}
                                </Typography>
                              </Grid>

                              <Grid item xs={12}>
                                <Typography variant="h3" color="#82f9d4">
                                  {currentLang.value === Language.VietNam ? step.title : step.titleEnglish}
                                </Typography>
                              </Grid>

                              <Grid item xs={12}>
                                <Typography variant="subtitle1" color="#fff">
                                  {currentLang.value === Language.VietNam ? step.content : step.contentEnglish}
                                </Typography>
                              </Grid>

                              <Grid item xs={12}>
                                <Link
                                  to={`/publication/${step.id}/detail`}
                                  style={{
                                    textDecoration: 'none',
                                    color: '#fff',
                                    '&:hover': {
                                      textDecoration: 'none',
                                      color: '#fff',
                                    },
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      height: '80%',
                                      width: '140px',
                                      color: '#fff',
                                      display: 'flex', // Sử dụng flexbox
                                      alignItems: 'center', // Căn chỉnh theo chiều dọc
                                      border: '1px solid #fff',
                                      padding: '4px 8px', // Khoảng cách viền và chữ
                                    }}
                                  >
                                    {t('user.MoreView')}
                                    <ArrowRightAltIcon sx={{ marginLeft: '8px' }} />
                                  </Typography>
                                </Link>
                              </Grid>
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  ) : null}
                </Box>
              ))}
            </AutoPlaySwipeableViews>
          </Grid>
          {!isMobile && (
            <Grid item xs={1} md={1}>
              <IconButton size="large" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                <ArrowForwardIosIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Link } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
import Image from '../../components/Image';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: '1',
    title: 'Artificial Muscle and Soft Robotics',
    Content: 'We focus on the development of soft actuators and artificial muscle, which can be applied to intra/extra human body robotics, haptic-feedback systems, wearable power suits, and flexible and soft electronics.',
    imgPath: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: '2',
    title: 'Energy Harvesting and Triboelectricity',
    Content: 'We design energy harvesting systems and triboelectric nanogenerators (TENGs),which can produce electricity from mechanical kinetic energy.',
    imgPath: 'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: '3',
    title: ' Energy Storage and Structural Battery',
    Content: 'We develop structural battery possessing both load bearing capability and energy storage function.The structural batteries are crucial to the next-generation transportation vehicles such as UAV, UAM, and electrical vehicles.',
    imgPath: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  },
  {
    label: '4',
    title: 'Mechanical Metamaterial and Smart Structures',
    Content: 'We investigate mechanical metamaterials and topological insulators,which show the unparalleled wave transmission and acoustic bandgap.',
    imgPath:
      'https://ghepanhpro.com/uploads/w450/2021/09/02/tao-khung-anh-xe-giay-online61306a9ad4e9d_f6f9f92616193460e8380b0a8bb630f7.jpg',
  },
];

export default function HomeHero() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleItemClick = (index) => {
    setActiveStep(index);
  };

  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');
  const isDesktop = useResponsive('between', 'xs', 'xs', 'lg');
  console.log('isMobile', isMobile);

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
          width: '90%',
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
              {images.map((step, index) => (
                <Box key={step.label} sx={{ mx: 1 }}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      justifyContent="center"
                      sx={{ flexDirection: { xs: 'column-reverse', sm: 'row', md: 'row' } }}
                    >
                      <Grid item xs={12} sm={6} md={4}>
                        <img style={{ height: '400px', width: '100%' }} src={step.imgPath} alt={step.label} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={8} >
                        <Typography
                          variant="h4"
                          gutterBottom
                          sx={{
                            border: '1px solid #82f9d4',
                            color: '#82f9d4',
                            height: '50px',
                            width: '50px',
                            fontSize: '0.1rem',
                            textAlign: 'center',
                            lineHeight: '50px',

                          }}
                        >
                          {step.label}
                        </Typography>
                        <Typography variant="h3" color="#82f9d4">
                          {step.title}
                        </Typography>
                        <Typography variant="subtitle1" color='#fff' >
                          {step.Content}
                        </Typography>
                        <Link to="/more-view" sx={{
                          height: '50px',
                        }}>More View</Link>
                      </Grid>
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
      {!isDesktop && (
        <Box
          sx={{
            backgroundColor: '#696969',
            width: '100%',
            height: '22.2%',
            color: '#fff',
            alignSelf: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Grid container spacing={0} alignItems="center" justifyContent="center">
            <Grid item xs={1} md={0.5} />

            <Grid item xs={12} md={2.2} sx={{ alignSelf: 'center', textAlign: 'center', alignItems: 'center' }}>
              <Box
                onClick={() => handleItemClick(4)} // Chuyển đến hình ảnh 1 khi click vào mục "Articial Muscle and Soft Robottics"
                sx={{
                  maxWidth: '210px',
                  color: '#fff',
                  alignSelf: 'center',
                  textAlign: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h4" gutterBottom sx={{ cursor: 'pointer' }}>
                  Lab Overview
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={2.2}>
              <Box
                onClick={() => handleItemClick(0)} // Chuyển đến hình ảnh 2 khi click vào mục "Energy Harvesting and Triboelectricity"
                sx={{ maxWidth: '210px', display: 'flex', color: '#fff' }}
              >
                <Box sx={{ width: '48px', height: '27px', fontSize: '1.5rem' }}>01</Box>
                <Box>
                  <Typography variant="h7" gutterBottom sx={{ cursor: 'pointer' }}>
                    Articial Muscle and Soft Robottics
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={2.2}>
              <Box
                onClick={() => handleItemClick(1)} // Chuyển đến hình ảnh 3 khi click vào mục "Energy Storage and Structural Battery"
                sx={{ maxWidth: '210px', display: 'flex', color: '#fff' }}
              >
                <Box sx={{ width: '48px', height: '27px', fontSize: '1.5rem' }}>02</Box>
                <Box>
                  <Typography variant="h7" gutterBottom sx={{ cursor: 'pointer' }}>
                    Energy Harvesting and Triboelectricity
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={2.2}>
              <Box
                onClick={() => handleItemClick(2)} // Chuyển đến hình ảnh 4 khi click vào mục "Mechnical Metamaterial and Smart Structures"
                sx={{ maxWidth: '210px', display: 'flex', color: '#fff' }}
              >
                <Box sx={{ width: '48px', height: '27px', fontSize: '1.5rem' }}>03</Box>
                <Box>
                  <Typography variant="h7" gutterBottom sx={{ cursor: 'pointer' }}>
                    Energy Storage and Structural Battery
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={2.2}>
              <Box
                onClick={() => handleItemClick(3)} // Chuyển đến hình ảnh 5 khi click vào mục "Mechnical Metamaterial and Smart Structures"
                sx={{ maxWidth: '210px', display: 'flex', color: '#fff' }}
              >
                <Box sx={{ width: '48px', height: '27px', fontSize: '1.5rem' }}>04</Box>
                <Box>
                  <Typography variant="h7" gutterBottom sx={{ cursor: 'pointer' }}>
                    Mechnical Metamaterial and Smart Structures
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={1} md={0.5} />
          </Grid>
        </Box>
      )}
    </Box>
  );
}

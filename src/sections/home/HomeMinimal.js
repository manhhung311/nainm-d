import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

HomeMinimal.propTypes = {};
function HomeMinimal(props) {
  const [data] = useState([
    {
      number: '30000000',
      name: 'H. Yoo†, M. Mahato†, J. -S. Kim, S. Oh, M. Garai, V. H. Nguyen, A. K. Taseer, M. -J. Lee, I. -K. Oh *',
      content: 'Janus CoMOF-SEBS Membrane for Bifunctional Dielectric Layer in Triboelectric Nanogenerators',
      link: 'Advanced Science (IF=17.521)',
      if: 'ACCEPTED',
      imgPath: 'https://smim.kaist.ac.kr/files/boards/journal_board/046239ac3c23f3a076011326589b84d9.png',
    },
    {
      number: '2023.12.21',
      name: 'P. Sathiyanathan, D. Saatchi, Y. Boo, M. Mahato, B. Wicklein, J. -S. Kim, H. Yoo, T. -E. Song, A. K. Taseer, W. -J. Kim, I. -K. Oh*',
      content:
        'Nitrogen and Sulfur Rich Covalent Organic Framework-Chitosan Triboelectric Nanogenerator for Disposable Urination Evaluation Tool',
      link: 'ADVANCED MATERIALS TECHNOLOGIES (IF = 8.39)',
      if: 'ACCEPTED',
      imgPath: 'https://smim.kaist.ac.kr/files/boards/journal_board/e9d4a0900ad1553b564914e76c46dee1.jpg',
    },
    {
      number: '2023.12.13',
      name: 'M. Mahato, M. Garai, V. H. Nguyen, S. Oh, S. Nam, X. Zeng, H. Yoo, R. Tabassian,* and I.-K. Oh*',
      content:
        ' Polysulfonated Covalent Organic Framework as Active Electrode Host for Mobile Cation Guests in Electrochemical Soft Actuator',
      link: 'Science Advances (IF = 14.136)',
      if: 'Void.9,Issue 50',
      imgPath: 'https://smim.kaist.ac.kr/files/boards/journal_board/e51658b30d4f6c46413405d2a3aa5551.jpg',
    },
  ]);
  const [displayedData, setDisplayedData] = useState(data[0]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleBoxClick = (index) => {
    setDisplayedData(data[index]);
  };

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <img
        src="https://smim.kaist.ac.kr/resources/wis-layout/images/main/planet_01.png"
        alt="Planet"
        style={{
          content: '',
          position: 'absolute',
          top: '-350px',
          right: '0',
          zIndex: '-10',
          width: '934px',
          height: '894px',
          backgroundImage: 'url(https://smim.kaist.ac.kr/resources/wis-layout/images/main/planet_01.png)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          transformOrigin: '540px 430px',
          opacity: '1',
          transition: 'opacity .3s',
          animation: 'spin 18s infinite linear',
        }}
      />
      <style>
        {`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    .box {
                        transition: background-color 0.3s ease;
                    }
                    .box:hover {
                        background-color: #85ffd8;
                    }
                `}
      </style>
      <Box sx={{ py: 10, mb: 20 }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={0.5} md={1.57} />
          <Grid spacing={2} item xs={11} md={8.86}>
            <Typography variant="h3" gutterBottom sx={{ color: '#3459c1', height: '63px' }}>
              Recent Publication
            </Typography>

            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
              flexDirection={{ xs: 'column-reverse', md: 'row' }}
            >
              <Grid item xs={12} md={7} sx={{ backgroundColor: '#F6F6F7', padding: 5 }}>
                <Typography variant="subtitle2" sx={{ color: '#878787' }}>
                  {displayedData.number}
                </Typography>
                <Typography variant="body1" item>
                  {displayedData.name}
                </Typography>
                <Typography variant="subtitle2">{displayedData.content}</Typography>
                <Box sx={{ display: 'flex' }}>
                  <Link sx={{ color: '#3549c1', fontSize: '90px' }} to="/">
                    {displayedData.link}
                  </Link>
                  <Typography variant="subtitle2" sx={{ paddingLeft: '4px' }}>
                    {displayedData.if}
                  </Typography>
                </Box>
                <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ paddingTop: '20px' }}>
                  <Grid item xs={3} md={3.75} />
                  <Grid item xs={6} md={4.5}>
                    <img
                      src={displayedData.imgPath}
                      alt="Publication"
                      style={{
                        maxHeight: '243px',
                        width: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Grid>
                  <Grid item xs={3} md={3.75} />
                </Grid>
              </Grid>
              <Grid xs={12} md={5} sx={{ padding: '2px', backgroundColor: '#ffff', cursor: 'pointer' }}>
                <Grid container spacing={0} sx={{ flexDirection: { xs: 'row', sm: 'row', md: 'column' } }}>
                  {data.map((item, index) => (
                    <Grid
                      spacing={2}
                      item
                      xs={12}
                      md={12}
                      key={index}
                      sx={{
                        backgroundColor: hoveredIndex === index ? '#85ffd8' : '#ffff',
                        padding: 1,
                        transition: 'background-color 0.3s ease',
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <Box onClick={() => handleBoxClick(index)}>
                        <Typography variant="subtitle2" sx={{ color: '#878787' }}>
                          {item.number}
                        </Typography>
                        <Typography variant="subtitle2">{item.content}</Typography>
                        <Stack>
                          <Link sx={{ color: '#3549c1' }} to="/">
                            <Typography variant="subtitle2" sx={{ paddingLeft: '4px' }}>
                              {item.link}
                            </Typography>
                          </Link>
                          <Typography variant="subtitle2" sx={{ paddingLeft: '4px' }}>
                            {item.if}
                          </Typography>
                        </Stack>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={0.5} md={1.57} />
        </Grid>
      </Box>
    </Box>
  );
}

export default HomeMinimal;

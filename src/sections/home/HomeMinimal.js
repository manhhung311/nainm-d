import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

HomeMinimal.propTypes = {};
const content = [
    {
        number: '30000000',
        label: ''
    },
];

function HomeMinimal(props) {

    return (
        <Box
            sx={{
                height: '733px',
                width: '100%',
                position: 'relative', // Cần thiết để xác định vị trí của hình ảnh quả cầu
                overflow: 'hidden', // Ẩn phần dư thừa của container
            }}
        >
            <img
                src="https://smim.kaist.ac.kr/resources/wis-layout/images/main/planet_01.png"
                alt="Planet"
                style={{
                    content: '',
                    position: 'absolute',
                    top: '-350px',
                    right: '0', // Di chuyển hình ảnh sang bên phải của màn hình
                    zIndex: '-10',
                    width: '934px', // Giữ nguyên kích thước gốc
                    height: '894px', // Giữ nguyên kích thước gốc
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
                `}
            </style>
            <Box sx={{ height: '100%', py: 10 }}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={0.5} md={1.57}></Grid>
                    <Grid item xs={11} md={8.86} sx={{ height: '63px' }}>
                        <Typography variant="h3" gutterBottom sx={{ color: '#3459c1', height: '63px' }}>
                            Recent Publication
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Grid item xs={12} md={7} sx={{ backgroundColor: '#F6F6F7', padding: '30px' }}>
                                <Typography variant='subtitle2' sx={{ color: '#878787' }}>
                                    3000.00.00
                                </Typography>
                                <Typography variant="body1" item>
                                    H. Yoo†, M. Mahato†, J. -S. Kim, S. Oh, M. Garai, V. H. Nguyen, A. K. Taseer, M. -J. Lee, I. -K. Oh *
                                </Typography>
                                <Typography variant="subtitle2">
                                    Janus CoMOF-SEBS Membrane for Bifunctional Dielectric Layer in Triboelectric Nanogenerators
                                </Typography>
                                <Box sx={{ display: 'flex' }}>
                                    <Link sx={{ color: '#3549c1', fontSize: '90px' }} to='/'>Advanced Science (IF=17.521)</Link>
                                    <Typography variant="subtitle1" sx={{ paddingLeft: '4px' }}>
                                        ACCEPTED
                                    </Typography>
                                </Box>
                                <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ paddingTop: '20px' }}>
                                    <Grid item xs={3} md={3.75}></Grid>
                                    <Grid item xs={6} md={4.5}>
                                        <img src="https://smim.kaist.ac.kr/files/boards/journal_board/046239ac3c23f3a076011326589b84d9.png" />
                                    </Grid>
                                    <Grid item xs={3} md={3.75}></Grid>
                                </Grid>
                            </Grid>
                            <Grid xs={7} md={5} sx={{ height: '440px', padding: '2px', backgroundColor: '#fff' }}>
                                <Box sx={{ height: '33.33%', padding: '30px' }}>
                                    <Typography variant='subtitle2' sx={{ color: '#878787' }}>
                                        3000.00.00
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Janus CoMOF-SEBS Membrane for Bifunctional Dielectric Layer in Triboelectric Nanogenerators
                                    </Typography>
                                    <Box sx={{ display: 'flex' }}>
                                        <Link sx={{ color: '#3549c1', fontSize: '90px' }} to='/'>Advanced Science (IF=17.521)</Link>
                                        <Typography variant="subtitle1" sx={{ paddingLeft: '4px' }}>
                                            ACCEPTED
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ height: '33.33%', padding: '30px' }}>fefe</Box>
                                <Box sx={{ height: '33.33%', padding: '30px' }}>fefe</Box>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={0.5} md={1.57}></Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default HomeMinimal;

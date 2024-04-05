import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import TodoForm from 'src/pages/dashboard/user/TodoForm';


function NewUser(props) {
    const handleTodoFormSubmit = (values) => {
        console.log('Form sumit:', values)
    };
    return (
        <Box sx={{ height: '958px', width: '1623px' }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={1} md={1} />
                <Grid item xs={10} md={10} sx={{ height: '100%', width: '100%' }}>
                    <Typography variant="h3" gutterBottom>
                        Create a new user
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Grid item xs={5} md={3} sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1 } }}>
                            <Paper elevation={3}>
                                <Box sx={{ width: '100%', height: '100%' }}>
                                    <img src='https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/168111/Originals/hinh%20nen%20may%20tinh%20dep%20(13)(1).jpg' style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Hình ảnh mô tả" />
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={5} md={7}>
                            What todo
                            <TodoForm onSubmit={handleTodoFormSubmit} />

                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={1} md={1} />
            </Grid>
        </Box>
    );
}

export default NewUser;

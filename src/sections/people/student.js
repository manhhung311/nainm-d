import { Box } from '@mui/material';
import React from 'react';
import Image from '../../components/Image';

export default function Student() {
  return (
    <Box>
      <Image
        alt="preview"
        src="https://img4.thuthuatphanmem.vn/uploads/2020/08/27/anh-dai-dien-zalo-cuc-ngau_052909187.jpg"
        ratio="4/5"
        sx={{ borderRadius: 2 }}
      />
    </Box>
  );
}

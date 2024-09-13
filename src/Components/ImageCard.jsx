import { Box } from '@mui/material';
import React from 'react';

const ImageCard = ({ imageUrl }) => {
    return (
        <Box sx={{
            width: 374,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
        }}>
            <Box
                component={'img'}
                src={imageUrl}
                alt='image'
                sx={{
                    width: 374,
                    height: 359,
                    borderRadius: "10px 10px 0px 0px"
                }} />
        </Box>
    );
}

export default ImageCard;
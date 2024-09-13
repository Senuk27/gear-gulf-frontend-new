import {Avatar, Box, Rating, Typography} from '@mui/material'
import face from '../assets/face.png';

const Review = ({review}) => {
    console.log("review :", review);

    return (
        <Box sx={{
            width: 354,
            height: 152,
            bgcolor: '#EBEBEB',
            borderRadius: '10px',
            position: 'relative',
            display: 'flex',
            // alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Avatar src={face} alt={'image'} sx={{
                width: 80,
                height: 80,
                position: 'absolute',
                top: -40,
                left: 15,
            }}/>
            <Rating
                value={Number(review.starValue)}
                readOnly
                sx={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                }}/>

            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 13,
                    fontWeight: 500,
                    // lineHeight: '12px',
                    color: '#757575',
                    width: 297,
                    height: 75,
                    overflow: 'auto',
                    scrollbarWidth: 'none',
                    mt: 6,
                    textAlign: 'center',
                }}>
                    {review?.feedback}
                </Typography>
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 10,
                    fontWeight: 500,
                    color: '#757575',
                    width: 297,
                    height: 75,
                    mt: 2,
                    overflow: 'auto',
                    scrollbarWidth: 'none',
                    textAlign: 'center',
                }}>
                    By {review?.userName}
                </Typography>
            </Box>

        </Box>
    )
}

export default Review
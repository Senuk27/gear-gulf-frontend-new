import {Box, Button, Grid, IconButton, Pagination, Rating, Typography, colors, TextField,} from '@mui/material'
import car from '../../assets/car.png'
import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Card from '../../Components/Card';
import car1 from '../../assets/car1.png';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Review from '../../Components/Review';
import BidDialog from '../../Components/BidDialog';
import {getVehicles} from '../../services/ApiService';
import {Controller, useForm} from "react-hook-form";
import NewService from '../../services/NewService';
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Home = () => {

    const {control, handleSubmit, reset} = useForm({
        defaultValues: {
            name: "",
            rating: 3,
            feedback: "",
        },
    });

    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [cards, setCards] = useState(null);
    const [pagesCount, setPagesCount] = useState(0);
    const [feedbacks, setFeedbacks] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isFeedbackSaved, setIsFeedbackSaved] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const pageCount = 3

    const handleChange = (event, value) => {
        setPage(value);
        console.log(value);
    };

    const fetchVehicles = async () => {
        const data = {
            page: page - 1,
            pageCount: pageCount,
        }
        try {
            const response = await getVehicles(data);
            console.log("home", response)
            const newCards = response.vehicles.content.map(vehicle => ({
                id: vehicle.vehicleId,
                title: vehicle.vehicleName,
                image: vehicle.imageName,
                description: vehicle.description,
                price: vehicle.bidAmount,
                isButtonActive: true
            }));
            setPagesCount(response.vehicles.totalPages)
            setCards(newCards);
        } catch (err) {
            console.log("error fetching vehicles", err);
        }
    }

    useEffect(() => {
        fetchVehicles();
    }, [page]);

    useEffect(() => {
        fetchFeedbacks();
    }, [isFeedbackSaved]);

    const fetchFeedbacks = async () => {
        try {
            const response = await NewService.getAllFeedbacks();
            console.log("feedbacks", response);

            if (response?.status === "200") {
                setFeedbacks(response?.feedbackList);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const scrollReviews = (direction) => {
        const container = document.getElementById("reviews-container");
        const scrollAmount = 400; // Adjust this value as needed
        if (container) {
            if (direction === "left") {
                container.scrollBy({left: -scrollAmount, behavior: "smooth"});
            } else {
                container.scrollBy({left: scrollAmount, behavior: "smooth"});
            }
        }
    };

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const feedbackSaveResponse = await NewService.saveFeedBack({
                feedback: data.feedback,
                userId: localStorage.getItem("userId"),
                starValue: parseInt(data.rating),
                userName: data.name,
            });

            console.log("feedback response", feedbackSaveResponse);
            setOpenSnackbar(true);
            setAlertMessage("Feedback Submitted Successfully!");
            setIsFeedbackSaved(!isFeedbackSaved);
            setIsSuccess(true);

            reset({
                name: "",
                rating: 3,
                feedback: "",
            });
        } catch (error) {
            console.error(error);
        }
    };


    const handleSnackBarClose = () => {
        setOpenSnackbar(false);
        // window.location.reload();
    }

    return (
        <>
            <Typography sx={{
                fontFamily: 'poppins',
                fontSize: 50,
                fontWeight: 600,
                color: '#000000',
                lineHeight: '55px',
                width: 660,
                mt: 20,
                ml: 10,
            }}>
                Your Gateway to <span style={{color: '#6600B5'}}> Classic Car Auctions</span> and Treasures !
            </Typography>
            <Typography sx={{
                fontFamily: 'poppins',
                fontSize: 20,
                fontWeight: 600,
                color: '#757575',
                lineHeight: '24px',
                width: 660,
                mt: 4,
                ml: 10,
            }}>
                Welcome to our classic car auction hub, where timeless elegance meets your passion for automotive
                history. Start exploring and bidding today!
            </Typography>
            <Box sx={{
                display: 'flex',
                ml: 10,
                gap: 4,
                mt: 4,
            }}>
                <Button
                    onClick={() => (navigate('/log-in'))}
                    variant='outlined'
                    sx={{
                        width: 120,
                        height: 50,
                        borderRadius: '10px',
                        border: '2px solid #6600B5',
                        color: '#6600B5',
                        fontFamily: 'poppins',
                        fontSize: 20,
                        fontWeight: 600,
                        ':hover': {
                            // border: '2px solid #6600B5',
                            bgcolor: '#6600B5',
                            color: '#FFFFFF',
                        }
                    }}
                >
                    LOGIN
                </Button>
                <Button
                    onClick={() => (navigate('/sign-up'))}
                    variant='contained'
                    sx={{
                        width: 120,
                        height: 50,
                        borderRadius: '10px',
                        // border: '2px solid #6600B5',
                        bgcolor: '#6600B5',
                        fontFamily: 'poppins',
                        fontSize: 20,
                        fontWeight: 600,
                        ':hover': {
                            bgcolor: 'transparent',
                            border: '2px solid #6600B5',
                            color: '#6600B5',
                        }
                    }}
                >
                    SIGNUP
                </Button>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                // bgcolor: 'yellow',
            }}>
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 40,
                    fontWeight: 600,
                    // lineHeight: '24px',
                    mt: 20,
                    // mx: 'auto',
                }}>
                    Live Auctions
                </Typography>
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 16,
                    fontWeight: 600,
                    // lineHeight: '24px',
                    color: '#757575',
                    width: 702,
                    mt: 2,
                    textAlign: 'center',
                    // mx: 'auto',
                }}>
                    Feel the Excitement, Make Your Move: Live Auctions Where Every Bid Counts, Every Win Celebrates,
                    Every Moment Thrills
                </Typography>
                <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'} mt={4} rowGap={6}>
                    {cards?.map((card) => (
                        <Grid item key={card.id} md={4} display={'flex'} justifyContent={'center'}
                              alignItems={'center'}>
                            <Card card={card}/>
                        </Grid>
                    ))}
                </Grid>
                <Pagination
                    count={pagesCount}
                    page={page}
                    onChange={handleChange}
                    sx={{
                        mt: 4,
                        "& .MuiPaginationItem-root": {
                            bgcolor: "#EBEBEB",
                            ":hover": {
                                bgcolor: "#6600B5",
                                opacity: "100%",
                                color: "#FFFFFF",
                            },
                        },
                        "& .MuiPaginationItem-root.Mui-selected": {
                            bgcolor: "#6600B5",
                            opacity: "60%",
                            color: "#FFFFFF",
                            "&:hover": {
                                color: "#FFFFFF",
                                bgcolor: "#6600B5",
                                opacity: "100%",
                            },
                        },
                    }}
                />
                <Typography
                    sx={{
                        fontFamily: "poppins",
                        fontSize: 40,
                        fontWeight: 600,
                        // lineHeight: '24px',
                        mt: 10,
                        // mx: 'auto',
                    }}
                >
                    What Clients Say
                </Typography>
                <Grid container spacing={4} sx={{mt: 4, px: 4}}>
                    <Grid item xs={12} md={6}>
                        <Box
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            sx={{
                                padding: "2rem",
                                backgroundColor: "#f5f5f5",
                                borderRadius: "8px",
                                maxWidth: "500px",
                                margin: "auto",
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: "#6600B5",
                                    fontWeight: 600,
                                    mb: 2,
                                }}
                            >
                                RATE OUR SERVICES
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    mb: 3,
                                }}
                            >
                                Drive Us Forward: Share Your Auction Experience!
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "poppins",
                                    fontSize: 16,
                                    fontWeight: 500,
                                    color: "#757575",
                                    mt: 1,
                                }}
                            >
                                Name
                            </Typography>
                            <Controller
                                name="name"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        variant="standard"
                                        InputProps={{disableUnderline: true}}
                                        fullWidth
                                        margin="normal"
                                        sx={{
                                            mb: 2,
                                            bgcolor: "#EFEFEF",
                                            px: 2,
                                            "& .MuiOutlinedInput-root": {
                                                backgroundColor: "#FFFFFF",
                                            },
                                        }}
                                    />
                                )}
                            />

                            <Typography
                                sx={{
                                    fontFamily: "poppins",
                                    fontSize: 16,
                                    fontWeight: 500,
                                    color: "#757575",
                                    mt: 1,
                                }}
                            >
                                Your service rating
                            </Typography>
                            <Controller
                                name="rating"
                                control={control}
                                render={({field}) => (
                                    <Rating
                                        {...field}
                                        name="service-rating"
                                        precision={1}
                                        sx={{mb: 2}}
                                    />
                                )}
                            />
                            <Typography
                                sx={{
                                    fontFamily: "poppins",
                                    fontSize: 16,
                                    fontWeight: 500,
                                    color: "#757575",
                                    mt: 1,
                                }}
                            >
                                Your feedback
                            </Typography>

                            <Controller
                                name="feedback"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        variant="standard"
                                        InputProps={{disableUnderline: true}}
                                        placeholder="Your feedback"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        margin="normal"
                                        sx={{
                                            bgcolor: "#EFEFEF",
                                            px: 2,
                                            mb: 2,
                                            "& .MuiOutlinedInput-root": {
                                                backgroundColor: "#FFFFFF",
                                            },
                                        }}
                                    />
                                )}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    height: 50,
                                    borderRadius: "5px",
                                    bgcolor: "#6600B5",
                                    fontFamily: "poppins",
                                    fontSize: 16,
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    ":hover": {bgcolor: "#5200a3"},
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                pl: 4,
                            }}
                        >
                            <Typography variant="h3" sx={{fontWeight: 700, mb: 3}}>
                                Fill the form to submit your feedback
                            </Typography>
                            <Typography variant="body1" sx={{color: "#757575"}}>
                                We value your experience and are committed to making our car
                                auctions even better. Your feedback helps us understand what
                                we&apos;re doing right and where we can improve. Please take a
                                moment to share your thoughts—your input drives our progress and
                                ensures we continue to meet your needs.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Typography
                    sx={{
                        fontFamily: "poppins",
                        fontSize: 16,
                        fontWeight: 500,
                        // lineHeight: '24px',
                        color: "#757575",
                        width: 509,
                        mt: 2,
                        textAlign: "center",
                        // mx: 'auto',
                    }}
                >
                    User Feedbacks
                </Typography>
                <Box sx={{position: "relative", width: "80%", px: 4}}>
                    <IconButton
                        onClick={() => scrollReviews("left")}
                        sx={{
                            position: "absolute",
                            left: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 2,
                            bgcolor: "#EBEBEB",
                            ":hover": {
                                bgcolor: "#6600B5",
                                color: "#FFFFFF",
                            },
                        }}
                    >
                        <ArrowBackRoundedIcon/>
                    </IconButton>

                    <Box
                        id="reviews-container"
                        sx={{
                            display: "flex",
                            overflowX: "auto",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                            gap: 2,
                            py: 2,
                        }}
                    >
                        {feedbacks.map((review) => (
                            <Box
                                key={review.id}
                                sx={{
                                    flexShrink: 0,
                                    width: {xs: "100%", md: "calc(33.33% - 16px)"},
                                    maxWidth: "400px",
                                    my: 4,
                                }}
                            >
                                <Review review={review}/>
                            </Box>
                        ))}
                    </Box>

                    <IconButton
                        onClick={() => scrollReviews("right")}
                        sx={{
                            position: "absolute",
                            right: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 2,
                            bgcolor: "#EBEBEB",
                            ":hover": {
                                bgcolor: "#6600B5",
                                color: "#FFFFFF",
                            },
                        }}
                    >
                        <ArrowForwardRoundedIcon/>
                    </IconButton>
                </Box>
            </Box>
            <Box
                // data-aos="fade-left"
                component={'img'}
                src={car}
                sx={{
                    width: 736,
                    height: 350,
                    ml: 5,
                    position: 'absolute',
                    top: 330,
                    right: 0,
                }}
            />

            <Snackbar
                open={openSnackbar}
                autoHideDuration={2500}
                onClose={handleSnackBarClose}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
            >
                <MuiAlert
                    onClose={handleSnackBarClose}
                    severity={isSuccess ? "success" : "error"}
                    sx={{width: "100%"}}
                >
                    {alertMessage}
                </MuiAlert>
            </Snackbar>
        </>
    )
}

export default Home

const reviews = [
    {
        id: 1,
        name: 'carla',
        image: 'hehe',
        rating: 4,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio ut sem nulla pharetra diam sit amet. Morbi tristique senectus et netus et malesuada fames.'
    },
    {
        id: 2,
        name: 'carla',
        image: 'hehe',
        rating: 2,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio ut sem nulla pharetra diam sit amet. Morbi tristique senectus et netus et malesuada fames.'
    },
    {
        id: 3,
        name: 'carla',
        image: 'hehe',
        rating: 5,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio ut sem nulla pharetra diam sit amet. Morbi tristique senectus et netus et malesuada fames.'
    },
]


// const cards = [
//     {
//         id: 1,
//         title: '1996 Jaguar Classic Car',
//         image: car1,
//         price: 1200000,
//         description: 'Classical Jaguar cars are synonymous with automotive royalty, embodying a rich heritage of luxury, style, and performance. From iconic models like the XK120 to the E-Type, they captivate enthusiasts with their timeless design, meticulous craftsmanship, and exhilarating driving dynamics.'
//     },
//     {
//         id: 2,
//         title: '1996 Jaguar Classic Car',
//         image: 'hehe',
//         price: 1200000,
//         description: 'Classical Jaguar cars are synonymous with automotive royalty, embodying a rich heritage of luxury, style, and performance. From iconic models like the XK120 to the E-Type, they captivate enthusiasts with their timeless design, meticulous craftsmanship, and exhilarating driving dynamics.'
//     },
//     {
//         id: 3,
//         title: '1996 Jaguar Classic Car',
//         image: 'hehe',
//         price: 1200000,
//         description: 'Classical Jaguar cars are synonymous with automotive royalty, embodying a rich heritage of luxury, style, and performance. From iconic models like the XK120 to the E-Type, they captivate enthusiasts with their timeless design, meticulous craftsmanship, and exhilarating driving dynamics.'
//     },
//     {
//         id: 4,
//         title: '1996 Jaguar Classic Car',
//         image: 'hehe',
//         price: 1200000,
//         description: 'Classical Jaguar cars are synonymous with automotive royalty, embodying a rich heritage of luxury, style, and performance. From iconic models like the XK120 to the E-Type, they captivate enthusiasts with their timeless design, meticulous craftsmanship, and exhilarating driving dynamics.'
//     },
//     {
//         id: 5,
//         title: '1996 Jaguar Classic Car',
//         image: 'hehe',
//         price: 1200000,
//         description: 'Classical Jaguar cars are synonymous with automotive royalty, embodying a rich heritage of luxury, style, and performance. From iconic models like the XK120 to the E-Type, they captivate enthusiasts with their timeless design, meticulous craftsmanship, and exhilarating driving dynamics.'
//     },
//     {
//         id: 6,
//         title: '1996 Jaguar Classic Car',
//         image: 'hehe',
//         price: 1200000,
//         description: 'Classical Jaguar cars are synonymous with automotive royalty, embodying a rich heritage of luxury, style, and performance. From iconic models like the XK120 to the E-Type, they captivate enthusiasts with their timeless design, meticulous craftsmanship, and exhilarating driving dynamics.'
//     },
// ]
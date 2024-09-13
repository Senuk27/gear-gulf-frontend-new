import {Box, Button, Grid, Pagination, TextField, Typography} from '@mui/material'
import MyCard from '../../Components/MyCard'
import {useForm} from 'react-hook-form';
import {getImage, getVehiclesByUser, uploadImage} from '../../services/ApiService';
import React, {useEffect, useState} from 'react';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Gallery = () => {
    const {handleSubmit, formState: {errors}} = useForm();
    const [page, setPage] = useState(1);
    const [cards, setCards] = useState(null);
    const [pagesCount, setPagesCount] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadedImageId, setUploadedImageId] = useState(null);
    const [imageUrl, setImageUrl] = useState();

    const handleFileChange = async (event) => {
        setFile(event.target.files[0].name);
        const uploadedFile = event.target.files[0];
        console.log(uploadedFile);
        try {
            const formData = new FormData();
            formData.append("file", uploadedFile)

            const res = await uploadImage(formData)

            console.log(res?.imageName); // Handle the response as needed
            setUploadedImageId(res?.imageName); // Assuming the backend returns the saved image ID
        } catch (error) {
            console.error('Error uploading file:', error);
        }

    };


    const pageCount = 3

    const handleChange = (event, value) => {
        setPage(value);
        console.log(value);
    };

    const fetchVehicles = async () => {
        const data = {
            page: page - 1,
            pageCount: pageCount,
            userId: localStorage.getItem('userId'),
        }
        try {
            const response = await getVehiclesByUser(data);
            console.log("sell : ", response)
            const newCards = response.vehicles.content.map(vehicle => ({
                id: vehicle.vehicleId,
                title: vehicle.vehicleName,
                image: vehicle?.imageName,
                description: vehicle.description,
                price: vehicle.bidAmount
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

    const onSubmit = async () => {
        try {
            const response = await getImage(uploadedImageId);
            console.log("response: ", response);
            if (response) {
                setImageUrl(response);
                setOpenSnackbar(true);
                setAlertMessage("Image Uploaded Successfully!");
                setIsSuccess(true);
            } else {
                setOpenSnackbar(true);
                setAlertMessage("Image Upload Failed!");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleSnackBarClose = () => {
        setOpenSnackbar(false);
        // window.location.reload();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{
                px: 10,
                py: 5,
            }}>
                <Box sx={{
                    width: 389,
                    height: 652,
                    ml: 5,
                    position: 'absolute',
                    top: 140,
                    right: 150,
                }}>
                    <Box sx={{
                        // width: '100%',
                        width: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight: 440,
                        bgcolor: '#FFFFFF',
                        mt: 4,
                        borderRadius: '10px',
                        px: 5,
                        py: 4,
                        gap: 1,
                    }}>
                        <Typography sx={{
                            fontFamily: 'poppins',
                            fontSize: 20,
                            fontWeight: 600,
                            color: '#000000',
                            mb: 3,

                        }}>
                            Upload Your Classic Car Image
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            gap: 3,
                            width: 633,
                            mb: 3,
                            // height: '100%',
                        }}>
                        </Box>
                        <Box sx={{
                            textAlign: 'center',
                            gap: 3,
                            width: 'auto',
                            mb: 3,
                            // height: '100%',
                        }}>
                            <Typography><span style={{color: '#000000', fontWeight: '100px'}}>Choose a file or drag & drop it here </span>

                            </Typography>
                            <Typography><span style={{color: '#808080'}}>JPG PNG formats, up to 50M</span></Typography>

                        </Box>
                        <Box sx={{
                            display: 'flex',
                            gap: 3,
                            width: 'auto',
                            mb: 3,
                            // height: '100%',
                        }}>
                            {/* {errors.bidAmount && <span>Bid Amount is required</span>} */}
                            <TextField
                                placeholder='upload image'
                                disabled
                                fullWidth
                                // sx={{ width: '100%',height:'20px' ,bgcolor:'#FFFFFF'}}
                                value={file}
                                InputProps={{
                                    endAdornment: (
                                        <Button
                                            variant="outlined"
                                            sx={{position: "absolute", right: 10, height: "30px"}}
                                            component="label"
                                            htmlFor="signature-file"
                                        >
                                            Upload
                                            <input
                                                type="file"
                                                id="signature-file"
                                                name="signature"
                                                onChange={handleFileChange}
                                                accept="image/*"
                                                style={{display: "none"}}
                                            />
                                        </Button>
                                    ),
                                }}
                            />
                            {/* {errors.UploadImage && <span>Upload Image is required</span>} */}
                        </Box>

                        {/* {errors.description && <span>Description is required</span>} */}
                        <Button
                            // onClick={handleUpdateImage}
                            type='submit'
                            variant="contained"
                            sx={{
                                width: 'auto',
                                height: 50,
                                mt: 4,
                                borderRadius: "5px",
                                bgcolor: "#6600B5",
                                fontFamily: "poppins",
                                fontSize: 20,
                                fontWeight: 600,
                                ":hover": {
                                    bgcolor: "#6600B5",
                                },
                            }}
                        >
                            Upload Image
                        </Button>
                    </Box>


                </Box>
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 30,
                    fontWeight: 600,
                    color: '#000000',
                    // lineHeight: '45px',
                    // mt: 20,
                    // ml: 10,
                }}>
                    Upload Your <span style={{color: '#6600B5'}}>  Classic Car </span> Image
                </Typography>

                {/*Show Uploaded Images*/}
                <Box sx={{width: '300px', height: '180px', mt: 2}}>
                    <img src={imageUrl} alt={uploadedImageId != "" ? "No Images Uploaded Yet!" : uploadedImageId}
                         style={{height: '150px'}}/>
                </Box>

                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 30,
                    fontWeight: 600,
                    color: '#000000',
                    // mt: 10,
                    // lineHeight: '45px',
                    // mt: 20,
                    // ml: 10,
                }}>
                    <span style={{color: '#6600B5'}}>  Discover a World of Vehicles! </span>
                </Typography>
                <Typography sx={{
                    fontFamily: 'poppins',
                    fontSize: 20,
                    fontWeight: 500,
                    color: '#000000',
                    lineHeight: '25px',
                    width: 400,
                    height: 'auto',
                    mt: 4,
                }}>
                    Explore our gallery of stunning cars from every angle. Browse through a collection of vehicles
                    waiting to find their next owner.
                </Typography>

                <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'} mt={4} rowGap={6}>
                    {cards?.map((card) => (
                        <Grid item key={card.id} md={4} display={'flex'} justifyContent={'center'}
                              alignItems={'center'}>
                            <MyCard card={card}/>
                        </Grid>
                    ))}
                </Grid>

                <Pagination count={pagesCount}
                            page={page}
                            onChange={handleChange}
                            sx={{
                                mt: 4,
                                ml: 80,
                                '& .MuiPaginationItem-root': {
                                    bgcolor: '#EBEBEB',
                                    ":hover": {
                                        bgcolor: '#6600B5',
                                        opacity: '100%',
                                        color: '#FFFFFF',
                                    }
                                },
                                '& .MuiPaginationItem-root.Mui-selected': {
                                    bgcolor: '#6600B5',
                                    opacity: '60%',
                                    color: '#FFFFFF',
                                    "&:hover": {
                                        color: '#FFFFFF',
                                        bgcolor: '#6600B5',
                                        opacity: '100%',
                                    }
                                },
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
            </Box>
        </form>
    )
}

export default Gallery

const cards = [
    {
        id: 1,
        title: '1996 Jaguar Classic Car',
        image: 'car1',
        price: 1200000,
        description: 'Classical Jaguar cars are synonymous with automotive royalty, embodying a rich heritage of luxury, style, and performance. From iconic models like the XK120 to the E-Type, they captivate enthusiasts with their timeless design, meticulous craftsmanship, and exhilarating driving dynamics.'
    },
    {
        id: 2,
        title: '1996 Jaguar Classic Car',
        image: 'hehe',
        price: 1200000,
        description: 'Classical Jaguar cars are synonymous with automotive royalty, embodying a rich heritage of luxury, style, and performance. From iconic models like the XK120 to the E-Type, they captivate enthusiasts with their timeless design, meticulous craftsmanship, and exhilarating driving dynamics.'
    },
    {
        id: 3,
        title: '1996 Jaguar Classic Car',
        image: 'hehe',
        price: 1200000,
        description: 'Classical Jaguar cars are synonymous with automotive royalty, embodying a rich heritage of luxury, style, and performance. From iconic models like the XK120 to the E-Type, they captivate enthusiasts with their timeless design, meticulous craftsmanship, and exhilarating driving dynamics.'
    },
]
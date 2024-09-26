import React, { useState, useEffect, useRef } from "react";
import {
  Autocomplete,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import { GET_CONSUMER_DETAILS } from "../../../../apolloClient/queries/ConsumerDashboard/Profile/ConsumerDetails";
import useUpdateAbout from "../../../../apolloClient/mutation/Settings/UpdateAboutSection";
import { useRouter } from "next/router";
import CameraCapture from "./CameraCapture";
import ImageEditor from "./ImageEditor";
import ImageProperties from "./test-mim/ImageProperties";
import { GET_COUNTRIES } from "../../../../apolloClient/queries/allCountryQuery";
import { useQuery } from "@apollo/client";
import getCroppedImg from "../../../../utility/CropImage";


const inputLevelStyle = {
  fontFamily: "Inter",
  fontSize: { sm: "13px", xl: "14px" },
  fontWeight: "500",
  marginBottom: "8px",
};

export const buttonStyle = {
  background: "linear-gradient(22.65deg, #0D8EB9 -0.67%, #12A8DA 98.68%)",
  fontSize: "13px",
  fontFamily: "Roboto",
  padding: "5.5px 20px",
  color: "white",
  textTransform: "capitalize",
  ":hover": {
    background: "linear-gradient(22.65deg, #0D8EB9 -0.67%, #12A8DA 98.68%)",
  },
};
const deleteModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "348px",
  height: "150px",
  bgcolor: "#FAFAFA;",

  p: 2,
  borderRadius: "4px",
  outline: 0,
};

const UploadImageModal = {
  ...deleteModalStyle,
  width: "550px",
  p: 0,
  height: "300px",
};

const About = ({ ConsumerDetails, token }) => {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null); // Reference to the hidden file input element
  const [imagePreview, setImagePreview] = useState(null); // State to hold the uploaded image
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [uploadImageOpen, setUploadImageOpen] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [showImagePreviewModal, setShowImagePreviewModal] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteImage = () => {
    setShowDeleteIcon(true);
    setOpenDeleteModal(false);
  };

  const handleCloseUploadImageModal = () => {
    setUploadImageOpen(false);
  };

  const handleUploadPhoto = () => {
    // Programmatically trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    setImagePreview(file);
    setShowImagePreviewModal(true);
  };

  const handleOpenCamera = () => {
    // console.log("golam Hakkani Mim ");
    setOpenCamera(true);
  };

  // Fetch consumer details information
  const { data: countries, loading: countryLoading } = useQuery(GET_COUNTRIES);

  // About section input filed state and data update management

  const [callingCode, setCallingCode] = useState("");
  const [country, setCountry] = useState("");
  const [countryId, setCountryId] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [date, setDate] = useState(new Date());

  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [filterImageFile,setFilterImageFile] =useState(null)

  //About mutation handler
  const {
    aboutMutationHandler,
    loading: aboutLoading,
    error: aboutError,
  } = useUpdateAbout();

  useEffect(() => {
    setCallingCode(ConsumerDetails?.selfConsumer?.callingCode);
    setCountry(ConsumerDetails?.selfConsumer?.consumeraddresses?.country?.id);
    setGender(ConsumerDetails?.selfConsumer?.gender);
    setReligion(ConsumerDetails?.selfConsumer?.religion);
    setDate(ConsumerDetails?.selfConsumer?.dateOfBirth);
  }, [ConsumerDetails]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Update about form handler
  const aboutSubmitHandler =async (data) => {

    // this section is working in rotated and crop image 
    const imageLink =  URL.createObjectURL(imagePreview);
    const croppedImageUrl = await getCroppedImg(imageLink, croppedAreaPixels,rotation);
   

    // final mutation code 

    aboutMutationHandler({
      variables: {
        id: ConsumerDetails?.selfConsumer?.id,
        photo:filterImageFile || croppedImageUrl,
        firstName:
          data.firstName || ConsumerDetails?.selfConsumer?.user?.firstName,
        lastName:
          data.lastName || ConsumerDetails?.selfConsumer?.user?.lastName,
        phone: data.phone || ConsumerDetails?.selfConsumer?.phone,
        dateOfBirth:
          moment(date).format("YYYY-MM-DD") ||
          ConsumerDetails?.selfConsumer?.dateOfBirth,
        nidNumber: data.nid || ConsumerDetails?.selfConsumer?.nidNumber,
        religion: data.religion ? data.religion : religion,
        gender: data.gender ? data.gender : gender,
        country: countryId ? countryId : country,
        callingCode: data.callingCode ? data.callingCode : callingCode,
        spouseName: data.spouseName,
        consumerEmail: data.consumerEmail,
      },
      refetchQueries: [{ query: GET_CONSUMER_DETAILS }],
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },

      onCompleted: () => {
        // console.log("on completed");
        // router.push("/admin-dashboard/inventory/category")
        setOpen(true);
        reset({});
        setTimeout(() => {
          router.push("/consumer-dashboard/profile");
          setOpen(false);
        }, 3000);

        handleCloseUploadImageModal();
      },
      onError: (err) => {
        // console.log("err", err);
        setTimeout(() => {
          setIsError(true);
        }, 5000);
      },
    });

    if (!aboutLoading && !aboutError) {
      //router.push("/admin-dashboard/inventory/category");
    } else {
      //alert(vatUpdateError);
    }
  };

  // console.log('hiiiii',ConsumerDetails);

  return (
    <Box sx={{}}>
      <Box
        sx={{ width: "100%" }}
        style={open ? { display: "block" } : { display: "none" }}
      >
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          variant="filled"
          severity="success"
        >
          About updated successfully!
        </Alert>
      </Box>

      <Box
        sx={{ width: "100%" }}
        style={isError ? { display: "block" } : { display: "none" }}
      >
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setIsError(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          variant="filled"
          severity="warning"
        >
          About not updated!
        </Alert>
      </Box>

      <Box sx={{ pl: "13px" }}>
        <Typography
          variant="body1"
          sx={{
            ...inputLevelStyle,
            fontSize: "14px",
          }}
        >
          Your Photo
        </Typography>

        {/* image and description  */}

        <Box sx={{ display: "flex", gap: "30px" }}>
          <img
            src={
              ConsumerDetails?.selfConsumer?.photo
                ? ConsumerDetails?.selfConsumer?.photo
                : "/images/about.jpg"
            }
            alt="about-image"
            style={{
              width: "95px",
              height: "95px",
              border: showDeleteIcon ? "none" : "1px solid #c8c8c8",
              borderRadius: "50%",
            }}
          />

          <Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                fontFamily: "Inter",
                color: "#2b2b2b",
              }}
            >
              File smaller than 10MB and at least 400px by 400px
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "400",
                fontFamily: "Inter",
                color: "#2b2b2b",
              }}
            >
              This picture will be displayed everywhere as your profile, so use
              a good looking picture wisely.
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                mt: "15px",
              }}
            >
              <Button
                sx={{ ...buttonStyle, height: "30px", fontWeight: "400" }}
                onClick={() => setUploadImageOpen(true)}
              >
                Upload Image
              </Button>

              {/* delete  */}

              {!showDeleteIcon && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenDeleteModal(true)}
                >
                  <rect width="24" height="24" fill="none" />
                  <g fill="none">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill={"#424242"}
                      d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07L4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929zM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m.28-6H9.72l-.333 1h5.226z"
                    />
                  </g>
                </svg>
              )}
            </Box>
          </Box>
        </Box>

        {/* upload image and delete icon  */}
      </Box>

      <Typography
        variant="body1"
        sx={{
          ...inputLevelStyle,
          fontSize: "14px",
          pb: "14px",
          pl: "15px",
          mt: "30px",
        }}
      >
        About Info
      </Typography>

      <Box
        sx={{
          px: "30px",
        }}
      >
        <form onSubmit={handleSubmit(aboutSubmitHandler)}>
          <Grid container spacing={2} sx={{}}>
            {/* first name   */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={inputLevelStyle}>
                First Name*
              </Typography>
              <TextField
                fullWidth
                size="small"
                id="fullWidth"
                placeholder="First Name"
                InputLabelProps={{ style: { fontSize: 15 } }}
                defaultValue={ConsumerDetails?.selfConsumer?.user?.firstName}
                name="firstName"
                // disabled
                sx={{
                  "& fieldset": { border: "1px solid #CCD1EC" },
                  input: {
                    paddingLeft: "10px!important",
                    fontSize: "13px",
                    fontFamily: "Inter",
                  },

                  "& input::placeholder": {
                    fontFamily: "Inter",
                    fontSize: "13px",
                  },
                }}
                {...register("firstName")}
              />
            </Grid>

            {/* last name  */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={inputLevelStyle}>
                Last Name*
              </Typography>

              <TextField
                fullWidth
                size="small"
                id="fullWidth"
                placeholder="Last Name"
                InputLabelProps={{ style: { fontSize: 15 } }}
                defaultValue={ConsumerDetails?.selfConsumer?.user?.lastName}
                // disabled
                sx={{
                  "& fieldset": { border: "1px solid #CCD1EC" },
                  input: {
                    paddingLeft: "10px!important",
                    fontSize: "13px",
                    fontFamily: "Inter",
                  },

                  "&input::placeholder": {
                    fontFamily: "Inter",
                    fontSize: "13px",
                    color: "#A0A0A0",
                  },
                }}
                name="lastName"
                {...register("lastName")}
              />
            </Grid>

            {/* username  */}

            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={inputLevelStyle}>
                {" "}
                Username*
              </Typography>

              <TextField
                fullWidth
                size="small"
                id="fullWidth"
                placeholder="Username"
                InputLabelProps={{ style: { fontSize: 15 } }}
                defaultValue={ConsumerDetails?.selfConsumer?.username}
                inputProps={{ readOnly: true }}
                // disabled
                sx={{
                  "& fieldset": { border: "1px solid #CCD1EC" },
                  input: {
                    paddingLeft: "10px!important",
                    fontSize: "13px",
                    fontFamily: "Inter",
                  },

                  "&input::placeholder": {
                    fontFamily: "Inter",
                    fontSize: "13px",
                    color: "#A0A0A0",
                  },
                }}
                name="username"
                {...register("username")}
              />
            </Grid>

            {/* date of birth  */}

            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={inputLevelStyle}>
                Date Of Birth
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  placeholder="Date Of Birth"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      sx={{
                        "& .MuiInputBase-input": {
                          paddingLeft: "10px!important",
                          fontSize: "13px",
                          fontFamily: "Inter",
                          py: "9px!important",
                        },
                        "& fieldset": { border: "1px solid #CCD1EC" },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            {/* phone  */}

            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={inputLevelStyle}>
                Phone Number*
              </Typography>
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <TextField
                    fullWidth
                    size="small"
                    id="fullWidth"
                    placeholder="+880"
                    // disabled
                    sx={{
                      "& fieldset": { border: "1px solid #CCD1EC" },
                      input: {
                        paddingLeft: "10px!important",
                        fontSize: "13px",
                        fontFamily: "Inter",
                      },

                      "&input::placeholder": {
                        fontFamily: "Inter",
                        fontSize: "13px",
                        color: "#A0A0A0",
                      },
                    }}
                    InputLabelProps={{ style: { fontSize: 15 } }}
                    defaultValue={ConsumerDetails?.selfConsumer?.callingCode}
                    name="phone"
                    {...register("callingCode")}
                  />
                </Grid>
                <Grid item md={8}>
                  <TextField
                    fullWidth
                    size="small"
                    id="fullWidth"
                    placeholder="Phone"
                    // disabled
                    sx={{
                      "& fieldset": { border: "1px solid #CCD1EC" },
                      input: {
                        paddingLeft: "10px!important",
                        fontSize: "13px",
                        fontFamily: "Inter",
                      },

                      "&input::placeholder": {
                        fontFamily: "Inter",
                        fontSize: "13px",
                        color: "#A0A0A0",
                      },
                    }}
                    InputLabelProps={{ style: { fontSize: 15 } }}
                    defaultValue={ConsumerDetails?.selfConsumer?.phone}
                    name="phone"
                    {...register("phone")}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* N-id number  */}

            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={inputLevelStyle}>
                NID Number
              </Typography>

              <TextField
                fullWidth
                size="small"
                id="fullWidth"
                placeholder="NID Number"
                InputLabelProps={{ style: { fontSize: 15 } }}
                defaultValue={ConsumerDetails?.selfConsumer?.nidNumber}
                name="nid"
                {...register("nid")}
                sx={{
                  "& .MuiInputBase-input": {
                    paddingLeft: "10px!important",
                    fontSize: "13px",
                    fontFamily: "Inter",
                    py: "8px!important",
                  },
                  "& fieldset": { border: "1px solid #CCD1EC" },
                }}
              />
            </Grid>

            {/* gender  */}

            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={inputLevelStyle}>
                Gender*
              </Typography>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={genderList}
                getOptionLabel={(option) => option.type}
                //defaultValue={genderList[0]}
                defaultValue={genderList.find((gender) => {
                  return (
                    gender.type.toLowerCase() ===
                    ConsumerDetails?.selfConsumer?.gender.toLowerCase()
                  );
                })}
                name="gender"
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setReligion(e.target.value)}
                    {...register("gender")}
                    {...params}
                    variant="outlined"
                    placeholder="Select Gender *"
                    sx={{
                      "& fieldset": { border: "1px solid red" },

                      "& fieldset": { border: "1px solid #CCD1EC" },
                      input: {
                        paddingLeft: "10px!important",
                        fontSize: "13px",
                        fontFamily: "Inter",
                      },

                      "&input::placeholder": {
                        fontFamily: "Inter",
                        fontSize: "13px",
                        color: "#A0A0A0",
                      },
                    }}
                  />
                )}
              />
            </Grid>

            {/* religion  */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={inputLevelStyle}>
                Religion*
              </Typography>

              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={religionList}
                getOptionLabel={(option) => option.name}
                defaultValue={religionList.find(
                  (religion) =>
                    religion.name === ConsumerDetails?.selfConsumer?.religion
                )}
                // value={gender}
                name="religion"
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setReligion(e.target.value)}
                    {...register("religion")}
                    {...params}
                    variant="outlined"
                    placeholder="Select Religion *"
                    sx={{
                      "& fieldset": { border: "1px solid red" },

                      "& fieldset": { border: "1px solid #CCD1EC" },
                      input: {
                        paddingLeft: "10px!important",
                        fontSize: "13px",
                        fontFamily: "Inter",
                      },

                      "&input::placeholder": {
                        fontFamily: "Inter",
                        fontSize: "13px",
                        color: "#A0A0A0",
                      },
                    }}
                  />
                )}
              />
            </Grid>

            {/* country  */}

            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={inputLevelStyle}>
                Country*
              </Typography>

              <Autocomplete
                id="size-small-outlined"
                size="small"
                options={countries?.countries?.edges}
                getOptionLabel={(option) => (option ? option?.node?.name : "")}
                defaultValue={countries?.countries?.edges?.find((country) => {
                  return (
                    country.node.name ===
                    ConsumerDetails?.selfConsumer?.country?.name
                  );
                })}
                name="country"
                onChange={(event, value) => setCountryId(value?.node?.id)}
                // disabled
                sx={{
                  backgroundColor: "#fff",
                }}
                renderInput={(params) => (
                  <TextField
                    // onChange={(e)=> setCountry(e.target.value)}
                    {...register("country")}
                    {...params}
                    placeholder="Select Country *"
                    sx={{
                      "& fieldset": { border: "1px solid red" },

                      "& fieldset": { border: "1px solid #CCD1EC" },
                      input: {
                        paddingLeft: "10px!important",
                        fontSize: "13px",
                        fontFamily: "Inter",
                      },

                      "&input::placeholder": {
                        fontFamily: "Inter",
                        fontSize: "13px",
                        color: "#A0A0A0",
                      },
                    }}
                  />
                )}
              />
            </Grid>

            {/* spouse name  */}

            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={inputLevelStyle}>
                Spouse Name
              </Typography>
              <TextField
                fullWidth
                size="small"
                id="fullWidth"
                placeholder="Spouse Name"
                InputLabelProps={{ style: { fontSize: 15 } }}
                defaultValue={ConsumerDetails?.selfConsumer?.spouseName}
                name="spouseName"
                {...register("spouseName")}
                sx={{
                  "& fieldset": { border: "1px solid red" },

                  "& fieldset": { border: "1px solid #CCD1EC" },
                  input: {
                    paddingLeft: "10px!important",
                    fontSize: "13px",
                    fontFamily: "Inter",
                  },

                  "&input::placeholder": {
                    fontFamily: "Inter",
                    fontSize: "13px",
                    color: "#A0A0A0",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  gap: "12px",
                }}
              >
                <Button type="submit" sx={buttonStyle}>
                  Save Change
                </Button>

                <Button
                  type="submit"
                  sx={{
                    background: "#fff",
                    fontSize: { sm: "13px", xl: "14px" },
                    border: "1px solid #C8C8C8",
                    fontFamily: "Roboto",
                    padding: "5.5px 16px",
                    color: "#717171",
                    fontWeight: "400",
                    overflow: "hidden",
                    borderRadius: "8px",
                    textTransform: "capitalize",
                    ":hover": {
                      background: "#fff",
                    },
                  }}
                >
                  View Your Profile
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* delete modal  */}

      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={deleteModalStyle}>
          <Typography
            sx={{
              color: " #000",
              fontFamily: "Roboto",
              fontSize: { md: "16px", xl: "18px" },
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
              mt: "9%",

              textAlign: "center",
            }}
          >
            Are You Sure?
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: "15px",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                height: "32px",
                color: "#2B2B2B",
                textAlign: "center",
                fontFamily: "Roboto",
                fontSize: { md: "13px", xl: "14px" },
                fontStyle: "normal",
                fontWeight: "400",
                px: "25px",
                mr: "15px",
                lineHeight: "normal",
                textTransform: "capitalize",
                background: "#E1E1E1",
                boxShadow: "none",
                // width:'150px',
                ":hover": {
                  background: "#E1E1E1",
                  // width:'150px',
                },
              }}
              onClick={handleCloseDeleteModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                ...buttonStyle,
                px: "25px",
                boxShadow: "none",
                height: "32px",
              }}
              onClick={handleDeleteImage}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* upload image modal  */}

      <Modal
        open={uploadImageOpen}
        onClose={handleCloseUploadImageModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...UploadImageModal }}>
          {/* upload image header  */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1.5,
              borderBottom: "1px solid #E4E5E7",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Roboto",
                fontWeight: 500,
                fontSize: "18px",
              }}
            >
              Change Photo
            </Typography>

            <Box
              sx={{
                // ":hover":{
                background: "#ededed",
                // background:'#ffdd00',
                borderRadius: "50%",
                height: "25px",
                width: "25px",
                // }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                style={{
                  cursor: "pointer",

                  margin: "1px auto 0px auto",
                  display: "block",
                }}
                onClick={() => setUploadImageOpen(false)}
              >
                <rect width="24" height="24" fill="none" />
                <path
                  fill="#717171"
                  fill-rule="evenodd"
                  d="m12 10.586l5.657-5.657l1.414 1.414L13.414 12l5.657 5.657l-1.414 1.414L12 13.414l-5.657 5.657l-1.414-1.414L10.586 12L4.929 6.343L6.343 4.93z"
                />
              </svg>
            </Box>
          </Box>

          {/* image items  */}

          <Box
            sx={{
              marginTop: "6%",
            }}
          >
            <img
              src={
                ConsumerDetails?.selfConsumer?.photo
                  ? ConsumerDetails?.selfConsumer?.photo
                  : gender === "Male"
                  ? "/images/profile-avater.png"
                  : "/images/woman.png"
              }
              alt="upload-image"
              style={{
                width: "75px",
                height: "75px",
                border: showDeleteIcon ? "none" : "1px solid #c8c8c8",
                borderRadius: "50%",
                margin: "0 auto",
                display: "block",
                marginBottom: "15px",
              }}
            />

            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "13px",
                color: "#636363",
                fontWeight: 300,
                marginTop: "10px",
                width: "80%",
                m: "0 auto",
                textAlign: "center",
              }}
            >
              This picture will be displayed everywhere as your profile, so use
              a good looking picture wisely.
            </Typography>
          </Box>

          {/* upload button and use camera  */}
          <Box
            sx={{
              position: "absolute",
              right: 20,
              bottom: 20,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                height: "32px",
                color: "#0D8EB9",
                textAlign: "center",
                border: "1px solid #0D8EB9",
                fontFamily: "Roboto",
                fontSize: { md: "13px", xl: "14px" },
                fontStyle: "normal",
                fontWeight: "400",
                px: "20px",
                mr: "15px",
                lineHeight: "normal",
                textTransform: "capitalize",
                background: "#fff",
                fontWeight: "400",
                boxShadow: "none",
                ":hover": {
                  background: "#fff",
                },
              }}
              onClick={handleOpenCamera}
            >
              Use Camera
            </Button>

            <Button
              variant="contained"
              sx={{
                ...buttonStyle,
                px: "20px",
                boxShadow: "none",
                height: "32px",
                fontWeight: "400",
              }}
              onClick={handleUploadPhoto}
            >
              Upload Photo
            </Button>

            {/* Hidden file input element */}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </Box>
        </Box>
      </Modal>

      {/* upload photo  */}

      {imagePreview && (
        <Modal
          open={showImagePreviewModal}
          onClose={() => setShowImagePreviewModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          hideBackdrop
        >
          <Box
            sx={{
              ...UploadImageModal,
              width: "700px",
              height: "480px",
              pb: 0,
            }}
          >
            <Box
              sx={{
                p: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                pl: "20px",

                borderBottom: "1px solid #E4E5E7",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "500",
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  color: "#2b2b2b",
                }}
              >
                Edit Photo
              </Typography>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleCloseUploadImageModal();
                  setShowImagePreviewModal(false);
                }}
              >
                <rect width="24" height="24" fill="none" />
                <path
                  fill="#717171"
                  fill-rule="evenodd"
                  d="m12 10.586l5.657-5.657l1.414 1.414L13.414 12l5.657 5.657l-1.414 1.414L12 13.414l-5.657 5.657l-1.414-1.414L10.586 12L4.929 6.343L6.343 4.93z"
                />
              </svg>
            </Box>

            {/* filter image  */}

            <ImageEditor 
            imagePreview={imagePreview}  
            setImagePreview={setImagePreview}
            setCroppedAreaPixels={setCroppedAreaPixels}
            setRotation={setRotation}
            rotation={rotation}
            croppedAreaPixels={croppedAreaPixels}
            setFilterImageFile={setFilterImageFile}
            
            />

          
          {/* change image , save and cancel button  */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                // border:'1px solid red'
              }}
            >
              {/* change image  */}
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  cursor: "pointer",
                  ml: "20px",
                  alignItems: "center",
                }}
                onClick={handleUploadPhoto}
              >
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <rect width="16" height="16" fill="none" />
                  <path
                    fill="#717171"
                    d="M15.49 7.3h-1.16v6.35H1.67V3.28H8V2H1.67A1.21 1.21 0 0 0 .5 3.28v10.37a1.21 1.21 0 0 0 1.17 1.25h12.66a1.21 1.21 0 0 0 1.17-1.25z"
                  />
                  <path
                    fill="#717171"
                    d="M10.56 2.87L6.22 7.22l-.44.44l-.08.08l-1.52 3.16a1.08 1.08 0 0 0 1.45 1.45l3.14-1.53l.53-.53l.43-.43l4.34-4.36l.45-.44l.25-.25a2.18 2.18 0 0 0 0-3.08a2.17 2.17 0 0 0-1.53-.63a2.2 2.2 0 0 0-1.54.63l-.7.69l-.45.44zM5.51 11l1.18-2.43l1.25 1.26zm2-3.36l3.9-3.91l1.3 1.31L8.85 9zm5.68-5.31a.9.9 0 0 1 .65.27a.93.93 0 0 1 0 1.31l-.25.24l-1.3-1.3l.25-.25a.88.88 0 0 1 .69-.25z"
                  />
                </svg>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#8a8a8a",
                    fontSize: "15px",
                  }}
                >
                  Change Image
                </Typography>
              </Box>

              {/* button  */}

              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  mr: "20px",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    color: "#12A8DA",
                    fontFamily: "Roboto",
                    width: "110px",
                    textAlign: "center",
                    borderRadius: "4px",
                    fontSize: "14px",
                    py: 1,
                    border: "1px solid #12A8DA",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setShowImagePreviewModal(false);
                    handleCloseUploadImageModal();
                  }}
                >
                  Cancel
                </Box>
                <Box
                  onClick={aboutSubmitHandler}
                  sx={{
                    background:
                      "linear-gradient(22.65deg, #0D8EB9 -0.67%, #12A8DA 98.68%)",
                    color: "#fff",
                    fontFamily: "Roboto",
                    width: "110px",
                    textAlign: "center",
                    borderRadius: "4px",
                    fontSize: "14px",
                    py: 1,
                    cursor: "pointer",
                  }}
                >
                  Save Photo
                </Box>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}

      {/* use camera modal  */}

      <Modal
        open={openCamera}
        onClose={() => setOpenCamera(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop
      >
        <Box
          sx={{
            ...UploadImageModal,
            width: "700px",
            height: "430px",
            pb: 0,
          }}
        >
          <Box
            sx={{
              p: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              pl: "20px",

              borderBottom: "1px solid #E4E5E7",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: "500",
                fontSize: "18px",
                fontFamily: "Roboto",
                color: "#2b2b2b",
              }}
            >
              Take Photo
            </Typography>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                handleCloseUploadImageModal();
                setOpenCamera(false);
              }}
            >
              <rect width="24" height="24" fill="none" />
              <path
                fill="#717171"
                fill-rule="evenodd"
                d="m12 10.586l5.657-5.657l1.414 1.414L13.414 12l5.657 5.657l-1.414 1.414L12 13.414l-5.657 5.657l-1.414-1.414L10.586 12L4.929 6.343L6.343 4.93z"
              />
            </svg>
          </Box>

          <CameraCapture
            setImagePreview={setImagePreview}
            setOpenCamera={setOpenCamera}
            setShowImagePreviewModal={setShowImagePreviewModal}
          />

          {/* button  */}

          <Box
            sx={{
              display: "flex",
              gap: "10px",
              mr: "20px",
              alignItems: "center",
              position: "absolute",
              bottom: 30,
              right: 130,
            }}
          >
            <Box
              sx={{
                color: "#12A8DA",
                fontFamily: "Roboto",
                width: "110px",
                textAlign: "center",
                borderRadius: "4px",
                fontSize: "14px",
                py: 1,
                border: "1px solid #12A8DA",
                cursor: "pointer",
              }}
              onClick={() => setOpenCamera(false)}
            >
              Cancel
            </Box>
          </Box>
        </Box>
      </Modal>

 
    </Box>
  );
};

export default About;

const genderList = [{ type: "Male" }, { type: "Female" }, { type: "Others" }];

const religionList = [
  { name: "Buddhism" },
  { name: "Christianity" },
  { name: "Hinduism" },
  { name: "Islam" },
  { name: "Jainism" },
  { name: "Jain" },
  { name: "Jewish" },
  { name: "Others" },
  { name: "Parsi" },
  { name: "Spiritual" },
  { name: "Sikh" },
];

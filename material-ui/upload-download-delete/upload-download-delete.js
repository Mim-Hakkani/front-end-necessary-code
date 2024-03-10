
page url link : http://localhost:3000/ehsan-inventory/settings/legal-papers?shopId=U2hvcE5vZGU6MzY%3D


import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import React, { useState, useRef, useContext, useEffect } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useQuery } from '@apollo/client';
import { ALL_LEGAL_PAPERS } from '../../../apolloClient/queries/ims-default-value/all-legal-papers';
import { useRouter } from 'next/router';
import { CLOSING } from 'ws';
import { GlobalContext } from '../../../pages/_app';
import useDeleteLegalPaper from '../../../apolloClient/mutation/ims-setting/legal-paper/delete-legal-paper';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useUploadLegalPaperMutation from '../../../apolloClient/mutation/ims-setting/legal-paper/legal-paper-mutation';
import moment from 'moment';

const textStyle = {
	color: '#2B2B2B',
	fontFamily: 'Inter',
	fontSize: '16px',
	fontStyle: 'normal',
	fontWeight: 500,
	lineHeight: 'normal',
};

const FileUpload = ({allPapers}) => {
	const [files, setFiles] = useState([]);
	const fileInputRef = useRef(null);
	const [toggle, setToggle] = useState(false);
	const [fileName, setFileName] = useState('');
	const maxFileSizeMB = 10;
	const router = useRouter();
	const { token } = useContext(GlobalContext);
    const {shopsLegalPaperUpload} =useUploadLegalPaperMutation()

	const allowedFileTypes = [
		'application/pdf',
		'application/zip',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
	];

// handle Query all legal papers list 


const {data:legalPaperData} =useQuery(ALL_LEGAL_PAPERS,{
	variables:{
		shopId:router.query.shopId
	},
	context:{
		headers: {
		  Authorization: `JWT ${token}`,
		},
	},
	fetchPolicy:'network-only'
})


// drop file 

	const handleDrop = (e) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file) {
			// Proceed with uploading the file
			shopsLegalPaperUpload({
				variables: {
					file: file, // Pass the file here
					shopId: router.query.shopId,
					filename:e.dataTransfer.files[0].name,
                    filesize:formatFileSize(e.dataTransfer.files[0].size)
				},
				context: {
					headers: {
						Authorization: `JWT ${token}`,
					},
				},
				onCompleted: () => {
					const selectedFiles = Array.from(e.dataTransfer.files);
		const filteredFiles = selectedFiles.filter(
			(file) =>
				allowedFileTypes.includes(file.type) &&
				file.size <= maxFileSizeMB * 1024 * 1024
		);
		    setFiles((prevFiles) => [
			...prevFiles,
			...filteredFiles.map((file) => ({
				file,
				name: file.name,
				size: file.size,
			})),
		]);
				},
				onError: (err) => {
					Swal.fire('Error!', err.message, 'error');
				},
			});
		}


	};

	const handleFileChange = (e) => {
		 console.log(e.target.files[0]);
		 
		 
		const file = e.target.files[0]; // Access the file from e.target.files
		if (file) {
			// Proceed with uploading the file
			shopsLegalPaperUpload({
				variables: {
					file: file, // Pass the file here
					shopId: router.query.shopId,
					filename:e.target.files[0].name,
                    filesize:formatFileSize(e.target.files[0].size)
				},
				context: {
					headers: {
						Authorization: `JWT ${token}`,
					},
				},
				onCompleted: () => {
					const selectedFiles = Array.from(e.target.files);
		const filteredFiles = selectedFiles.filter(
			(file) =>
				allowedFileTypes.includes(file.type) &&
				file.size <= maxFileSizeMB * 1024 * 1024
		);
		    setFiles((prevFiles) => [
			...prevFiles,
			...filteredFiles.map((file) => ({
				file,
				name: file.name,
				size: file.size,
			})),
		]);
				},
				onError: (err) => {
					Swal.fire('Error!', err.message, 'error');
				},
			});
		}
	
	};

	
	const handleDownload = (file,name) => {

		const a = document.createElement('a');
		a.href = file;
		a.download = name;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	// formated file in kb/mb/bytes

	const formatFileSize = (size) => {
		if (size >= 1024 * 1024) {
			return `${(size / (1024 * 1024)).toFixed(2)} MB`;
		} else if (size >= 1024) {
			return `${(size / 1024).toFixed(2)} KB`;
		} else {
			return `${size} Bytes`;
		}
	};

    // is show delete/download or is show fileImage
	const handleToggleDeleteOrDownload = (id) => {
        setToggle(!toggle);
        setFileName(id);
	};

    // handle delete files 

	//   mutation 

	const {shopsLegalPaperDelete}=useDeleteLegalPaper()

    const handleDeleteFile =(id)=>{

		Swal.fire({
			title: 'Are you sure to delete ?',
			icon: 'error',
			showCancelButton: true,
			reverseButtons: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#c1c1c1',
			cancelButtonText: 'Cancel',
			confirmButtonText: 'Delete',
			width: '300px',

			customClass: {
				icon: 'custom-error-icon',
				title: 'custom-title',
				confirmButton: 'confirm-button',
			},
		}).then((result) => {
			if (result.isConfirmed) {
				shopsLegalPaperDelete({
					variables: {
						id: id,
					},
					context: {
						headers: {
							Authorization: `JWT ${token}`,
						},
					},
					onCompleted: () => {
						toast.success('deleted legal paper', {
							position: 'top-center',
							autoClose: 1000,
						});
					},
					onError: (err) => {
						Swal.fire('Error!', err.message, 'error');
					},
				});
			}
		});

    }  

	return (
		<div>
			<div
				style={{
					border: '2px dashed #ccc',
					padding: '20px',
					textAlign: 'center',
				}}
				onDrop={handleDrop}
				onDragOver={(e) => e.preventDefault()}>
				<Typography variant='body1' sx={{ ...textStyle }}>
					Drop files to being upload or,
				</Typography>
				<input
					type='file'
					accept={allowedFileTypes.join(',')}
					multiple
					onChange={handleFileChange}
					style={{ display: 'none' }}
					ref={fileInputRef}
				/>
				<button
					onClick={() => fileInputRef.current.click()}
					style={{
						...textStyle,
						border: 'none',
						color: '#2479DD',
						fontSize: '16px',
						cursor: 'pointer',
					}}>
					Browse
				</button>
			</div>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<Typography
					variant='caption'
					sx={{
						...textStyle,
						color: '#9D9D9D',
						fontSize: '13px',
						pt: '10px',
						fontWeight: 400,
					}}>
					Supported formats: Zip, Pdf, Docx, Xls{' '}
				</Typography>

				<Typography
					variant='body1'
					sx={{
						...textStyle,
						color: '#9D9D9D',
						fontSize: '13px',
						pt: '10px',
						fontWeight: 400,
					}}>
					Maximum size : {maxFileSizeMB} MB
				</Typography>
			</Box>

			<>
				
					<Box>
						<Typography
							variant='body1'
							sx={{
								color: '#2B2B2B',
								fontFamily: 'Inter',
								fontSize: '15px',
								fontStyle: 'normal',
								fontWeight: 500,
								lineHeight: 'normal',
								textTransform: 'capitalize',
								pt: '30px',
								pb: '10px',
							}}>
							Uploaded Document
						</Typography>

                        {/* <Box sx={{ width: '100%' }}>
                          <LinearProgressWithLabel value={progress} />
                        </Box> */}

						<Grid container spacing={2}>
							{legalPaperData?.shopWiseLegalPapers?.edges?.map((fileObj, index) => (
								<Grid key={index} item xs={12} sm={6} md={4} lg={4}>

									{(toggle && fileObj.node.id===fileName) ? 
                                    
                                    <Box
                                    sx={{
                                        borderRadius: '6px',
                                        border: '1px solid #DCDCDC',
                                        p: '15px 10px 15px 20px',
                                        position: 'relative',
                                        height: '150px',
                                        transition:'1s'
                                    }}>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='28'
                                        height='28'
                                        viewBox='0 0 28 28'
                                        fill='none'
                                        onClick={()=>handleToggleDeleteOrDownload(fileName?.node?.id)}
                                        style={{
                                            position: 'absolute',
                                            top: '7px',
                                            right: '10px',
                                            cursor: 'pointer',
                                        }}>
                                        <path
                                            d='M15.0605 14L20 9.0605L18.9395 8L14 12.9395L9.0605 8L8 9.0605L12.9395 14L8 18.9395L9.0605 20L14 15.0605L18.9395 20L20 18.9395L15.0605 14Z'
                                            fill='#414141'
                                        />
                                    </svg>
                                
                                    {/* delete or download  */}
                                
                                    <Box
                                        sx={{
                                            pt: '35px',
                                        }}>
                                        <Typography
                                            variant='body1'
                                            sx={{
                                                color: '#F00',
                                                textAlign: 'center',
                                                fontFamily: 'Inter',
                                                fontSize: '15px',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal',
                                                cursor: 'pointer',
                                            }}
                                            
                                            onClick={()=>handleDeleteFile(fileObj.node.id)}
                                            >
                                           
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='15'
                                                height='14'
                                                viewBox='0 0 15 14'
                                                fill='none'>
                                                <path
                                                    d='M6.1 2.8H8.9C8.9 2.4287 8.7525 2.0726 8.48995 1.81005C8.2274 1.5475 7.8713 1.4 7.5 1.4C7.1287 1.4 6.7726 1.5475 6.51005 1.81005C6.2475 2.0726 6.1 2.4287 6.1 2.8ZM4.7 2.8C4.7 2.05739 4.995 1.3452 5.5201 0.820101C6.0452 0.294999 6.75739 0 7.5 0C8.24261 0 8.9548 0.294999 9.4799 0.820101C10.005 1.3452 10.3 2.05739 10.3 2.8H13.8C13.9857 2.8 14.1637 2.87375 14.295 3.00503C14.4263 3.1363 14.5 3.31435 14.5 3.5C14.5 3.68565 14.4263 3.8637 14.295 3.99497C14.1637 4.12625 13.9857 4.2 13.8 4.2H13.1826L12.5624 11.438C12.5028 12.1369 12.183 12.788 11.6663 13.2624C11.1496 13.7369 10.4737 14.0001 9.7722 14H5.2278C4.52634 14.0001 3.85039 13.7369 3.3337 13.2624C2.81702 12.788 2.49722 12.1369 2.4376 11.438L1.8174 4.2H1.2C1.01435 4.2 0.836301 4.12625 0.705025 3.99497C0.57375 3.8637 0.5 3.68565 0.5 3.5C0.5 3.31435 0.57375 3.1363 0.705025 3.00503C0.836301 2.87375 1.01435 2.8 1.2 2.8H4.7ZM9.6 7C9.6 6.81435 9.52625 6.6363 9.39497 6.50503C9.2637 6.37375 9.08565 6.3 8.9 6.3C8.71435 6.3 8.5363 6.37375 8.40503 6.50503C8.27375 6.6363 8.2 6.81435 8.2 7V9.8C8.2 9.98565 8.27375 10.1637 8.40503 10.295C8.5363 10.4263 8.71435 10.5 8.9 10.5C9.08565 10.5 9.2637 10.4263 9.39497 10.295C9.52625 10.1637 9.6 9.98565 9.6 9.8V7ZM6.1 6.3C6.28565 6.3 6.4637 6.37375 6.59497 6.50503C6.72625 6.6363 6.8 6.81435 6.8 7V9.8C6.8 9.98565 6.72625 10.1637 6.59497 10.295C6.4637 10.4263 6.28565 10.5 6.1 10.5C5.91435 10.5 5.7363 10.4263 5.60503 10.295C5.47375 10.1637 5.4 9.98565 5.4 9.8V7C5.4 6.81435 5.47375 6.6363 5.60503 6.50503C5.7363 6.37375 5.91435 6.3 6.1 6.3ZM3.832 11.319C3.86182 11.6686 4.02182 11.9942 4.28031 12.2315C4.5388 12.4687 4.87695 12.6002 5.2278 12.6H9.7722C10.1228 12.5999 10.4606 12.4682 10.7188 12.231C10.977 11.9938 11.1368 11.6683 11.1666 11.319L11.777 4.2H3.223L3.832 11.319Z'
                                                    fill='#FF0000'
                                                />
                                            </svg>{' '}
                                            Delete File
                                        </Typography>
                                
                                        <Typography
                                            sx={{
                                                color: '#215876',
                                                textAlign: 'center',
                                                fontFamily: 'Inter',
                                                fontSize: '15px',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal',
                                                pt: '10px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => handleDownload(fileObj?.node?.file,fileObj?.node?.fileName)}
											>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='20'
                                                height='14'
                                                viewBox='0 0 20 14'
                                                fill='none'>
                                                <path
                                                    d='M10.0063 4.42908V9.57162M10.0063 9.57162L12.4591 7.85744M10.0063 9.57162L7.55342 7.85744M19 9.57162C19.0001 9.11631 18.9136 8.66554 18.7457 8.24563C18.5778 7.82573 18.3317 7.44509 18.022 7.12594C17.7122 6.80679 17.3449 6.55552 16.9414 6.3868C16.538 6.21808 16.1066 6.13529 15.6723 6.14326C15.4964 4.86686 14.9329 3.68381 14.0654 2.7694C13.1979 1.85498 12.0724 1.25785 10.8558 1.06646C9.63918 0.875073 8.3961 1.09962 7.31075 1.70682C6.22539 2.31403 5.3555 3.27159 4.82995 4.43765C3.76912 4.508 2.77615 5.00873 2.06158 5.83364C1.34701 6.65856 0.967045 7.7428 1.00224 8.85646C1.03744 9.97012 1.48504 11.0256 2.25013 11.7991C3.01522 12.5727 4.03764 13.0034 5.10058 13H15.7295C16.5969 13 17.4288 12.6388 18.0421 11.9958C18.6554 11.3529 19 10.4809 19 9.57162Z'
                                                    stroke='#215876'
                                                    stroke-width='1.5'
                                                    stroke-linecap='round'
                                                    stroke-linejoin='round'
                                                />
                                            </svg>{' '}
                                            Download file
                                        </Typography>
                                    </Box>
                                </Box>
                                    
                                    :
                                        <Box
										sx={{
											borderRadius: '6px',
											border: '1px solid #DCDCDC',
											p: '15px 10px 15px 20px',
											position: 'relative',
											height: '150px',
										}}>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between',
												pb: '36px',
											}}>
											<img src='/images/file.png' alt='files' />
											<MoreHorizIcon
												fontSize='small'
												onClick={
													()=>handleToggleDeleteOrDownload(fileObj?.node?.id)
												}
												sx={{
													cursor: 'pointer',
													fontSize: '14px',
													height: '25px',
													width: '25px',
													position: 'absolute',
													top: '7px',
													right: '10px',

													':hover': {
														height: '25px',
														width: '25px',
														borderRadius: '50%',
														background: '#F3F3F3',
														fontSize: '14px',
													},
												}}
											/>
										</Box>

										<Typography
											variant='body1'
											sx={{
												fontFamily: 'Roboto',
												fontSize: '14px',
												fontWeight: '500',
												letterSpacing: '0.5px',
												// height:'36px',
												cursor: 'pointer',
												// Approximate height for 2 lines of text (adjust as needed)
												maxHeight: '66px',
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												display: '-webkit-box',
												WebkitLineClamp: 1, // This is specific for webkit-based browsers like Safari
												WebkitBoxOrient: 'vertical',
											}}
											title={fileObj?.node?.filename}
											>
										{fileObj?.node?.filename}
										</Typography>

										<Box
											sx={{
												display: 'flex',
												gap: '6px',
												alignItems: 'center',
												color: '#9D9D9D',
												pt: '2px',
											}}>
											<Typography
												variant='body2'
												sx={{
													fontFamily: 'Inter',
													fontSize: '12px',
												}}>
										      {moment(fileObj?.node?.createdDate).format('D MMM, YYYY')}
											</Typography>
											<FiberManualRecordIcon
												sx={{
													fontSize: '8px',
													color: '#9D9D9D',
												}}
											/>
											<Typography
												variant='body2'
												sx={{
													fontFamily: 'Inter',
													fontSize: '12px',
												}}>
											    {fileObj?.node?.filesize}
											</Typography>
										</Box>
									    </Box>
                                     } 
								</Grid>
							))}
						</Grid>
					</Box>
				
			</>

		
		</div>
	);
};

export default FileUpload;


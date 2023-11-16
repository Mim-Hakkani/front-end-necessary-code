import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Title from '../../components/Header/Title';
import { Box, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import useExecuteDcBkashMutationHandler from '../../apolloClient/mutation/myBkash/DcPayment/executePayment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const DCPaymentProcessing = () => {
	const router = useRouter();

	const {
		executeDcPaymentMutation,
		data,
		loading,
		error,
	} = useExecuteDcBkashMutationHandler();

	useEffect(() => {
		executeDcPaymentMutation({
			variables: {
				processingId: router.query.id,
				paymentID: router.query.paymentID,
				status: router.query.status,
			},
			onCompleted: () => {},

			onError: (err) => {
				Swal.fire({
					title: `${err.message}`,
					icon: 'error',
					showCancelButton: false,
					confirmButtonText: 'OK',
				}).then((result) => {
					if (result.isConfirmed) {
						// Redirect to the homepage
						window.location.href = '/'; // Change this to the actual homepage URL
					}
				});
			},
		});
	}, []);

	useEffect(() => {
		if (data !== undefined) {
			Swal.fire({
				title: `${data?.executeDcPaymentMutation?.executePaymentData?.statusMessage}`,
				icon: `${
					data?.executeDcPaymentMutation?.executePaymentData?.statusMessage ===
					'Successful'
						? 'success'
						: 'error'
				}`,
			});
		}
	}, [data]); // Update the dependency array here

	const containerStyles = {
		position: 'relative', // Set the container to relative positioning
		width: '100vw', // Set container width to 100% of viewport width
		height: '100vh', // Set container height to 100% of viewport height
		overflow: 'hidden', // Hide any overflowing content
	};

	const iframeStyles = {
		position: 'absolute', // Position the iframe absolutely within the container
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		pointerEvents: 'none', // Disable pointer events on the iframe
	};

	const h1Styles = {
		position: 'absolute', // Position the <h1> absolutely within the container
		top: '50%', // Adjust the vertical position as needed
		left: '50%', // Adjust the horizontal position as needed
		transform: 'translate(-50%, -50%)', 
		zIndex: 1, 
	};


    const handlePaymentSuccess = () => {
        Swal.fire({
            title: 'Payment Successful',
            text: 'Thank you! Your payment is complete.',
            icon: 'success',
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirect to the homepage
                window.location.href = '/';
            }
        });
    };

    useEffect(() => {
        if (data?.executeDcPaymentMutation?.executePaymentData?.statusMessage === 'Successful') {
            handlePaymentSuccess();
        }
    }, [data]); 

	return (
		<div>
			<Title>Dc-Payment-processing</Title>
			{loading ? (
				<img
					src='/images/spinner.gif'
					alt='loading'
					height='70'
					width='70'
					style={{
						margin: '0 auto',
						display: 'block',
					}}
				/>
			) : (
				<Box>
					{data?.executeDcPaymentMutation?.executePaymentData?.statusMessage ===
						'Successful' && (
						<div style={containerStyles}>
							<iframe
								src='https://giphy.com/embed/1itd8X8whi3eOgZSRW'
								frameBorder='0'
								className='giphy-embed'
								style={iframeStyles}></iframe>
							<h1 style={h1Styles}></h1>
						</div>
					)}
				</Box>
			)}
		</div>
	);
};

export default DCPaymentProcessing;

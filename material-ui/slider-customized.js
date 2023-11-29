// functionalities 

const PrettoSlider = styled(Slider)({
    color: '#0480FE',
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#0480FE',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#0480FE',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});

function valuetext(value) {
    return `${value}°C`;
}

const marks = [
    {
        value: 0,
        label: '0c',
    },

    {
        value: 1000,
        label: '1000c',
    },
];
 


// components code in mui 

			{/* slider in customized  */}

			<Typography
				sx={{
					color: '#2B2B2B',
					textTransform: 'capitalize',
					fontSize: '15px',
					fontWeight: 500,
				}}>
				Maximum number of posts to post (Post will shop after reaching)
			</Typography>
			<PrettoSlider
				valueLabelDisplay='auto'
				aria-label='pretto slider'
				defaultValue={200} // Change this value to represent the initial position on the slider (e.g., 200 for 20% in a range of 0-1000)
				step={10} // Optional: Defines the step size for the slider movement
				min={0} // Defines the minimum value of the slider (0 in this case)
				max={1000} // Defines the maximum value of the slider (1000 in this case)
				getAriaValueText={valuetext}
				marks={[
					// Adjust marks to represent specific values on the slider
					{
						value: 0,
						label: '0',
					},
					{
						value: 1000,
						label: '1000',
					},
				]}
			/>
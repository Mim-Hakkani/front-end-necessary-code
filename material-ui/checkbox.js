// functionalities 

const [priceRange,setPriceRange] = useState(false)

const handleRattingChange = () => {
    setRattingCheck(!rattingCheck);
};
 

// components 
<FormControlLabel
control={
    <Checkbox
        checked={priceRange}
        onChange={handlePriceRange}
        inputProps={{ 'aria-label': 'controlled' }}

sx={{
color:priceRange ? "#D6D6D6": "#D6D6D6",
'&.Mui-checked': {
color:priceRange ? "#2b2b2b": "#2B2B2B",

},



}}
    />
}
label={         
<Typography variant="body2" sx={{fontWeight:500}}>Product Price Range</Typography>

}
/>
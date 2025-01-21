
      <Select
    labelId="demo-select-small"
    id="demo-select-large"
    value={country}
    size="small"
    fullWidth
    required
    name="warehouse"
    displayEmpty
    IconComponent={KeyboardArrowDownIcon}
    onChange={(e) => setCountry(e.target.value)}
    renderValue={(selected) =>
        selected && selected !== "Select country" ? country?.node?.name : "Select country"
    }
    sx={{
        fontSize: "13.5px",
        color: country && country !== "Select country" ? "#2b2b2b" : "#9D9D9D",
        input: {
            height: "18px",
        },
        "& .MuiSvgIcon-root": {
            color: "#a7a7a7",
            fontSize: "22px",
        },
    }}
>
    <MenuItem value="Select country" disabled sx={{ color: "#000",fontSize:'13px' }}>
        Select Country
    </MenuItem>

    {/* Example dynamic options */}
    {/* {warehouses?.selfUsersWarehouses?.edges?.map((item) => (
        <MenuItem key={item?.node?.id} value={item?.node?.id} sx={formTextDesign}>
            {item?.node?.name}
        </MenuItem>
    ))} */}
                        </Select>
                        
                        
                        



/************************* remove border in textField ***********************************/

  '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none', // Remove the border
        
      },
    },


/*************************** country code / any *****************************************/

  <FormControl fullWidth>
            <Select
                labelId="demo-select-small"
                id="demo-select-large"
                value={country} // Selected country's ID
                size="small"
                fullWidth
                required
                name="country"
                displayEmpty
                onChange={(e) => setCountry(e.target.value)} // Save country ID
                renderValue={(selected) => {
                    if (!selected || selected === "Country") return "Country";
                    const selectedCountry = CountryData?.countries?.edges?.find(
                        (item) => item?.node?.id === selected // Match by ID
                    );
                    return selectedCountry?.node?.name || "Country"; // Show name
                }}
                sx={{
                    fontSize: "13.5px",
                    color: "#2b2b2b",
                    input: {
                        height: "18px",
                    },
                    "& .MuiSvgIcon-root": {
                        color: "#a7a7a7",
                        fontSize: "22px",
                    },
                }}
            >
                <MenuItem value={null} sx={optionStyle}>
                    All Country
                </MenuItem>
                {CountryData?.countries?.edges?.map((item) => (
                    <MenuItem 
                        key={item?.node?.id} // Ensure unique key
                        value={item?.node?.id} // Save country ID in value
                        sx={optionStyle}
                    >
                        {item?.node?.name}
                    </MenuItem>
                ))}
            </Select>
         </FormControl>







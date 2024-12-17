
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








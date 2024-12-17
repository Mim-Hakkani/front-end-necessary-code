      <Box sx={{
                    display:'flex',
                    alignItems:'center',
                    gap:'10px',
                    mb:'15px'
                }}> 
             

               {/* search text  */}

                <TextField
                    placeholder="Search by cin.."
                    value={searchName}
                    onChange={(e)=>setSearchName(e.target.value)}
                    type='search'
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#676A79" d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2M4 10.5a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0"/></g></svg>
                        </InputAdornment>
                    ),

                    endAdornment:(
                       searchName && <InputAdornment position="end">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 24 24"
                            
                            style={{
                                cursor:'pointer'
                            }}
                            onClick={()=>setSearchName("")}
                            
                            ><path fill="#676A79" d="m8.401 16.333l-.734-.727L11.266 12L7.667 8.42l.734-.728L12 11.29l3.574-3.597l.734.727L12.709 12l3.599 3.606l-.734.727L12 12.737z"/></svg>
                        </InputAdornment>
                    )
                    }}

                    sx={{
                    input: {
                        height: "2px",
                        fontSize: { xs: "12px", sm: "13px" },
                        paddingcenter: "10px!important",
                    },

                    width:'90%',

                    "& fieldset": {
                        border: {
                        xs: "1px solid #E7E7E7",
                        sm: "1px solid #d5d5d5",
                        },
                    },
                    "& input::placeholder": {
                        fontFamily: "Inter",
                        fontSize: "13px!important",
                    },
                    }}
                />

                {/* search button  */}
                
                <Box sx={{
                background: 'linear-gradient(90.38deg, #21CDF7 2.78%, #21A4F4 99.86%)',
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                border:'1px solid #DADADA',
                p:'7px 12px',
                width:'100px',
                textAlign:'center',
                color:'#0086B4',
                fontSize:'13px',
                fontFamily:'Inter',
                fontWeight:'500',
                borderRadius:'4px',
                cursor:'pointer'
                }}
                // onClick={handleSearchMessage}
                
                >Search</Box>


                
                </Box>

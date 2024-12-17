{/* phone Number */}

                <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ mb: 1 }}>

                        <Typography variant="body1" sx={formTextDesign}>Mobile Number</Typography>
                         
                         <Box sx={{
                            display:'flex',
                            alignItems:'center',
                            border:'1px solid #C7D5E3',
                            borderRadius:'8px'
                            }}>
                         <TextField 
                          placeholder="Code"
                       
                          size='small'
                          type="text"
                            sx={{

                                

                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      border: 'none', // Remove the border
                                      
                                    },
                                  },
                              
                                '& input::placeholder': {
                                    fontFamily: 'Inter',
                                    fontSize: '13px',
                                    opacity: 1,
                                    color: '#9d9d9d',
                                },
                                input: {
                                    color: '#2b2b2b',
                                    fontSize: '13.5px',
                                    fontFamily: 'Inter',
                                    height: '18px',
                                    paddingLeft: '10px!important',
                                    backgroundColor:'#EDF2F8',
                                    width:'80px!important',
                                    borderRadius:'8px 0px 0px 8px',
                                },
                            }}
                            />

                        <TextField

                            placeholder="Mobile Number"
                            fullWidth
                            size='small'
                            type="text"
                            // value={latitude}
                        
                            sx={{
                                '& input::placeholder': {
                                    fontFamily: 'Inter',
                                    fontSize: '13px',
                                    opacity: 1, color: '#9d9d9d',
                                },

                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      border: 'none', // Remove the border
                                      
                                    },
                                  },
                              

                                input: {
                                    color: '#2b2b2b',
                                    fontSize: '13.5px',
                                    fontFamily: 'Inter',
                                    height: '18px',
                                    paddingLeft: '10px!important',

                                },
                            }}
                        />
                         </Box>
                      

                    </Box>
                </Grid>

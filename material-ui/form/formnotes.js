 1. remove mui input border :  "& fieldset": { border: 'none' },
 
 2. image height width problem and show smoothly code 
 
 	<Grid item xs={12} md={2}>
					<Box sx={{width:'100%',border:'1px solid #cbcbcb',height: '162px',borderRadius:'4px'}}>
						{logoPreview ? (
							<img
								src={URL.createObjectURL(logoPreview)}
								style={{
									
									width:'100%',
									height:'100%',
									overflow:'hidden',
									margin:'0 auto',
									display:'block',
									objectFit:'contain',

								}}
								alt='category-icon'
							/>
						) : (
							<img
								src='/images/addimage.png'
								style={{
									width: '100%',
									height: '162px',
								}}
								alt='category-icon'
							/>
						)}
					</Box>
					<label htmlFor='contained-button-file0'>
						<Input
							name="logo"
							{...register("logo")}
							accept="image/*"
							onChange={handleLogo}
							id="contained-button-file0"
							multiple
							type="file"

						/>
						<Button
							component='span'
							sx={{
								border: '1px solid #CBCBCB',
								borderRadius: '2px',
								background: "linear-gradient(180deg, #FEFFFF 0%, #FEFFFF 0%, #F4F4F4 100%)",
								color: '#252D4EBF',
								fontSize: '13px',
								textTransform: 'capitalize',
								fontFamily: 'Roboto',
								width: '100%',
								mt:1,

								':hover': {
									background: '#FFF5E9',
								},
							}}>
							Shop Logo
						</Button>
					</label>


				</Grid>

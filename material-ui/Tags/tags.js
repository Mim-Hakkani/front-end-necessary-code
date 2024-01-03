
// functionality for tags 

	const [tags, setTags] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [inputValueFlag, setInputValueFlag] = useState(false);

	// for tags

	useEffect(() => {
		if (inputValueFlag == true && inputValue == ',') {
			setInputValue('');

			setInputValueFlag(false);
		}
	});


	// remove the tag after click the x button

	function removeTag(event, index) {
		event.preventDefault();
		if (index >= 0 && index < tags.length) {
			setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
		}
	}



// component / pages code  for tags :

<Paper elevation={1} sx={{ p: '21px 40px', mb: 2 }}>
    <Typography sx={{ py: 1, fontSize: '15px' }}>
        Type Your Product Tags
    </Typography>
    <FormControl fullWidth={true}>
        <OutlinedInput
            inputProps={{
                style: {
                    height: '13px',
                    fontSize: '14px',
                },
            }}
            fullWidth={true}
            placeholder='Find or create tags(separated by comma)'
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === ',') {
                    e.preventDefault();
                    let temp = inputValue
                        .split(',')
                        .filter((val) => val.trim() !== '');
                    setTags([...tags, ...temp]);
                    setInputValue('');
                    setInputValueFlag(true);
                }
            }}
        />
    </FormControl>
    <ul
        style={{
            listStyle: 'none',
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: '10px',
        }}>
        {tags.map((tag, index) => (
            <li
                key={index}
                style={{
                    backgroundColor: '#EAE9E9',
                    fontSize: '15px',
                    padding: '3px 10px',
                    color: '#202020',
                    textTransform: 'capitalize',
                    borderRadius: '3px',
                    margin: '5px',
                }}>
                {tag}
                <button
                    onClick={(event) => removeTag(event, index)}
                    style={{
                        order: '0',
                        background: 'transparent',
                        color: '#000',
                        marginLeft: '7px',
                        fontWeight: '700',
                        fontSize: '18px',
                        border: 0,
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                    }}>
                    x
                </button>
            </li>
        ))}
    </ul>
</Paper>
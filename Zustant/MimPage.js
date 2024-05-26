import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import useStore from './ZustandStore/store';
import { useQuery } from '@apollo/client';
import { GET_CONTINENTS } from '../apolloClient/queries/address/ContinentQuery';

export default function TestMim() {


// declare store and distructuring elements whose i use it 

  const {count,addCount,setContinents,continents} =useStore();


  // if store data from api 

  const {data,loading,error} =useQuery(GET_CONTINENTS)
  useEffect(()=>{
   
    if(!loading && !error && data){
      setContinents(data);
    }
 
  },[])
  

 



const handleClick = (num) => {
  addCount(num)
} 
  return (
    <Box sx={{my:5}}>
    <p>{count}</p>
    <button onClick={()=>handleClick(10)}>aaaa</button>
    </Box>
  );
}

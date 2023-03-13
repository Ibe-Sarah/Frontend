import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import {Box, Image, Link} from 'react'

function Nft(props)  {
  

  return (
    <Box maxW='lg'
    borderWidth='1px' borderRadius='lg' overflow='hidden'
   mt='1'
   fontWeiht='semibold'
   as='h4'
   lineHeight='tight'
   noOfLines={1}>
   <Image src={props.images} alt=''/>
   <Link href={'https://opensea.io/assests/'+props.address +'/' +props.id} target='_blank'>
  {props.title ? props.title: '#' +props.id}
   </Link>
   {props.description}
   </Box>
  );
};

export default Nft;

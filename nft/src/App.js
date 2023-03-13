import logo from './logo.svg';
import './App.css';
import Nft from './components/nft';
import {getDefaultProvider, utils} from 'ethers.js'
// import {NftProvider, useNft} from 'use-nft'
import {useEffect, useState} from 'react'
import axios from 'axios';
import { Container, GridItem, SimpleGrid, Button, FormText, FormControl, FormLabel, InputGroup, Alert, AlertIcon } from 'react-bootstrap';



const ethersConfig= {
  provider:getDefaultProvider('homestead'),
}

function App() {
const perPage= 9;
const [nfts, setNfts]= useState([]);
const [showCount, setShowCount]= useState(perPage);
const [address, setAddress]= useState('');
const [errorMessageText, setErrorMessageText]= useState('');
const [startToken, setStartToken]= useState('');

useEffect(()=> {
  const baseURL= `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_alchemy_api_key}/getNFTsFrCollection`;
  if (!utils.isAddress(address) && address != ''){
    setErrorMessageText('Invalid address');
    setNfts(null);
  }else {
    if (nfts== null || nfts.length <showCount && address !='') {
      var config= {
        method: 'get',
        url: `${baseURL} ?contractAddress= ${address} &withMetadata=true&startToken=${startToken}`,
        headers:{}
      } ;
      axios(config)
      .then(response=> {
        setErrorMessageText('');
        setNfts([...nfts, ...response.data.nfts]);
        setStartToken(response.data.nfts[response.data.nfts.lenth - 1].id.tokenId);
      })
      .catch(error=>setErrorMessageText(error.message))
    }
  }
}, [showCount, address]);

  return (
  <>
  <Container maxWidth={1200}>
    <FormText fontSize= '4xl' fontWeight='bold' marginBottom='4' textAlign='center'>NFT GALLERY</FormText>
    <FormControl marginBottom={4}>
      <FormLabel fontWeight={700} htmlFor='email'>Contract Address</FormLabel>
      <InputGroup id='email' type='email' value={address} onChange={(val)=>{
        setAddress(val.target.value)}}/>
        <h1>Make something show na</h1>
     </FormControl>

        {errorMessageText ?
        <Alert show={errorMessageText} status='error'>
        {/* <AlertIcon/> */}
        {errorMessageText}
        </Alert>
        :<></>}

        <div columns={[2, null, 3]} gap={6}>
          {nfts.length>0 ? nfts.slice(0, showCount).map((nft, key)=>
          <div key={key}>
            <Nft title={nft.title} address={nft.contract.address} id={parseInt(nft.id.tokenId, 16)} image={nft.media[0].gateway}/>
          </div>
          ):null }
        </div>
  </Container>
  <Container marginTop='4' centerContent>
    {nfts.length > 0? <Button align='center' onClick={() => {setShowCount(showCount + perPage)}}>Load more</Button>:<></>}

  </Container>
  
  </>
  );
}
export default App;


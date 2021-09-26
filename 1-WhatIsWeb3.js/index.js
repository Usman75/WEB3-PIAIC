const Web3 = require('web3');
require('dotenv').config({ path: '../.env' })
const INFURA_KEY = process.env.INFURA_API_KEY;
const ADDRESS = process.env.ADDRESS;
const rpcURL = `https://mainnet.infura.io/v3/${INFURA_KEY}`;
const web3 = new Web3(rpcURL);
const address = `${ADDRESS}`;

 const balance  = async () => {
     await web3.eth.getBalance(address, (err, wei) => {
         console.log("Balance : ",web3.utils.fromWei(wei,'ether')," ETH" )
     })
 }

 balance();
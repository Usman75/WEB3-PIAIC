const Web3 = require('web3');
require('dotenv').config({ path: '../.env' })
const INFURA_KEY = process.env.INFURA_API_KEY;
const rpcURL = `https://mainnet.infura.io/v3/${INFURA_KEY}`;
const web3 = new Web3(rpcURL);

// Get average gas price in wei from last few blocks median gas price
web3.eth.getGasPrice().then((result) => {
    console.log(web3.utils.fromWei(result, 'gwei'))
  })
  
  // Use sha256 Hashing function
  console.log(web3.utils.sha3('PIAIC BCC'))
  
  // Use keccak256 Hashing function (alias)
  console.log(web3.utils.keccak256('PIAIC BCC'))
  
  // Get a Random Hex
  console.log(web3.utils.randomHex(32))
  
  // Get access to the underscore JS library
//   const _ = web3.utils._
  
//   _.each({ key1: 'value1', key2: 'value2' }, (value, key) => {
//     console.log(key)
//   })
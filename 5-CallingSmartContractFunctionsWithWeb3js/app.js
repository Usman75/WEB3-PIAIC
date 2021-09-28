const {  Transaction } = require( '@ethereumjs/tx' );
const {Chain} = require( '@ethereumjs/common' );
const Common = require( '@ethereumjs/common' ).default;
const Web3 = require('web3');
require('dotenv').config({ path: '../.env' });

const INFURA_KEY = process.env.INFURA_API_KEY;
const rpcURL = `https://ropsten.infura.io/v3/${INFURA_KEY}`;
const web3 = new Web3(rpcURL);

const account1 = process.env.ACCOUNT1;
const account2 = process.env.ACCOUNT2;

const privatekey1 = Buffer.from(process.env.PRIVATE_KEY_1,'hex');
const privatekey2 = Buffer.from(process.env.PRIVATE_KEY_2,'hex');

async function main() {
const contractAddress = '0xAAcB0018399BD1e229543eA7424c39EcD0f0eF90'
const contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]

const contract = new web3.eth.Contract(contractABI, contractAddress)

web3.eth.getTransactionCount(account1, async (err, txCount) => {

    const txObject = {
      nonce:    web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(800000), // Raise the gas limit to a much higher amount
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
      to: contractAddress,
      data: contract.methods.transfer(account2, 1000).encodeABI()
    }
  
    const common = new Common({chain : Chain.Ropsten});
    const tx =  Transaction.fromTxData(txObject,{ common });
    const sigenedTx = tx.sign(Buffer.from(privatekey1,'hex'));
const serializedTx = sigenedTx.serialize();
const raw = '0x' + serializedTx.toString('hex');
 const res =  await web3.eth.sendSignedTransaction( raw )
 .on( 'error' , function( error ) {
    console.error( error )
} );
// console.log(res);
console.log(`https://ropsten.etherscan.io/tx/${res.transactionHash}`);
console.log('Account1: ',await contract.methods.balanceOf(account1).call());
console.log('Account2: ',await contract.methods.balanceOf(account2).call());
});
}
main();
const Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
require('dotenv').config({ path: '../.env' });

const INFURA_KEY = process.env.INFURA_API_KEY;
const rpcURL = `https://ropsten.infura.io/v3/${INFURA_KEY}`;
const web3 = new Web3(rpcURL);

const account1 = process.env.ACCOUNT1;
const account2 = process.env.ACCOUNT2;

const privatekey1 = Buffer.from(process.env.PRIVATE_KEY_1,'hex');
const privatekey2 = Buffer.from(process.env.PRIVATE_KEY_2,'hex');


web3.eth.getTransactionCount(account1, (err, txCount) => {
    console.log(txCount);
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: account2,
        value: web3.utils.toHex(web3.utils.toWei('0.2', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')) 
    }

    const tx = new Tx(txObject)
tx.sign(privatekey1);

const serializedTx = tx.serialize();
const raw = '0x' + serializedTx.toString('hex');

web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    try{
    console.log('txHash : ',txHash);
    }catch (err){
        console.log('Error: ', err);
    }
});
});

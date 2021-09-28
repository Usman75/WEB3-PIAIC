const {  Transaction } = require( '@ethereumjs/tx' );
const {Chain} = require( '@ethereumjs/common' );
const Common = require( '@ethereumjs/common' ).default;
const Web3 = require('web3');
require('dotenv').config({ path: '../.env' });

async function main () {

const INFURA_KEY = process.env.INFURA_API_KEY;
const rpcURL = `https://ropsten.infura.io/v3/${INFURA_KEY}`;
const web3 = new Web3(rpcURL);

const account1 = process.env.ACCOUNT1;
const account2 = process.env.ACCOUNT2;

const privatekey1 = Buffer.from(process.env.PRIVATE_KEY_1,'hex');
const privatekey2 = Buffer.from(process.env.PRIVATE_KEY_2,'hex');


web3.eth.getTransactionCount(account2, async (err, txCount) => {
    const txObject = {
        nonce                 :   web3.utils.toHex( txCount ),
        gasPrice              :   web3.utils.toHex( await web3.eth.getGasPrice() ),
        gasLimit              :   web3.utils.toHex( await web3.eth.estimateGas({to: account1, data : '0x'})),
        to                    :   web3.utils.toHex( account1 ),
        value                 :   web3.utils.toHex( web3.utils.toWei( '0.2' , 'ether' ) ),
        
    }
    const common = new Common({chain : Chain.Ropsten});
    const tx =  Transaction.fromTxData(txObject,{ common });
    const sigenedTx = tx.sign(Buffer.from(privatekey2,'hex'));
const serializedTx = sigenedTx.serialize();
const raw = '0x' + serializedTx.toString('hex');
 const res =  await web3.eth.sendSignedTransaction( raw )
 .on( 'error' , function( error ) {
    console.error( error )
} );
// console.log(res);
console.log(`https://ropsten.etherscan.io/tx/${res.transactionHash}`)
});
}

main();

const solc = require('solc');

const fs = require('fs');

const input = fs.readFileSync('./MyNFT.sol', 'utf8');

const output = solc.compile(input, 1);

if (output.errors) {
    throw new Error(output.errors[0]);
}


const bytecode = output.contracts['MyNFT.sol']['MyNFT'].evm.bytecode.object;
const abi = JSON.parse(output.contracts['MyNFT.sol']['MyNFT'].abi);

const path =require('path');
const fs= require('fs');
const solc=require('solc');

const biddingPath= path.resolve(__dirname,'contracts','Bidding.sol');
const source=fs.readFileSync(biddingPath,'utf8');
module.exports =solc.compile(source,1).contracts[':Bidding'];









1// helps us to build a path from compile.js file to bidding.sol file
5//dirname is a constant, it is set to current working directory
7//source code is passed and now we are compiling only one contract so it is 1

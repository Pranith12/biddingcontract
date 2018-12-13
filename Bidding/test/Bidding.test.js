const assert = require('assert');
const ganache =require('ganache-cli');//local test n/w it automatically boots up local test network
const Web3= require('web3');
const web3= new Web3(ganache.provider());

const {interface, bytecode}=require('../compile');

let bidding;
let accounts;

beforeEach(async() =>{
	accounts= await web3.eth.getAccounts();

	bidding= await new web3.eth.Contract(JSON.parse(interface))
	.deploy({data: bytecode})
	.send({from: accounts[0],gas:'4600000'});
});

describe('Bidding Contract',()=>{
  it('deploys a Contract',()=>{
  	assert.ok(bidding.options.address);//address of our contract was deployed in the local network
  });

  it('require a minimum amount of ethr',async()=>{
  	try{
  		await bidding.methods.enter().send({
  		from: accounts[0],
  		value:0
  		});
  		assert(false);
  	}catch(err){
  		assert(err);
  	}
  });
  it('only supervisor can call pickwinner',async()=>{
  	try{
  		await bidding.methods.pickWinner().send({
  			from: accounts[1]
  		});
  		assert(false);
  	}catch(err){
  		assert(err);
  	}
  });
});
const HDWalletProvider=require('truffle-hdwallet-provider');//importing hdwallet provider
const Web3= require('web3');// creating web3 instance
const {interface,bytecode}=require('./compile');// interface and bytecode from compile

const provider=new HDWalletProvider(
'resist famous bullet hat flash donate check umbrella illness hill equip best',
'https://rinkeby.infura.io/v3/bee2e003d3304b40a3e5537bc195855a'
);

const web3=new Web3(provider);
const deploy = async () => {
	const accounts= await web3.eth.getAccounts();

	console.log('attempting to deploy from account',accounts[0]);

	const result=await new web3.eth.Contract(JSON.parse(interface))//provide ABI
		.deploy({data:bytecode})
		.send({gas:'1000000',from:accounts[0]});

	console.log(interface);
	console.log('contract deployed to',result.options.address);
};

deploy();

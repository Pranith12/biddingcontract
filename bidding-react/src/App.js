import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import bidding from './bidding'; 


export default class App extends Component {
  state={
    supervisor:'',
    bidders:[],
    balance:'',
    value:'',
    message:' ',
    getBidderWinner:' '
  };
  

 async componentDidMount(){
  const getBidderWinner =await bidding.methods.getBidderWinner().call();
  const supervisor = await bidding.methods.supervisor().call();
  const bidders= await bidding.methods.seeBidders().call();
  const balance= await web3.eth.getBalance(bidding.options.address);
  this.setState({supervisor,bidders,balance,getBidderWinner});
  
  }
  
onSubmit= async (event)=>{
  event.preventDefault();
  const accounts= await web3.eth.getAccounts();

  this.setState({message:'sending you into bidding'});

  await bidding.methods.enter().send({
    from:accounts[0],
    value: web3.utils.toWei(this.state.value,'ether')
  });
  this.setState({message:'you are into bidding!!!'});
};


  onClick= async(event) =>{
    const accounts=await web3.eth.getAccounts();
    this.setState({message:'Panel is going to announce the winner'});

    await bidding.methods.pickWinner().send({
      from:accounts[0]
    });
    this.setState({message:'A winner is picked'});
    this.setState({message:'The Bid goes to'});
      
    
  };
  render() {
    console.log(web3.version);

    return (
      <div>
      <h2> Bidding Contract </h2>
      <p>
      This is managed by {this.state.supervisor}<br></br>
      There are {this.state.bidders.length} bidders <br></br>
      Total amount bidded till now 
      {web3.utils.fromWei(this.state.balance,'ether')}

      </p>

      <hr />

      <form onSubmit={this.onSubmit}>
      <h4>Bid for your player here</h4>
      <div>
        <label> Enter your amount </label>
        <input
        value={this.state.value}
        onChange={event => this.setState({ value:event.target.value})}
        />
      </div>
      <button>Enter</button>
      </form>

      <hr />
      <h4> Time to announce the bid winner</h4>
      <button onClick={this.onClick}> Click to see the winner</button>

      <hr /> 

      <h1>{this.state.message} {this.state.getBidderWinner}</h1> 

      <hr />

      
      </div>
      );
  }
}

// App.js
import './App.css'
import React, { Component } from 'react'
import Web3 from 'web3'
// import compiled smart contract 
import Vote from './truffle_abis/Vote.json'
// import Navbar
import Navbar from './navbar/Navbar.jsx'
// import Main(buttons are here)
import Main from './user/Main.jsx'
// import Owner(only owner can use this)
import Owner from './owner/Owner.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' // Update the alias for BrowserRouter as Router

class App extends Component {
  async componentDidMount() {
    await this.loadWeb3()
    await this.loadContracts()
  }

  // load metamask address
  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('No ethereum browser detected!')
    }
  }
  
  // load smart contracts(Token, SetTeam, Vote)
  async loadContracts() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
  
    const voteData = Vote.networks[networkId];
    if (voteData) {
      const vote = new web3.eth.Contract(Vote.abi, voteData.address);
  
      let ownerAddress = await vote.methods.showOwner(this.state.account).call();
      
      // Update tokenBalance state with the latest value
      let tokenBalance = await vote.methods.balanceOf(this.state.account).call();
      this.setState({ ownerAddress, vote, tokenBalance });
    } else {
      window.alert("Vote contract not deployed to detect network!");
    }
  }
  
  constructor(props) {
    super(props)
    this.state = {
      ownerAddress: '',
      account: '0x0',   // user`s actual address
      vote: {},         // contract of the Vote.sol
      tokenBalance: '0',// token Balance
    }
  }
  render() {
    
    return (
      <Router>
        <div className='App'>
          <Navbar account={this.state.account}
                  tokenBalance={this.state.tokenBalance}/>
          <div className='container-fluid mt-5'>
            <div className='row'>
              <main
                role='main'
                className='col-lg-12 ml-auto mr-auto'
                style={{ maxWidth: '600px', minHeight: '100vm' }}>
                    

                <Routes>
                  <Route
                    path='/'
                    element={
                      <Main
                        vote={this.state.vote}
                        ownerAddress={this.state.ownerAddress}
                        account={this.state.account}
                        tokenBalance={this.state.tokenBalance}
                      />
                    }
                  />

                  <Route
                    path='/owner'
                    element={
                      <Owner
                        ownerAddress={this.state.ownerAddress}
                        vote={this.state.vote}
                        account={this.state.account}
                      />
                    }
                  />
                </Routes>

              </main>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;

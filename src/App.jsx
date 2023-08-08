// App.js
import './App.css'
import React, { Component } from 'react'
import Web3 from 'web3'
// import compiled smart contract 
import Contracts from './truffle_abis/Vote.json'
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
    try{
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
    } catch(error) {
      window.alert(error)
    } 
  }
  
  // load smart contracts(Token, SetTeam, Vote)
  async loadContracts() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
  
    const contractData = Contracts.networks[networkId];
    if (contractData) {
      const contract = new web3.eth.Contract(Contracts.abi, contractData.address);
  
      let ownerAddress = await contract.methods.showOwner(this.state.account).call();
      let tokenBalance = await contract.methods.balanceOf(this.state.account).call();

      this.setState({ ownerAddress, contract, tokenBalance });
    } else {
      window.alert("Vote contract not deployed to detect network!");
    }
  }
  updateMatchData = (matchData) => {
    this.setState({
      homeTeam: matchData.homeTeam,
      awayTeam: matchData.awayTeam,
      homeTeamURL: matchData.homeTeamImageURL,
      awayTeamURL: matchData.awayTeamImageURL
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      ownerAddress: '',
      account: '0x0',   
      contract: {},         
      tokenBalance: '0',
    }
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Navbar account={this.state.account}
                  tokenBalance={this.state.tokenBalance}/>
          <div>
            <div className='row'>
              <main
                role='main'
                style={{ maxWidth: '600px', minHeight: '100vm' }}>
                    

                <Routes>
                  <Route
                    path='/'
                    element={
                      <Main
                        contract={this.state.contract}
                        ownerAddress={this.state.ownerAddress}
                        account={this.state.account}
                        tokenBalance={this.state.tokenBalance}
                        teamData={this.state.teamData}
                      />
                    }
                  />

                  <Route
                    path='/owner'
                    element={
                      <Owner
                        ownerAddress={this.state.ownerAddress}
                        contract={this.state.contract}
                        account={this.state.account}
                        updateMatchData={this.updateMatchData}
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

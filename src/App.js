// App.js
import './App.css'
import React, { Component } from 'react'
import Web3 from 'web3'
// import compiled smart contract 
import Token from './truffle_abis/Token.json'
import SetTeam from './truffle_abis/SetTeam.json'
import Vote from './truffle_abis/Vote.json'
// import Navbar
import Navbar from './navbar/Navbar'
// import Main(buttons are here)
import Main from './user/Main.js'
// import Owner(only owner can use this)
import Owner from './owner/Owner.js'
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
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    const networkId = await web3.eth.net.getId()

    // load Token.sol
    const tokenData = Token.networks[networkId]
    if(tokenData) {
      // get Token contract code
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
      this.setState({token})
      // get token Balance(calls by function: balanceOf())
      let tokenBalance = await token.methods.balanceOf(this.state.account).call()
      this.setState({tokenBalance: tokenBalance.toString()})
      let ownerAddress = await token.methods.showOwner().call();
      this.setState({ownerAddress})
    } else {  // if not detected
      window.alert("Token contract not deployed to detect network!")
    }

    const setTeamData = SetTeam.networks[networkId]
    if(setTeamData) {
      // get SetTeam contract code
      const setTeam = new web3.eth.Contract(SetTeam.abi, setTeamData.address)
      this.setState({setTeam})
    } else {  // if not detected
      window.alert("SetTeam contract not deployed to detect network!")
    }

    const voteData = Vote.networks[networkId]
    if(voteData) {
      // get Vote contract code
      const vote = new web3.eth.Contract(Vote.abi, voteData.address)
      this.setState({vote})
    } else {  // if not detected
      window.alert("Vote contract not deployed to detect network!")
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      ownerAddress: '',
      account: '0x0',   // user`s actual address
      vote: {},         // contract of the Vote.sol
      setTeam: {},      // contract of the SetTeam.sol
      token: {},        // contract of the Token.sol
      tokenBalance: '0',// token Balance
      team1: {},        // Data of the team #1
      team2: {}         // Data of the team #2
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
                  {/* Main 컴포넌트의 경로 */}
                  <Route
                    path='/'
                    element={
                      <Main
                        token={this.state.token} // Pass the token prop here
                        vote={this.state.vote}
                        ownerAddress={this.state.ownerAddress}
                        account={this.state.account}
                        tokenBalance={this.state.tokenBalance}
                      />
                    }
                  />

                  {/* Team 컴포넌트의 경로 */}
                  <Route
                    path='/owner'
                    element={
                      <Owner
                        ownerAddress={this.state.ownerAddress}
                        setTeam={this.state.setTeam}
                        vote={this.state.vote}
                        account={this.state.account}
                      />
                    }
                  />
                </Routes>

              </main>
            </div>
          </div>
          

          <p>balance : {this.state.tokenBalance}</p>

        </div>
      </Router>
    )
  }
}

export default App;

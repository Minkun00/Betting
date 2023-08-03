import React from 'react'

class Owner extends React.Component {
  constructor(props) {
    super(props)
    this.setTeam = props.setTeam
    this.vete = props.vote
    this.ownerAddress = props.ownerAddress
    this.account = props.account
  }

  render() {
    if (this.account === this.ownerAddress) {
      return (
        <div>accept</div>
      )
    } else {
      return (
        <div>you are not the owner</div>
      )
    }
  }
}
export default Owner;
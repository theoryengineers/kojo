import React, { Component } from 'react'
import Login from 'components/login/login'

// Switch between Register and Login form
// Can be used to contain other Splash related components

class Splash extends Component {
  constructor () {
    super()
    this.state = {
      route: ''
    }
  }

  render () {
    const { onLoggedInProp } = this.props
    return (
      <div className='splash-container'>
        <Login onLoggedInProp={onLoggedInProp} />
      </div>
    )
  }
}

export default Splash

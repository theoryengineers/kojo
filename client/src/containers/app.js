import React, { Component } from 'react'
import Splash from 'containers/splash/splash'
import Main from 'containers/main/main'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

  onChangeLoggedInState = (x) => {
    this.setState({
      isLoggedIn: x
    })
  }
  
  render () {
    const { isLoggedIn } = this.state
    return (
      <div className='app'>
        {!isLoggedIn ? <Splash onLoggedInProp={this.onChangeLoggedInState} /> : <Main />}
      </div>
    )
  }
}

export default App

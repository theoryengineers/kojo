import React, { Component } from 'react'
import Navbar from 'components/navbar/navbar'
import Content from 'containers/content'
import Column from 'components/column'
import Splash from 'containers/splash/splash'
import Main from 'containers/main/main'
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedIn: true
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
      <Router className='app'>
        <Switch>
          <Route exact path='/' render={() => (
            isLoggedIn
            ? <Main />
            : <Redirect to="/auth/login" />
          )} />
          <Route path='/auth' render={() => <Splash onLoggedInProp={this.onChangeLoggedInState}/>}/>
        </Switch>
      </Router>
    )
  }
}

export default App

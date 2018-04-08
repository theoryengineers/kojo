import React, { Component } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'

// Let this component handle both Login and Registration

class Login extends Component {
  constructor () {
    super()
    this.state = {
      displayName: '',
      email: '',
      password: '',
      stayLoggedIn: false,
      loggedIn: false
    }
  }

  onFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = (submission) => {
    if(submission === 'login') {
      fetch('http://localhost:8080/api/v1/login', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
      .then(res => res.json())
      .then(res => res === 'Success' ? this.props.onLoggedInProp(true) : null)
      .then(() => this.setState({
        loggedIn: true
      }))
      
    } else if (submission === 'register') {
      fetch('http://localhost:8080/api/v1/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          displayName: this.state.displayName,
          email: this.state.email,
          password: this.state.password
        })
      })
      .then(res => res.json())
      .then(res => res === 'Success' ? this.props.onLoggedInProp(true) : null)
    }
  }

  render () {
    if(this.state.loggedIn) {
      return <Redirect to='/'/>
    }
    return (
      <div className='login-container'>
        <div className='login-header'>
          Kojo Kanban 
          {
            // replace with Avatar later
          }
        </div>
        <div>
          <Route path='/auth/register' render={() => (<input className='input-field' onChange={this.onFieldChange} type='text' placeholder='Display Name' name='displayName' required />)} />
          <input className='input-field' onChange={this.onFieldChange} type='text' placeholder='Email' name='email' required />
          <input className='input-field' onChange={this.onFieldChange} type='password' placeholder='Password' name='password' required />
          
          <Route path='/auth/register' render={() => (<button className='login-button' onClick={() => this.onSubmit('register')}>Register</button>)} />
          <Route path='/auth/login' render={() => (
            <div>
              <button className='login-button' onClick={() => this.onSubmit('login')}>Login</button>
              <label><input type='checkbox' name='remember' readOnly /> Stay Logged In</label>
            </div>
          )} />

        </div>
        
        <Route path='/auth/register' render={() => (
          <div className='login-footer'>
            <span className='psw'>Already have an <Link className='link' to={'login'}>account</Link>?</span>
          </div>
        )} />
        <Route path='/auth/login' render={() => (
          <div className='login-footer'>
            <span className='psw'>Forgot <a href=''>password</a>?</span><br />
            <span className='psw'>Don't have an <Link className='link' to={'register'}>account</Link>?</span>
          </div>
        )} />
      </div>
    )
  }
}

export default Login

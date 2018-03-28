import React, { Component } from 'react'

// Let this component handle both Login and Registration

class Login extends Component {
  constructor () {
    super()
    this.state = {
      displayName: '',
      email: '',
      password: '',
      isRegistering: false,
      stayLoggedIn: false
    }
  }

  onHaveAccount = (registerBool) => {
    this.setState({
      isRegistering: registerBool
    })
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
    const { isRegistering } = this.state
    return (
      <div className='login-container'>
        <div className='login-header'>
          Kojo Kanban 
          {
            // replace with Avatar later
          }
        </div>
        <div>
          {
            isRegistering
              ? <input className='input-field' onChange={this.onFieldChange} type='text' placeholder='Display Name' name='displayName' required />
              : ''
          }

          <input className='input-field' onChange={this.onFieldChange} type='text' placeholder='Email' name='email' required />
          <input className='input-field' onChange={this.onFieldChange} type='password' placeholder='Password' name='password' required />

          {
            isRegistering
              ? <button className='login-button' onClick={() => this.onSubmit('register')}>Register</button>
              : <div>
                <button className='login-button' onClick={() => this.onSubmit('login')}>Login</button>
                <label><input type='checkbox' name='remember' readOnly /> Stay Logged In</label>
              </div>
          }

        </div>

        {
          isRegistering
            ? <div className='login-footer'>
              <span className='psw'>Already have an <span className='link' onClick={() => this.onHaveAccount(false)} href=''>account</span>?</span>
            </div>
            : <div className='login-footer'>
              <span className='psw'>Forgot <a href=''>password</a>?</span><br />
              <span className='psw'>Don't have an <span className='link' onClick={() => this.onHaveAccount(true)} href=''>account</span>?</span>
            </div>
        }
      </div>
    )
  }
}

export default Login

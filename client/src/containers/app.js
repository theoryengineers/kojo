import React, { Component } from 'react'
import Navbar from 'components/navbar/navbar'
import Content from 'containers/content'
import Column from 'components/column'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <Navbar />
        <Content>
          <Column />
          <Column />
          <Column />
          <Column />
        </Content>
      </div>
    )
  }
}

export default App

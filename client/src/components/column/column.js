import React, { Component } from 'react'

class Column extends Component {
  render () {
    return (
      <div className='column'>
        <div className='header' style={{backgroundColor: this.props.backgroundColor}}>
          {this.props.header}
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default Column

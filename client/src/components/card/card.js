import React, { Component } from 'react'

class Card extends Component {
  render () {
    return (
      <div className='card' style={{borderLeft: '15px solid ' + this.props.colorCode}}>
        <div className='card-header'>
          <div className='title'>{this.props.title}</div>
          <div className='card-interface'>==></div>
        </div>
        <div className='category'>{this.props.category}</div>
        <div className='description'>{this.props.description}</div>
        <div className='assignment'>{this.props.assignment}</div>
      </div>
    )
  }
}

export default Card

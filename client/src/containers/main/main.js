import React, { Component } from 'react'
import Navbar from 'components/navbar/navbar'
// import Navbar from "../components/navbar/navbar";
import Content from 'containers/content/content'
// import Content from "./content/content";
import Column from 'components/column/column'
// import Column from "../components/column/column";
import Card from 'components/card/card'

class Main extends Component {
  render () {
    return (
      <div className='main'>
        <Navbar />
        <Content>
          <Column header={'Backlog'} backgroundColor={'gray'}>
            <Card
              title={'Create Cards'}
              category={'Frontend/Component'}
              description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
              assignment={'Paul Allen'}
              colorCode={'darkred'}
            />
            <Card
              title={'Create User API'}
              category={'Backend/API'}
              description={'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
              assignment={'Steve Wozniak'}
              colorCode={'purple'}
            />
          </Column>
          <Column header={'In Progress'} backgroundColor={'blue'}>
            <Card
              title={'Navbar'}
              category={'Frontend/Component'}
              description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
              assignment={'Patrick Bateman'}
              colorCode={'darkred'}
            />
            <Card
              title={'Bake Chicken'}
              category={'Kitchen/Oven'}
              description={'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
              assignment={'P.F. Chang'}
              colorCode={'yellow'}
            />
          </Column>
          <Column header={'Testing'} backgroundColor={'red'} />
          <Column header={'Complete'} backgroundColor={'green'} />
        </Content>
      </div>
    )
  }
}

export default Main

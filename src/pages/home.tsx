import React, { Component } from 'react';
import './home.css'; 

// Definimos uma interface para o estado da Home (vazia por enquanto)
interface HomeState {}

class Home extends Component<{}, HomeState> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div >
       <img src={`${process.env.PUBLIC_URL}/img/mocaimg.png`} alt="WB Beauty Logo" style={{ height: '730px', marginLeft: '60px' }} />
       
       </div>
    )

  }
}

export default Home;
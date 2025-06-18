import { Component } from 'react';
import Roteador from './componentes/roteador';

type State = {
  tema: string 
}

export default class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      tema: '#ffffff' 
    }
  }

  render() {
    return (
      <div className="router-container"> 
        <Roteador />
      </div>
    )
  }
}
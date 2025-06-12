import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav style={{ background: '#333', padding: '10px', color: 'white' }}>
        <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around', padding: 0 }}>
          <li>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          </li>
          <li>
            <Link to="/clientes" style={{ color: 'white', textDecoration: 'none' }}>Clientes</Link>
          </li>
          <li>
            <Link to="/servicos" style={{ color: 'white', textDecoration: 'none' }}>Serviços</Link>
          </li>
          <li>
            <Link to="/produtos" style={{ color: 'white', textDecoration: 'none' }}>Produtos</Link>
          </li>
          <li>
            <Link to="/consumo" style={{ color: 'white', textDecoration: 'none' }}>Consumo</Link>
          </li>
          <li>
            <Link to="/relatorios" style={{ color: 'white', textDecoration: 'none' }}>Relatórios</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
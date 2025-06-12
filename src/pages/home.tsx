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
      <div className="home-container">
        <img src="" alt="" />
        <section className="home-hero-section">
          {/* Conteúdo do banner aqui */}
        </section>

        {/* Seção de Relatórios Semanais (será preenchida em passos futuros) */}
        <section className="home-reports-section">
          <h2 className="reports-title">RELATÓRIOS SEMANAIS</h2>
          <div className="reports-content-grid">
            {/* Card Top 10 Clientes */}
            <div className="top-clients-card">
              <h3>Top 10 Clientes Mais Consumiram</h3>
              <div className="client-rankings">
                {/* Placeholder para avatares e nomes */}
                <div className="client-item">
                  <img src="https://via.placeholder.com/60" alt="Cliente 1" className="client-avatar" />
                  <p className="client-name">primeiro</p>
                </div>
                <div className="client-item">
                  <img src="https://via.placeholder.com/60" alt="Cliente 2" className="client-avatar" />
                  <p className="client-name">segundo</p>
                </div>
                <div className="client-item">
                  <img src="https://via.placeholder.com/60" alt="Cliente 3" className="client-avatar" />
                  <p className="client-name">terceiro</p>
                </div>
              </div>
            </div>

            {/* Espaço Retangular Vazio */}
            <div className="empty-chart-placeholder">
              {/* Este é o espaço para futuros gráficos ou mais detalhes */}
            </div>

            {/* Cards de Totais */}
            <div className="total-metrics-cards">
              <div className="metric-card">
                <p>TOTAL CLIENTES</p>
                <span>99</span>
              </div>
              <div className="metric-card">
                <p>TOTAL PRODUTOS</p>
                <span>17</span>
              </div>
              <div className="metric-card">
                <p>TOTAL SERVIÇOS</p>
                <span>8</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Servicos from './pages/serviços';
import Clientes from './pages/clientes';
import Produtos from './pages/produtos';
import Consumo from './pages/consumo';
import Relatorios from './pages/relatorios';
import Home from './pages/home';
import Navbar from './components/navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/consumo" element={<Consumo />} />
        <Route path="/relatorios" element={<Relatorios />} />
      </Routes>
    </Router>
  );
}

export default App;

import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Cadastro from './pages/Cadastro';
import Listagem from './pages/Listagem';

function Navegacao({ menuAberto, toggleMenu }) {
  const location = useLocation();
  
  return (
    <div className={`sidebar ${menuAberto ? 'aberto' : 'fechado'}`}>
      <div className="logo-container">
        <h2>
          <i className="fa-solid fa-bars" onClick={toggleMenu} style={{ cursor: 'pointer' }} title="Expandir/Recolher Menu"></i>
          <span className="logo-text">Gerenciador</span>
        </h2>
      </div>
      <nav>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          <i className="fa-solid fa-house"></i>
          <span className="link-text">Início</span>
        </Link>
        <Link to="/cadastro" className={location.pathname === '/cadastro' ? 'active' : ''}>
          <i className="fa-solid fa-plus"></i>
          <span className="link-text">Cadastro</span>
        </Link>
        <Link to="/listagem" className={location.pathname === '/listagem' ? 'active' : ''}>
          <i className="fa-solid fa-table"></i>
          <span className="link-text">Listagem</span>
        </Link>
      </nav>
    </div>
  );
}

function App() {
  const [menuAberto, setMenuAberto] = useState(false); 

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Navegacao menuAberto={menuAberto} toggleMenu={toggleMenu} />
        <div className={`content ${menuAberto ? 'conteudo-recolhido' : 'conteudo-expandido'}`}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/listagem" element={<Listagem />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
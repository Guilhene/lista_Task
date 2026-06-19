import { useState, useEffect } from "react";
import axios from "axios";

function Inicio() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/tarefas")
      .then((res) => setTarefas(res.data));
  }, []);

  const pendentes = tarefas.filter((t) => t.status === "Pendente").length;
  const concluidas = tarefas.filter((t) => t.status === "Concluído").length;

  return (
    <div>
      <header className="page-header">
        <p className="subtitle">Painel de Controle</p>
        <h1>Gerenciador de Tarefas</h1>
        <p className="welcome-text">Bem-vindo(a)</p>
      </header>
      <div className="dashboard-grid">
        <div className="stats-container">
          <div className="card stat-card">
            <span className="stat-number">{tarefas.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="card stat-card">
            <span className="stat-number">{concluidas}</span>
            <span className="stat-label">Concluídas</span>
          </div>
          <div className="card stat-card">
            <span className="stat-number">{pendentes}</span>
            <span className="stat-label">Pendentes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Inicio;
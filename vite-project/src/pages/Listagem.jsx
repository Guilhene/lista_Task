import { useState, useEffect } from 'react';
import axios from 'axios';

function Listagem() {
  const [tarefas, setTarefas] = useState([]);
  const [filtro, setFiltro] = useState('Todas');

  const carregarTarefas = async () => {
    const res = await axios.get('http://localhost:3000/tarefas');
    setTarefas(res.data);
  };

  useEffect(() => {
    carregarTarefas();
  }, []);

  const concluir = async (id) => {
    await axios.patch(`http://localhost:3000/tarefas/${id}`, { status: 'Concluído' });
    carregarTarefas();
  };

  const remover = async (id) => {
    await axios.delete(`http://localhost:3000/tarefas/${id}`);
    carregarTarefas();
  };

  const tarefasFiltradas = filtro === 'Todas' 
    ? tarefas 
    : tarefas.filter(t => t.status === filtro);

  return (
    <div>
      <header className="page-header flex-header">
        <h1>Lista de Tarefas</h1>
        <div className="filter-group">
          <label>Filtrar por Status:</label>
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="Todas">Todas</option>
            <option value="Pendente">Pendentes</option>
            <option value="Concluído">Concluídas</option>
          </select>
        </div>
      </header>
      <div className="task-grid">
        {tarefasFiltradas.map((tarefa) => (
          <div key={tarefa.id} className="task">
            <h3>{tarefa.nome}</h3>
            <p>Data: {tarefa.data}</p>
            <span className={`status ${tarefa.status.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}>
              Status: {tarefa.status}
            </span>
            <div className="task-actions">
              <button className="btn btn-concluir" onClick={() => concluir(tarefa.id)} title="Concluir">
                <i className="fa-solid fa-check"></i>
              </button>
              <button className="btn btn-excluir" onClick={() => remover(tarefa.id)} title="Excluir">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listagem;
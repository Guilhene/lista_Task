import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [status, setStatus] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !data || !status) {
      setErro('Preencha todos os campos!');
      return;
    }
    setErro('');

    await axios.post('http://localhost:3000/tarefas', { nome, data, status });
    navigate('/listagem');
  };

  return (
    <div>
      <header className="page-header">
        <h1>Cadastrar Nova Tarefa</h1>
      </header>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nome da Tarefa</label>
            <input 
              type="text" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              placeholder="Digite o nome da tarefa" 
            />
          </div>
          <div className="input-group">
            <label>Selecione a Data</label>
            <input 
              type="date" 
              value={data} 
              onChange={(e) => setData(e.target.value)} 
            />
          </div>
          <div className="input-group">
            <label>Selecione o Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Selecione</option>
              <option value="Pendente">Pendente</option>
              <option value="Concluído">Concluído</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">Salvar Tarefa</button>
        </form>
        {erro && <p id="erro" style={{ color: '#ef4444', marginTop: '15px' }}>{erro}</p>}
      </div>
    </div>
  );
}

export default Cadastro;
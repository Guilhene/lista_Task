const form = document.getElementById("formTarefa");
const erro = document.getElementById("erro");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const data = document.getElementById("data").value;
  const status = document.getElementById("status").value;

  // Validação
  if (!nome || !data) {
    erro.textContent = "Preencha os campos obrigatórios!";
    return;
  }

  erro.textContent = "";

  // Recupera tarefas do localStorage
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  // Nova tarefa com status padrão
  const novaTarefa = {
    nome,
    data,
    status: status || "Pendente"
  };

  // Adiciona no array
  tarefas.push(novaTarefa);

  // Salva no localStorage
  localStorage.setItem("tarefas", JSON.stringify(tarefas));

  alert("Tarefa salva com sucesso!");

  form.reset();
});
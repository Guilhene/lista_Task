const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

const form = document.getElementById("formTarefa");
const erro = document.getElementById("erro");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value
  const data = document.getElementById("data").value

  const validacaoNome = document.getElementById("nome")
  const validacaoData = document.getElementById("data")

  validacaoNome.style.border = '1px solid #363b47'
  validacaoData.style.border = '1px solid #363b47'
  erro.textContent = "";

  // Validação
  if (!validacaoNome.value || !validacaoData.value) {
    erro.textContent = "Preencha os campos obrigatórios!";
    validacaoNome.style.border = '1px solid red'
    validacaoData.style.border = '1px solid red'
    return;
  }

  // VALIDAÇÃO DATA
  const hoje = new Date();
  hoje.setHours(0,0,0,0);

  const dataSelecionada = new Date(data);

  if (dataSelecionada < hoje) {
    erro.textContent = "A data não pode ser no passado!";
    validacaoData.style.border = '1px solid red'
    return;
  }

  // Recupera tarefas do localStorage
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  // Nova tarefa com status padrão
  const novaTarefa = {
    nome: nome,
    data: data,
    status: "Pendente",

  };

  // Adiciona no array
  tarefas.push(novaTarefa);

  // Salva no localStorage
  localStorage.setItem("tarefas", JSON.stringify(tarefas));

  erro.style.color = "#5c7c73";
  erro.textContent = "Tarefa salva com sucesso!";

  form.reset();

});
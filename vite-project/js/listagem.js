const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

let lista = document.getElementById("lista");
let filtro = document.getElementById("filtro");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function renderizar() {
  lista.innerHTML = "";

  let tarefasFiltradas = tarefas;

  if (filtro.value !== "Todas") {
    tarefasFiltradas = tarefas.filter(t => t.status === filtro.value);
  }

  tarefasFiltradas.forEach((tarefa, index) => {
    const item = document.createElement("div");

    item.classList.add("task");

    const statusClass = tarefa.status.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    item.innerHTML = `
      <h3>${tarefa.nome}</h3>
      <p>Data: ${tarefa.data}</p>
      <span class="status ${statusClass}">Status: ${tarefa.status}</span>

      <div class="task-actions">
        <button class="btn btn-concluir" onclick="concluir(${index})" title="Concluir">
          <i class="fa-solid fa-check"></i>
        </button>
        <button class="btn btn-excluir" onclick="remover(${index})" title="Excluir">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    lista.appendChild(item);
  });
}

function concluir(index) {
  tarefas[index].status = "Concluído";
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  renderizar();
}

function remover(index) {
  tarefas.splice(index, 1);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  renderizar();
}

filtro.addEventListener("change", renderizar);

renderizar();
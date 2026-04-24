const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let total = tarefas.length;
let pendentes = tarefas.filter(t => t.status === "Pendente").length;
let concluidas = tarefas.filter(t => t.status === "Concluído").length;

document.getElementById('total').innerText = total;
document.getElementById('pendentes').innerText = pendentes;
document.getElementById('concluidas').innerText = concluidas;

const ctx = document.getElementById('graficoTarefas');

new Chart(ctx, {
    type: 'doughnut',
    data: {
    labels: ['Concluídas', 'Pendentes'],
    datasets: [{
        data: [concluidas, pendentes],
        backgroundColor: ['#5c7c73', '#2a2d35'],
        borderWidth: 0,
        hoverOffset: 4
    }]
    },
    options: {
    cutout: '75%',
    plugins: {
        legend: { display: false }
    }
    }
});
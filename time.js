"use strict";
//Variáveis globais
var formTime = document.getElementById("formTime");
var tabelaTime = document.getElementById("tbTimes");
var times = JSON.parse(localStorage.getItem("times") || "[]");
function atualizarTabelaTime() {
    tabelaTime.innerHTML = "";
    times.forEach((t) => {
        tabelaTime.innerHTML += `
        <tr>
            <td>${t.nome}</td>
            <td>${t.nomeCurto}</td>
            <td>
                <button onClick="editarTime(${t.id})"> Editar </button>
                <button onClick="removerTime(${t.id})"> Remover </button>
            </td>
        </tr>
    `;
    });
}
function salvarTimeLocalStorage() {
    let timeSalvar = JSON.stringify(times);
    localStorage.setItem("times", timeSalvar);
}
function salvarTime(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault(); //cancelar o disparo do evento
    const novoTime = {
        id: Date.now(),
        nome: document.getElementById("nome").value,
        nomeCurto: document.getElementById("nomeCurto").value,
    };
    times.push(novoTime);
    atualizarTabelaTime();
    salvarTimeLocalStorage();
    formTime.reset();
    alert("Cadastro com sucesso!");
}
function editarTime(id) {
    const time = times.find((t) => t.id == id);
    if (!time)
        return;
    document.getElementById("nome").value = time.nome;
    document.getElementById("nomeCurto").value = time.nomeCurto;
    removerTime(id);
}
function removerTime(id) {
    let timeIndex = times.findIndex((t) => t.id === id);
    if (timeIndex !== -1) {
        times.splice(timeIndex, 1);
    }
    salvarTimeLocalStorage();
    atualizarTabelaTime();
}
formTime.addEventListener("submit", salvarTime);
atualizarTabelaTime();

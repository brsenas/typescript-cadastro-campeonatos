"use strict";
//Variáveis globais
var formPartida = document.getElementById("formPartida");
var tabelaPartida = document.getElementById("tbPartidas");
var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
JSON.parse(localStorage.getItem("campeonatos") || "[]").forEach((c) => {
    document.getElementById("campeonato").innerHTML += `<option>${c.nome}</option>`;
});
JSON.parse(localStorage.getItem("times") || "[]").forEach((t) => {
    document.getElementById("timeMandante").innerHTML += `<option>${t.nome}</option>`;
    document.getElementById("timeVisitante").innerHTML += `<option>${t.nome}</option>`;
});
function atualizarTabelaPartida() {
    tabelaPartida.innerHTML = "";
    partidas.forEach((p) => {
        tabelaPartida.innerHTML += `
        <tr>
            <td>${p.timeMandante}</td>
            <td>${p.timeVisitante}</td>
            <td>${p.campeonato}</td>
            <td>${p.data}</td>
            <td>
                <button onClick="editarPartida(${p.id})"> Editar </button>
                <button onClick="removerPartida(${p.id})"> Remover </button>
            </td>
        </tr>
    `;
    });
}
function salvarPartidaLocalStorage() {
    let partidaSalvar = JSON.stringify(partidas);
    localStorage.setItem("partidas", partidaSalvar);
}
function salvarPartida(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault(); //cancelar o disparo do evento
    const novaPartida = {
        id: Date.now(),
        timeMandante: document.getElementById("timeMandante").value,
        timeVisitante: document.getElementById("timeVisitante").value,
        campeonato: document.getElementById("campeonato").value,
        data: document.getElementById("data").value
    };
    partidas.push(novaPartida);
    atualizarTabelaPartida();
    salvarPartidaLocalStorage();
    formPartida.reset();
    alert("Cadastro com sucesso!");
}
function editarPartida(id) {
    const partida = partidas.find((c) => c.id == id);
    if (!partida)
        return;
    document.getElementById("timeMandante").value = partida.timeMandante;
    document.getElementById("timeVisitante").value = partida.timeVisitante;
    document.getElementById("campeonato").value = partida.campeonato;
    document.getElementById("data").value = partida.data;
    removerPartida(id);
}
function removerPartida(id) {
    let partidaIndex = partidas.findIndex((p) => p.id === id);
    if (partidaIndex !== -1) {
        partidas.splice(partidaIndex, 1);
    }
    salvarPartidaLocalStorage();
    atualizarTabelaPartida();
}
formPartida.addEventListener("submit", salvarPartida);
atualizarTabelaPartida();

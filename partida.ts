//Variáveis globais
var formPartida = document.getElementById("formPartida") as HTMLFormElement;
var tabelaPartida = document.getElementById("tbPartidas") as HTMLElement;
var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");

JSON.parse(localStorage.getItem("campeonatos") || "[]").forEach((c: Campeonato) => {
    (document.getElementById("campeonato") as HTMLFormElement).innerHTML += `<option>${c.nome}</option>`;
});

JSON.parse(localStorage.getItem("times") || "[]").forEach((t: Time) => {
  (document.getElementById("timeMandante") as HTMLFormElement).innerHTML += `<option>${t.nome}</option>`;
  (document.getElementById("timeVisitante") as HTMLFormElement).innerHTML += `<option>${t.nome}</option>`;
});


interface Partida {
  id: number;
  timeMandante: string;
  timeVisitante: string;
  campeonato: string;
  data: string;
}

function atualizarTabelaPartida() {
  tabelaPartida.innerHTML = "";
  partidas.forEach((p: Partida) => {
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

function salvarPartida(event: Event) {
  event?.preventDefault(); //cancelar o disparo do evento
  const novaPartida: Partida = {
    id: Date.now(),
    timeMandante: (document.getElementById("timeMandante") as HTMLSelectElement).value,
    timeVisitante: (document.getElementById("timeVisitante") as HTMLSelectElement).value,
    campeonato: (document.getElementById("campeonato") as HTMLSelectElement).value,
    data: (document.getElementById("data") as HTMLInputElement).value
  };
  partidas.push(novaPartida);
  atualizarTabelaPartida();
  salvarPartidaLocalStorage();
  formPartida.reset();
  alert("Cadastro com sucesso!");
}

function editarPartida(id: number) {
  const partida = partidas.find((c: Partida) => c.id == id);

  if (!partida) return;

  (document.getElementById("timeMandante") as HTMLSelectElement).value = partida.timeMandante;
  (document.getElementById("timeVisitante") as HTMLSelectElement).value = partida.timeVisitante;
  (document.getElementById("campeonato") as HTMLSelectElement).value = partida.campeonato;
  (document.getElementById("data") as HTMLInputElement).value = partida.data;

  removerPartida(id);
}

function removerPartida(id: number) {
  let partidaIndex = partidas.findIndex((p: Partida) => p.id === id);

  if (partidaIndex !== -1) {
    partidas.splice(partidaIndex, 1);
  }

  salvarPartidaLocalStorage();
  atualizarTabelaPartida();
}

formPartida.addEventListener("submit", salvarPartida);
atualizarTabelaPartida();
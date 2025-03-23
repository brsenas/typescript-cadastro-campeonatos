//Variáveis globais
var formTime = document.getElementById("formTime") as HTMLFormElement;
var tabelaTime = document.getElementById("tbTimes") as HTMLElement;
var times = JSON.parse(localStorage.getItem("times") || "[]");

interface Time {
  id: number;
  nome: string;
  nomeCurto: string;
}

function atualizarTabelaTime() {
  tabelaTime.innerHTML = "";
  times.forEach((t: Time) => {
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

function salvarTime(event: Event) {
  event?.preventDefault(); //cancelar o disparo do evento
  const novoTime: Time = {
    id: Date.now(),
    nome: (document.getElementById("nome") as HTMLSelectElement).value,
    nomeCurto: (document.getElementById("nomeCurto") as HTMLInputElement).value,
  };
  times.push(novoTime);
  atualizarTabelaTime();
  salvarTimeLocalStorage();
  formTime.reset();
  alert("Cadastro com sucesso!");
}

function editarTime(id: number) {
  const time = times.find((t: Time) => t.id == id);

  if (!time) return;

  (document.getElementById("nome") as HTMLInputElement).value = time.nome;
  (document.getElementById("nomeCurto") as HTMLSelectElement).value = time.nomeCurto;

  removerTime(id);
}

function removerTime(id: number) {
  let timeIndex = times.findIndex((t: Time) => t.id === id);

  if (timeIndex !== -1) {
    times.splice(timeIndex, 1);
  }

  salvarTimeLocalStorage();
  atualizarTabelaTime();
}

formTime.addEventListener("submit", salvarTime);
atualizarTabelaTime();
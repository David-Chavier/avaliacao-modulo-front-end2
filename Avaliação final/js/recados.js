let dados = JSON.parse(localStorage.getItem("usuarioLogado"))
document.addEventListener('DOMContentLoaded', () => {

  if(!dados) {
    window.location.href = 'login.html'
  }
  
})

const tableEl = document.getElementById("lista-contatos");
document.getElementById('add-recados').addEventListener('submit', (evento) => {
  evento.preventDefault()

  const descriçao = document.getElementById('descriçao').value
  const detalhamento = document.getElementById('detalhamento').value

  let recados = {
    descriçao: descriçao,
    detalhamento: detalhamento
  }

  if(descriçao === '' && detalhamento === ''){
    return
  }

  dados.listaRecados.push(recados)

  renderTable();

  document.getElementById('descriçao').value = ''
  document.getElementById('detalhamento').value = ''

  saveOnStorage()

})

function saveOnStorage(){
  localStorage.setItem("usuarioLogado", JSON.stringify(dados))
}
    
    
function renderTable() {
  tableEl.innerHTML = "";
  dados.listaRecados.map((user, index) => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const deleteButton = document.createElement("button"); 
    const EditButton = document.createElement("button");

    deleteButton.setAttribute("id","deleteButton")
    EditButton.setAttribute("id","editButton")

    tr.setAttribute("class", "tr-style");
    th.setAttribute("scope", "row")
    deleteButton.setAttribute("onClick", `deleteErrand(${index})`);
    deleteButton.setAttribute("class", "bg-danger me-2 p-1 rounded")
    EditButton.setAttribute("onClick", `editErrand(${index})`);
    EditButton.setAttribute("class", "bg-success me-2 p-1 rounded")

    tr.appendChild(th);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    td4.appendChild(deleteButton);
    td4.appendChild(EditButton);

    th.innerHTML = index + 1;
    td2.innerHTML = user.descriçao;
    td3.innerHTML = user.detalhamento;
    deleteButton.innerHTML = "Apagar";
    EditButton.innerHTML = "Editar";
    tableEl.appendChild(tr);
  });
}
renderTable();

function deleteErrand(index) {
  dados.listaRecados.splice(index, 1);
  renderTable();
  saveOnStorage();
}

function editErrand(index) {
  const name = prompt("Nova descrição");
  const errand = prompt("Novo recado");

  dados.listaRecados[index].descriçao = name;
  dados.listaRecados[index].detalhamento = errand;
  renderTable();
  saveOnStorage();
}

const buttonSair = document.getElementById('buttonSair').addEventListener('click', (evento) => {
 
  let usuariosCadastrados = JSON.parse(localStorage.getItem("usuário"))
  const index = usuariosCadastrados.findIndex((usuariosCadastrados) => usuariosCadastrados.name == dados.name && usuariosCadastrados.password === dados.password)
  
  if (index !== -1) {
    usuariosCadastrados[index] = dados
  }

  localStorage.setItem("usuário", JSON.stringify(usuariosCadastrados))

  localStorage.removeItem('usuarioLogado')

  window.location.href = 'login.html'
})
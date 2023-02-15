document.getElementById('registrar-conta').addEventListener('submit', (evento) =>{
    evento.preventDefault()

    const name = document.getElementById('name').value
    const password = document.getElementById('password').value
    const repeatPassword = document.getElementById('repeat-password').value
    
    if(password != repeatPassword){
       return alert('Repita a senha correta')
    }
    const dados = JSON.parse(localStorage.getItem("usuário")) || []

    let usuarios = {
        name: name,
        password: password,
        listaRecados: []
    }
    dados.push(usuarios)

    localStorage.setItem("usuário", JSON.stringify(dados))
  
    window.location.href = 'login.html'
})
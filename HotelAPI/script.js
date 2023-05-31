const form = document.querySelector('#quartoForm')
const numeroInput = document.querySelector('#numeroInput')
const tipoInput = document.querySelector('#tipoInput')
const disponivelInput = document.querySelector('#disponivelInput')
const tableBody = document.querySelector('#quartoTabela')

const URL = 'http://localhost:8000/quartos.php'

function carregarQuartos() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(quartos => {
            tableBody.innerHTML = ''


            quartos.forEach(quartos => {
                const tr = document.createElement('tr')
                tr.innerHTML = `
            <td>${quartos.id}</td>
            <td>${quartos.numero}</td>
            <td>${quartos.tipo}</td>
            <td>${quartos.disponivel}</td>
            
            <td>
            <button data-id="${quartos.id}" onclick="atualizarQuarto(${quartos.id})">Editar</button>
            <button onclick="excluirQuarto(${quartos.id})">Excluir</button>
            </td>
            `
                tableBody.appendChild(tr)

            })
        })
}

function adicionarQuarto(event){
    event.preventDefault()

    const numero = numeroInput.value
    const tipo = tipoInput.value
    const disponivel = disponivelInput.value

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `numero=${encodeURIComponent(numero)}&tipo=${encodeURIComponent(tipo)}&disponivel=${encodeURIComponent(disponivel)}`
    }) 
        .then(response => {
            if (response.ok) {
                carregarQuartos()
                numeroInput.value = ''
                tipoInput.value = ''
                disponivelInput.value = ''
            } else {
                console.error('Erro ao adicionar quarto')
                alert('Erro ao adicionar quarto')
            }
        })
}


function excluirQuarto(id) {
    if (confirm('Deseja excluir esse quarto?')) {
        fetch(`${URL}?id=${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    carregarQuartos()
                } else {
                    console.error('Erro ao excluir qaurto')
                    alert('Erro ao excluir quarto')
                }
            })
    }

}

function atualizarQuarto(id) {
    const novoNumero = prompt('Digite o numero do quarto')
    const novoTipo = prompt('Digite o novo Tipo')
    const novoDisponivel = prompt('Ele está disponivel ou não?')

    if (novoNumero && novoTipo && novoDisponivel) {
        fetch(`${URL}?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                
            },
            body: `numero=${encodeURIComponent(novoNumero)}&tipo=${encodeURIComponent(novoTipo)}&disponivel=${encodeURIComponent(novoDisponivel)}`
            
        })

            .then(response => {
                if (response.ok) {
                    carregarQuartos()
                } else {
                    console.error('Erro ao atualizar quarto')
                    alert('Erro ao atualizar quarto')
                    
                    
                }
            })
    }
}



form.addEventListener('submit', adicionarQuarto)
carregarQuartos()
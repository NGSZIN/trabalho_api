const form = document.querySelector('#reservaForm')
const nome_clienteInput = document.querySelector('#nome_clienteInput')
const numero_quartoInput = document.querySelector('#numero_quartoInput')
const data_check_inInput = document.querySelector('#data_check_inInput')
const data_check_outInput = document.querySelector('#data_check_outInput')
const tableBody = document.querySelector('#reservaTabela')

const URL = 'http://localhost:8000/reserva.php'

function carregarReserva() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(reserva => {
            tableBody.innerHTML = ''


            reserva.forEach(reserva => {
                const tr = document.createElement('tr')
                tr.innerHTML = `
            <td>${reserva.nome_cliente}</td>
            <td>${reserva.numero_quarto}</td>
            <td>${reserva.data_check_in}</td>
            <td>${reserva.data_check_out}</td>
            `
                tableBody.appendChild(tr)

            })
        })
}

function adicionarReserva(event){
    event.preventDefault()
    const nome_cliente = nome_clienteInput.value
    const numero_quarto = numero_quartoInput.value
    const data_check_in = data_check_inInput.value
    const data_check_out = data_check_outInput.value

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `nome_cliente=${encodeURIComponent(nome_cliente)}&numero_quarto=${encodeURIComponent(numero_quarto)}&data_check_in=${encodeURIComponent(data_check_in)}&data_check_out=${encodeURIComponent(data_check_out)}`
    }) 
        .then(response => {
            if (response.ok) {
                carregarReserva()
                nome_clienteInput.value = ''
                numero_quartoInput.value = ''
                data_check_inInput.value = ''
                data_check_outInput.value = ''
            } else {
                console.error('Erro ao fazer reserva')
                alert('Erro ao fazer reserva')
            }
        })
}


function excluirReserva(id) {
    if (confirm('Deseja excluir essa reserva?')) {
        fetch(`${URL}?id=${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    carregarReserva()
                } else {
                    console.error('Erro ao excluir reserva')
                    alert('Erro ao excluir reserva')
                }
            })
    }

}

function atualizarReserva(id) {
    const novoNome_cliente = prompt('Digite o seu nome')
    const novoNumero_quarto = prompt('Digite o novo numero de quarto')
    const novoData_check_in = prompt('Digite a data de check in')
    const novoData_check_out = prompt('Digite a data de check out')

    if (novoNome_cliente && novoNumero_quarto && novoData_check_in && novoData_check_out) {
        fetch(`${URL}?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                
            },
            body: `novoNome_cliente=${encodeURIComponent(novoNome_cliente)}&numero_quarto=${encodeURIComponent(novoNumero_quarto)}&novoData_check_in=${encodeURIComponent(novoData_check_in)}&novoData_check_out=${encodeURIComponent(novoData_check_out)}`
            
        })

            .then(response => {
                if (response.ok) {
                    carregarReserva()
                } else {
                    console.error('Erro ao atualizar quarto')
                    alert('Erro ao atualizar quarto')
                    
                    
                }
            })
    }
}



form.addEventListener('submit', adicionarReserva)
carregarReserva()
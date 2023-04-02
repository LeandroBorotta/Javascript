//variáveis globais

//eventos modal
const openModal = () => document.getElementById('modal').classList.add('active')
document.getElementById('cadastrarFuncionario').addEventListener('click', openModal)

const closeModal = () =>{
    clearFields();
     document.getElementById('modal').classList.remove('active')
    }

document.getElementById('cancelar').addEventListener('click', closeModal)

const getLocalStorage = () => JSON.parse(localStorage.getItem('dbClient')) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem("dbClient",  JSON.stringify(dbClient));

//CRUD [Create, read, update, delete]

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client);
    setLocalStorage(dbClient)
}

const readClient = () => getLocalStorage();

const updateClient = (index, client) => {
    const dbClient = readClient();
    dbClient[index] = client
    setLocalStorage(dbClient);
}

const deleteClient = (index) => {
    const dbClient = readClient();
    dbClient.splice(index, 1);
    setLocalStorage(dbClient);
};

const isValidFields = () =>{
   return document.getElementById('form').reportValidity();
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "");
}



//interação com o layout 
const saveClient = () => {
    if(isValidFields()){
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            salario: document.getElementById('salario').value,
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new'){
        createClient(client);
        updateTable();
        updateAmount();
        closeModal();
    } else {
        updateClient(index, client)
        updateTable();
        updateAmount();
        closeModal();
    }
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.telefone}</td>
    <td>R$${client.salario}</td>
    <td>
        <button type="button" class="button green" data-action="edit" id="edit-${index}">Editar</button>
        <button type="button" class="button red"  data-action="delete" id="delete-${index}">Excluir</button>
    </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient();
    clearTable();
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('telefone').value = client.telefone
    document.getElementById('salario').value = client.salario
    document.getElementById('nome').dataset.index = client.index

}

const editClient= (index) => {
    const Client = readClient()[index];
    Client.index = index;
    fillFields(Client);
    openModal();
}

const editDelete =(event) => {
    if (event.target.type == 'button'){

        const [action, index] = event.target.id.split('-')

        if(action == 'edit') {
            editClient(index)
        } else {
            const Client = readClient()[index]
            const response = confirm (`Deseja deletar o funcionario? ${Client.nome}`)
            if (response){
           deleteClient(index);
           updateTable();
           updateAmount();
        }
        }
}
}

updateTable()

document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)



    updateAmount = () =>{
    const  clients = readClient()
    let amounts = clients.map(client => client.salario)
    const gasto = amounts.map(amount => parseFloat(amount))
    const total =   gasto.reduce( (acumulator,currentValor) => acumulator + currentValor, 0)
    document.querySelector('#span').innerHTML = `R$ ${total}`
    console.log(total)
    }
   updateAmount()


   const inputs = document.querySelectorAll(".modal-field")
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
   const errorValidate = (index) => {
    inputs[index].style.border = "2px solid red"
   }
   const goodValidate = (index) => {
    inputs[index].style.border = "2px solid green"
   }

    function validName(){
        if(inputs[0].value.length < 3){
           errorValidate(0);

        } else{
            goodValidate(0)
        }
    }

    function validTelefone(){
        const limite = 13
        
        if(inputs[2].value.length  < 13){
            errorValidate(2);
         } else{
            goodValidate(2);
         }

        if(inputs[2].value.length > limite){
           inputs[2].value = inputs[2].value.substring(0, limite);
         }

        if(inputs[2].value.length === 8){
            inputs[2].value += "-";
        } else if (inputs[2].value.length === 2){
            inputs[2].value += "-";
        }
    }

    function validEmail(){
        if(emailRegex.test(inputs[1].value)){
            console.log("Valido")
            inputs[1].style.border = "2px solid green"
        } else{
            inputs[1].style.border = "2px solid red"
        }
    }

    function validSalario(){
        if(inputs[3].value.length > 1){
            inputs[3].style.border = "2px solid green"
        }
    }

    
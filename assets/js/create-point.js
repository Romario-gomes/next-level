/*document
    .querySelector("select[name = uf]")
    .addEventListener("change",() => {
        console.log("mudei")
    })
*/
function populateUFs(){
    const ufSelect = document.querySelector("select[name = uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json() }) 
    .then(states =>{
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}
populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name = city]")
    const stateInput = document.querySelector("input[name = state]")
    const ufValue = event.target.value
    const indexOfSelectedIdenx = event.target.selectedIndex
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = `<option value>Selecione a cidade</option>`
    citySelect.disabled = true

    
    stateInput.value = event.target.options[indexOfSelectedIdenx].text
    fetch(url)
    .then( (res) => {return res.json() }) 
    .then(cities =>{

        for(const city of cities ){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })

}


document
    .querySelector("select[name = uf]")
    .addEventListener("change", getCities)


// Items de coleta
// Pegar todos os li

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}
const collectedItems = document.querySelector("input[name=items]")

let selectedItems  = []

function handleSelectedItem(event){
    // Add or remove event Target

    const itemLi =  event.target

    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id
   

    //verificar se existem items selecionados
    //se sim pegar  os itens selecionados
    const alreadySelected = selectedItems.findIndex( item =>{
        const  itemFound = item == itemId //this is  true or false
        return itemFound 
    } )

    //se já  estiver selecionado, tirar da seleção
    if(alreadySelected >= 0) {

        const filteredItems = selectedItems.filter( item => {
            const itemIsDiffferent = item !=itemId
                return itemIsDiffferent
        })
        selectedItems = filteredItems
    }else{
         //se nao estiver selecionado, adicionar a seleção
         selectedItems.push(itemId)
    }
    collectedItems.value = selectedItems
    //atualizar o campo hidden com os dados  selecionados 
}
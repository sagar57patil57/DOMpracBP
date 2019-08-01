let arr = getSavedNotes()

let filters = {
    searchText: '',
    hideCompleted: false,
    sortBy: ''
}

//add btn
document.querySelector('#addForm').addEventListener('submit', (e)=>{
    e.preventDefault()
    let value = e.target.elements.additem.value
    addNote(arr, value)
    renderNotes(arr, filters)
    e.target.elements.additem.value = ''
})

/*
//delete all btn
document.querySelector('#rmvBtn').addEventListener('click', (e)=>{
    arr = []
    localStorage.setItem('arr', null)
    renderNotes(arr, filters)
})*/

renderNotes(arr, filters)

//input search
document.querySelector('#addInput').addEventListener('input',(e)=>{
    filters.searchText = e.target.value
    renderNotes(arr, filters)
})

//hideCompleted
document.querySelector('#hideCompleted').addEventListener('change', (e)=>{
    console.log(e.target.checked)
    filters.hideCompleted = e.target.checked
    renderNotes(arr, filters)
})

//sorting
document.querySelector('#selectSort').addEventListener('change', (e)=>{
    filters.sortBy = e.target.value
    renderNotes(arr, filters)
})
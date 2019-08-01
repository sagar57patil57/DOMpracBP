let arr = getSavedNotes()
let hash = location.hash.substring(1)   //get id exclude '#'
let Checkarr = arr.find((note)=>{
    return note.id === hash
})

if(!Checkarr){
    location.assign('/index.html')
}

document.querySelector('#textarea').value = Checkarr.name

document.querySelector('#editBtn').addEventListener('click',()=>{
    console.log(document.querySelector('#textarea').value)
    arr.forEach((note)=>{
        if(note.id === hash){
            note.name = document.querySelector('#textarea').value
            note.updatedAt = moment().valueOf()
        }
    })  
    localStorage.setItem('arr', JSON.stringify(arr))
})

console.log(Checkarr)
document.querySelector('#dateCreated').textContent = 'created at : ' + moment(Checkarr.createdAt).format('DD MMM YYYY')
document.querySelector('#dateEdited').textContent = 'last edited : ' + moment(Checkarr.updatedAt).fromNow()
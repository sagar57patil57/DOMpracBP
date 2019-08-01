const getSavedNotes = function(){
    let arrJSON = localStorage.getItem('arr')
    if(arrJSON){
        return JSON.parse(arrJSON)
    }
    else{
        return []
    }
}

const addNote = function(arr, value){
    if(!value){
        value = 'Unnamed'
    }
    let theId = new Date()
    let timestamp = moment().valueOf()
    arr.push({
        id: theId,
        name: value,
        completed: false,
        createdAt: timestamp,
        updatedAt: timestamp
    })
    localStorage.setItem('arr', JSON.stringify(arr))
}

const removeNote = function(arr,todo){
    let index = arr.findIndex(function(note){   //finds index of todo.id    
        return note.id === todo.id
    })

    if(index > -1){
        arr.splice(index, 1)    //remove element at index and 1 element
    }
    localStorage.setItem('arr', JSON.stringify(arr))
}

const createNodeWithData = function(todo){
    let nodeBody = document.createElement('div')
    let newTextNote = document.createElement('a')
    let newCheckBox = document.createElement('input')
    let updatedAt = document.createElement('span')
    let brNode = document.createElement('br')

    newCheckBox.setAttribute('type', 'checkbox')
    newCheckBox.addEventListener('change', function(e){
        a = arr.find(function(note){    //grab {} with that todo.id
            return note.id === todo.id
        })
        if(a!==undefined){
            a.completed = !a.completed
        }
        localStorage.setItem('arr', JSON.stringify(arr))
        renderNotes(arr, filters)
        //console.log(arr)
    })
    nodeBody.appendChild(newCheckBox)

    newTextNote.setAttribute('href', `/edit.html#${todo.id}`)
    newTextNote.textContent = todo.name
    newTextNote.classList.add('note')
    nodeBody.appendChild(newTextNote)

    let newDelBtn = document.createElement('button')
    newDelBtn.textContent = 'x'
    newDelBtn.addEventListener('click',()=>{
        removeNote(arr, todo)
        renderNotes(arr, filters)
    })
    nodeBody.appendChild(newDelBtn)

    nodeBody.appendChild(brNode)
    updatedAt.textContent = `last edited : ${ moment(todo.updatedAt).fromNow() }`
    nodeBody.appendChild(updatedAt)
    return nodeBody
}

const renderNotes = (arr, filters) =>{  // clears list, apply search filter, hideCompleted filter and then render list

    //remove previous
    document.querySelector('#notesList').innerHTML = ''
    
    //find incomplete
    const incompleteTodos = arr.filter((todo)=>{
        return !todo.completed
    })


    //how many left
    let newNote = document.createElement('h3')
    newNote.textContent = `${ incompleteTodos.length } left`
    document.querySelector('#notesList').appendChild(newNote)

    //apply any filter
    let notesList = arr.filter((note)=>{
        return note.name.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    //hideCompleted filter
    notesList = notesList.filter((note)=>{
        if(filters.hideCompleted){
            return !note.completed
        }
        else{
            return true
        }
    })
    
    //sortBy
    if(filters.sortBy === 'created'){   //desc order
        notesList.sort(function(a, b){
            if(a.createdAt > b.createdAt){
                return -1
            }
            else if(a.createdAt < b.createdAt){
                return 1
            }
            else{
                return 0
            }
        })
    }
    else if(filters.sortBy === 'alpha'){    //sort by alpha
        notesList.sort(function(a, b){
            if(a.name < b.name){    //a<b<c...
                return -1
            }
            else if(a.name > b.name){
                return 1
            }
            else{
                return 0
            }
        })
    }
    else if(filters.sortBy === 'edited'){   //desc order
        notesList.sort(function(a, b){
            if(a.updatedAt > b.updatedAt){
                return -1
            }
            else if(a.updatedAt < b.updatedAt){
                return 1
            }
            else{
                return 0
            }
        })
    }

    //add updated
    notesList.forEach((todo)=>{
        const newTextNote = createNodeWithData(todo)
        document.querySelector('#notesList').appendChild(newTextNote)
    })
}
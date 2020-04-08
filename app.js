// "use strict";
let LocalStorage,
    tasks,
    notes,
    note,
    done,
    deleted,
    tick,
    trash,
    plus,
    donetick,
    noteText,
    input,
    storedTask,
    remove,
    select;

select = document.querySelector('select');
LocalStorage = window.localStorage;
tasks = document.querySelector('.tasks');
plus = document.querySelector('.plus');
input = document.querySelector('input');

window.addEventListener('load',()=>{
    input.value = '';
    select.value = 'show all'
    document.querySelector('.error').classList.add('none');
    // storedTask = Object.keys(LocalStorage);
    // let arr = [];
    // storedTask.forEach(task=>{
    //     arr.push(JSON.parse(localStorage.getItem(task)));
    // })
    // console.log(arr.length)
    // if(arr.length>0) {
    //     arr.forEach(task=>{
    //         createTask(task[0]);
    //     })
    // }
    showSelected('show all');
});

let clickListener = function() {
    donetick = document.querySelectorAll('.done');
    donetick.forEach(d=>
        d.addEventListener('click',(event)=>{
        event.target.parentElement.classList.add('task-done');
        LocalStorage.setItem(event.target.parentElement.dataset.title,setValue(event.target.parentElement.dataset.title,'completed'));
    }));

    remove = document.querySelectorAll('.delete');
    remove.forEach(r=>{
        r.addEventListener('click',(event)=>{
            localStorage.removeItem(event.target.parentElement.dataset.title);
            event.target.parentElement.classList.add('removed');
            setTimeout(()=>{
                showSelected('show all');
            },2500);
        });
    })
}

function createTask(noteText){
    document.querySelector('.error').classList.add('none');
    notes = document.createElement('div');
    notes.classList.add('notes');
    notes.dataset.title = noteText;
    if(JSON.parse(localStorage.getItem(noteText))[1]==='completed') {
        notes.classList.add('task-done');
    }

    note = document.createElement('p');
    note.classList.add('note');
    note.textContent = noteText;

    done = document.createElement('div');
    done.classList.add('done');

    deleted = document.createElement('div');
    deleted.classList.add('delete');

    tick = document.createElement('i');
    tick.classList.add('fas');
    tick.classList.add('fa-check');

    trash = document.createElement('i');
    trash.classList.add('fas');
    trash.classList.add('fa-trash');
    console.log(notes.dataset)
    addTask(); 
}

function addTask() {
    tasks.appendChild(notes);
    notes.appendChild(note);
    notes.appendChild(done);
    done.appendChild(tick);
    notes.appendChild(deleted);
    deleted.appendChild(trash);
    input.value = ''
    clickListener();
}

function addToLocalStorage(noteText) {
    let str = noteText.join();
    let noteAbout = setValue(str,'uncompleted');
    localStorage.setItem(str,noteAbout);
}

function setValue(text,state) {
    let arr = [];
    arr.push(text);
    arr.push(state);
    let noteAbout = JSON.stringify(arr);
    return noteAbout;
}

function showSelected(state='show all') {
    let parent = document.querySelector('.tasks');
    let child = parent.lastElementChild;
    while(child) {
        child.remove();
        child = parent.lastElementChild;
    }

    let tasks = Object.keys(localStorage);
    let arr = [];
    tasks.forEach(task=>{
        if(JSON.parse(localStorage.getItem(task))[1]===state){
            arr.push(JSON.parse(localStorage.getItem(task)));
        }else if(state==='show all') {
            arr.push(JSON.parse(localStorage.getItem(task)));
        }
    })
    arr.forEach(a=>{
        createTask(a[0]);
    })

}

plus.addEventListener('click',()=>{
    noteText = input.value;
    if(noteText==='') {
        document.querySelector('.error').classList.remove('none');
    }else {
        document.querySelector('.error').classList.remove('none');
        let arr = [];
        arr.push(noteText);
        addToLocalStorage(arr);
        createTask(noteText);
    }
    clickListener();
});

select.addEventListener('input',(event)=>{
    let state = event.target.value;
    showSelected(state);
})


// var names = [];
// names[0] = prompt("New member name?");
// localStorage.setItem("names", JSON.stringify(names));
// var storedNames = JSON.parse(localStorage.getItem("names"));
//clickListener();
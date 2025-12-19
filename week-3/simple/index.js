// console.log(document.querySelectorAll('h4')[1].innerHTML);

//updating innerHTML after every 2 seconds

// let ctr=0;
// function callback(){
//     document.querySelectorAll('h4')[1].innerHTML = "Changed by setInterval " +
//     ctr++;
// }

// setInterval(callback, 2000);

//deleting an element

// deleteTodo = (id) => {
//     // document.getElementById(`todo-${id}`).remove();
//     const todoItem = document.getElementById(`todo-${id}`);
//     todoItem.parentNode.removeChild(todoItem);
// }

//adding a new todo item

//final todo list

let ctr=1;
function deleteTodo(index){
    const divEl=document.getElementById(index);
    divEl.parentNode.removeChild(divEl);
}
function AddTodo(){
    const inputEl=document.querySelector("#input");
    const value=inputEl.value;

    const newDivEl=document.createElement("div");
    newDivEl.setAttribute("id","todo-"+ctr);
    newDivEl.innerHTML='<div>'+value+'</div><button onclick="deleteTodo(\'todo-'+ctr+'\')">Delete</button>';
    ctr+=1;
    document.querySelector("body").appendChild(newDivEl);
    inputEl.value="";
}
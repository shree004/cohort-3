let ctr=1;
function deleteTodo(id){
    const todoItem = document.getElementById(id);
    todoItem.parentNode.removeChild(todoItem);
}
function addTodo(){
    const todoInput = document.getElementById('input');
    const spanElement = document.createElement('span');
    const buttonElement = document.createElement('button');
    spanElement.innerHTML=todoInput.value;
    buttonElement.innerHTML="Delete";
    buttonElement.setAttribute('onclick', 'deleteTodo("todo-' + ctr + '")');
    const newDivEl=document.createElement('div');
    newDivEl.setAttribute('id','todo-'+ctr);
    newDivEl.appendChild(spanElement);
    newDivEl.appendChild(buttonElement);
    document.querySelector('body').appendChild(newDivEl);
    todoInput.value="";
    ctr+=1;
}
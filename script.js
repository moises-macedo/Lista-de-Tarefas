const input = document.querySelector(".input");
const btnInput = document.querySelector('.button-input');
const list = document.querySelector(".list");


const createLi = () => {
    const li = document.createElement('li')
    return li
}
function deleteBtn(li){
    li.innerText += " ";
    const btnDelete = document.createElement("button");
    btnDelete.innerText="Apagar";
    btnDelete.setAttribute("class", "apagar")
    li.appendChild(btnDelete);


}
const limpInput= () => {
    input.value = "";
    input.focus();
}


const createTask = (textInput) => {
    const li = createLi();
    li.innerText = textInput;
    list.appendChild(li);
    limpInput();
    deleteBtn(li);
    salvTask()

}

btnInput.addEventListener("click", function (e) {
    if (!input.value) return;
    createTask(input.value)
});

input.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
        if (!input.value) return;
        createTask(input.value)
    }
})

function salvTask (){
    const liTask = list.querySelectorAll("li");
    const listDeTask = [];

    for(let counter of liTask){
        let tarefaText = counter.innerText;
        tarefaText = tarefaText.replace("Apagar", "").trim();
        listDeTask.push(tarefaText);
    }

    const tarefasJson = JSON.stringify(listDeTask)
    localStorage.setItem("tarefas", tarefasJson)
}

function adcSalveTask (){
    const task = localStorage.getItem("tarefas");
    const listDeTask = JSON.parse(task);
    
    for(let tarefas of listDeTask){
        createTask(tarefas)
    }
}
adcSalveTask()

document.addEventListener("click", function(e){
    const el = e.target;
    if(el.classList.contains("apagar")){
        el.parentElement.remove();
        salvTask()
    }
})
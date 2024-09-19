

const listTodos = [
    {
        id: 1,
        name: 'zxc',
       
    },
    {
        id: 2,
        name: 'abc',
       
    }
]



function showList() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = "";

    console.log(listTodos);

    listTodos.forEach((item, index) => { 
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('todo-item');
        mainDiv.classList.add('main-div');

        const subDiv = document.createElement('div');
        subDiv.classList.add('sub-div');
    
        const itemText = document.createElement('span');
        itemText.textContent = (index + 1) + '. ' + item.name;  
    
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');

        const checkButton = document.createElement('input');
        checkButton.type = 'checkbox';
        checkButton.classList.add('check-btn');

        subDiv.appendChild(checkButton);
        subDiv.appendChild(deleteButton);
        subDiv.appendChild(editButton);

        mainDiv.appendChild(itemText);
        mainDiv.appendChild(subDiv);

        todoList.appendChild(mainDiv);  

        deleteButton.addEventListener('click', function () {
            listTodos.splice(index, 1);  
            showList();
        });

        editButton.addEventListener('click', function () {
            const editInput = document.createElement('input');
            editInput.id = 'todoInput';
            editInput.type = 'text';
            editInput.value = item.name;  

            mainDiv.replaceChild(editInput, itemText);

            editInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {  
                    const newValue = editInput.value.trim();
                    if (newValue !== "") {
                        listTodos[index].name = newValue;  
                        showList(); 
                    } else {
                        listTodos[index].name = item.name;  
                        showList(); 
                    }
                }
            });
         
            editInput.focus();
        });
    });
}

function hideShow() {
    document.getElementById('inputBox').style.display = 'none';
    document.getElementById('button_wrapper').style.display = 'block';
}


document.querySelector('#inputBox input').addEventListener('blur', function () {
    this.value = '';
    hideShow();
});

document.getElementById('addButton').addEventListener('focus', function () {
    this.style.backgroundColor = '#d6d4d4';
})

document.getElementById('addButton').addEventListener('mouseout', function () {
    this.style.backgroundColor = '#fff5f5';
})

document.getElementById('addButton').addEventListener('mouseover', function () {
    this.style.backgroundColor = '#ebe8e8';
})



document.getElementById('addButton').onclick = function () {
    document.getElementById('inputBox').style.display = 'block';
    document.getElementById('button_wrapper').style.display = 'none';
    document.getElementById('todoInput').focus();
}

document.getElementById('todoInput').addEventListener('keydown', function (event) {


    if (event.key === 'Enter') {
        const input = event.target.value;


        if (input.trim() !== "") {

            listTodos.push({
                id: listTodos.length + 1,
                name: input
            });
            event.target.value = ""
           
            showList();

        }

        hideShow();
    }
});

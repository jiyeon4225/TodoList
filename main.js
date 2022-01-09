const todoList = document.querySelector('.todoLists');
const completedList = document.querySelector('.completedLists');
let todoStorage = JSON.parse(localStorage.getItem('todoList')) || [];
let completedStorage = JSON.parse(localStorage.getItem('completedList')) || [];

class TODO
{
    constructor(todo)
    {
        const li = document.createElement('li');
        const checkBtn = document.createElement('button');
        const item = document.createElement('div');
        const delBtn = document.createElement('button');
        let done =false;

        li.classList = 'todo'
        checkBtn.classList = 'itemClicked';
        checkBtn.innerHTML = '-';
        item.classList = 'item';
        item.innerHTML = todo;
        delBtn.classList= 'delItemClicked';
        delBtn.innerHTML = '&#8855; ';

        li.appendChild(checkBtn);
        li.appendChild(item);
        li.appendChild(delBtn);
        this._li=li;
    }

    get getLi() //list 태그 반환
    {
        return this._li;
    }

    get doneStatus() 
    {
        return this._done;
    }

    changeDone()
    {this._done = !(this._done);}
}


// 동적으로 아이템 생성 -> 아이템의 왼쪽 버튼(한일 체크 및 이동)과 오른쪽 버튼(삭제) 설정
const createItem = (todo,change) => {
    const newTodo = new TODO(todo);
    const chkBtn = newTodo.getLi.childNodes[0];
    const delBtn = newTodo.getLi.childNodes[2];

    if(change){newTodo.changeDone();}

    //아이템의 한일 체크버튼 누르는 동작시 event listener :한일리스트-할일리스트 왔다갔다하게함
    chkBtn.addEventListener('click', function() 
    {
        if(!newTodo.doneStatus) //check클릭되었다면
        {
            newTodo.getLi.parentNode.removeChild(newTodo.getLi);
            chkBtn.classList += 'movedToCompleted';
            completedList.appendChild(newTodo.getLi);

            todoStorage.splice(todoStorage.indexOf(todo),1);
            localStorage.setItem('todoList',JSON.stringify(todoStorage));
            completedStorage.push(todo);
            localStorage.setItem('completedList',JSON.stringify(completedStorage));
        }
        else //completed에서 다시 todo로 갈 때
        {
            newTodo.getLi.parentNode.removeChild(newTodo.getLi);
            chkBtn.classList = 'movedTotodo';
            todoList.appendChild(newTodo.getLi);

            completedStorage.splice(completedStorage.indexOf(todo),1);
            localStorage.setItem('completedList', JSON.stringify(completedStorage));
            todoStorage.push(todo);
            localStorage.setItem('todoList', JSON.stringify(todoStorage));
        }

        newTodo.changeDone();
    } );

    //아이템의 삭제버튼 누를시 동작 event listener
    delBtn.addEventListener('click', function() //delbutton클릭시
    {
        if(newTodo.getLi.parentNode===todoList) //todoList에서 지울 때
        {
            todoStorage.splice(todoStorage.indexOf(todo),1);
            localStorage.setItem('todoList', JSON.stringify(todoStorage));
        }

        else //completedList에서 지울 때
        {
            completedStorage.splice(completedStorage.indexOf(todo),1);
            localStorage.setItem('completedList',JSON.stringify(completedStorage));
        }

        newTodo.getLi.parentNode.removeChild(newTodo.getLi);
    } );

    return newTodo.getLi;
}

const init = () =>
{
    if(localStorage.getItem('todoList'))
    {
        todoStorage.forEach(val => {
            const newTodo = createItem(val);
            todoList.appendChild(newTodo);
        });
    }

    if(localStorage.getItem('completedList'))
    {
        completedStorage.forEach(val =>{
            const newTodo = createItem(val, 1);
            completedList.appendChild(newTodo);
            newTodo.childNodes[0].classList += 'movedToCompleted';
        });
    }

const todoInput = document.querySelector('.todoInput');
const addtodoBtn = document.querySelector('.addTodobtn');
const todoDelAllbtn = document.querySelector('.deleteAll');
const compltDelAllbtn = document.querySelector('.deleteCompletedAll');


todoInput.addEventListener('focus', function(){ todoInput.classList = 'todoInput';});
todoInput.addEventListener('blur', function(){todoInput.classList = 'todoInput';});
todoInput.addEventListener('keydown',function()
{
    if(window.event.keyCode == 13) //할 일 작성 후 엔터를 눌렀을 때
    {
        if(todoInput.value.length <1) //아무것도 적지 않았을 때
        {
            todoInput.focus(); //입력창에 커서 포커스
        }
        else
        {
            todoInput.classList = 'todoInput';
            const newTodo = createItem(todoInput.value);
            todoList.appendChild(newTodo);
            todoStorage.push(todoInput.value);
            localStorage.setItem('todoList',JSON.stringify(todoStorage));
            todoInput.value = '';
        }
    }

});

addtodoBtn.addEventListener('click',function() //할일 작성후 확인 버튼을 눌렀을때
{
      if(todoInput.value.length < 1) //아무것도 적지 않고 확인 버튼 누를 때
    {
        todoInput.focus();
    }
    else 
    {
        const newTodo = createItem(todoInput.value);
        todoList.appendChild(newTodo);
        todoStorage.push(todoInput.value);
        localStorage.setItem('todoList',JSON.stringify(todoStorage));
        todoInput.value = '';
    } 
});

todoDelAllbtn.addEventListener('click', function() //todo의 전체삭제 버튼을 눌렀을 때
{
    todoList.innerHTML='';
    todoStorage =[];
    localStorage.removeItem('todoList');
});

compltDelAllbtn.addEventListener('click',function()
{
    completedList.innerHTML='';
    completedStorage = [];
    localStorage.removeItem('completedList');
});

}

window.onload = init();

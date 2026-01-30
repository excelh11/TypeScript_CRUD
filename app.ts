type Identifiable = { readonly id: number };
type TaskDetail = { title: string; completed: boolean };
type Todo = Identifiable & TaskDetail;

let todos: Todo[] = [];
let nextId: number = 1;

const input = document.getElementById('todoInput') as HTMLInputElement;
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
const listContainer = document.getElementById('todoList') as HTMLDivElement;

// CRUD: Read & UI Render
function render(): void {
    listContainer.innerHTML = '';
    
    // 번호를 보여주기 위해 index 매개변수 활용
    todos.forEach((todo, index) => {
        const div = document.createElement('div');
        div.className = 'todo-item';
        div.style.marginBottom = "10px";
        
        // 1. 목록 번호 추가 (${index + 1})
        // 2. onkeydown 이벤트를 통해 수정 중 Enter 키 감지
        div.innerHTML = `
            <span style="margin-right: 10px; font-weight: bold;">${index + 1}.</span>
            <input type="text" 
                   value="${todo.title}" 
                   onkeydown="if(event.key === 'Enter') updateTodo(${todo.id}, this.value)"
                   style="border:none; border-bottom:1px solid #ccc; width: 200px;">
            <button onclick="deleteTodo(${todo.id})">삭제</button>
        `;
        listContainer.appendChild(div);
    });
}

// CRUD: Create (Insert)
function addTodo(): void {
    const title = input.value.trim();
    if (!title) return;

    const newTodo: Todo = {
        id: nextId++,
        title: title,
        completed: false
    };

    todos.push(newTodo);
    input.value = '';
    render();
}

// CRUD: Update (Enter 키로 호출됨)
(window as any).updateTodo = (id: number, newTitle: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.title = newTitle;
        console.log(`ID ${id}번 수정 완료: ${newTitle}`);
        render(); // 화면 갱신을 통해 수정 모드 종료 느낌 전달
        input.focus(); // 수정 후 다시 메인 입력창으로 포커스
    }
};

// CRUD: Delete
(window as any).deleteTodo = (id: number) => {
    todos = todos.filter(t => t.id !== id);
    render();
};

// 이벤트 연결: 메인 입력창에서 Enter 키 누르면 Insert
addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});
// 1. 리터럴 타입 정의
type Priority = "High" | "Medium" | "Low";

type Identifiable = { readonly id: number };
type TaskDetail = { 
    title: string; 
    completed: boolean;
    priority: Priority; // 리터럴 타입 적용
};

type Todo = Identifiable & TaskDetail;

let todos: Todo[] = [];
let nextId: number = 1;

const input = document.getElementById('todoInput') as HTMLInputElement;
const prioritySelect = document.getElementById('prioritySelect') as HTMLSelectElement; // 추가됨
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
const listContainer = document.getElementById('todoList') as HTMLDivElement;

function render(): void {
    listContainer.innerHTML = '';
    
    todos.forEach((todo, index) => {
        const div = document.createElement('div');
        div.className = 'todo-item';
        div.style.marginBottom = "10px";
        
        // 우선순위에 따른 색상 지정 (리터럴 타입이라 안전하게 분기 가능)
        const color = todo.priority === "High" ? "red" : todo.priority === "Medium" ? "orange" : "green";

        div.innerHTML = `
            <span style="font-weight: bold;">${index + 1}.</span>
            <span style="color: ${color}; font-weight: bold; margin: 0 5px;">[${todo.priority}]</span>
            <input type="text" 
                   value="${todo.title}" 
                   onkeydown="if(event.key === 'Enter') updateTodo(${todo.id}, this.value)"
                   style="border:none; border-bottom:1px solid #ccc; width: 200px;">
            <button onclick="deleteTodo(${todo.id})">삭제</button>
        `;
        listContainer.appendChild(div);
    });
}

function addTodo(): void {
    const title = input.value.trim();
    if (!title) return;

    const newTodo: Todo = {
        id: nextId++,
        title: title,
        completed: false,
        priority: prioritySelect.value as Priority // 선택된 값을 리터럴 타입으로 캐스팅
    };

    todos.push(newTodo);
    input.value = '';
    render();
}

(window as any).updateTodo = (id: number, newTitle: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.title = newTitle;
        render();
        input.focus();
    }
};

(window as any).deleteTodo = (id: number) => {
    todos = todos.filter(t => t.id !== id);
    render();
};

addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTodo(); });
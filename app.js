var todos = [];
var nextId = 1;
var input = document.getElementById('todoInput');
var addBtn = document.getElementById('addBtn');
var listContainer = document.getElementById('todoList');
// CRUD: Read & Update UI
function render() {
    listContainer.innerHTML = '';
    todos.forEach(function (todo) {
        var div = document.createElement('div');
        div.className = 'todo-item';
        // 인텔리센스가 todo.title과 todo.id를 정확히 찾아줍니다.
        div.innerHTML = "\n            <input type=\"text\" \n                   value=\"".concat(todo.title, "\" \n                   onchange=\"updateTodo(").concat(todo.id, ", this.value)\"\n                   style=\"border:none; border-bottom:1px solid #ccc;\">\n            <button onclick=\"deleteTodo(").concat(todo.id, ")\">\uC0AD\uC81C</button>\n        ");
        listContainer.appendChild(div);
    });
}
// CRUD: Create
function addTodo() {
    var title = input.value.trim();
    if (!title)
        return;
    var newTodo = {
        id: nextId++,
        title: title,
        completed: false
    };
    todos.push(newTodo);
    input.value = '';
    render();
}
// CRUD: Update (글자 수정)
window.updateTodo = function (id, newTitle) {
    var todo = todos.find(function (t) { return t.id === id; });
    if (todo) {
        todo.title = newTitle; // 메모리상의 데이터 수정
        console.log("ID ".concat(id, "\uBC88 \uC218\uC815\uB428: ").concat(newTitle));
        render();
    }
};
// CRUD: Delete
window.deleteTodo = function (id) {
    todos = todos.filter(function (t) { return t.id !== id; });
    render();
};
addBtn.addEventListener('click', addTodo);

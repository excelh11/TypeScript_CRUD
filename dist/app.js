"use strict";
var _a;
// 상태 관리
let todos = [];
let nextId = 1;
let totalScore = 0;
// DOM 요소 선택
const input = document.getElementById('todoInput');
const prioritySelect = document.getElementById('prioritySelect');
const scoreDisplay = document.getElementById('scoreDisplay');
/**
 * 2. 예외 처리 전담 함수 (never 활용)
 * 사용자가 "폭탄" 같은 금지어를 입력하거나 시스템 오류 시 호출합니다.
 * 호출 즉시 프로그램을 중단시키며 절대 반환(return)되지 않습니다.
 */
function throwSystemException(message) {
    alert(`🚨 치명적 예외 발생: ${message}`);
    throw new Error(`[Exception]: ${message}`);
}
/**
 * 3. 상태 로그 함수 (void 활용)
 */
function logStatus(msg, type = "Success") {
    console.log(`%c[${type}] ${msg}`, `color: ${type === "Error" ? "red" : "blue"}`);
}
/**
 * 4. 점수 계산 (Function Signature)
 */
function calculateBonus(base) {
    return base * 2;
}
function render() {
    const listContainer = document.getElementById('todoList');
    listContainer.innerHTML = '';
    scoreDisplay.innerText = totalScore.toString();
    todos.forEach((todo) => {
        const div = document.createElement('div');
        div.className = 'todo-item';
        const color = todo.priority === "High" ? "#ff4d4d" : todo.priority === "Medium" ? "#ffa500" : "#2ecc71";
        div.innerHTML = `
            <div style="border-left: 5px solid ${color}; padding: 10px; margin: 10px 0; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-radius: 4px;">
                <small>ID: ${todo.id} | 우선순위: ${todo.priority}</small><br>
                <input type="text" value="${todo.title}" 
                       onkeydown="if(event.key === 'Enter') updateTodo(${todo.id}, this.value)"
                       style="font-size: 1.1em; border:none; background:transparent; width:70%; margin-top:5px;">
                <div style="margin-top: 10px;">
                    <button onclick="completeTodo(${todo.id})" ${todo.completed ? 'disabled' : ''}>
                        ${todo.completed ? '✅ 완료됨' : '미완료'}
                    </button>
                    <button onclick="deleteTodo(${todo.id})" style="color: #ff4d4d; border:none; background:none; cursor:pointer; font-weight:bold;">🗑 삭제</button>
                </div>
            </div>
        `;
        listContainer.appendChild(div);
    });
}
/**
 * 5. 비즈니스 로직 (예외 처리 포함)
 */
function addTodo() {
    const title = input.value.trim();
    // [Exception 1]: 금지어 체크 (never 활용)
    if (title === "폭탄") {
        throwSystemException("금지된 단어가 입력되었습니다. 보안을 위해 중단합니다.");
    }
    // [Warning]: 단순 빈칸 입력
    if (!title) {
        logStatus("내용을 입력해주세요.", "Warning");
        return;
    }
    const newTodo = {
        id: nextId++,
        title: title,
        completed: false,
        priority: prioritySelect.value,
        score: 20
    };
    todos.push(newTodo);
    input.value = '';
    render();
    logStatus(`"${title}" 추가 완료`);
}
// 전역 함수 등록
window.updateTodo = (id, newTitle) => {
    const todo = todos.find(t => t.id === id);
    // [Exception 2]: 데이터 없음 (never 활용)
    if (!todo) {
        throwSystemException("해당 ID의 데이터를 찾을 수 없습니다.");
    }
    todo.title = newTitle;
    render();
    logStatus(`ID ${id} 수정 완료`);
};
window.completeTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    if (todo && !todo.completed) {
        todo.completed = true;
        totalScore += calculateBonus(todo.score);
        render();
        logStatus(`점수 획득! 총점: ${totalScore}`);
    }
};
window.deleteTodo = (id) => {
    todos = todos.filter(t => t.id !== id);
    render();
    logStatus("삭제 완료", "Warning");
};
// 이벤트 리스너
(_a = document.getElementById('addBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', addTodo);
input.addEventListener('keydown', (e) => { if (e.key === 'Enter')
    addTodo(); });
render();

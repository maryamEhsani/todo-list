// const array = [
//   { text: "buy", isDone: false },
//   { text: "read", isDone: false },
//   { text: "clean", isDone: false },
//   { text: "work", isDone: false },
// ];
// localStorage.setItem("array", JSON.stringify(array));

let todos = JSON.parse(localStorage.getItem("array"))
  ? JSON.parse(localStorage.getItem("array"))
  : [];

function addToDo() {
  let text = document.querySelector("#myInput").value;
  if (text) {
    todos.unshift({ text: text, isDone: false });
    document.querySelector("#myInput").value = "";
    render();
  } else {
    alert("لطفا متن خود راد وارد کنید!");
  }
}

document.querySelector("#myInput").addEventListener("change", (e) => {
  if (e.target.value) {
    todos.unshift({ text: e.target.value, isDone: false });
    e.target.value = "";
    render();
  } else {
    alert("لطفا متن خود راد وارد کنید!");
  }
});

function deleteToDo(index) {
  todos.splice(index, 1);
  localStorage.setItem("array", JSON.stringify(todos));
  if (todos.length <=1) {
    document.querySelector("#notList").style.display = "block";
  }
  render();
}

function editToDo(index) {
  todos[index].isDone = todos[index].isDone ? false : true;
  render();
}

function render() {
  const ul = document.querySelector("ul");
  ul.innerHTML = "";
  todos.map((todo, index) => {
    const li = document.createElement("li");
    li.classList.add("toDo");
    if (todos.length) {
      document.querySelector("#notList").style.display = "none";
      li.innerHTML = ` <input type="checkbox"  id="myCheckBox" onclick="editToDo(${index})" ${
        todo.isDone && "checked"
      }></input>
      <p id="myText">${todo.isDone ? `<s>${todo.text}</s>` : todo.text}</p>
      <span class="closeBtn" onclick="deleteToDo(${index})"><i class="fa fa-times"></i></span>`;
      ul.appendChild(li);
      localStorage.setItem("array", JSON.stringify(todos));
    }
  });
}

render();

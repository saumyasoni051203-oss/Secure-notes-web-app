let editMode = false;
let editId = null;
const form = document.getElementById("note-form");
const notesList = document.getElementById("notes-list");

let notes;
try {
  notes = JSON.parse(localStorage.getItem("notes"));
  if (!Array.isArray(notes)) notes = [];
} catch (e) {
  console.warn("Failed to parse stored notes, resetting.", e);
  notes = [];
  localStorage.setItem("notes", JSON.stringify(notes));
} 

function getNote(id) {
  return notes.find(note => note.id === id);
}

function simpleHash(str) {
  if (typeof str !== "string") return null;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString();
} 

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
  console.debug("Saved notes:", notes);
} 

function editNote(id) {
  const note = notes.find(note => note.id === id);

  if (note.locked) {
    alert("Unlock the note before editing.");
    return;
  }

  document.getElementById("title").value = note.title;
  document.getElementById("content").value = note.content;
  document.getElementById("password").value = "";

  editMode = true;
  editId = id;

  document.querySelector("button[type='submit']").textContent = "Update Note";
}

console.log(notes);

function setPasswordAndLock(id){
  const pwd = prompt("Set a password:");
  if(pwd === null || pwd === "") return;

  const note = getNote(id);
  if(!note) return;

  const h = simpleHash(pwd);
  if(h === null) return;

  note.passwordHash = h;
  note.locked = true;

  saveNotes();
  renderNotes();
} 

function renderNotes() {
  notesList.innerHTML = "";

  notes.forEach((note) => {
    const li = document.createElement("li");

    const title = document.createElement("h3");
    title.textContent = note.locked ? `🔒 ${note.title}` : note.title;

    const content = document.createElement("p");

    if (note.locked) {
      content.textContent = "Locked note";
    } else {
      content.textContent = note.content;
    }

    const actions = document.createElement("div");
    actions.className = "actions";

    const lockBtn = document.createElement("button");

if (note.locked) {
  lockBtn.textContent = "Unlock";
  lockBtn.onclick = () => unlockNote(note.id);
} else {
  lockBtn.textContent = "Lock";
  lockBtn.onclick = () => lockNote(note.id);
}
actions.appendChild(lockBtn);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editNote(note.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteNote(note.id);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(title);
    li.appendChild(content);
    li.appendChild(actions);

    notesList.appendChild(li);
  });
}


function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  renderNotes();
}


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const passwordInput = document.getElementById("password").value;
  const passwordHash = passwordInput ? simpleHash(passwordInput) : null;

  if (editMode) {
    notes = notes.map(note =>
      note.id === editId
        ? {
            ...note,
            title,
            content,
            passwordHash: passwordHash ? passwordHash : note.passwordHash,locked: passwordHash ? true : note.locked

          }
        : note
    );
    editMode = false;
    editId = null;
  } else {
    notes.push({
      id: Date.now(),
      title,
      content,
      passwordHash,
      locked: passwordHash ? true : false
    });
  }

  saveNotes();
  renderNotes();
  form.reset();
  document.querySelector("button[type='submit']").textContent = "Save Note";
});

const cancelBtn = document.getElementById("cancel-btn");

if (cancelBtn) {
  cancelBtn.addEventListener("click", () => {
    form.reset();
    editMode = false;
    editId = null;
    document.querySelector("button[type='submit']").textContent = "Save Note";
  });
} 

renderNotes();

function lockNote(id) {
  const note = getNote(id);

  if (!note.passwordHash) {
    alert("Set a password first.");
    return;
  }

  note.locked = true;
  saveNotes();
  renderNotes();
}

function unlockNote(id) {
  const note = getNote(id);
  if(!note) return;

  const pwd = prompt("Enter password:");
  if (pwd === null) return;

  const h = simpleHash(pwd);
  if (h !== null && h === note.passwordHash) {
    note.locked = false;
    saveNotes();
    renderNotes();
  } else {
    alert("Wrong password.");
  }
} 

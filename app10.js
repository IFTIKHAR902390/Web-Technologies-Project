// Constructor function
function Student(name, roll, cgpa){
  this.name = name;
  this.roll = roll;
  this.cgpa = parseFloat(cgpa);
}

// Storage module
const Storage = {
  key: 'students_v1',
  load(){ return JSON.parse(localStorage.getItem(this.key) || "[]"); },
  save(data){ localStorage.setItem(this.key, JSON.stringify(data)); },
  clear(){ localStorage.removeItem(this.key); }
};

// UI module
const UI = (() => {
  const tbody = document.querySelector('#students-table tbody');

  function safe(text){
    return text.replace(/[&<>]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));
  }

  function renderList(list, opts={}){
    tbody.innerHTML = '';
    list.forEach((s, i) => {
      const tr = document.createElement('tr');
      if (opts.highlightTop && s.cgpa >= 3.5) tr.classList.add('highlight');

      tr.innerHTML = `
        <td>${i+1}</td>
        <td>${safe(s.name)}</td>
        <td>${safe(s.roll)}</td>
        <td>${s.cgpa.toFixed(2)}</td>
        <td class="actions">
          <button class="edit" data-index="${i}">Edit</button>
          <button class="delete" data-index="${i}">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  return { renderList };
})();

// App logic
const App = (() => {
  let students = Storage.load();

  const form = document.getElementById('student-form');
  const inputs = {
    name: document.getElementById('name'),
    roll: document.getElementById('roll'),
    cgpa: document.getElementById('cgpa'),
    index: document.getElementById('student-index')
  };

  const search = document.getElementById('search');
  const sort = document.getElementById('sort');
  const highlight = document.getElementById('highlight-top');
  const clearBtn = document.getElementById('clear-storage');
  const cancelBtn = document.getElementById('cancel-btn');
  const formTitle = document.getElementById('form-title');

  function refresh(){
    let list = [...students];
    let q = search.value.toLowerCase();

    if (q) list = list.filter(s => s.name.toLowerCase().includes(q) || s.roll.toLowerCase().includes(q));

    if (sort.value === "name-asc") list.sort((a,b)=>a.name.localeCompare(b.name));
    if (sort.value === "name-desc") list.sort((a,b)=>b.name.localeCompare(a.name));
    if (sort.value === "cgpa-desc") list.sort((a,b)=>b.cgpa - a.cgpa);
    if (sort.value === "cgpa-asc") list.sort((a,b)=>a.cgpa - b.cgpa);

    UI.renderList(list, {highlightTop: highlight.checked});
  }

  function add(s){ students.push(s); Storage.save(students); refresh(); }
  function update(i, s){ students[i] = s; Storage.save(students); refresh(); }
  function remove(i){ if(confirm("Delete this student?")){ students.splice(i,1); Storage.save(students); refresh(); } }

  form.addEventListener('submit', e => {
    e.preventDefault();

    const s = new Student(inputs.name.value, inputs.roll.value, inputs.cgpa.value);

    if (inputs.index.value === "") add(s);
    else update(parseInt(inputs.index.value), s);

    inputs.index.value = "";
    form.reset();
    formTitle.textContent = "Add Student";
  });

  document.querySelector('#students-table tbody').addEventListener('click', e => {
    if (e.target.classList.contains('edit')){
      const i = e.target.dataset.index;
      const s = students[i];

      inputs.name.value = s.name;
      inputs.roll.value = s.roll;
      inputs.cgpa.value = s.cgpa;
      inputs.index.value = i;

      formTitle.textContent = "Edit Student";
      window.scrollTo({top:0,behavior:'smooth'});
    }

    if (e.target.classList.contains('delete')){
      remove(e.target.dataset.index);
    }
  });

  search.addEventListener('input', refresh);
  sort.addEventListener('change', refresh);
  highlight.addEventListener('change', refresh);

  clearBtn.addEventListener('click', () => {
    if (confirm("Clear all records?")){
      students = [];
      Storage.clear();
      refresh();
    }
  });

  cancelBtn.addEventListener('click', () => {
    form.reset();
    inputs.index.value = "";
    formTitle.textContent = "Add Student";
  });

  refresh();
})();

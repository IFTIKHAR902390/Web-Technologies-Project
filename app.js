// app.js — event listeners for Lab 8 interactive page

// ---------- Color controls ----------
const colorButtons = document.querySelectorAll('.color-btn');
const bgPicker = document.getElementById('bgPicker');

colorButtons.forEach(btn => {
  btn.addEventListener('click', function () {
    // example using 'this' to access currently-clicked button's data attribute
    const color = this.dataset.color;
    document.body.style.backgroundColor = color;
  });
});

// color picker (input event)
bgPicker.addEventListener('input', function () {
  document.body.style.backgroundColor = this.value; // 'this' refers to the input element
});

// ---------- Toggle text visibility ----------
const toggleBtn = document.getElementById('toggleBtn');
const secretText = document.getElementById('secretText');

toggleBtn.addEventListener('click', () => {
  secretText.classList.toggle('hidden');
});

// ---------- Font size slider (live) ----------
const sizeRange = document.getElementById('sizeRange');
const samplePara = document.getElementById('samplePara');

sizeRange.addEventListener('input', function () {
  // show live changes
  samplePara.style.fontSize = this.value + 'px';
});

// ---------- Move & transform shape ----------
const box = document.getElementById('box');
let pos = { x: 0, y: 0 };
let currentSize = 60;

function updateBox() {
  box.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
  box.style.width = currentSize + 'px';
  box.style.height = currentSize + 'px';
}

document.getElementById('left').addEventListener('click', () => { pos.x -= 10; updateBox(); });
document.getElementById('right').addEventListener('click', () => { pos.x += 10; updateBox(); });
document.getElementById('up').addEventListener('click', () => { pos.y -= 10; updateBox(); });
document.getElementById('down').addEventListener('click', () => { pos.y += 10; updateBox(); });

document.getElementById('grow').addEventListener('click', () => { currentSize += 10; updateBox(); });
document.getElementById('shrink').addEventListener('click', () => { currentSize = Math.max(20, currentSize - 10); updateBox(); });

// double-click toggles rounded + rotation
box.addEventListener('dblclick', function () {
  // using 'this' to refer to the active element
  if (this.classList.contains('rounded')) {
    this.classList.remove('rounded');
    this.style.transform += ' rotate(0deg)';
    this.style.borderRadius = '6px';
  } else {
    this.classList.add('rounded');
    // rotate and increase border radius for effect
    this.style.transform += ' rotate(18deg)';
    this.style.borderRadius = '50%';
  }
});

// simple keyboard support: focus the box and use arrow keys
box.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') { pos.x -= 10; updateBox(); }
  if (e.key === 'ArrowRight') { pos.x += 10; updateBox(); }
  if (e.key === 'ArrowUp') { pos.y -= 10; updateBox(); }
  if (e.key === 'ArrowDown') { pos.y += 10; updateBox(); }
});

// ---------- Live input (explicit use of 'this') ----------
const nameInput = document.getElementById('nameInput');
const namePreview = document.getElementById('namePreview');

nameInput.addEventListener('input', function () {
  // here 'this' is the element that triggered the event (the input)
  const v = this.value.trim();
  namePreview.textContent = v.length ? v : 'friend';
});

// ---------- Keyboard interaction for subtitle color ----------
const subtitle = document.querySelector('.subtitle');
window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (key === 'a') subtitle.style.color = '#e53935';
  if (key === 'b') subtitle.style.color = '#1e88e5';
  if (key === 'c') subtitle.style.color = '#8e24aa';
  if (e.key === 'Escape') subtitle.style.color = '#555';
});

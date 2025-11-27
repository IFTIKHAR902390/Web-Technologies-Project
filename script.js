// ---------------------------
// 1. CALLBACK FUNCTION EXAMPLE
// ---------------------------
function callbackMessage() {
    return "Hello! This message ran using a callback function.";
}

function updateMessage(callback) {
    const msg = callback();  // using callback function
    document.getElementById("output").innerText = msg;
}

// ---------------------------
// 2. HIGHER ORDER FUNCTION
// ---------------------------
function applyEffect(effectFunction) {
    effectFunction();  // takes a function as argument
}

// Example higher-order usage
function runAnimation() {
    applyEffect(() => {
        const box = document.getElementById("box");
        box.classList.add("animate");

        setTimeout(() => {
            box.classList.remove("animate");
        }, 700);
    });
}

// ---------------------------
// 3. BACKGROUND COLOR CONTROL (callback interaction #2)
// ---------------------------
function changeBackground(color) {
    document.body.style.backgroundColor = color;
}

// ---------------------------
// 4. SWITCH STATEMENT FOR ACTIONS
// ---------------------------
function performAction() {
    const box = document.getElementById("box");
    const action = document.getElementById("actionSelector").value;

    switch (action) {
        case "shape":
            box.style.borderRadius = "50%";
            document.getElementById("output").innerText = "Box changed to circle!";
            break;

        case "size":
            box.style.height = "200px";
            box.style.width = "200px";
            document.getElementById("output").innerText = "Box increased in size!";
            break;

        case "reset":
            box.style.height = "120px";
            box.style.width = "120px";
            box.style.borderRadius = "5px";
            document.getElementById("output").innerText = "Box reset to default!";
            break;

        default:
            document.getElementById("output").innerText = "Invalid selection.";
            break;
    }
}

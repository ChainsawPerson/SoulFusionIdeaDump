let button1 = document.getElementById("classes");
let button2 = document.getElementById("magic");
let button3 = document.getElementById("souls");

button1.innerText = "Classes";
button2.innerText = "Magic";
button3.innerText = "Souls";

function checkClasses() {
    window.location.href = 'classes.html';
    console.log(button1.innerText);
}

function checkMagic() {
    console.log(button2.innerText);
}

function checkSouls() {
    console.log(button3.innerText);
}

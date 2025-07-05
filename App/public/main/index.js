let button1 = document.getElementById("classes");
let button2 = document.getElementById("magic");
let button3 = document.getElementById("souls");

button1.innerText = "Classes";
button2.innerText = "Magic";
button3.innerText = "Souls";

function checkClasses() {
    window.location.href =`${window.location.origin}/SoulFusion/Classes`;
    console.log(button1.innerText);
}

function checkMagic() {
    window.location.href =`${window.location.origin}/SoulFusion/Magic`;
    console.log(button2.innerText);
}

function checkSouls() {
    window.location.href =`${window.location.origin}/SoulFusion/Souls`;
    console.log(button3.innerText);
}

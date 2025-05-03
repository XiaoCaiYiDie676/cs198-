function addOneToCounter() {
    const counter = document.getElementById("counter");
    counter.innerText = parseInt(counter.innerText) + 1;
    let x = Math.floor((Math.random() * 100) + 1);
    const colors = ["blue", "red", "purple", "green", "black", "orange", "magenta", "cyan"];
    const index = x % colors.length;
    document.getElementById("counterText").style.color = colors[index];
}

function makePictureSmaller() {
    const img = document.getElementById("picture");
    if (img) {
        img.style.height = "480px";
        img.style.width = "480px";
    }
}

function makePictureBigger() {
    const img = document.getElementById("picture");
    if (img) {
        img.style.height = "500px";
        img.style.width = "500px";
    }
}
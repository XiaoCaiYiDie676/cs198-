const inputName = document.querySelector('#name-input');
const addName = document.querySelector('#name-button');
const displayName = document.querySelector('#pet-name');

addName.addEventListener('click', (event) => {
    if (inputName.value.trim() === "") {
        alert("Please enter a name for your pet!");
        return;
    }
    
    pet = new Pet(inputName.value);
    controller = new Controller(pet);
    controller.meterValue();
    displayName.innerHTML = pet.name;
    
    // Enable all buttons
    const buttons = document.querySelectorAll(".control-panel button");
    buttons.forEach(button => {
        button.disabled = false;
    });
    
    // Disable the name input and button after setting the name
    inputName.disabled = true;
    addName.disabled = true;
    
    event.preventDefault();
});
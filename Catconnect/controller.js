(function exportController() {   
    function Controller(pet) {
        this.pet = pet;
        this.setupEventListeners();
        this.startDecayInterval();
    }

    Controller.prototype = {
        setupEventListeners() {
            document.querySelector('#grow-button').addEventListener('click', () => {
                this.growUp();
            });
            document.querySelector('#feed-button').addEventListener('click', () => {
                this.feed();
                this.animatePet('happy');
            });
            document.querySelector('#walk-button').addEventListener('click', () => {
                this.walk();
                this.animatePet('happy');
            });
            document.querySelector('#play-button').addEventListener('click', () => {
                this.play();
                this.animatePet('happy');
            });
            document.querySelector('#baby-button').addEventListener('click', () => {
                const babyName = prompt("What would you like to name your pet's baby?");
                if (babyName) {
                    this.haveBaby(babyName);
                    this.animatePet('happy');
                }
            });
            document.querySelector('#adopt-button').addEventListener('click', () => {
                const childName = prompt("What's the name of the pet you want to adopt?");
                if (childName) {
                    this.adoptChild(new Pet(childName));
                    this.animatePet('happy');
                }
            });
        },
        
        startDecayInterval() {
            setInterval(() => {
                this.pet.decay();
                this.meterValue();
                
                // Show hungry animation if very hungry
                if (this.pet.hunger >= 7) {
                    this.animatePet('hungry');
                }
            }, 10000); // Decay every 10 seconds
        },
        
        growUp() {
            try {
                this.pet.growUp();
                this.meterValue();
            } catch (error) {
                alert(error.message);
            }
        },
        
        feed() {
            try {
                this.pet.feed();
                this.meterValue();
            } catch (error) {
                alert(error.message);
            }
        },
        
        walk() {
            try {
                this.pet.walk();
                this.meterValue();
            } catch (error) {
                alert(error.message);
            }
        },
        
        play() {
            try {
                this.pet.play();
                this.meterValue();
            } catch (error) {
                alert(error.message);
            }
        },
        
        haveBaby(name) {
            try {
                this.pet.haveBaby(name);
                this.displayChildren();
                this.meterValue();
            } catch (error) {
                alert(error.message);
            }
        },
        
        adoptChild(child) {
            try {
                this.pet.adoptChild(child);
                this.displayChildren();
                this.meterValue();
            } catch (error) {
                alert(error.message);
            }
        },
        
        meterValue() {
            const pet = this.pet;
            
            // Update meter values
            document.querySelector("#pet-age").value = pet.age;
            document.querySelector("#pet-hunger").value = pet.hunger;
            document.querySelector("#pet-fitness").value = pet.fitness;
            
            // Update displayed values
            document.querySelector("#pet-age-value").innerHTML = pet.age;
            document.querySelector("#pet-hunger-value").innerHTML = pet.hunger;
            document.querySelector("#pet-fitness-value").innerHTML = pet.fitness;
            
            // Update status message
            document.querySelector("#checkup-message").innerHTML = pet.checkUp();
            
            // Update alive status
            const statusElement = document.querySelector("#pet-status");
            if (pet.isAlive) {
                statusElement.textContent = "● Alive";
                statusElement.className = "status-alive";
            } else {
                statusElement.textContent = "● Deceased";
                statusElement.className = "status-dead";
                this.disableButtons();
            }
            
            // Update pet image based on status
            this.updatePetImage();
        },
        
        displayChildren() {
            const container = document.querySelector("#children-container");
            container.innerHTML = "";
            
            this.pet.children.forEach(child => {
                const childElement = document.createElement("div");
                childElement.className = "child-pet";
                childElement.title = `${child.name} (Age: ${child.age})`;
                
                const nameElement = document.createElement("div");
                nameElement.className = "child-name";
                nameElement.textContent = child.name;
                
                childElement.appendChild(nameElement);
                container.appendChild(childElement);
            });
        },
        
        animatePet(type) {
            const petImage = document.querySelector("#pet-image");
            petImage.classList.remove("happy-animation", "hungry-animation");
            
            // Force reflow to restart animation
            void petImage.offsetWidth;
            
            if (type === 'happy') {
                petImage.classList.add("happy-animation");
            } else if (type === 'hungry') {
                petImage.classList.add("hungry-animation");
            }
        },
        
        updatePetImage() {
            const petImage = document.querySelector("#pet-image");
            
            if (!this.pet.isAlive) {
                petImage.style.filter = "grayscale(100%)";
                return;
            }
            
            // Change image based on happiness
            if (this.pet.happiness >= 8) {
                petImage.style.transform = "scale(1.1)";
            } else if (this.pet.happiness <= 3) {
                petImage.style.transform = "scale(0.9)";
            } else {
                petImage.style.transform = "scale(1)";
            }
        },
        
        disableButtons() {
            const buttons = document.querySelectorAll(".control-panel button");
            buttons.forEach(button => {
                if (button.id !== "name-button") {
                    button.disabled = true;
                }
            });
        }
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Controller;
    } else {
        window.Controller = Controller;
    }
}());
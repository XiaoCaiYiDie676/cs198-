const HUNGER_INCREMENT = 5;
const HUNGER_DECREMENT = 3;
const FITNESS_INCREMENT = 4;
const FITNESS_DECREMENT = 3;

const MAXIMUM_HUNGER = 10;
const MAXIMUM_FITNESS = 10;
const MAXIMUM_AGE = 30;

(function exportPet () {
    function Pet(name) {
        this.name = name;
        this.age = 0;
        this.hunger = 0;
        this.fitness = MAXIMUM_FITNESS;
        this.children = [];
    }

    Pet.prototype = {
        get isAlive() {
            return this.fitness > 0 && this.hunger < MAXIMUM_HUNGER && this.age < MAXIMUM_AGE;
        },
        growUp() {
            if(!this.isAlive) {
                throw new Error('Your pet is no longer alive :(');
            }
            this.age = Math.min(this.age += 1, MAXIMUM_AGE);
            this.hunger = Math.min(this.hunger += HUNGER_INCREMENT, MAXIMUM_HUNGER);
            this.fitness = Math.max(this.fitness -= FITNESS_DECREMENT, 0);
        },
        walk() {
            if(!this.isAlive) {
                throw new Error('Your pet is no longer alive :(');
            }
            this.fitness = Math.min(this.fitness += FITNESS_INCREMENT, MAXIMUM_FITNESS);
        },
        feed() {
            if(!this.isAlive) {
                throw new Error('Your pet is no longer alive :(');
            }
            this.hunger = Math.max(this.hunger -= HUNGER_DECREMENT, 0);
        },
        checkUp() {
            if(!this.isAlive) {
                return 'Your pet is no longer alive :(';
            }
        
            if (this.fitness <= 3 && this.hunger >= 5) {
                return 'I am hungry AND I need a walk';
            } else if (this.hunger >= 5) {
                return 'I am hungry';
            } else if (this.fitness <= 3) {
                return 'I need a walk';
            } else if (this.age == 0) {
                return 'Hello! (ᵔᴥᵔ)';
            } else {
                return 'I feel great!';
            };
        },
        adoptChild(child) {
            if(!this.isAlive) {
                throw new Error('Your pet is no longer alive :(');
            } else {
                this.children.push(child);
            }
        },
        haveBaby(child) {
            if(!this.isAlive) {
                throw new Error('Your pet is no longer alive :(');
            } else {
                const baby = new Pet (child);
                this.children.push(baby);
            }
        }
    };
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Pet;
    } else {
        window.Pet = Pet;
    }
}());
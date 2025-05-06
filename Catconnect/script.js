class VirtualPet {
    constructor() {
        this.hunger = 100;
        this.happiness = 100;
        this.energy = 100;
        this.isAlive = true;
    }

    feed() {
        if (!this.isAlive) return;
        this.hunger = Math.min(this.hunger + 20, 100);
        this.updateStats();
    }

    play() {
        if (!this.isAlive) return;
        this.happiness = Math.min(this.happiness + 15, 100);
        this.energy = Math.max(this.energy - 10, 0);
        this.updateStats();
    }

    clean() {
        if (!this.isAlive) return;
        this.happiness = Math.min(this.happiness + 10, 100);
        this.updateStats();
    }

    updateStats() {
        document.getElementById('hunger').textContent = `${this.hunger}%`;
        document.getElementById('happiness').textContent = `${this.happiness}%`;
        document.getElementById('energy').textContent = `${this.energy}%`;
        
        if (this.hunger <= 0 || this.happiness <= 0 || this.energy <= 0) {
            this.isAlive = false;
            alert('Your pet has died! Refresh to start over.');
        }
    }

    decayStats() {
        if (!this.isAlive) return;
        this.hunger -= 5;
        this.happiness -= 3;
        this.energy -= 2;
        this.updateStats();
    }
}

// Initialize pet
const myPet = new VirtualPet();

// Set up event listeners
document.getElementById('feed-btn').addEventListener('click', () => myPet.feed());
document.getElementById('play-btn').addEventListener('click', () => myPet.play());
document.getElementById('clean-btn').addEventListener('click', () => myPet.clean());

// Decay stats every 5 seconds
setInterval(() => myPet.decayStats(), 5000);
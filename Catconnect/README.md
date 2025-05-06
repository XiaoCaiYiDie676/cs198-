Cat Connect
A Virtual Pet Simulator Designed for Joyful Responsibility
Application Description:
Virtual pets teach caregiving and routine in a low-stakes environment. Cat Connect adapts this concept for users who want companionship without real-world constraints. Your digital cat’s needs (hunger, fitness, and age) evolve dynamically, encouraging consistent engagement while respecting the user’s capacity for interaction.

Features + Tools/Technologies
1. Pet Naming & Personalization
Feature: Users name their cat, creating emotional attachment.

Tools:

HTML/CSS: Input field and button UI (index.html + style.css)

JavaScript: Event listeners to capture/display the name (addname.js)

2. Dynamic Stat Tracking
Feature: Real-time meters for:

Age (0–30 "life stages")

Hunger (0–10, high = critical)

Fitness (0–10, low = critical)

Tools:

HTML <meter> elements: Visual gauges

JavaScript: pet.js class manages state logic

3. Care Controls
Feature: Three core interactions:

Grow Up: Advance age (triggers hunger/fitness decay)

Feed Me: Reduce hunger

Walk Me: Improve fitness

Tools:

Event listeners (controller.js)

Conditional logic to prevent overfeeding/overexertion


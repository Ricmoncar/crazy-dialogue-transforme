// Process text with glitches based on settings
function processText(text) {
    // Break the text into words
    let words = text.split(' ');
    let output = [];
    
    // Apply transforms based on settings
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        
        // Character substitution
        if (settings.charSubstitution > 0) {
            word = substituteCharacters(word, settings.charSubstitution / 10);
        }
        
        // Add diacritics (Zalgo effect)
        if (settings.useDiacritics && Math.random() < settings.glitchIntensity / 20) {
            word = addDiacritics(word, Math.ceil(settings.glitchIntensity / 3));
        }
        
        // Rotate characters
        if (settings.useRotation && Math.random() < settings.glitchIntensity / 20) {
            word = rotateCharacters(word);
        }
        
        // Insert random symbols
        if (settings.symbolInsertion > 0 && Math.random() < settings.symbolInsertion / 10) {
            word = insertSymbols(word, Math.ceil(settings.symbolInsertion / 3));
        }
        
        output.push(word);
        
        // Random decision to add glitchy elements between words
        if (Math.random() < settings.glitchIntensity / 10) {
            // Add random symbols or text fragments
            output.push(getRandomGlitchElement());
        }
    }
    
    let result = output.join(' ');
    
    // Text reversal - reverse portions of the text
    if (settings.textReversal > 0 && settings.useInversion) {
        result = applyTextReversal(result, settings.textReversal / 10);
    }
    
    // Add vertical text fragments if enabled
    if (settings.useVertical && Math.random() < settings.glitchIntensity / 10) {
        result = addVerticalText(result);
    }
    
    return result;
}

// Substitute characters with similar-looking alternatives
function substituteCharacters(text, probability) {
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        // Check if we should substitute this character
        if (Math.random() < probability) {
            // Lowercase letter
            if (/[a-z]/.test(char) && glitchChars.lowercaseLetters[char]) {
                const alternatives = glitchChars.lowercaseLetters[char];
                result += alternatives[Math.floor(Math.random() * alternatives.length)];
            }
            // Uppercase letter
            else if (/[A-Z]/.test(char) && glitchChars.uppercaseLetters[char]) {
                const alternatives = glitchChars.uppercaseLetters[char];
                result += alternatives[Math.floor(Math.random() * alternatives.length)];
            }
            // Number
            else if (/[0-9]/.test(char) && glitchChars.numbers[char]) {
                const alternatives = glitchChars.numbers[char];
                result += alternatives[Math.floor(Math.random() * alternatives.length)];
            }
            // No substitution available, keep original
            else {
                result += char;
            }
        } else {
            // Keep original character
            result += char;
        }
    }
    
    return result;
}

// Add random diacritical marks to create Zalgo text effect
function addDiacritics(text, intensity) {
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
        result += text[i];
        
        // Add random number of diacritical marks based on intensity
        const markCount = Math.floor(Math.random() * intensity) + 1;
        
        for (let j = 0; j < markCount; j++) {
            const markIndex = Math.floor(Math.random() * glitchChars.zalgoMarks.length);
            result += glitchChars.zalgoMarks[markIndex];
        }
    }
    
    return result;
}

// Rotate or flip characters (using upside-down mapping)
function rotateCharacters(text) {
    let result = '';
    
    // 50% chance to flip the entire word upside down
    if (Math.random() < 0.5) {
        // Reverse the text for upside-down effect
        const reversed = text.split('').reverse().join('');
        
        // Map each character to its upside-down version
        for (let i = 0; i < reversed.length; i++) {
            const char = reversed[i];
            result += glitchChars.upside_down[char] || char;
        }
    } else {
        // Just rotate some characters
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            
            // 30% chance to rotate this character
            if (Math.random() < 0.3) {
                // Try to find an alternative that looks like a rotated version
                if (/[bpdqmnwMW]/.test(char)) {
                    switch(char) {
                        case 'b': result += 'q'; break;
                        case 'p': result += 'd'; break;
                        case 'd': result += 'p'; break;
                        case 'q': result += 'b'; break;
                        case 'n': result += 'u'; break;
                        case 'm': result += 'w'; break;
                        case 'w': result += 'm'; break;
                        case 'M': result += 'W'; break;
                        case 'W': result += 'M'; break;
                        default: result += char;
                    }
                } else {
                    result += char;
                }
            } else {
                result += char;
            }
        }
    }
    
    return result;
}

// Insert random symbols into text
function insertSymbols(text, count) {
    let result = text;
    
    for (let i = 0; i < count; i++) {
        // Get random position to insert
        const position = Math.floor(Math.random() * (result.length + 1));
        
        // Get random symbol
        const symbol = glitchChars.symbols[Math.floor(Math.random() * glitchChars.symbols.length)];
        
        // Insert the symbol
        result = result.substring(0, position) + symbol + result.substring(position);
    }
    
    return result;
}

// Get a random glitchy element to insert between words
function getRandomGlitchElement() {
    const elements = [
        // Brackets with or without content
        '[ ]', '{ }', '( )', '</ >', '/*_*/', '< >', '""', '',
        
        // Random symbols
        '...',  '---', '|||', '////', '####', '@@@@', '????', '!!!!',
        
        // Glitched fragments
        'ERR0R', 'CORRUPTED', 'NULL', 'VOID', 'GLITCH', 'ERROR', 'DELETED', 'REDACTED',
        '101010', '010101', 'SYNTAX', 'BREAK', '404', 'MISSING'
    ];
    
    let element = elements[Math.floor(Math.random() * elements.length)];
    
    // 30% chance to add content inside brackets
    if (element.includes(' ') && Math.random() < 0.3) {
        const randomContent = elements[Math.floor(Math.random() * elements.length)];
        element = element.replace(' ', randomContent);
    }
    
    return element;
}

// Apply text reversal to portions of the text
function applyTextReversal(text, probability) {
    // Split text into words again
    let words = text.split(' ');
    
    // Determine if we should apply full reversal
    if (Math.random() < probability * 0.3) {
        // Reverse the entire text
        return words.reverse().join(' ');
    }
    
    // Apply partial reversals
    for (let i = 0; i < words.length; i++) {
        // Random decision to reverse this word
        if (Math.random() < probability) {
            words[i] = words[i].split('').reverse().join('');
        }
        
        // Chance to convert to upside-down text instead of reversal
        if (Math.random() < probability * 0.5) {
            let upsideDown = '';
            for (let j = 0; j < words[i].length; j++) {
                const char = words[i][j];
                upsideDown += glitchChars.upside_down[char] || char;
            }
            words[i] = upsideDown;
        }
    }
    
    return words.join(' ');
}

// Add vertical text fragments
function addVerticalText(text) {
    const words = text.split(' ');
    let verticalPart = '';
    
    // Random position to insert vertical text
    const position = Math.floor(Math.random() * words.length);
    
    // Choose a random word to make vertical
    const wordToMakeVertical = words[Math.floor(Math.random() * words.length)];
    
    // Create vertical representation
    for (let i = 0; i < wordToMakeVertical.length; i++) {
        verticalPart += wordToMakeVertical[i] + '\n';
    }
    
    // Insert vertical text at random position
    words.splice(position, 0, verticalPart);
    
    return words.join(' ');
}

// Save output function
function saveOutput() {
    const inputText = document.getElementById('inputText').value;
    const outputText = document.getElementById('outputText').textContent;
    
    if (outputText && outputText !== 'Transformed text will appear here...') {
        // Create a new saved item
        const savedItem = {
            id: Date.now(),
            input: inputText,
            output: outputText,
            date: new Date().toLocaleString()
        };
        
        // Add to saved outputs
        savedOutputs.unshift(savedItem);
        
        // Store in localStorage
        localStorage.setItem('anathemaSavedOutputs', JSON.stringify(savedOutputs));
        
        // Update the display
        updateSavedOutputsDisplay();
        
        // Provide feedback
        alert('Output saved successfully!');
    }
}

// Load saved outputs from localStorage
function loadSavedOutputs() {
    const saved = localStorage.getItem('anathemaSavedOutputs');
    
    if (saved) {
        savedOutputs = JSON.parse(saved);
        updateSavedOutputsDisplay();
    }
}

// Update the saved outputs display
function updateSavedOutputsDisplay() {
    const savedOutputsList = document.getElementById('savedOutputsList');
    
    if (savedOutputs.length === 0) {
        savedOutputsList.innerHTML = '<p>No saved outputs yet. Transform some text and save it to see it here.</p>';
        return;
    }
    
    let html = '';
    
    savedOutputs.forEach(item => {
        html += `
            <div class="saved-item" data-id="${item.id}">
                <div class="saved-content">${item.output}</div>
                <div class="saved-actions">
                    <span>${item.date}</span>
                    <div>
                        <button class="saved-action-btn load-btn" data-id="${item.id}">Load</button>
                        <button class="saved-action-btn delete-btn" data-id="${item.id}">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    savedOutputsList.innerHTML = html;
    
    // Add event listeners to buttons
    document.querySelectorAll('.load-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            loadSavedOutput(id);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            deleteSavedOutput(id);
        });
    });
}

// Load a saved output
function loadSavedOutput(id) {
    const savedItem = savedOutputs.find(item => item.id === id);
    
    if (savedItem) {
        document.getElementById('inputText').value = savedItem.input;
        document.getElementById('outputText').textContent = savedItem.output;
        
        // Switch to translator tab
        document.querySelector('.tab[data-tab="translator"]').click();
    }
}

// Delete a saved output
function deleteSavedOutput(id) {
    if (confirm('Are you sure you want to delete this saved output?')) {
        savedOutputs = savedOutputs.filter(item => item.id !== id);
        
        // Update localStorage
        localStorage.setItem('anathemaSavedOutputs', JSON.stringify(savedOutputs));
        
        // Update display
        updateSavedOutputsDisplay();
    }
}
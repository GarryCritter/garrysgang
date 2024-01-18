let characters = [];
let totalSpan;

// Function to load characters and values from localStorage
function loadCharacters() {
  const storedCharacters = localStorage.getItem('characters');
  characters = storedCharacters ? JSON.parse(storedCharacters) : [];
}

// Function to save characters to localStorage
function saveCharacters() {
  localStorage.setItem('characters', JSON.stringify(characters));
}

// Function to update and refresh the table
function updateTable() {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';

  characters.forEach(character => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${character.name}</td>
      <td><button class="increment" data-name="${character.name}">+</button></td>
      <td><span class="value" data-name="${character.name}">${character.value}</span></td>
      <td><button class="decrement" data-name="${character.name}">-</button></td>
      <td><button class="delete" data-name="${character.name}">🗑️</button></td>
    `;
    tableBody.appendChild(row);
  });

  updateButtonEventListeners();
}

// Function to update button event listeners
function updateButtonEventListeners() {
  const buttons = document.querySelectorAll('.increment, .decrement, .delete');

  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      console.log('Button clicked:', button, 'Event:', event);

      const name = button.getAttribute('data-name');
      console.log('Name:', name);

      const valueSpan = document.querySelector(`.value[data-name="${name}"]`);
      console.log('Value Span:', valueSpan);

      const character = characters.find(entry => entry.name === name);
      console.log('Character:', character);

      if (character) {
        if (button.classList.contains('increment')) {
          character.value++;
        } else if (button.classList.contains('decrement') && character.value > 0) {
          character.value--;
        } else if (button.classList.contains('delete')) {
          const confirmDelete = confirm(`Are you sure you want to delete ${name}?`);
          if (!confirmDelete) {
            return; // Do nothing if not confirmed
          }
          characters = characters.filter(entry => entry.name !== name);
        }

        if (totalSpan) {
          totalSpan.textContent = calculateTotal();
        }

        if (valueSpan) {
          valueSpan.textContent = character.value;
        }

        saveCharacters();
        updateTable();
      }
    });
  });
}


// Function to add a new character
function addCharacter() {
  const nameInput = document.getElementById('nameInput');
  const newName = nameInput.value.trim();

  if (newName !== '') {
    characters.push({ name: newName, value: 0 });
    nameInput.value = '';
    saveCharacters(); // Save characters when a new character is added
    updateTable(); // Update the table immediately after adding a new character
  }
}

// Function to calculate the total value
function calculateTotal() {
  let total = 0;
  characters.forEach(character => {
    total += character.value;
  });
  return total;
}

// Function to initialize the page
function initialize() {
  loadCharacters(); // Load characters from localStorage
  totalSpan = document.getElementById('total'); // Assign totalSpan
  updateTable(); // Update the table with loaded characters
}


// Initial population of the table
initialize();

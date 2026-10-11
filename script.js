javascript
// 1. Select the HTML elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

// 2. Create an array to store notes
const notes = [];

// 3. Function to display notes
function render() {
    // Clear the current list
    notesList.textContent = "";

    // Create a card for every note
    notes.forEach(function (note) {
        const noteCard = document.createElement("li");
        noteCard.classList.add("category-" + note.category);

        // Note text
        const noteText = document.createElement("p");
        noteText.classList.add("note-text");
        noteText.textContent = note.text;

        // Category label
        const categoryLabel = document.createElement("span");
        categoryLabel.classList.add("category-label");
        categoryLabel.textContent =
            note.category.charAt(0).toUpperCase() +
            note.category.slice(1);

        // Date and time
        const noteDate = document.createElement("small");
        noteDate.classList.add("note-date");
        noteDate.textContent = note.createdAt;

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";

        // Delete this note when clicked
        deleteButton.addEventListener("click", function () {
            const noteIndex = notes.findIndex(function (item) {
                return item.id === note.id;
            });

            if (noteIndex !== -1) {
                notes.splice(noteIndex, 1);
                render();
            }
        });

        // Add everything to the note card
        noteCard.appendChild(categoryLabel);
        noteCard.appendChild(noteText);
        noteCard.appendChild(noteDate);
        noteCard.appendChild(deleteButton);

        // Add the card to the list
        notesList.appendChild(noteCard);
    });
}

// 4. Handle form submission
noteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    // Create a new note
    const note = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    // Store the note and display it
    notes.push(note);
    render();

    // Clear the input
    noteInput.value = "";
});




// 1. Select the HTML elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// 2. Store notes in an array
const notes = [];

// 3. Update the note count
function updateNoteCount() {
    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }
}

// 4. Display the notes
function render() {
    notesList.textContent = "";

    notes.forEach(function (note) {
        const noteCard = document.createElement("li");
        noteCard.classList.add("note-card");
        noteCard.classList.add("category-" + note.category);

        const categoryLabel = document.createElement("span");
        categoryLabel.classList.add("category-label");
        categoryLabel.textContent =
            note.category.charAt(0).toUpperCase() +
            note.category.slice(1);

        const noteText = document.createElement("p");
        noteText.classList.add("note-text");
        noteText.textContent = note.text;

        const noteDate = document.createElement("small");
        noteDate.classList.add("note-date");
        noteDate.textContent = note.createdAt;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            const noteIndex = notes.findIndex(function (item) {
                return item.id === note.id;
            });

            if (noteIndex !== -1) {
                notes.splice(noteIndex, 1);
                render();
            }
        });

        noteCard.appendChild(categoryLabel);
        noteCard.appendChild(noteText);
        noteCard.appendChild(noteDate);
        noteCard.appendChild(deleteButton);

        notesList.appendChild(noteCard);
    });

    updateNoteCount();
}

// 5. Handle form submission and validation
noteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    if (text.length === 0) {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent =
            "Notes must be 200 characters or fewer.";
        return;
    }

    const note = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);

    errorMessage.textContent = "";
    noteInput.value = "";

    render();
});

// 6. Show the correct initial count
render();




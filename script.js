
// 1. Select the HTML elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

// 2. Load saved notes from localStorage
let notes = [];

try {
    const savedNotes = localStorage.getItem("quickNotes");

    if (savedNotes !== null) {
        const parsedNotes = JSON.parse(savedNotes);

        if (Array.isArray(parsedNotes)) {
            notes = parsedNotes;
        }
    }
} catch (error) {
    console.error("Could not load saved notes:", error);
}

// 3. Save notes to localStorage
function saveNotes() {
    try {
        localStorage.setItem("quickNotes", JSON.stringify(notes));
    } catch (error) {
        console.error("Could not save notes:", error);
        errorMessage.textContent =
            "Your notes could not be saved in this browser.";
    }
}

// 4. Update the note count
function updateNoteCount() {
    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }
}

// 5. Display notes and filter search results
function render() {
    notesList.textContent = "";

    const searchWord = searchInput.value.trim().toLowerCase();

    const filteredNotes = notes.filter(function (note) {
        return note.text.toLowerCase().includes(searchWord);
    });

    // Show a message when a search has no matches
    if (filteredNotes.length === 0 && searchWord !== "") {
        const message = document.createElement("li");
        message.textContent = "No notes match your search.";
        message.classList.add("no-results");
        notesList.appendChild(message);
    }

    // Create a card for each matching note
    filteredNotes.forEach(function (note) {
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
            notes = notes.filter(function (item) {
                return item.id !== note.id;
            });

            saveNotes();
            render();
        });

        noteCard.appendChild(categoryLabel);
        noteCard.appendChild(noteText);
        noteCard.appendChild(noteDate);
        noteCard.appendChild(deleteButton);

        notesList.appendChild(noteCard);
    });

    updateNoteCount();
}

// 6. Add a new note and validate the input
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

    saveNotes();

    errorMessage.textContent = "";
    noteInput.value = "";

    render();
});

// 7. Search as the user types
searchInput.addEventListener("input", function () {
    render();
});

// 8. Display saved notes when the page opens
render();



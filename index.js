function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

let bookStorage = [];
let currentId = 4;
let editingBook = false;
let editingBookIndex = -1;

const totalBooks = document.querySelector("#overall #facts #total-book");
const totalRead = document.querySelector("#overall #facts #total-read");
const totalPages = document.querySelector("#overall #facts #total-page");

const bookList = document.querySelector("#list ul");
const addBookButton = document.querySelector("#list .heading button");

const newBookScreen = document.querySelector("#new-book");
const newBookTitle = document.querySelector("#new-book #title");
const newBookAuthor = document.querySelector("#new-book #author");
const newBookPages = document.querySelector("#new-book #pages");
const newBookRead = document.querySelector("#new-book #read");
const newBookAddButton = document.querySelector("#new-book .buttons #add");
const newBookCancelButton = document.querySelector("#new-book .buttons #cancel");

const readCheck = document.querySelector("#new-book .read-check");

function reset() {
    
    newBookScreen.style.display = "none";
    newBookScreen.style.visibility = "hidden";

    newBookTitle.value = "";
    newBookAuthor.value = "";
    newBookPages.value = "";
    newBookRead.checked = false;
    
    readCheck.style.display = "unset";
    readCheck.style.visibility = "unset";
    
    newBookAddButton.textContent = "Add New Book";
    
    let editingBook = false;
    let editingBookIndex = -1;
}

addBookButton.addEventListener("click", () => {
    newBookScreen.style.display = "unset";
    newBookScreen.style.visibility = "unset";
});

newBookCancelButton.addEventListener("click", (event) => {
    
    event.preventDefault();

    newBookScreen.style.display = "none";
    newBookScreen.style.visibility = "hidden";
    
    reset();
});


newBookAddButton.addEventListener("click", (event) => {

    event.preventDefault();
    
    if (newBookTitle.validity.valueMissing) {
        newBookTitle.setCustomValidity("Book should have a title");
        newBookTitle.reportValidity();
    }
    
    else if (newBookAuthor.validity.valueMissing) {
        newBookAuthor.setCustomValidity("Book should have an author");
        newBookAuthor.reportValidity();
    } 
    
    else if (newBookPages.validity.valueMissing) {
        newBookPages.setCustomValidity("Book should have pages");
        newBookPages.reportValidity();
    }
    
    else {
        
        if (!editingBook) {
            const title = newBookTitle.value;
            const author = newBookAuthor.value;
            const pages = newBookPages.value;
            const read = newBookRead.checked;
            const id = currentId;
            currentId++;

            const newBook = new Book(title, author, pages, read, id);

            addNewBook(newBook);
        } else {
            bookStorage[editingBookIndex].title = newBookTitle.value;
            bookStorage[editingBookIndex].author = newBookAuthor.value;
            
            totalPages.textContent = Number(totalPages.textContent) - Number(bookStorage[editingBookIndex].pages) + Number(newBookPages.value);
            bookStorage[editingBookIndex].pages = newBookPages.value;
        }
        reset();
    }
});

function addNewBook(book) {
    bookStorage.push(book);

    const newBook = document.createElement("li");

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const icon = document.createElement("img");
    icon.setAttribute("src", "images/book.png");
    icon.setAttribute("role", "presentation");

    const bookTextDiv = document.createElement("div");
    bookTextDiv.classList.add("text");

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;

    const bookInfo = document.createElement("pre");
    bookInfo.textContent = `${book.author}  |  ${book.pages} pages`;

    bookTextDiv.appendChild(bookTitle);
    bookTextDiv.appendChild(bookInfo);
    bookDiv.appendChild(icon);
    bookDiv.appendChild(bookTextDiv);
    newBook.appendChild(bookDiv);

    const idElement = document.createElement("p");
    idElement.classList.add("id");
    idElement.textContent = book.id;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    const readButton = document.createElement("button");
    readButton.classList.add("read");

    if (!book.read) {
        readButton.classList.add("not-read");
        readButton.textContent = "NOT READ";
    } else {
        readButton.textContent = "READ";
        totalRead.textContent = Number(totalRead.textContent) + 1;
    }

    readButton.addEventListener("click", readButtonFunctionality);

    const editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.textContent = "EDIT";
    editButton.addEventListener("click", editButtonFunctionality);

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.textContent = "REMOVE";
    removeButton.addEventListener("click", removeButtonFunctionality);

    buttonsDiv.appendChild(idElement);
    buttonsDiv.appendChild(readButton);
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(removeButton);
    newBook.appendChild(buttonsDiv);

    bookList.appendChild(newBook);

    totalBooks.textContent = bookStorage.length;
    totalPages.textContent = Number(totalPages.textContent) + Number(book.pages);
}

function readButtonFunctionality(event) {
    
    id = event.target.previousSibling.textContent;

    bookStorage.find((book, index) => {
        if (book.id == id) {
            bookStorage[index].read = !bookStorage[index].read;
            return;
        }
    });

    if (event.target.classList.contains("not-read")) {
        event.target.classList.remove("not-read");
        event.target.textContent = "READ";

        totalRead.textContent = Number(totalRead.textContent) + 1;

    } else {
        event.target.classList.add("not-read");
        event.target.textContent = "NOT READ";

        totalRead.textContent = Number(totalRead.textContent) - 1;
    }
}

function editButtonFunctionality(event) {
    
    id = event.target.previousSibling.previousSibling.textContent;
    let index;

    bookStorage.find((book, i) => {
        if (book.id == id) {
            index = i;
            return;
        }
    });
    
    editingBook = true;
    editingBookIndex = index;
    
    newBookTitle.value = bookStorage[index].title;
    newBookAuthor.value = bookStorage[index].author;
    newBookPages.value = bookStorage[index].pages;
    
    readCheck.style.display = "none";
    readCheck.style.visibility = "hidden";
    
    newBookAddButton.textContent = "Done Editing";
    
    newBookScreen.style.display = "unset";
    newBookScreen.style.visibility = "unset";
}   

function removeButtonFunctionality(event) {

    id = event.target.previousSibling.previousSibling.previousSibling.textContent;
    let index;

    bookStorage.find((book, i) => {
        if (book.id == id) {
            index = i;
            return;
        }
    });

    totalBooks.textContent = Number(totalBooks.textContent) - 1;
    totalPages.textContent = (Number(totalPages.textContent) - Number(bookStorage[index].pages));

    if (bookStorage[index].read)
        totalRead.textContent = Number(totalRead.textContent) - 1

    if (index === 0) 
        bookStorage.shift();
    else if (index === bookStorage.length - 1)
        bookStorage.pop();
    else
        bookStorage = bookStorage.filter(it => it.id != id);

    const listItem = event.target.parentNode.parentNode;
    bookList.removeChild(listItem);

    console.log(bookStorage);
}

// Add these to list at the starting
addNewBook(new Book("Deyal", "Humayun Ahmed", "400", true, 1));
addNewBook(new Book("False Sheep", "Daemon Targaryen", "500", false, 2));
addNewBook(new Book("My Knighthood", "Arya Barratheon", "100", false, 3));
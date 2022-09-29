function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

let bookStorage = [];
let currentId = 4;

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

addBookButton.addEventListener("click", () => {
    newBookScreen.style.display = "unset";
    newBookScreen.style.visibility = "unset";
});

newBookCancelButton.addEventListener("click", (event) => {
    
    event.preventDefault();

    newBookScreen.style.display = "none";
    newBookScreen.style.visibility = "hidden";
});


newBookAddButton.addEventListener("click", (event) => {

    event.preventDefault();

    const title = newBookTitle.value;
    const author = newBookAuthor.value;
    const pages = newBookPages.value;
    const read = newBookRead.checked;
    const id = currentId;
    currentId++;

    const newBook = new Book(title, author, pages, read, id);

    newBookScreen.style.display = "none";
    newBookScreen.style.visibility = "hidden";

    newBookTitle.value = "";
    newBookAuthor.value = "";
    newBookPages.value = "";
    newBookRead.checked = false;

    addNewBook(newBook);
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
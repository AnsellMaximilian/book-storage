
let myLibrary = [];

if (localStorage.books) {
    JSON.parse(localStorage.books).forEach(function(book, index){
        myLibrary.push(new Book(book.title, book.author, book.pages, book.isRead));
    });
}

window.addEventListener("load", render(myLibrary));

function Book(title, author, pages, isRead){
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

function addBookToLibrary() {
    let bookTitle = document.querySelector("#title").value;
    let bookAuthor = document.querySelector("#author").value;
    let bookPages = document.querySelector("#pages").value;
    let bookIsRead = document.querySelector("#is-read").value
    let newBook = new Book(bookTitle, bookAuthor, bookPages, bookIsRead);
    myLibrary.push(newBook);
    updateStorage();
    render();
}

function render(){
    let display = document.querySelector("#book-display")
    display.textContent = "";
    myLibrary.forEach(function (book, index){
        let bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        let bookTitle = document.createElement("span");
        bookTitle.textContent = book.title;
        bookTitle.classList.add("book-title");

        let bookAuthor = document.createElement("span");
        bookAuthor.textContent = book.author;

        let bookPages = document.createElement("span");
        bookPages.textContent = `${book.pages} pages`;
        bookPages.classList.add("pages")

        let deleteButton = document.createElement("button")
        deleteButton.type = "button"
        deleteButton.textContent = "X"
        deleteButton.classList.add("delete-book");
        deleteButton.dataset.object = JSON.stringify(book);
        deleteButton.addEventListener("click", deleteBook);

        let toggleButton = document.createElement("button")
        toggleButton.type = "button"
        toggleButton.textContent = book.isRead == "yes" ? "Read" : "Not Read";
        toggleButton.classList.add("is-read-toggle");
        toggleButton.classList.add(book.isRead == "yes" ? "read-button" : "not-read-button");
        toggleButton.dataset.object = JSON.stringify(book);
        toggleButton.addEventListener("click", toggleRead);

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(deleteButton);
        bookCard.appendChild(toggleButton);

        display.appendChild(bookCard);
    })
}


// Form Display / Hide
function displayForm(){
    document.querySelector("#book-form").style.display = "block";
}

function hideForm(){
    document.querySelector("#book-form").style.display = "none";
}

document.querySelector("#close-form").addEventListener("click", hideForm);
document.querySelector("#display-form").addEventListener("click", displayForm);

// Book card

function deleteBook(e){
    let bookIndex = -1;

    myLibrary.forEach(function(book, index) {
        if (JSON.stringify(book) == e.target.dataset.object){
            bookIndex = index;
            return;
        } 
    });

    console.log(e.target.dataset.object); console.log(bookIndex)
    if (bookIndex > -1) {
        myLibrary.splice(bookIndex, 1);
    }
    updateStorage();
    render();
}

function toggleRead(e) {
    let bookIndex = -1;
    myLibrary.forEach(function(book, index) {
        if (JSON.stringify(book) == e.target.dataset.object){
            bookIndex = index;
            return;
        } 
    });

    myLibrary[bookIndex].isRead = myLibrary[bookIndex].isRead == "yes" ? "no" : "yes";
    updateStorage();
    render();
}

// Local storage

function updateStorage() {
    localStorage.books = JSON.stringify(myLibrary);
}
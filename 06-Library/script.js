const userLibrary = [
    {
        title: "Oliver Twist",
        author: "Charles Dickens",
        pages: 500,
        read: true,
        index: 0
    },
    {
        title: "David Copperfield",
        author: "Charles Dickens",
        pages: 500,
        read: false,
        index: 1
    }
];

let booksCount = 2;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = booksCount++;
}

const booksContainer = document.querySelector("#books");
const modal = document.querySelector("#book-modal");

const modalButton = document.querySelector("#modal-button");
modalButton.addEventListener("click", () => modal.showModal());

const submitBtn = document.querySelector("#submit-button");
submitBtn.addEventListener("click", event => {
    event.preventDefault();
    let newBookTitle = document.querySelector("#book-title").value;
    if (!newBookTitle) {
        alert("Please Enter Book Name");
        return;
    }
    let newBookAuthor = document.querySelector("#book-author").value  || "NA";
    let newBookPages = Number(document.querySelector("#book-pages").value) || "NA";
    let newBookRead = document.querySelector("#book-read-yes").checked ? true : false;
    const newBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead);
    addToLibrary(newBook);
    displayBooks(userLibrary);
    modal.close();
});

const closeBtn = document.querySelector("#close-button");
closeBtn.addEventListener("click", event => {
    event.preventDefault();
    modal.close();
});

function displayBooks(userLibrary) {
    booksContainer.textContent = "";
    userLibrary.forEach((book) => {
        let bookElement = document.createElement("div");
        bookElement.classList.add("book-card");
        let bookTitle = document.createElement("h2");
        bookTitle.textContent = book.title;
        let bookAuthor = document.createElement("p");
        bookAuthor.textContent = `Author: ${book.author}`;
        let bookPages = document.createElement("p");
        bookPages.textContent = `Pages: ${book.pages}`;
        let bookRead = document.createElement("p");
        bookRead.textContent = book.read ? "Read: Yes" : "Read: No";
        let bookDelete = document.createElement("button");
        bookDelete.textContent = "Delete Book";
        bookDelete.dataset.index = userLibrary.indexOf(book);
        bookDelete.addEventListener("click", () => {
            userLibrary.splice(bookDelete.dataset.index, 1);
            displayBooks(userLibrary);
        })
        let toggleReadStatus = document.createElement("button");
        toggleReadStatus.textContent = book.read ? "Not Read?" : "Read?";
        toggleReadStatus.addEventListener("click", () => {
            book.read = !book.read; // Toggle read status
            bookRead.textContent = book.read ? "Read: Yes" : "Read: No";
            toggleReadStatus.textContent = book.read ? "Not Read?" : "Read?";
          });
        bookElement.appendChild(bookTitle);
        bookElement.appendChild(bookAuthor);
        bookElement.appendChild(bookPages);
        bookElement.appendChild(bookRead);
        bookElement.appendChild(bookDelete);
        bookElement.appendChild(toggleReadStatus);
        booksContainer.appendChild(bookElement);
    })
}

function addToLibrary(newBook) {
    userLibrary.push(newBook);
}

displayBooks(userLibrary);
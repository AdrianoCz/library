const library = document.querySelector(".library");
const myLibrary = [];
const form = document.querySelector("form");
const blurred = document.getElementById("blur");
form.addEventListener("submit", function (event) {
  event.preventDefault();
});

class Book {
  constructor(name, pages, author, year) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.pages = pages;
    this.author = author;
    this.year = year;
    this.read;
  }
}

function addBookToLibrary() {
  const name = document.getElementById("name").value;
  const pages = document.getElementById("pages").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;

  myLibrary.push(new Book(name, pages, author, year));

  clearForm();
  displayLibrary();
}

function clearForm() {
  const values = document.querySelectorAll(".info");
  values.forEach((element) => {
    element.value = "";
  });
}

function displayLibrary() {
  for (let i = 0; i < myLibrary.length; i++) {
    if(document.getElementById(myLibrary[i].id) == null){
    const book = document.createElement("div");
    const name = document.createElement("h1");
    const info = document.createElement("div");
    const pages = document.createElement("p");
    const author = document.createElement("p");
    const year = document.createElement("p");
    const remove = document.createElement("button");
    const read = document.createElement("p");
    const readStatus = document.createElement("button");
    const buttons = document.createElement("div");

    book.id = myLibrary[i].id;
    buttons.classList.add("buttons");
    book.classList.add("book");
    info.classList.add("info");
    remove.classList.add("addBook");
    readStatus.classList.add("addBook");
    readStatus.classList.add("readStatus");
    read.classList.add("read");

    remove.innerText = "Remove";
    remove.setAttribute("name", myLibrary[i].id);
    remove.setAttribute("onclick", "removeBook(event.target.name)");

    readStatus.addEventListener("click", (e) => {
      toggleRead(e.target);
    });
    readStatus.setAttribute("name", myLibrary[i].id);

    pages.innerText = `Pages: ${myLibrary[i].pages}`;
    author.innerText = `Author: ${myLibrary[i].author}`;
    year.innerText = `Release year: ${myLibrary[i].year}`;
    name.innerText = myLibrary[i].name;
    readStatus.innerText = myLibrary[i].read
      ? "Mark as unread"
      : "Mark as Read";
    read.innerText = myLibrary[i].read ? "Read" : "Not read";
    read.setAttribute("style", myLibrary[i].read ? "color:green" : "color:red");

    info.appendChild(pages);
    info.appendChild(author);
    info.appendChild(year);
    info.appendChild(read);
    book.appendChild(name);
    book.appendChild(info);
    book.appendChild(buttons);
    buttons.appendChild(remove);
    buttons.appendChild(readStatus);
    library.appendChild(book);
  }
}
}

function toggleRead(id) {
  myLibrary.forEach((element) => {
    if (element.id == id.name) {
      element.read = !element.read;

      const book = document.getElementById(id.name);
      const read = book.querySelector(".read");
      const readStatus = book.querySelector(".readStatus");
      readStatus.innerText = element.read
        ? "Mark as unread"
        : "Mark as Read";
      read.innerText = element.read ? "Read" : "Not read";
      read.setAttribute(
        "style",
        element.read ? "color:green" : "color:red",
      );
    }
  });
}

function removeBook(id) {
  myLibrary.forEach((element, i) => {
    if (element.id == id) {
      myLibrary.splice(i, 1);
    }
  });
  const book = document.getElementById(id);
  library.removeChild(book);
}

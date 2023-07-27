"use strict";

const cardGrid = document.querySelector(".card-grid-container");
const newBookButton = document.querySelector(".new-book");
const formDiv = document.querySelector(".form-container");

let formShown = false;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

let myLibrary = [];

function addBookToLibrary(title, author, pages) {
  let book = new Book(title, author, pages, false);
  myLibrary.push(book);
  buildGrid();
}

function buildForm() {
  let form = document.createElement("form");
  let submit = document.createElement("button");
  let titleInput = document.createElement("input");
  let authorInput = document.createElement("input");
  let pagesInput = document.createElement("input");
  let titleLabel = document.createElement("label");
  let authorLabel = document.createElement("label");
  let pagesLabel = document.createElement("label");
  titleInput.setAttribute("type", "text");
  authorInput.setAttribute("type", "text");
  pagesInput.setAttribute("type", "tel");
  titleInput.setAttribute("id", "title-input");
  authorInput.setAttribute("id", "author-input");
  pagesInput.setAttribute("id", "pages-input");
  titleLabel.setAttribute("for", "title-input");
  authorLabel.setAttribute("for", "author-input");
  pagesLabel.setAttribute("for", "pages-input");
  submit.setAttribute("type", "submit");
  titleLabel.textContent = "Title";
  authorLabel.textContent = "Author";
  pagesLabel.textContent = "Pages";
  submit.setAttribute = "Add book";
  submit.textContent = "Add book";
  submit.addEventListener("click", submitForm);
  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(authorLabel);
  form.appendChild(authorInput);
  form.appendChild(pagesLabel);
  form.appendChild(pagesInput);
  form.appendChild(submit);
  form.classList.add("new-book-form");
  return form;
}

function submitForm() {
  let title = document.querySelector("#title-input").value;
  let author = document.querySelector("#author-input").value;
  let pages = document.querySelector("#pages-input").value;
  addBookToLibrary(title, author, pages);
  hideForm();
}

function hideForm() {
  let form = document.querySelector(".new-book-form");
  form = formDiv.removeChild(form);
  newBookButton.textContent = "New book";
  formShown = false;
}

function showNewBookForm() {
  if (formShown) {
    hideForm();
    return;
  }
  const form = buildForm();
  newBookButton.textContent = "Close";
  formDiv.appendChild(form);
  formShown = true;
}

newBookButton.addEventListener("click", showNewBookForm);

addBookToLibrary("Pride and Prejudice", "Jane Austen", 300);
addBookToLibrary("Lord of the Rings", "J.R.R Tolkien", 1000);

function buildCard(book) {
  let card = document.createElement("div");
  card.classList.add("card");
  let cardText = document.createElement("div");
  let cardButtons = document.createElement("div");
  let cardTitle = document.createElement("h2");
  let cardAuthor = document.createElement("p");
  let cardPages = document.createElement("p");
  let deleteButton = document.createElement("button");
  cardTitle.textContent = book.title;
  cardAuthor.textContent = book.author;
  cardPages.textContent = `${book.pages} pages`;
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("type", "submit");
  cardText.appendChild(cardTitle);
  cardText.appendChild(cardAuthor);
  cardText.appendChild(cardPages);
  cardButtons.appendChild(deleteButton);
  deleteButton.addEventListener("click", deleteCard);
  card.appendChild(cardText);
  card.appendChild(cardButtons);
  return card;
}

function deleteCard(event) {
  let cardNumber = event.target.parentNode.parentNode.getAttribute("data-number");
  myLibrary[cardNumber] = null;
  buildGrid();
}

function buildGrid() {
  while (cardGrid.firstChild) {
    cardGrid.removeChild(cardGrid.lastChild);
  }
  let arrayLength = myLibrary.length;
  for (let i = 0; i < arrayLength; ++i) {
    if (myLibrary[i] !== null) {
      let card = buildCard(myLibrary[i]);
      card.setAttribute("data-number", i);
      cardGrid.appendChild(card);
    }
  }
}


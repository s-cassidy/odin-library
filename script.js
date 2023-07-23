"use strict";

const cardGrid = document.querySelector(".cards-grid-container");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "unread"}`
  }
}

let myLibrary = [];

function addBookToLibrary(title, author, pages) {
  let book = new Book(title, author, pages, false);
  myLibrary.push(book);
}

addBookToLibrary("Pride and Prejudice", "Jane Austen", 300);
addBookToLibrary("Lord of the Rings", "J.R.R Tolkein", 1000);

function buildCard(book) {
  var card = document.createElement("div");
  card.classList.add("card");
  var cardTitle = document.createElement("h2");
  var cardAuthor = document.createElement("p");
  var cardPages = document.createElement("p");
  cardTitle.textContent = book.title;
  cardAuthor.textContent = book.author;
  cardPages.textContent = `${book.pages} pages`;
  card.appendChild(cardTitle);
  card.appendChild(cardAuthor);
  card.appendChild(cardPages);
  return card;
}

function buildGrid() {
  myLibrary.forEach((book) =>
    cardGrid.appendChild(buildCard(book))
  )
}

buildGrid();

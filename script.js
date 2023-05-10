/* eslint-disable require-jsdoc */
// Global variables
const libraryContainer = document.getElementById('library-container');
const addBookButton = document.getElementById('add-book');
const addBookForm = document.querySelector('form');
const cancelAddBookButton = document.getElementById('cancel-add');

const myLibrary = [
  { title: 'Hello', author: 'World', pages: 120, read: true },
  { title: 'World', author: 'Hello', pages: 200, read: false },
  { title: 'Dog Days', author: 'Hammond Karr', pages: 500, read: true },
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayLibrary(myLibrary);
}

function changeReadStatus(index) {
  const readStatusButton = document.getElementById(`read-button${index}`);
  if (myLibrary[index].read) {
    myLibrary[index].read = false;
    readStatusButton.classList.remove('read-status');
    readStatusButton.classList.add('not-read');
  } else {
    myLibrary[index].read = true;
    readStatusButton.classList.remove('not-read');
    readStatusButton.classList.add('read-status');
  }

  displayLibrary(myLibrary);
}

function displayLibrary(libraryArray) {
  let libraryHTML = '';
  for (let i = 0; i < libraryArray.length; i++) {
    libraryHTML += `
      <div class=book>
        <h3>${libraryArray[i].title}</h3>
        <h4>by ${libraryArray[i].author}</h4>
        <p>${libraryArray[i].pages} pages</p>
        <div>
          <button id=read-button${i} class=${
      libraryArray[i].read ? 'read-status' : 'not-read'
    } type=button onclick=changeReadStatus(${i})>${
      libraryArray[i].read ? 'Read' : 'Not Read'
    }</button>
          <button class=remove onclick=removeBook(${i})>Remove</button>
        </div>
      </div>
    `;
  }

  libraryContainer.innerHTML = libraryHTML;
}

window.addEventListener('load', () => displayLibrary(myLibrary));

addBookButton.addEventListener('click', () => {
  addBookForm.style.visibility = 'visible';
});

cancelAddBookButton.addEventListener('click', () => {
  addBookForm.style.visibility = 'hidden';
  addBookForm.reset();
});

addBookForm.addEventListener('submit', (event) => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value);
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  displayLibrary(myLibrary);

  addBookForm.style.visibility = 'hidden';
  addBookForm.reset();
  event.preventDefault();
});

// Global variables
const libraryContainer = document.getElementById('library-container');
const addBookButton = document.getElementById('add-book');
const addBookForm = document.querySelector('form');

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

function displayLibrary(libraryArray) {
  let libraryHTML = '';
  for (let i = 0; i < libraryArray.length; i++) {
    libraryHTML += `
      <div data-index=${i}>
        <h3>Title: ${libraryArray[i].title}</h3>
        <h4>Author: ${libraryArray[i].author}</h4>
        <p>Pages: ${libraryArray[i].pages}</p>
        <button type=button>${libraryArray[i].read ? 'Read' : 'Not Read'}</button>
        <button>Remove</button>
      </div>
    `;
  }

  libraryContainer.innerHTML = libraryHTML;
}

window.addEventListener('load', () => displayLibrary(myLibrary));

addBookButton.addEventListener('click', () => {
  addBookForm.style.visibility = 'visible';
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

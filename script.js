/* eslint-disable require-jsdoc */

class Book {
  title;
  author;
  pages;
  readStatus;

  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }

  changeReadStatus() {
    this.readStatus = this.readStatus ? false : true;
  }
}

class Library {
  books;

  constructor(books = []) {
    this.books = books;
  }

  addBook(title, author, pages, readStatus) {
    this.books.push(new Book(title, author, pages, readStatus));
  }

  removeBook(index) {
    this.books.splice(index, 1);
  }
}

function ScreenController() {
  const library = new Library([new Book('Test', 'Jane Doe', 250, false)]);

  const emptyLibrary = document.getElementById('empty');
  const libraryContainer = document.getElementById('library-container');

  const displayLibrary = () => {
    // clear the library
    libraryContainer.textContent = '';

    if (library.books.length == 0) {
      emptyLibrary.style.visibility = 'visible';
      libraryContainer.style.visibility = 'hidden';
    } else {
      for (let i = 0; i < library.books.length; i++) {
        const book = document.createElement('div');
        book.classList.add('book');

        const title = document.createElement('h3');
        title.textContent = library.books[i].title;
        book.appendChild(title);

        const author = document.createElement('h4');
        author.textContent = library.books[i].author;
        book.appendChild(author);

        const pages = document.createElement('p');
        pages.textContent = `${library.books[i].pages} pages`;
        book.appendChild(pages);

        const buttons = document.createElement('div');

        const readStatusButton = document.createElement('button');
        readStatusButton.classList.add(
          library.books[i].readStatus ? 'read' : 'not-read'
        );
        readStatusButton.textContent = library.books[i].readStatus
          ? 'Read'
          : 'Not Read';

        readStatusButton.addEventListener(
          'click',
          library.books[i].changeReadStatus
        );

        const removeBookButton = document.createElement('button');
        removeBookButton.classList.add('remove');
        removeBookButton.textContent = 'Remove';
        removeBookButton.addEventListener('click', library.removeBook(i));

        buttons.appendChild(readStatusButton);
        buttons.appendChild(removeBookButton);
        book.appendChild(buttons);

        libraryContainer.appendChild(book);
      }

      emptyLibrary.style.visibility = 'hidden';
      libraryContainer.style.visibility = 'visible';
    }
  };

  // initial library display
  displayLibrary();
}

ScreenController();

// Global variables
// const libraryContainer = document.getElementById('library-container');
// const addBookButton = document.getElementById('add-book');
// const addBookForm = document.querySelector('form');
// const cancelAddBookButton = document.getElementById('cancel-add');
// const emptyLibrary = document.getElementById('empty');

// const myLibrary = [];

// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

// function addBookToLibrary(title, author, pages, read) {
//   const newBook = new Book(title, author, pages, read);
//   myLibrary.push(newBook);
// }

// function removeBook(index) {
//   myLibrary.splice(index, 1);
//   displayLibrary(myLibrary);
// }

// function changeReadStatus(index) {
//   const readStatusButton = document.getElementById(`read-button${index}`);
//   if (myLibrary[index].read) {
//     myLibrary[index].read = false;
//     readStatusButton.classList.remove('read-status');
//     readStatusButton.classList.add('not-read');
//   } else {
//     myLibrary[index].read = true;
//     readStatusButton.classList.remove('not-read');
//     readStatusButton.classList.add('read-status');
//   }

//   displayLibrary(myLibrary);
// }

// window.addEventListener('load', () => displayLibrary(myLibrary));

// addBookButton.addEventListener('click', () => {
//   addBookForm.style.visibility = 'visible';
// });

// cancelAddBookButton.addEventListener('click', () => {
//   addBookForm.style.visibility = 'hidden';
//   addBookForm.reset();
// });

// addBookForm.addEventListener('submit', (event) => {
//   const title = document.getElementById('title').value;
//   const author = document.getElementById('author').value;
//   const pages = parseInt(document.getElementById('pages').value);
//   const read = document.getElementById('read').checked;

//   addBookToLibrary(title, author, pages, read);
//   displayLibrary(myLibrary);

//   addBookForm.style.visibility = 'hidden';
//   addBookForm.reset();
//   event.preventDefault();
// });

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
  const library = new Library();

  const emptyLibrary = document.getElementById('empty');
  const libraryContainer = document.getElementById('library-container');
  const addBookButton = document.getElementById('add-book');
  const addBookForm = document.querySelector('form');
  const cancelBookButton = document.getElementById('cancel-add');

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

        const author = document.createElement('h4');
        author.textContent = library.books[i].author;

        const pages = document.createElement('p');
        pages.textContent = `${library.books[i].pages} pages`;

        const buttons = document.createElement('div');

        const readStatusButton = document.createElement('button');
        readStatusButton.classList.add(
          library.books[i].readStatus ? 'read' : 'not-read'
        );
        readStatusButton.textContent = library.books[i].readStatus
          ? 'Read'
          : 'Not Read';

        readStatusButton.addEventListener('click', () => {
          library.books[i].changeReadStatus();
          displayLibrary();
        });

        const removeBookButton = document.createElement('button');
        removeBookButton.classList.add('remove');
        removeBookButton.textContent = 'Remove';
        removeBookButton.addEventListener('click', () => {
          library.removeBook(i);
          displayLibrary();
        });

        buttons.append(readStatusButton, removeBookButton);
        book.append(title, author, pages, buttons);
        libraryContainer.appendChild(book);
      }

      emptyLibrary.style.visibility = 'hidden';
      libraryContainer.style.visibility = 'visible';
    }
  };

  const showAddBookForm = () => {
    addBookForm.style.visibility = 'visible';
  };

  const cancelBook = () => {
    addBookForm.style.visibility = 'hidden';
    addBookForm.reset();
  };

  // event listeners
  addBookButton.addEventListener('click', showAddBookForm);
  cancelBookButton.addEventListener('click', cancelBook);

  addBookForm.addEventListener('submit', (event) => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;

    library.addBook(title, author, pages, read);

    addBookForm.style.visibility = 'hidden';
    addBookForm.reset();
    event.preventDefault();

    displayLibrary();
  });

  // initial library display
  displayLibrary();
}

// eslint-disable-next-line new-cap
ScreenController();

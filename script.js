
const bookshelf = document.querySelector("#bookshelf");
const addBook = document.querySelector("#addBook");

const myLibrary = [];

function addBookToLibrary(obj) {
  // take params, create a book then store it in the array
  const book = new Book(obj);

  myLibrary.push(book);
  console.table(book);
}

function removeBookFromLibrary(uuid) {
  const newLibrary = myLibrary.filter(book => book.uuid !== uuid);
  myLibrary.length = 0;
  myLibrary.push(...newLibrary);

  updateShelf();
}

function printBook(book) {
  const card = document.createElement("div");
  const title = document.createElement("h4");
  const author = document.createElement("p");
  const pages = document.createElement("span");

  card.classList.add('card');

  if(book.read){
    card.classList.add('read');
  }

  title.textContent = book.title;
  author.textContent = `${book.author}, `;
  pages.textContent = `${book.pages} pages` ;

  card.dataset.uuid = book.uuid;
  card.appendChild(title);
  author.appendChild(pages);
  card.appendChild(author);

  if(!book.read){
    const readButton = document.createElement('button');
    readButton.classList.add('read-toggle');
    readButton.textContent = 'Read';
    readButton.addEventListener("click", () => {
      book.toggleRead();
    });
    card.appendChild(readButton);
  }

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove');
  removeButton.textContent = 'Remove'
  removeButton.addEventListener('click', ()=>{
      removeBookFromLibrary(book.uuid);
  });
  card.appendChild(removeButton);

  return card;
}

// Book constructor
function Book({title, author, pages, read}) {
  this.uuid = self.crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read || false;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;

  updateShelf();
};

addBook.addEventListener('submit', (event) => {
  const formData = new FormData(event.target);
  const bookData = Object.fromEntries(formData);

  addBookToLibrary(bookData);
  updateShelf();
  event.preventDefault();
});

function updateShelf() {
  bookshelf.innerHTML = '';

  myLibrary.forEach(book => {
    const card = printBook(book);
    bookshelf.appendChild(card);
  });
}

// Adding some books
const tolkien = 'J.R.R. Tolkien';
addBookToLibrary({title: 'The Silmarillion', author: tolkien, pages: 625 });
addBookToLibrary({title: 'The Hobbit', author: tolkien, pages: 310, read: true });
addBookToLibrary({title: 'The Fellowship of the Ring', author: tolkien, pages: 423, read: true });
addBookToLibrary({title: 'The Two Towers', author: tolkien, pages: 352, read: true });
addBookToLibrary({title: 'The Return of the King', author: tolkien, pages: 416, read: true });
addBookToLibrary({title: 'Unfinished Tales', author: tolkien, pages: 486 });
addBookToLibrary({title: 'The History of Middle-earth', author: tolkien, pages: 503 });
addBookToLibrary({title: 'The Children of Húrin', author: tolkien, pages: 320 });
addBookToLibrary({title: 'Beren and Lúthien', author: tolkien, pages: 297 });

const lovecraft = 'H. P. Lovecraft'
addBookToLibrary({title: 'The Call of Cthulhu', author: lovecraft, pages: 666 });
addBookToLibrary({title: 'At the Mountains of Madness', author: lovecraft, pages: 667 });
addBookToLibrary({title: 'Dagon', author: lovecraft, pages: 668 });

const pratchett = 'Terry Pratchett';
addBookToLibrary({title: 'The Colour of Magic', author: pratchett, pages: 238, read: true });
addBookToLibrary({title: 'The Shepherd\'s Crown', author: pratchett, pages: 304 });
addBookToLibrary({title: 'Good Omens', author: pratchett, pages: 288 });

updateShelf();
window.addEventListener("load", () => {
  updateBookUI();
  miniBtnAddEventListener();
});

// storage ******************
let libraryStorage;

// if localStorage is empty or not
if (localStorage.getItem("libraryStorage") === null) {
  libraryStorage = [];

  // some default data, some recommendation :)
  addBookToLibrary(
    "Rich Dad Poor Dad",
    "Robert Kiyosaki",
    365,
    "https://images-na.ssl-images-amazon.com/images/I/51zcMqY7GQL._SX331_BO1,204,203,200_.jpg",
    "Learned about assets",
    4,
    false,
    true
  );
  addBookToLibrary(
    "Secrets of the Millionaire Mind",
    "T.Harve Eker",
    450,
    "https://images-na.ssl-images-amazon.com/images/I/41CnX3uTZFL.jpg",
    "Learned about understanding rich people",
    4,
    true,
    true
  );
  addBookToLibrary(
    "How to Win Friends and Influence People",
    "Dale Carnegie",
    500,
    "https://images-na.ssl-images-amazon.com/images/I/41AKuWAA8yL._SX319_BO1,204,203,200_.jpg",
    "Learned about dealing with people",
    3,
    false,
    false
  );
  addBookToLibrary(
    "4 Hour Work Week",
    "Tim Ferris",
    356,
    "https://images-na.ssl-images-amazon.com/images/I/81qW97ndkvL.jpg",
    "Learned how to work lesser",
    3,
    true,
    false
  );

  // profile picture to storage
  let profilePic =
    "https://pbs.twimg.com/profile_images/1203522697419837440/UNAgL8xO_400x400.jpg";
  document.querySelector(".profile-pic").src = profilePic;
  localStorage.setItem("libraryProfilePicture", profilePic);
} else {
  libraryStorage = JSON.parse(localStorage.getItem("libraryStorage"));

  // profile picture from storage
  let profilePic = localStorage.getItem("libraryProfilePicture") + "";
  document.querySelector(".profile-pic").src = profilePic;
}

function saveToStorage() {
  localStorage.setItem("libraryStorage", JSON.stringify(libraryStorage));
}

// // book object
// function Book(title, author, pages, cover, wyl, rating, liked, read) {
//   this.title = title; // string
//   this.author = author; // string
//   this.pages = pages; // number
//   this.cover = cover; // string
//   this.wyl = wyl; // string
//   this.rating = rating; // number
//   this.liked = liked; // bool
//   this.read = read; // bool
// }

// Book object refactored to class syntax
class Book {
  constructor(title, author, pages, cover, wyl, rating, liked, read) {
    this.title = title; // string
    this.author = author; // string
    this.pages = pages; // number
    this.cover = cover; // string
    this.wyl = wyl; // string
    this.rating = rating; // number
    this.liked = liked; // bool
    this.read = read; // bool
  }
}

// add book to storage
function addBookToLibrary(
  title,
  author,
  pages,
  cover,
  wyl,
  rating = 0,
  liked = false,
  read = false
) {
  const newBook = new Book(
    title,
    author,
    pages,
    cover,
    wyl,
    rating,
    liked,
    read
  );
  libraryStorage.push(newBook);
  saveToStorage();
}

// removing book from storage
function removeBookToLibrary(title) {
  let removedBook;

  for (key in libraryStorage) {
    if (libraryStorage[key].title === title) {
      removedBook = libraryStorage[key];
      libraryStorage.splice(key, 1);
      saveToStorage();
    }
  }

  return removedBook;
}

// editing book and send to storage
function editBookFromLibrary(title, newBook) {
  removeBookToLibrary(title);
  libraryStorage.push(newBook);
}

// UI & Core functions ******************

// global variable
let selectedRating = 0;
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookCover = document.querySelector("#book-cover");
const read = document.querySelector("#book-read");
const liked = document.querySelector("#book-liked");
const bookPages = document.querySelector("#book-pages");
const bookLearned = document.querySelector("#book-learned");

const totalBooks = document.querySelector("#total-books");
const totalRead = document.querySelector("#total-read");
const totalUnread = document.querySelector("#total-unread");

// the unread section in DOM
const unreadSection = document.querySelector(
  ".unread-books-section .item-container-above"
);
// the liked section in DOM
const likedSection = document.querySelector(
  ".liked-books-section .item-container-above"
);
// the read section in DOM
const readSection = document.querySelector(
  ".read-books-section .item-container-below"
);

// render books
function renderUnreadBooks() {
  let unreadBooksSum = 0;
  // load all unread books from library
  const unreads = libraryStorage.map(book => {
    if (!book.read) {
      unreadBooksSum++;
      return book;
    }
  });

  // set the value of the counter
  totalUnread.textContent = unreadBooksSum;

  // loop thru unread and create book html and push to DOM
  unreads.forEach(book => {
    if (book !== undefined) {
      unreadSection.innerHTML = unreadSection.innerHTML + bookToHtml(book);
    }
  });
  updateTotalBooksCounter();
}

function renderLikedBooks() {
  // load all liked books from library
  const liked = libraryStorage.map(book => {
    if (book.liked) {
      return book;
    }
  });

  // loop thru liked and create book html and push to DOM
  liked.forEach(book => {
    if (book !== undefined) {
      likedSection.innerHTML = likedSection.innerHTML + bookToHtml(book);
    }
  });
}

function renderReadBooks() {
  let readBooksSum = 0;
  // load all read books from library
  const read = libraryStorage.map(book => {
    if (book.read) {
      readBooksSum++;
      return book;
    }
  });

  totalRead.textContent = readBooksSum;

  // loop thru read and create book html and push to DOM
  read.forEach(book => {
    if (book !== undefined) {
      readSection.innerHTML = readSection.innerHTML + bookToHtml(book);
    }
  });
  updateTotalBooksCounter();
}

function updateTotalBooksCounter() {
  totalBooks.textContent = libraryStorage.length;
}

// converts book object to HTML markup for rendering
function bookToHtml(book) {
  return `<div class="book-item">

    <div class="book-image-container">

        <img class="book-image" src="${book.cover}" alt="">

        <div class="book-image-overlay">
            <button class="mini-btn fas fa-edit" data-title="${
              book.title
            }"></button>
            <button class="mini-btn fas fa-trash" data-title="${
              book.title
            }"></button>

        </div>

        <div class="bubble">
            <p class="bubble-title">${book.title}</p>
            <p class="bubble-pages">${book.pages} pages</p>
            <p class="bubble-author">${book.author}</p>
            <div class="rating">
                ${ratingToHtml(book.rating)}
            </div>
            <p class="bubble-title1">What I've Learned</p>
            <p class="bubble-learned">${book.wyl}</p>
        </div>

    </div>

    <p class="book-name">
        ${book.title}
    </p>
    <p class="book-author">
        ${book.author}
    </p>
    <div class="rating">
        ${ratingToHtml(book.rating)}
    </div>
</div>`;
}

// converts rating number into i-fa of colored stars or not
function ratingToHtml(rate) {
  let rateHtml = "";
  for (i = 0; i < rate; i++) {
    rateHtml = rateHtml + `<i class="fa fa-star yellow"></i>`;
  }
  if (5 - rate > 0) {
    for (i = 0; i < 5 - rate; i++) {
      rateHtml = rateHtml + `<i class="fa fa-star"></i>`;
    }
  }
  return rateHtml;
}

function toggleAddBookUI() {
  // toggle add-book view
  document.querySelector(".add-book").classList.toggle("show-add-book");
  // toggle overlay
  document
    .querySelector(".add-book-overlay")
    .classList.toggle("show-add-book-overlay");

  // clear fields on the form
  bookTitle.value = "";
  bookAuthor.value = "";
  bookCover.value = "";
  read.checked = false;
  liked.checked = false;
  bookPages.value = "";
  bookLearned.value = "";
  updateNewRatingStarsUI(0);
}

// add-book-toggle view/hide
document.querySelector("#add-book-toggle").addEventListener("click", e => {
  toggleAddBookUI();
});

// cancel-btn toggle add-book-toogle
document.querySelector(".cancel-btn").addEventListener("click", e => {
  e.preventDefault();
  toggleAddBookUI();
});

document.querySelector(".add-book-overlay").addEventListener("click", e => {
  toggleAddBookUI();
});

// add-book-toggle view/hide for mini-btn EDIT
function miniBtnAddEventListener() {
  document.querySelectorAll(".mini-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      if (e.target.classList.contains("fa-edit")) {
        // activate edit toggle
        toggleAddBookUI();
        addBookUIModeOn(false);
        updateBookUIForEdit(e.target.getAttribute("data-title"));
      }
      if (e.target.classList.contains("fa-trash")) {
        // delete current book selected
        removeBookToLibrary(e.target.getAttribute("data-title"));
        updateBookUI();
        miniBtnAddEventListener();
      }
    });
  });
}

document.querySelector("#add-book-toggle").addEventListener("click", () => {
  addBookUIModeOn(true);
});

function updateBookUIForEdit(title) {
  for (key in libraryStorage) {
    if (libraryStorage[key].title === title) {
      let book = libraryStorage[key];
      bookTitle.value = book.title;
      bookTitle.disabled = true;
      bookAuthor.value = book.author;
      bookCover.value = book.cover;
      read.checked = book.read;
      liked.checked = book.liked;
      bookPages.value = book.pages;
      bookLearned.value = book.wyl;
      updateNewRatingStarsUI(book.rating);
    }
  }
}

// changes that add-book UI header to Edit or Add
function addBookUIModeOn(state) {
  // true = add book mode, false edit book mode
  if (state) {
    bookTitle.disabled = false;
    document.querySelector(".add-book-head").textContent = "Add a book";
    document.querySelector("#add-book").textContent = "Add book";
  } else {
    document.querySelector(".add-book-head").textContent = "Edit book";
    document.querySelector("#add-book").textContent = "Edit book";
  }
}

// add new book to ui individually and with clearing books in UI first
function updateBookUI() {
  // if (book.read) {
  //   readSection.innerHTML = "";
  //   renderReadBooks();
  // } else {
  //   unreadSection.innerHTML = "";
  //   renderUnreadBooks();
  // }
  // if (book.liked) {
  //   likedSection.innerHTML = "";
  //   renderLikedBooks();
  // }

  readSection.innerHTML = "";
  renderReadBooks();
  unreadSection.innerHTML = "";
  renderUnreadBooks();
  likedSection.innerHTML = "";
  renderLikedBooks();
}

// adding new book button function
document
  .querySelector(".book-form-buttons #add-book")
  .addEventListener("click", e => {
    e.preventDefault();

    // get data from form to variables
    let newBookTitle = bookTitle.value;
    let newBookAuthor = bookAuthor.value;
    let newBookCover = bookCover.value;
    let newRead = read.checked;
    let newLiked = liked.checked;
    let newBookPages = bookPages.value;
    let newBookLearned = bookLearned.value;
    let newBookRate = selectedRating;

    if (e.target.textContent !== "Edit book") {
      // do not allow if newboottitle exist
      for (key in libraryStorage) {
        if (libraryStorage[key].title === newBookTitle) {
          alert("Book already exist");
          return;
        }
      }
    }

    // remove book from library. For edit mode.
    if (e.target.textContent === "Edit book") {
      removeBookToLibrary(newBookTitle);
    }

    addBookToLibrary(
      newBookTitle,
      newBookAuthor,
      newBookPages,
      newBookCover,
      newBookLearned,
      newBookRate,
      newLiked,
      newRead
    );

    const book = new Book(
      newBookTitle,
      newBookAuthor,
      newBookPages,
      newBookCover,
      newBookLearned,
      newBookRate,
      newLiked,
      newRead
    );

    updateBookUI();
    miniBtnAddEventListener();
    toggleAddBookUI();
  });

const newRatingStars = document.querySelectorAll(".new-book-rating .fa-star");

// gets data of the rating clicked set to a global variable
newRatingStars.forEach(star => {
  star.addEventListener("click", e => {
    selectedRating = e.target.getAttribute("data-value");
    updateNewRatingStarsUI(selectedRating, star);
  });
});

// update the UI of stars depending on selected rating
function updateNewRatingStarsUI(rating, star) {
  let i = 0;

  newRatingStars.forEach(star => {
    star.style.color = "#f7b500";
  });

  rating = 5 - rating;

  newRatingStars.forEach(star => {
    if (i < rating) {
      star.style.color = "#333333";
    }
    i++;
  });
}

// changin profile picture
function updateProfile() {
  let profilePic = prompt("Enter new profile image url");
  if (profilePic !== null && profilePic !== "") {
    document.querySelector(".profile-pic").src = profilePic;
    localStorage.setItem("libraryProfilePicture", profilePic);
  }
}

document.querySelector(".profile-pic").addEventListener("click", e => {
  updateProfile();
});

document.querySelector(".welcome-text").addEventListener("click", e => {
  updateProfile();
});

const { partitionBooksByBorrowedStatus } = require("./books");

function getTotalBooksCount(books) {
 return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((currentlyBorrowed, book) => {
    let borrowed = book.borrows[0].returned;
    if (borrowed === false) {
      currentlyBorrowed++;
    }
    return currentlyBorrowed;
  }, 0);
}

function getMostCommonGenres(books) {
  let countGenres = books.reduce((acc, {genre}) => {
    if (acc[genre]){
      acc[genre+1];
    } else {
      acc[genre] = 1;
    }
    return acc
  }, {});
  let sortedGenres = _sortObectByValues(countGenres);
  let sorted = sortedGenres.map((key) => ({name: key, count: countGenres[key]})).slice(0,5);
  return sorted;
}


function getMostPopularAuthors(books, authors) {
  const topAuthors = authors.map(authA => ({
      bookCount: books.filter(authB => authB.authorId === authA.id).length,
      borrowCount: books.filter(authB => authB.authorId === authA.id).reduce((acc, cur) => 
      acc + cur.borrows.length, 0)
  })).sort((authB, authA) => authA.borrowCount - authB.borrowCount);
  topAuthors.length = 5;
  return topAuthors.map(popAuth => {
      return {
          count: popAuth.borrowCount,
          name: popAuth.name.first + " " + popAuth.name.last
      };
  })
}


function getBooksBorrowedCount(books) {
  return books.reduce((currentlyBorrowed, book) => {
    let borrowed = book.borrows[0].returned;
    if (borrowed === false) {
      currentlyBorrowed++;
    }
    return currentlyBorrowed;
  }, 0);
}

function getMostCommonGenres(books) {
  let countGenres = books.reduce((acc, {genre}) =>{
    if(acc[genre]){
      acc[genre]+=1;
    }else{
      acc[genre] = 1;
    }
    return acc
  }, {}
  );
  let sortedGenres = _sortObjectByValues(countGenres);
  let sorted = sortedGenres.map((key) => ({name: key, count: countGenres[key]})).slice(0,5);
  return sorted;
}



function getMostPopularBooks(books) {
  const popularBooks = books.map((book) => {
    return {name: book.title, count:book.borrows.length};
  }).sort(function (bookA, bookB){
    return bookB.count - bookA.count
  });
 return popularBooks.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  let countAuthors = books.reduce((acc, books) => {
    let {authorId, borrows} = books;
    let authorObject = authors.find((author) => author.id === authorId);
    let name = `${authorObject.name.first} ${authorObject.name.last}`;
    if(acc[name]) {
      acc[name] += borrows.length;
    } else {
      acc[name] = borrows.length;
    }
    return acc;
  }, {});
  let sortedAuthors = _sortObjectByValues(countAuthors);
  let sorted = sortedAuthors.map((key) => ({name: key, count: countAuthors[key]})).slice(0,5);
  return sorted;
}


//helper function for sorting objects
function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if(obj[keyA] > obj[keyB]) {
      return -1;
    } else if(obj[keyB] > obj[keyA]) {
      return 1;
    }
    return 0;
  });
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

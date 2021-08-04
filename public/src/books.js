function findAuthorById(authors, id) { 
 let authorsObj = authors.find((authors) => authors.id === id
 )
 return authorsObj;
}

function findBookById(books, id){
  let booksObj = books.find((books) => books.id === id
  )
  return booksObj;
}


function partitionBooksByBorrowedStatus(books) {
  return books.reduce( (bookA, bookB) => { bookA[+(bookB.borrows[0] && bookB.borrows[0].returned)]
    .push(bookB); return bookA }, [[],[]] )
console.log(partitionBooksByBorrowedStatus(books))
}



function getBorrowersForBook(book, accounts) {
  let borrowers = [];
  let {borrows} = book;
  borrows.forEach(borrow => {
    let account = accounts.find(acc => acc.id === borrow.id);
    account['returned'] = borrow.returned;
    borrowers.push(account);
  })
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};


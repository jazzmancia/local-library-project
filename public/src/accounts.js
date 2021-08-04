// const accounts = [
//   {
//     id: "5f446f2ecfaf0310387c9603",
//     picture: "https://api.adorable.io/avatars/75/esther.tucker@zillacon.me",
//     age: 25,
//     name: {
//       first: "Esther",
//       last: "Tucker",
//     },
//     company: "ZILLACON",
//     email: "esther.tucker@zillacon.me",
//     registered: "Thursday, May 28, 2015 2:51 PM",
//   }, ...

function findAccountById(accounts, id)
{
  for (let i = 0; i < accounts.length; ++i)
  {
    if (id === accounts[i].id)
    {
      return accounts[i];
    }
  }
}


function sortAccountsByLastName(accounts)
{
  accounts.sort((one, two) => 
    {
      let lnamea = one.name.last.toLowerCase();
      let lnameb = two.name.last.toLowerCase();
      if (lnamea > lnameb) return 1;
      if (lnamea < lnameb) return -1;
      return 0;
    });
    return accounts;
}


function getTotalNumberOfBorrows(account, books)
{
  let borrows = 0;
  for (let i = 0; i < books.length; ++i)
  { let book = books[i];
    for (let j = 0; j < book.borrows.length; ++j)
    {
      if (book.borrows[j].id === account.id)
      {
        ++borrows;
      }
    }
  }
  return borrows;
}


function getBooksPossessedByAccount(account, books, authors) {
  let booksTakenOut = [];
    books.forEach(book => {
      if (book.borrows.find(item=>item.id === account.id && !item.returned)) {
        booksTakenOut.push(book);
      }
    });
    booksTakenOut.forEach(book => {
      let authorName = authors.find(person => person.id === book.authorId);
      book['author'] = authorName;
    });
  return booksTakenOut;
}



module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

import React from "react";
import "./App.css";

import * as BooksAPI from "./BooksAPI";
import BookList from "./BookList";
import SearchPage from "./SearchPage";

class BooksApp extends React.Component {
  state = {
    currentlyReading: {},
    wantToRead: {},
    read: {}
  };

  componentDidMount() {
    this.filterBooks();
  }

  render() {
    return (
      <div className="app">
        <SearchPage />
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookList
                title="Currently Reading"
                books={this.state.currentlyReading}
                updateBookShelf={this.updateBookShelf}
              />
              <BookList
                title="Want To Read"
                books={this.state.wantToRead}
                updateBookShelf={this.updateBookShelf}
              />
              <BookList
                title="Read"
                books={this.state.read}
                updateBookShelf={this.updateBookShelf}
              />
            </div>
          </div>
          <div className="open-search">
            <button onClick={() => window.console.log("Searching!")}>
              Add a book
            </button>
          </div>
        </div>
        )}
      </div>
    );
  }

  filterBooks = () => {
    let currentlyReading = {};
    let wantToRead = {};
    let read = {};

    BooksAPI.getAll().then(books => {
      books.forEach(book => {
        switch (book.shelf) {
          case "currentlyReading":
            currentlyReading[book.id] = book;
            break;
          case "wantToRead":
            wantToRead[book.id] = book;
            break;
          case "read":
            read[book.id] = book;
            break;
          default:
            break;
        }
      });

      this.setState({
        currentlyReading: currentlyReading,
        wantToRead: wantToRead,
        read: read
      });
    });
  };

  updateBookShelf = (book, newShelf) => {
    this.removeBookFromShelf(book, book.shelf);
    this.addBookToShelf(book, newShelf);
  };

  removeBookFromShelf = (book, oldShelf) => {
    if (oldShelf !== "none" && oldShelf !== undefined) {
      let modifiedShelfState = this.state[oldShelf];
      delete modifiedShelfState[book.id];
      this.setState({
        [oldShelf]: modifiedShelfState
      });
    }
  };

  addBookToShelf = (book, newShelf) => {
    if (newShelf !== "none" && newShelf !== undefined) {
      // Update the shelf on the book object
      book.shelf = newShelf;

      let modifiedShelfState = this.state[newShelf];
      modifiedShelfState[book.id] = book;
      this.setState({ [newShelf]: modifiedShelfState });
    }

    BooksAPI.update(book, newShelf);
  };
}

export default BooksApp;

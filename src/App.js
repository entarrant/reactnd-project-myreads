import "./App.css";
import React from "react";
import { Link, Route } from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import BookList from "./BookList";
import SearchPage from "./SearchPage";

class BooksApp extends React.Component {
  state = {
    shelvedBooks: [],
    shelves: {
      currentlyReading: {},
      wantToRead: {},
      read: {}
    }
  };

  componentDidMount() {
    this.filterBooks();
  }

  render() {
    const { shelves } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => (
            <SearchPage
              updateBookShelf={this.updateBookShelf}
              shelvedBooks={this.state.shelvedBooks}
            />
          )}
        />

        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookList
                    title="Currently Reading"
                    books={shelves.currentlyReading}
                    updateBookShelf={this.updateBookShelf}
                    shelvedBooks={this.state.shelvedBooks}
                  />
                  <BookList
                    title="Want To Read"
                    books={shelves.wantToRead}
                    updateBookShelf={this.updateBookShelf}
                    shelvedBooks={this.state.shelvedBooks}
                  />
                  <BookList
                    title="Read"
                    books={shelves.read}
                    updateBookShelf={this.updateBookShelf}
                    shelvedBooks={this.state.shelvedBooks}
                  />
                </div>
              </div>

              <Link to="/search" className="open-search">
                <button>Search</button>
              </Link>
            </div>
          )}
        />
      </div>
    );
  }

  filterBooks = () => {
    let currentlyReading = {};
    let wantToRead = {};
    let read = {};

    BooksAPI.getAll().then(books => {
      this.setState({ shelvedBooks: books });

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
        shelves: {
          currentlyReading: currentlyReading,
          wantToRead: wantToRead,
          read: read
        }
      });
    });
  };

  updateBookShelf = (book, oldShelf, newShelf) => {
    this.removeBookFromShelf(book, oldShelf);
    this.addBookToShelf(book, newShelf);
  };

  removeBookFromShelf = (book, oldShelf) => {
    if (oldShelf !== "none" && oldShelf !== undefined) {
      let modifiedShelfState = this.state.shelves[oldShelf];
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

      let modifiedShelfState = this.state.shelves[newShelf];
      modifiedShelfState[book.id] = book;
      this.setState({ [newShelf]: modifiedShelfState });
    }

    BooksAPI.update(book, newShelf);
  };
}

export default BooksApp;

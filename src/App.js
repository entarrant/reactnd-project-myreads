import React from "react";
import "./App.css";

import * as BooksAPI from "./BooksAPI";
import BookList from "./BookList";

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  componentDidMount() {
    this.filterBooks();
  }

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookList
                title="Currently Reading"
                books={this.state.currentlyReading}
              />
              <BookList title="Want To Read" books={this.state.wantToRead} />
              <BookList title="Read" books={this.state.read} />
            </div>
          </div>
          <div className="open-search">
            <button onClick={() => this.setState({ showSearchPage: true })}>
              Add a book
            </button>
          </div>
        </div>
        )}
      </div>
    );
  }

  filterBooks = () => {
    let currentlyReading = [];
    let wantToRead = [];
    let read = [];

    BooksAPI.getAll().then(books => {
      books.forEach(book => {
        switch (book.shelf) {
          case "currentlyReading":
            currentlyReading.push(book);
            break;
          case "wantToRead":
            wantToRead.push(book);
            break;
          case "read":
            read.push(book);
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
}

export default BooksApp;

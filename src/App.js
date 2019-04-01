import React from "react";
import "./App.css";

import * as BooksAPI from "./BooksAPI";
import BookList from "./BookList";

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }

  render() {
    window.console.log(this.state.books);

    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookList title="Currently Reading" books={this.state.books} />
              <BookList title="Want To Read" books={this.state.books} />
              <BookList title="Read" books={this.state.books} />
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
}

export default BooksApp;

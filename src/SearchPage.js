import React from "react";

import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class SearchPage extends React.Component {
  state = {
    searchValue: "",
    books: []
  };

  render() {
    const { books } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => window.console.log("Go back!")}
          >
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.handleSearchChange(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {Object.keys(books).map(bookId => (
              <Book
                key={bookId}
                book={books[bookId]}
                updateBookShelf={this.props.updateBookShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }

  handleSearchChange = value => {
    BooksAPI.search(value).then(books => {
      let newBooks;
      if (books === undefined || books.error) {
        newBooks = [];
      } else {
        newBooks = books;
      }

      this.setState({ searchValue: value, books: newBooks });
    });
  };
}

export default SearchPage;

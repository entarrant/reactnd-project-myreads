import React from "react";
import Book from "./Book";

class BookList extends React.Component {
  render() {
    const { books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {Object.keys(books).map(bookId => (
              <Book key={bookId} book={books[bookId]} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookList;

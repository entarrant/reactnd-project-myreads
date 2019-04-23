import React from "react";

class ShelfChanger extends React.Component {
  getShelf = () => {
    const { book, shelvedBooks } = this.props;
    const shelvedBook = shelvedBooks.filter(
      currBook => book.id === currBook.id
    )[0];

    return shelvedBook ? shelvedBook.shelf : "none";
  };

  state = {
    shelfValue: this.getShelf()
  };

  render() {
    const { shelfValue } = this.state;

    return (
      <div className="book-shelf-changer">
        <select
          value={shelfValue}
          onChange={event =>
            this.handleShelfChange(shelfValue, event.target.value)
          }
        >
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }

  handleShelfChange = (oldShelf, newShelf) => {
    this.setState({ shelfValue: newShelf });
    this.props.updateBookShelf(this.props.book, oldShelf, newShelf);
  };
}

export default ShelfChanger;

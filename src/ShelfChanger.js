import React from "react";

class ShelfChanger extends React.Component {
  state = {
    shelfValue: this.props.shelfForBook(this.props.book)
  };

  render() {
    const { shelfValue } = this.state;

    return (
      <div className="book-shelf-changer">
        <select
          value={shelfValue}
          onChange={event => this.handleShelfChange(event.target.value)}
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

  handleShelfChange = newShelf => {
    this.props.updateBookShelf(this.props.book, newShelf);
  };
}

export default ShelfChanger;

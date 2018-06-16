// core
import React from 'react'
import PropTypes from 'prop-types'

// libs
import { update } from '../api/BooksAPI'

export default class Book extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bookStatus: 'none'
    };

  }

  /**
  * @description Sents to the grand-parent 
  *              component the selected book.
  *              We save its state obj.
  * */
  selectStatus(e) {

    const book = {
      status: e.target.value,
      book: this.props.data
    }

    this.state.bookStatus = e.target.value;
    book.book.shelf= this.state.bookStatus;
    
    update(book.book, book.status);
    this.props.update(book);
    

  }
  
  render() {
    //console.log('Props', this.props)
    const _defaultImage = 'http://via.placeholder.com/128x200';
    return(
      <div className="book">
        <div className="book-top">
          { this.props.data.imageLinks ?
            ( <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.data.imageLinks.thumbnail})` }}></div> ) 
            :
            ( <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${_defaultImage})` }}></div> )
          }
          <div className="book-shelf-changer">
            <select onChange={this.selectStatus.bind(this)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading" selected={this.state.bookStatus === 'currentlyReading'}>Currently Reading</option>
              <option value="wantToRead" selected={this.state.bookStatus === 'wantToRead'}>Want to Read</option>
              <option value="read" selected={this.state.bookStatus === 'read'}>Read</option>
              <option value="none" selected={this.state.bookStatus === 'none'}>None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.data.title}</div>
        { this.props.data.authors ?
          ( <div className="book-authors">{ this.props.data.authors.join(', ') }</div> ) 
          :
          ( <div className="book-authors">No author</div> )
        }
      </div>
    )
  }

}

// using proTypes
Book.propTypes = {
  data: PropTypes.object
};

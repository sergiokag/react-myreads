// core
import React from 'react'
import PropTypes from 'prop-types'

// libs
import { get } from './BooksAPI'

export default class Book extends React.Component {

  selectStatus(e) {

    const book = {
      status: e.target.value,
      book: this.props.data
    }

    this.props.update(book)

  }
  
  render() {
    //console.log('Props', this.props)
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.data.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select onChange={this.selectStatus.bind(this)}>
              <option value="move" selected disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
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

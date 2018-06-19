// core
import React from 'react'
import { Link } from 'react-router-dom'

// components
import Book from './Book'

// libs
import _ from 'lodash'
import { search } from '../api/BooksAPI'

export default class SearchBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  //data

  //methods

  updateCachedBookStatus(books) {
    const arr1 = this.props.cachedBooks;
    const arr2 = books;

    console.log(arr1, arr2)

    if( !arr1.length || !arr2.length ) {
      return;
    }

    arr1.forEach((e1)=>arr2.forEach((e2) =>
      {   

        if ( e1.id === e2.id && e1.shelf !== e2.shelf ) {

          e2.shelf = e1.shelf;

        }

      }
    ));

    this.updateBooks(books);
    
    this.setState({ books });

  }

  updateBooks(books) {
    const arr1 = this.props.allBooks;
    const arr2 = books;
    console.log('arr1: ', arr1)

    if( !arr1.length || !arr2.length ) {
      return;
    }

    arr1.forEach((e1)=>arr2.forEach((e2) =>
      {   

        if ( e1.id === e2.id && e1.shelf !== e2.shelf ) {
          e2.shelf = e1.shelf;
        }
        
      }
    ));
    
  }

  searchBook(e) {
    e.preventDefault();
    let _value = this.textVal.value;

    if (_value === '') {
      return this.setState({
        books: []
      })
    }

    search(_value)
      .then(books => {
        
        this.updateCachedBookStatus(books);

      })
      .catch(err => console.error(err));

  }

  render() {
    const _books = this.state.books;

    return (
      <div className="search-wrapper">

        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              
              <input
                onChange={ _.debounce(this.searchBook.bind(this), 500)}
                type="text"
                placeholder="Search by title or author"
                ref={(input) => { this.textVal = input }} />

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>

        {_books.length ? (
          <ol className="books-grid">
            {_books.map((b, i, _books) => {

              return <li key={i}>
                <Book
                  update={this.props.update}
                  data={_books[i]} 
                  shelf={ _books[i].shelf || 'none'}/>
              </li>

            })}
          </ol>
        ) : (
            <p
              className="bookshelf-books"
            >No Books found</p>
          )
        }

      </div>
    )
  }

}

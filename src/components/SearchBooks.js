// core
import React from 'react'
import { Link } from 'react-router-dom'

// components
import Book from './Book'

// libs
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
  searchBook(e) {
    e.preventDefault();
    let _value = this.textVal.value;

    if (_value === '' ) {
      return this.setState({
        books: []
      })
    } 

    search(_value)
          .then( books => { 
              //console.log(books)
              return this.setState({books});
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
          <form 
              className="search-books-input-wrapper"
              onSubmit={this.searchBook.bind(this)}>

            <input 
                type="text" 
                placeholder="Search by title or author"
                ref={(input)=>{this.textVal = input}}
            />

          </form>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>

      { _books.length? (
          <ol className="books-grid">
            { _books.map( (b,i) => { 

              return <li key={i}>
                <Book
                    update={this.props.update}
                    data={_books[i]}/>
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

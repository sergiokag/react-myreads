// core
import React from 'react'

// components
import OpenSearch from './OpenSearch'
import Book from './Book'

export default class ListBooks extends React.Component {

  constructor(props) {
    super(props);
  }

  // data

  // methods
  render() {
    const _crArr = this.props.currentlyReading;
    const _wrArr = this.props.wantToRead;
    const _readArr = this.props.read;
    const _cached = this.props.cachedBooks;

    _cached.map( book => {
      
      if( 
        book.shelf === 'currentlyReading'
        && 
        _crArr.indexOf(book) === -1
       ) {
        _crArr.push(book);
      }

      if( 
        book.shelf === 'wantToRead'
        && 
        _wrArr.indexOf(book) === -1
      ) {
        _wrArr.push(book);
      }   
      
      if( 
        book.shelf === 'read' 
        &&
        _readArr.indexOf(book) === -1
      ) {
        _readArr.push(book)
      }

    })

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <div className="border-line-bottom">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <span>( {_crArr.length} )</span>
              </div>
              <div className="bookshelf-books">
                {_crArr.length ? (
                  <ol className="books-grid">
                    {_crArr.map((b, i) => {

                      return <li key={i}>
                        <Book
                          update={this.props.update}
                          data={_crArr[i]}
                          shelf={_crArr[i].shelf} />
                      </li>

                    })}
                  </ol>
                ) : (
                    <p>No Book Selected</p>
                  )
                }
              </div>
            </div>
            <div className="bookshelf">
              <div className="border-line-bottom">
                <h2 className="bookshelf-title">Want to Read</h2>
                <span>( {_wrArr.length} )</span>
              </div>
              <div className="bookshelf-books">
                {_wrArr.length ? (
                  <ol className="books-grid">
                    {_wrArr.map((b, i) => {

                      return <li key={i}>
                        <Book
                          update={this.props.update}
                          data={_wrArr[i]} 
                          shelf={_wrArr[i].shelf} />
                      </li>

                    })}
                  </ol>
                ) : (
                    <p>No Book Selected</p>
                  )
                }
              </div>
            </div>
            <div className="bookshelf">
              <div className="border-line-bottom">
                <h2 className="bookshelf-title">Read</h2>
                <span>( {_readArr.length} )</span>
              </div>
              <div className="bookshelf-books">
                {_readArr.length ? (
                  <ol className="books-grid">
                    {_readArr.map((b, i) => {

                      return <li key={i}>
                        <Book
                          update={this.props.update}
                          data={_readArr[i]}
                          shelf={_readArr[i].shelf} />
                      </li>

                    })}
                  </ol>
                ) : (
                    <p>No Book Selected</p>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        <OpenSearch />
      </div>
    )
  }

}

// core
import React from 'react'

// components
import OpenSearch from './OpenSearch'
import Book from './Book'

export default class ListBooks extends React.Component {

  constructor(props) {
    super(props)
    console.log(this.props)
  }

  // data

  // methods
  render() {
    const _crArr = this.props.currentlyReading;
    const _wrArr = this.props.wantToRead;
    const _readArr = this.props.read;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                    { _crArr.length? (
                      <ol className="books-grid">
                        { _crArr.map( (b,i) => { 

                          return <li key={i}>
                            <Book
                                update={this.props.update}
                                data={_crArr[i]}/>
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
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                  { _wrArr.length? (
                          <ol className="books-grid">
                            { _wrArr.map( (b,i) => { 

                              return <li key={i}>
                                <Book
                                    update={this.props.update}
                                    data={_wrArr[i]}/>
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
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                  { _readArr.length? (
                          <ol className="books-grid">
                            { _readArr.map( (b,i) => { 

                              return <li key={i}>
                                <Book
                                    update={this.props.update}
                                    data={_readArr[i]}/>
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
        <OpenSearch/>
      </div>
    )
  }


}
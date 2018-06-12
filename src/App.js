// core
import React from 'react'
import { Route } from 'react-router-dom'

// components
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    cR: [],
    wR: [],
    readArr: [], 
    noneArr: [],
  }


  // methods
  checkIfInArrayAndRemoveIt(a, arr) {
    const _el = arr.find( e => e.id === a );
  
    if(!_el) {
      return;
    }
  
    const _index = arr.indexOf(_el);
    arr.splice(_index, 1)    
  }

  updateParent(obj) {
    
    const _id = obj.book.id;
    const _book = obj.book;

    switch(obj.status) {
      
      case 'currentlyReading': 
      
        // 1 check if this book exists in that array
        this.checkIfInArrayAndRemoveIt( 
          _id,
          this.state.wR
        );

        this.checkIfInArrayAndRemoveIt( 
          _id,
          this.state.readArr
        );

        const _index = this.state.cR.find( el => el.id === _id );

        if( _index ) {
          console.log(this.state);
          return;
        }

        const _newBook = this.state.cR.concat(_book)
        // 2 add this book to the currently ready (cR) array
        this.setState({
          cR: _newBook
        });

        break;

      case 'wantToRead':
        
        // 1 remove from other arrays this book
        
        this.checkIfInArrayAndRemoveIt( 
          _id,
          this.state.cR
        );

        this.checkIfInArrayAndRemoveIt( 
          _id,
          this.state.readArr
        );
        
        // 2 add to the wR (wantToRead array)
        const _index2 = this.state.wR.find( el => el.id === _id );

        if( _index2 ) {
          console.log(this.state);
          return;
        }
        const _newBook2 = this.state.wR.concat(_book)
        this.setState({
          wR: _newBook2
        });
        break;
                              
      case 'read':
        // 1 check if this book exists in that array
        this.checkIfInArrayAndRemoveIt( 
          _id,
          this.state.wR
        );

        this.checkIfInArrayAndRemoveIt( 
          _id,
          this.state.cR
        );

        const _index3 = this.state.readArr.find( el => el.id === _id );

        if( _index3 ) {
          console.log(this.state);
          return;
        }

        const _newBook3 = this.state.readArr.concat(_book)
        // 2 add this book to the currently ready (cR) array
        this.setState({
          readArr: _newBook3
        });      
        break;
      
      default: 
      
        this.checkIfInArrayAndRemoveIt( 
          _id,
          this.state.wR
        );

        this.checkIfInArrayAndRemoveIt( 
          _id,
          this.state.cR
        );

        this.checkIfInArrayAndRemoveIt( 
          _id,
          this.state.readArr
        ); 
        
        this.setState({
          noneArr: this.state.noneArr.concat(_book).splice(0,0)
        })
        console.log('remove: ', this.state)
      
    }

  }

  render() {

    console.log(this.state)

    return (
      <div className="app">

          <Route 
              path="/"
              exact
              render={() =>(
                <ListBooks
                  update={this.updateParent.bind(this)}
                  currentlyReading={this.state.cR}
                  wantToRead={this.state.wR}
                  read={this.state.readArr}
                />
            )}/>

          <Route 
            path="/search"
            exact
            render={() =>(
              <SearchBooks
                update={this.updateParent.bind(this)}
              />            
          )}/>    

      </div>
    )
  }
}

export default BooksApp

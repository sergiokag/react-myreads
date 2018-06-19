// core
import React from 'react'
import { Route } from 'react-router-dom'

// components
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'

// libs
import { getAll } from './api/BooksAPI'

// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
        cR: [],
        wR: [],
        readArr: [],
        noneArr: [],
        cachedBooks: []
    };
    this.updateParent = this.updateParent.bind(this);
  }

  // methods
  componentDidMount() {

    getAll()
      .then( r => {
        this.setState({
          cachedBooks: r 
        }, () => {
  
        })
      })
      .catch( e => console.error(e) );
    
  }

  /**
  * @description Check if the book exist in other state arrays
  */
  checkIfInArrayAndRemoveIt(a, arr) {
    const _el = arr.find(e => e.id === a);

    if (!_el) {
      return;
    }

    const _index = arr.indexOf(_el);
    arr.splice(_index, 1);

  }

  /**
  * @description According to the status that we took
  *              from the book component
  *              we add to the book the corresponding shelf
  */
  updateParent(obj, newShelf) {

    const _id = obj.book.id;
    const _book = obj.book;

    switch (obj.status) {

      case 'currentlyReading':

        const _index = this.state.cR.find(el => el.id === _id);

        if (_index) {
          return;
        }

        // 1 check if this book exists in that array
        this.checkIfInArrayAndRemoveIt(
          _id,
          this.state.wR
        );

        this.checkIfInArrayAndRemoveIt(
          _id,
          this.state.readArr
        );

        this.checkIfInArrayAndRemoveIt(
          _id,
          this.state.cachedBooks
        );           

        _book.shelf = newShelf;
        
        const _newBook = this.state.cR.concat(_book)
        // 2 add this book to the currently ready (cR) array

        this.setState({
          cR: _newBook,
          wR: this.state.wR,
          readArr: this.state.readArr
        }, () => {       

        });

        alert(`The Book has been added to Currently Reading`);

        break;

      case 'wantToRead':

        // 2 add to the wR (wantToRead array)
        const _index2 = this.state.wR.find(el => el.id === _id);

        if (_index2) {
          return;
        }      

        // 1 remove from other arrays this book

        this.checkIfInArrayAndRemoveIt(
          _id,
          this.state.cR
        );

        this.checkIfInArrayAndRemoveIt(
          _id,
          this.state.readArr
        );

        this.checkIfInArrayAndRemoveIt(
          _id,
          this.state.cachedBooks
        );           

        _book.shelf = newShelf;

        const _newBook2 = this.state.wR.concat(_book)
        this.setState({
          wR: _newBook2,
          cR: this.state.cR,
          readArr: this.state.readArr          
        }, () => {    

        });

        alert(`The Book has been added to Want to Read`);
        break;

      case 'read':
        const _index3 = this.state.readArr.find(el => el.id === _id);


        if (_index3) {
          return;
        }

        // 1 check if this book exists in that array
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
          this.state.cachedBooks
        );        

        _book.shelf = newShelf;

        const _newBook3 = this.state.readArr.concat(_book)
        // 2 add this book to the currently ready (cR) array
        alert(`The Book has been added to Reading`);
        this.setState({
          wR: this.state.wR,
          cR: this.state.cR,          
          readArr: _newBook3
        }, () => {

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
        
        this.checkIfInArrayAndRemoveIt(
          _id,
          this.state.cachedBooks
        );   

        _book.shelf = newShelf;

        this.setState({
          noneArr: this.state.noneArr.concat(_book).splice(0, 0)
        });

    }

  }

  render() {

    return (
      <div className="app">

        <Route
          path="/"
          exact
          render={() => (
            <ListBooks
              cachedBooks={this.state.cachedBooks}
              update={this.updateParent.bind(this)}
              currentlyReading={this.state.cR}
              wantToRead={this.state.wR}
              read={this.state.readArr}
            />
          )} />

        <Route
          path="/search"
          exact
          render={() => (
            <SearchBooks
              cachedBooks={this.state.cachedBooks}
              allBooks={[
                ...this.state.wR,
                ...this.state.cR,
                ...this.state.readArr
              ]}
              update={this.updateParent.bind(this)}
            />
          )} />

      </div>
    )
  }
}

export default BooksApp

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
    }
  }

  // methods
  componentDidMount() {
    //TODO
    getAll()
      .then( r => {
        this.setState({
          cachedBooks: r 
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
    arr.splice(_index, 1)
  }

  /**
  * @description According to the status that we took
  *              from the book component
  *              we add to the book the corresponding shelf
  */
  updateParent(obj) {

    const _id = obj.book.id;
    const _book = obj.book;

    switch (obj.status) {

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

        const _index = this.state.cR.find(el => el.id === _id);

        if (_index) {
          console.log(this.state);
          return;
        }

        const _newBook = this.state.cR.concat(_book)
        // 2 add this book to the currently ready (cR) array
        this.setState({
          cR: _newBook
        });

        alert(`The Book has been added to Currently Reading`);

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
        const _index2 = this.state.wR.find(el => el.id === _id);

        if (_index2) {
          console.log(this.state);
          return;
        }
        const _newBook2 = this.state.wR.concat(_book)
        this.setState({
          wR: _newBook2
        });

        alert(`The Book has been added to Want to Read`);
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

        const _index3 = this.state.readArr.find(el => el.id === _id);

        if (_index3) {
          console.log(this.state);
          return;
        }

        const _newBook3 = this.state.readArr.concat(_book)
        // 2 add this book to the currently ready (cR) array
        alert(`The Book has been added to Reading`);

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
          noneArr: this.state.noneArr.concat(_book).splice(0, 0)
        })
        console.log('remove: ', this.state)

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
              update={this.updateParent.bind(this)}
            />
          )} />

      </div>
    )
  }
}

export default BooksApp

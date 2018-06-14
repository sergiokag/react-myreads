import React from 'react'
import { Link } from 'react-router-dom'

export default class OpenSearch extends React.Component {


  render() {
    return (
      <div className="open-search">
        <Link
          to="/search"
          onClick={() => console.log('search page :)')}
        >Add a book</Link>
      </div>
    )
  }
}

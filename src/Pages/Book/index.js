import React, { Component } from 'react';
class Book extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}

module.exports = Book;
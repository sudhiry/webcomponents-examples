import React, { Component } from 'react';

export default class SampleComponent extends Component {
    render() {
        return React.createElement(
            'div',
            null,
            'This is test sample Component'
        );
    }
}
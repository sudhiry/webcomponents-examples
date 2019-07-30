import React from 'react';

export default class SampleComponent extends React.Component {
    render() {
        const styles = {
            border: '1px solid'
        }
        return (<div style={styles} >This is react sample Component! I can do anything in it</div>);
    }
}
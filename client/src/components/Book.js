import React from 'react';
import SearchBar from './SearchBar'

export default class Recommendations extends React.Component {
    constructor(props) {
    super(props);

    }
    
    render() {
        return (
            <div>
                <SearchBar/>
            </div>
        )
    }
}
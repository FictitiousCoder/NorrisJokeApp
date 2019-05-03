import React from 'react';
import ReactDOM from 'react-dom';

import NorrisContainer from "./js/components/containers/NorrisContainer.jsx";

export default class App extends React.Component {
    render () {
        return <div>
            <NorrisContainer />
        </div>
    }
}
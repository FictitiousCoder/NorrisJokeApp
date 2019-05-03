import React, { Component } from "react";
import ReactDOM from "react-dom";
import NorrisDisplayer from "../presentational/NorrisDisplayer.jsx";
class NorrisContainer extends Component {
        constructor() {
        super();
        this.state = {
            joke: "",
            jokes: [],
            timeBetweenJokes: 3000
        };

        this.getJoke = this.getJoke.bind(this);
        this.getJokeFromUrl = this.getJokeFromUrl.bind(this);

        var initialJoke = this.getJokeFromUrl();

        if (initialJoke)
            this.state.joke = initialJoke;

        setTimeout(() => this.getJoke(initialJoke ? true : false), initialJoke ? this.state.timeBetweenJokes : 0);
    }

    getJokeFromUrl() {
        if (URLSearchParams) {
            var params = new URLSearchParams(window.location.search).getAll('joke');
            if (params.length)
                return params[0];
        }

        return null;
    }

    getJoke(openNewWindow) {
        fetch('https://api.chucknorris.io/jokes/random')
            .then(result => result.json())
            .then(data => {
                if (!data.value)
                    return;

                var newJoke = data.value;
                this.setState({ joke: data.value });
                this.setState({ jokes: [...this.state.jokes, newJoke] });

                setTimeout(() => this.getJoke(true), this.state.timeBetweenJokes);

                if (openNewWindow) {
                    var url = window.location.href;
                    var newUrl = url.substring(0, url.indexOf('?') > 0 ? url.indexOf('?') : url.length);
                    window.open(`${decodeURI(newUrl)}?joke=${newJoke}`);
                    this.getJoke();
                }
            })
    }

    render() {
        return (
            <form id="article-form">
            <NorrisDisplayer
                joke={this.state.joke}
                getJoke={this.getJoke}
            />
            </form>
        );
    }
}
export default NorrisContainer;
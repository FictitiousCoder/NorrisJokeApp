import React, { Component } from "react";
import ReactDOM from "react-dom";
import NorrisDisplayer from "../presentational/NorrisDisplayer.jsx";

class NorrisContainer extends Component {
        constructor() {
        super();

        this.state = {
            joke: "",
            jokes: [],
            timeBetweenJokes: 2000
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
            return params.length ? params[0] : null
        }

        var url = decodeURI(window.location.search);
        var jokeParamName = 'joke=';
        var urlParamJokeIndex = url.indexOf(jokeParamName);

        if (urlParamJokeIndex > 0) {
            var urlParamJoke = url.substring(urlParamJokeIndex + jokeParamName.length);
            var urlParamJokeEndIndex = urlParamJoke.indexOf('?');
            urlParamJokeEndIndex = urlParamJokeEndIndex > 0 ? urlParamJokeEndIndex : urlParamJoke.length;
            urlParamJoke = urlParamJoke.substring(0, urlParamJokeEndIndex);
            return urlParamJoke;
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
            <div className="norris-container">
                <NorrisDisplayer
                    joke={this.state.joke}
                    getJoke={this.getJoke}
                />
            </div>
        );
    }
}
export default NorrisContainer;
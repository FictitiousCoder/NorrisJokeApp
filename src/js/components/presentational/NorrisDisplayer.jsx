import React from "react";
import PropTypes from "prop-types";
import './NorrisDisplayer.scss';

const NorrisDisplayer = ({ joke, getJoke }) => (
    <div className="norris-displayer">
        {joke && <h1>{joke}</h1>}
        <button type="button"
            className="btn btn-outline-info"
            onClick={() => getJoke(false)}>
            Get Joke
        </button>
    </div>
);
NorrisDisplayer.propTypes = {
    joke: PropTypes.string,
    getJoke: PropTypes.func.isRequired,
    jokes: PropTypes.array,
};
export default NorrisDisplayer;
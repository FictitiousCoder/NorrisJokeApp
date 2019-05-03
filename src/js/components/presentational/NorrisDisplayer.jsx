import React from "react";
import PropTypes from "prop-types";
const NorrisDisplayer = ({ joke, getJoke }) => (
    <div className="form-group">
    {joke && <h1>{joke}</h1>}
    <button onClick={getJoke}>Get Joke</button>
    </div>
);
NorrisDisplayer.propTypes = {
    joke: PropTypes.string,
    getJoke: PropTypes.func.isRequired,
    jokes: PropTypes.array,
};
export default NorrisDisplayer;
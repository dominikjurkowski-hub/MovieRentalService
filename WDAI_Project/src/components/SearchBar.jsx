import PropTypes from "prop-types";

function SearchBar({searchingFor}) {
    return (
        <div>
            <input type="text" placeholder="Search..."
                onChange={(e) => searchingFor(e.target.value)}/>
        </div>
    );
}

SearchBar.propTypes = {
    searchingFor: PropTypes.func.isRequired,
};

export default SearchBar;
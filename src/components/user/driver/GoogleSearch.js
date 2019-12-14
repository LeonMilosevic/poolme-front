import React from "react";
// import context
import UserContext from "../../../context/user/userContext";
// import third party
import PlacesAutocomplete from "react-places-autocomplete";

export const GoogleSearch = () => {
  const userContext = React.useContext(UserContext);

  return (
    <>
      <PlacesAutocomplete
        value={userContext.googleSearch.addressFrom}
        onChange={userContext.handleChangeAddressFrom}
        onSelect={userContext.handleSelectAddressFrom}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <h6>From</h6>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "form-input-custom google-input"
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <PlacesAutocomplete
        value={userContext.googleSearch.addressTo}
        onChange={userContext.handleChangeAddressTo}
        onSelect={userContext.handleSelectAddressTo}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <h6>To</h6>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input"
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </>
  );
};

export default GoogleSearch;

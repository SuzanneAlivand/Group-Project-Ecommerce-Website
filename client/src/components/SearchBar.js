import styled from "styled-components";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchBar = ({ suggestions }) => {
  const [value, setValue] = useState(""); //value is the word being entered in search bar
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0); //for highlighting the suggestion with mouse/keyboard
  const [dropDownVisible, setDropDownVisible] = useState(true);

  const history = useHistory();

  //for highlighting the part of the words in the search results matching the user's search value
  let firstHalf = "";
  let secondHalf = "";
  let stringIndex = 0;

  //creates a new array of suggestions that matches the user's search value
  let matchedSuggestions = suggestions
    .filter((product) => {
      return product.name.toLowerCase().includes(value.toLowerCase());
    })
    .slice(0, 4); //only stores the first 4 search results, otherwise it'll display dozens of results

  //keyboard functionality for moving through search results
  const handleKeyPress = (e) => {
    setDropDownVisible(true);
    switch (e.key) {
      case "Enter": {
        if (matchedSuggestions.length !== 0 && e.target.value.length !== 0) {
          history.push(
            `/items/${matchedSuggestions[selectedSuggestionIndex]._id}`
          );
        }
        return;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (
          selectedSuggestionIndex > 0 &&
          matchedSuggestions.length !== 0 &&
          dropDownVisible
        ) {
          setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
        }
        return;
      }
      case "ArrowDown": {
        e.preventDefault();
        if (
          selectedSuggestionIndex < matchedSuggestions.length - 1 &&
          matchedSuggestions.length !== 0 &&
          dropDownVisible
        ) {
          setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
        }
        return;
      }
      case "Escape": {
        setDropDownVisible(false);
        return;
      }
    }
  };

  return (
    <Wrapper>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e)}
        placeholder="Search Products"
      />
      {/* search results are mapped when user enters at least two letters that produces matches */}
      {value.length >= 2 && matchedSuggestions.length > 0 && (
        <ProductList isShown={dropDownVisible}>
          {matchedSuggestions.map((product, index) => {
            const isSelected = selectedSuggestionIndex === index ? true : false;

            //for highlighting the part of the search results that match user's search value
            stringIndex = product.name.toLowerCase().indexOf(value);
            firstHalf = product.name.slice(0, stringIndex + value.length);
            secondHalf = product.name.slice(stringIndex + value.length);

            return (
              <ProductItem
                key={product._id}
                style={{
                  backgroundColor: isSelected ? "lightgray" : "transparent",
                }}
                onMouseEnter={() => {
                  setSelectedSuggestionIndex(index);
                }}
                onClick={(e) => {
                  setValue(product.name);
                  history.push(`/items/${product._id}`);
                }}
              >
                <span>
                  {firstHalf}
                  <Prediction>{secondHalf}</Prediction>
                </span>
              </ProductItem>
            );
          })}
        </ProductList>
      )}
    </Wrapper>
  );
};
export default SearchBar;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  height: 2rem;
  width: 250px;
  border-radius: 3px;
  margin-right: 10px;
  border: none;
  outline: none;
  color: #343a40;
  background-color: white;
  border: 1px solid #343a40;
  padding: 20px 6px;

  &:focus {
  }
`;

const ProductList = styled.ul`
  position: absolute;
  top: 30px;
  border: 1px lightgray solid;
  margin-top: 5px;
  display: ${(prop) => (prop.isShown ? "block" : "none")};
  padding: 0;
  background-color: whitesmoke;
  z-index: 2;
`;

const ProductItem = styled.li`
  box-sizing: border-box;
  position: relative;
  padding: 10px;
  list-style-type: none;
  cursor: pointer;
`;

const Prediction = styled.span`
  font-weight: bold;
`;

import styled from "styled-components";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchBar = ({suggestions}) => {
    const [value, setValue] = useState(""); //value is the word being entered in search bar; improve name later
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
    const [dropDownVisible, setDropDownVisible] = useState(true);

    const history = useHistory();

    let firstHalf = "";
    let secondHalf = "";
    let stringIndex = 0;
    
    let matchedSuggestions = suggestions.filter(product => {
        return (product.name.toLowerCase().includes(value.toLowerCase()));
    }).slice(0,4);

    const handleKeyPress = (e) => {
        switch(e.key) {
            case "Enter": {
                if(matchedSuggestions.length !== 0 && e.target.value.length !== 0) {
                    history.push(`/items/${matchedSuggestions[selectedSuggestionIndex]._id}`);
                }
                return;
            }
            case "ArrowUp": {
                e.preventDefault();
                if(selectedSuggestionIndex > 0 
                    && matchedSuggestions.length !== 0 
                    && dropDownVisible) { //dropDownVisible === true
                        setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
                }
                return;
            }
            case "ArrowDown": {
                e.preventDefault();
                if(selectedSuggestionIndex < matchedSuggestions.length-1 
                    && matchedSuggestions.length !== 0
                    && dropDownVisible) {
                        setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
                }
                return;
            }
            case "Escape": {
                setDropDownVisible(!dropDownVisible);
                return;
            }
        };  
    }

    return (
        <Wrapper>
            <Input 
                type="text" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e)}
            />
            <Button onClick={() => setValue("")}>Clear</Button>

            {(value.length >= 2 && matchedSuggestions.length > 0) && (
                <ProductList isShown={dropDownVisible}>
                    {matchedSuggestions.map((product, index) => {
                        const isSelected = (selectedSuggestionIndex === index) ? true: false;
                        stringIndex = product.name.toLowerCase().indexOf(value);
                        firstHalf = product.name.slice(0, (stringIndex + value.length));
                        secondHalf = product.name.slice(stringIndex + value.length);

                        return (
                            <ProductItem 
                                key={product._id}
                                style={{
                                    backgroundColor: isSelected ? 'hsla(50deg, 100%, 80%, 0.25)' : 'transparent'
                                }}
                                onMouseEnter={() => {setSelectedSuggestionIndex(index)}}
                                onClick={(e) => {
                                    setValue(product.name);
                                    //add code to navigate to product details page for this product
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
}
export default SearchBar;

const Wrapper = styled.div`
`;

const Input = styled.input`
    height: 2rem;
    width: 250px;
    border-radius: 3px;
    margin-right: 10px;

    &:focus {
        outline: lightblue 4px solid;
    }
`;

const Button = styled.button`
    height: 2rem;
    border-radius: 3px;
    width: 70px;
    background: blue;
    color: white;

    &:focus {
        outline: lightblue 4px solid;
    }       
`;

const ProductList = styled.ul`
    position: absolute;
    border: 1px lightgray solid;
    margin-top: 5px; 
    display: ${prop => prop.isShown ? "block" : "none"};
    padding: 0;
    z-index: 2;
`;

const ProductItem = styled.li`
    box-sizing: border-box;
    position: relative;
    padding: 10px;
    /* margin: 5px; */
    list-style-type: none;
    cursor: pointer;
`;

const Prediction = styled.span`
    font-weight: bold;
`;

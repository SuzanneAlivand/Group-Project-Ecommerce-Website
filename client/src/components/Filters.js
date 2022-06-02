import styled from "styled-components";
import { CartState } from "../context/Context";
import RatingTwo from "./RatingTwo";

const Filters = ({ reload, setReload }) => {

  //we are importing our reducer state objects from context
  //so we can use them for sorting/filtering
  const {
    itemState: {
      byCategoryFitness,
      byCategoryMedical,
      byCategoryLifestyle,
      byCategoryEntertainment,
      byCategoryGaming,
      byCategoryPets,
      sort,
      byStock,
      byRating,
    },
    itemDispatch,
  } = CartState();

  return (
    <>
      {/* our filters component */}
      <FilterForm>
        <CategoryTitle>PRICE</CategoryTitle>
        <Div>
          <label>
            <input
              type="radio"
              name="filterGroup1"
              onChange={() => {
        //we pass this into useEffect to force re-render whenever there are changes on the radio buttons
                setReload(!reload); 
        //depending on which filter is chosen, the dispatch calls the respective action        
                itemDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "lowToHigh",
                });
              }}
              checked={sort === "lowToHigh" ? true : false}
            />
            <span>Ascending</span>
          </label>
        </Div>
        <Div>
          <label>
            <input
              type="radio"
              name="filterGroup1"
              onChange={() => {
                setReload(!reload);
                itemDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "highToLow",
                });
              }}
              checked={sort === "highToLow" ? true : false}
            />
            <span>Descending</span>
          </label>
        </Div>
        <CategoryTitle>BY STOCK</CategoryTitle>
        <Div>
          <label>
            <input
              type="checkbox"
              name="filterGroup"
              onChange={() => {
                setReload(!reload);
                itemDispatch({
                  type: "SORT_BY_STOCK",
                });
              }}
              checked={byStock}
            />
            <span>Only in stock</span>
          </label>
        </Div>
        <CategoryTitle>BY CATEGORY</CategoryTitle>
        <Div>
          <label>
            <input
              type="radio"
              name="filterGroup"
              onClick={() => {
                setReload(!reload);
                itemDispatch({
                  type: "CATEGORY_FITNESS",
                });
              }}
              checked={byCategoryFitness}
            />
            <span>Fitness </span>
          </label>
        </Div>
        <Div>
          <label>
            <input
              type="radio"
              name="filterGroup"
              onClick={() => {
                setReload(!reload);
                itemDispatch({
                  type: "CATEGORY_MEDICAL",
                });
              }}
              checked={byCategoryMedical}
            />
            <span>Medical</span>
          </label>
        </Div>
        <Div>
          <label>
            <input
              type="radio"
              name="filterGroup"
              onClick={() => {
                setReload(!reload);
                itemDispatch({
                  type: "CATEGORY_LIFESTYLE",
                });
              }}
              checked={byCategoryLifestyle}
            />
            <span>Lifestyle</span>
          </label>
        </Div>
        <Div>
          <label>
            <input
              type="radio"
              name="filterGroup"
              onClick={() => {
                setReload(!reload);
                itemDispatch({
                  type: "CATEGORY_ENTERTAINMENT",
                });
              }}
              checked={byCategoryEntertainment}
            />
            <span>Entertainment</span>
          </label>
        </Div>
        <Div>
          <label>
            <input
              type="radio"
              name="filterGroup"
              onClick={() => {
                setReload(!reload);
                itemDispatch({
                  type: "CATEGORY_GAMING",
                });
              }}
              checked={byCategoryGaming}
            />
            <span>Gaming</span>
          </label>
        </Div>
        <Div>
          <label>
            <input
              type="radio"
              name="filterGroup"
              onClick={async () => {
                itemDispatch({
                  type: "CATEGORY_PETS",
                });
                setReload(!reload);
              }}
              checked={byCategoryPets}
            />
            <span>Pets and Animals</span>
          </label>
        </Div>
        <CategoryTitle>RATING</CategoryTitle>
        <label>
          <RatingTwo
            rating={byRating}
            onClick={(i) => {
              setReload(!reload);
              itemDispatch({
                type: "FILTER_BY_RATING",
                payload: i + 1,
              });
            }}
            style={{ cursor: "pointer" }}
          />
        </label>
        <BtnWrapper>
          <Button
            type="button"
            value="clear"
            onClick={() => {
              setReload(!reload);
              itemDispatch({
                type: "CLEAR_FILTERS",
              });
            }}
          >
            Clear Filters
          </Button>
        </BtnWrapper>
      </FilterForm>
    </>
  );
};

const FilterForm = styled.form`
  display: flex;
  flex-direction: column;

  label {
    padding-left: 15px;
    font-size: 1.3em;
  }

  input[type="radio"],
  input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin-right: 6px;
    width: 1rem;
    height: 1rem;
    border: 0.15em solid;
    border-radius: 50%;
    color: #343a40;
    cursor: pointer;
    &:checked {
      background-color: #4e4e4e;
    }
  }
  span {
    cursor: pointer;
  }
`;

const CategoryTitle = styled.div`
  font-size: 1.3rem;
  padding-top: 30px;
  padding-bottom: 10px;
  font-weight: 550;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 7px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  width: 100%;
  border: none;
  color: white;
  background-color: #1a1a1a;
  cursor: pointer;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Div = styled.div`
  margin: 8px 0px;
  align-content: center;
`;
export default Filters;

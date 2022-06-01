import styled from "styled-components";
import { CartState } from "../context/Context";

const Filters = ({ reload, setReload }) => {
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
    products,
    setProducts,
  } = CartState();

  return (
    <>
      <FilterForm>
        <CategoryTitle>PRICE</CategoryTitle>
        <label>
          <input
            type="radio"
            name="filterGroup"
            onChange={() => {
              setReload(!reload);
              itemDispatch({
                type: "SORT_BY_PRICE",
                payload: "lowToHigh",
              });
            }}
            checked={sort === "lowToHigh" ? true : false}
          />
          <span>Ascending</span>
        </label>

        <label>
          <input
            type="radio"
            name="filterGroup"
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

        <CategoryTitle>BY STOCK</CategoryTitle>
        <label>
          <input
            type="checkbox"
            name="filterGroup"
            onClick={() => {
              setReload(!reload);
              itemDispatch({
                type: "SORT_BY_STOCK",
              });
            }}
            checked={byStock}
          />
          <span>Only in stock</span>
        </label>

        <CategoryTitle>BY CATEGORY</CategoryTitle>
        <label>
          <input
            type="checkbox"
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

        <label>
          <input
            type="checkbox"
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
        <label>
          <input
            type="checkbox"
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
        <label>
          <input
            type="checkbox"
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

        <label>
          <input
            type="checkbox"
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
        <label>
          <input
            type="checkbox"
            name="filterGroup"
            onClick={() => {
              setReload(!reload);
              itemDispatch({
                type: "CATEGORY_PETS",
              });
            }}
            checked={byCategoryPets}
          />
          <span>Pets and Animals</span>
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
    padding-left: 20px;
    font-size: 1.2em;
  }

  input[type="radio"],
  input[type="checkbox"] {
    background-color: #fff;
    margin: 10px;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid;
    border-radius: 50%;
  }
`;

const CategoryTitle = styled.div`
  font-size: 1.4em;
  padding-top: 40px;
  padding-bottom: 10px;
`;

const Button = styled.button`
  margin-top: 40px;
  padding: 5px 20px;
  border-radius: 5px;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default Filters;

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
    <FormTitle>FILTERS</FormTitle>
    <FilterForm>
      <label>
        Ascending
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
      </label>

      <label>
        Descending
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
      </label>

      <label>
        Only on stock
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
      </label>

      <p>BY CATEGORY</p>
      <label>
        Fitness
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
      </label>

      <label>
        Medical
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
      </label>
      <label>
        Lifestyle
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
      </label>
      <label>
        Entertainment
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
      </label>

      <label>
        Gaming
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
      </label>
      <label>
      Pets and Animals
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
      </label>



      {/* <label>
            By rating
            <input type="checkbox" name="only-stock" />
          </label> */}
      <Button
        type="button"
        value="clear"
        onClick={() =>
          itemDispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Clear Filters
      </Button>
    </FilterForm>
    </>
  );
};

const FilterForm = styled.form`
  display: flex;
  flex-direction: column;
  /* padding: 10px; */

  input {
    padding-right: 20px;
  }
`;

const FormTitle = styled.p`
text-align: center;
`

const Button = styled.button`
margin-top: 20px;
`

export default Filters;

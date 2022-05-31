import styled from "styled-components";
import { CartState } from "../context/Context";

const Filters = ({ reload, setReload }) => {
  const {
    itemState: { byCategory, byBodyLocation, sort, byStock, byRating },
    itemDispatch,
    products,
    setProducts,
  } = CartState();

  console.log(
    "itemState IS",
    byCategory,
    byBodyLocation,
    sort,
    byStock,
    byRating
  );

  return (
    <FilterForm>
      <label>
        Ascending
        <input
          type="radio"
          name="filterGroup"
          onChange={() => {
            setReload(!reload);
            // setProducts(filterItems());
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
            // setProducts(filterItems());
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

            // setProducts(filterItems());
            itemDispatch({
              type: "SORT_BY_STOCK",
            });
          }}
          checked={byStock}
        />
      </label>
      {/* <label>
        By category
        <input type="checkbox" name="only-stock" />
      </label>
      <label>
        By rating
        <input type="checkbox" name="only-stock" />
      </label> */}

      <button
        type="button"
        value="clear"
        onClick={() =>
          itemDispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Clear Filters
      </button>
    </FilterForm>
  );
};

const FilterForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default Filters;

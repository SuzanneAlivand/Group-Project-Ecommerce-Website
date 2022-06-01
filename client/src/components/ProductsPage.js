import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import SearchBar from "./SearchBar";
import PaginationDiv from "./PaginationDiv";
import Filters from "./Filters";

const ProductsPage = () => {
  // const [products, setProducts] = useState(null);
  const [currentItems, setCurrentItems] = useState([]);
  const [reload, setReload] = useState(false);

  const {
    state: { cart },
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
    dispatch,
    products,
    setProducts,
  } = CartState();

  // storing data
  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  const filterItems = (array) => {
    let filteredProduct = [...array];

    if (sort) {
      filteredProduct = filteredProduct.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }
    if (byStock) {
      filteredProduct = filteredProduct.filter(
        (product) => product.numInStock > 0
      );
    }
    if (byCategoryFitness) {
      filteredProduct = filteredProduct.filter(
        (product) => product.category === "Fitness"
      );
    }
    if (byCategoryMedical) {
      filteredProduct = filteredProduct.filter(
        (product) => product.category === "Medical"
      );
    }
    if (byCategoryLifestyle) {
      filteredProduct = filteredProduct.filter(
        (product) => product.category === "Lifestyle"
      );
    }
    if (byCategoryEntertainment) {
      filteredProduct = filteredProduct.filter(
        (product) => product.category === "Entertainment"
      );
    }
    if (byCategoryGaming) {
      filteredProduct = filteredProduct.filter(
        (product) => product.category === "Gaming"
      );
    }
    if (byCategoryPets) {
      filteredProduct = filteredProduct.filter(
        (product) => product.category === "Pets and Animals"
      );
    }

    return filteredProduct;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      //to be modified later when endpoints and handlers have been created
      const data = await fetch("/api/items");
      const json = await data.json();
      setProducts(filterItems(json.data));
    };
    fetchProducts();
  }, [reload]);

  console.log("products", products);

  return (
    <MainWrapper>
      {products && (
        <>
          <SearchBar suggestions={products} />
          <Filters reload={reload} setReload={setReload} />
          <ProductsWrapper>
            {/* {currentItems.map((product) => ( */}

            {currentItems.map((product) => (
              <ProductContainer>
                <Link to={`/items/${product._id}`}>
                  <ProductName>{product.name}</ProductName>
                  <ProductImg src={product.imageSrc}></ProductImg>
                </Link>
                <Rating value={product.rating} />
                <p>${product.price}</p>
                <div>
                  {product.numInStock > 0 ? (
                    cart.find((x) => x === product) ? (
                      <Button style={{ backgroundColor: "lightpink" }}>
                        Item added!
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          dispatch({
                            type: "ADD_ITEM",
                            payload: product,
                          });
                        }}
                      >
                        Add to my cart
                      </Button>
                    )
                  ) : (
                    <Button disabled>Add to my cart</Button>
                  )}
                </div>
              </ProductContainer>
            ))}
          </ProductsWrapper>
          {/* <PaginationDiv setCurrentItems={setCurrentItems} items={filteredProductsArray} /> */}
          <PaginationDiv setCurrentItems={setCurrentItems} items={products} />
        </>
      )}
    </MainWrapper>
  );
};
export default ProductsPage;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductsWrapper = styled.div`
  display: grid;
  justify-items: center;
  grid-template: 1fr 1fr / 1fr 1fr 1fr;
  gap: 100px;
  margin: 70px;
  a {
    text-decoration: none;
    color: black;
    display: flex;
    justify-content: center;
  }
`;

const ProductContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border: 1px solid gray;
  border-radius: 20px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  width: 250px;
  height: 260px;
  padding-bottom: 20px;
  padding-left: 10px;
`;

const ProductImg = styled.img`
  position: absolute;
  top: -15px;
  width: 150px;
  border-radius: 20px;
  max-height: 150px;
`;

const ProductName = styled.div`
  font-size: 15px;
  font-weight: bold;
`;

const Button = styled.button`
  border-radius: 4px;
  border: none;
  background-color: lightblue;
  cursor: pointer;
  padding: 5px 10px;
`;

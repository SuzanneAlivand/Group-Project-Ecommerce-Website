import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const ProductsPage = () => {
  // const [products, setProducts] = useState(null);

  const {
    state: { cart },
    dispatch,
    products,
    setProducts,
  } = CartState();

  // storing data
  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchProducts = async () => {
      //to be modified later when endpoints and handlers have been created
      const data = await fetch("/api/items");
      const json = await data.json();
      setProducts(json.data);
    };
    fetchProducts();
  }, []);

  console.log(cart);

  return (
    <Wrapper>
      {products &&
        products.map((product) => (
          <ProductContainer>
            <Link to={`/items/${product._id}`}>
              <ProductName>{product.name}</ProductName>
              <ProductImg src={product.imageSrc}></ProductImg>
            </Link>
            <Rating value={product.rating} />
            <p>${product.price}</p>
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
          </ProductContainer>
        ))}
    </Wrapper>
  );
};
export default ProductsPage;

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  grid-template: 1fr 1fr / 1fr 1fr 1fr;
  row-gap: 40px;
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

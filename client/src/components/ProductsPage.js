import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import SearchBar from "./SearchBar";
import PaginationDiv from "./PaginationDiv";
import Filters from "./Filters";
import SpinnerOne from "./spinners/SpinnerOne";

const ProductsPage = () => {
  // const [products, setProducts] = useState(null);
  const [currentItems, setCurrentItems] = useState([]);
  const [reload, setReload] = useState(false);
  // for adding spinner, we define a loading state
  const [loaded, setLoaded] = useState(false);

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
    if (byRating) {
      filteredProduct = filteredProduct.filter(
        (product) => product.rating >= byRating
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
      setLoaded(true);
    };
    fetchProducts();
  }, [reload]);

  console.log("products", products);

  return (
    <MainWrapper>
      {products && (
        <>
          <LeftSection>
            <SearchBar suggestions={products} />
            <Filters reload={reload} setReload={setReload} />
          </LeftSection>
          <RightSection>
            {loaded ? (
              <ProductsWrapper>
                {currentItems.map((product) => (
                  <ProductContainer>
                    <Link to={`/items/${product._id}`}>
                      <ProductName>{product.name}</ProductName>
                      <ProductImg src={product.imageSrc}></ProductImg>
                    </Link>
                    <Rating value={product.rating} />
                    <Price>${product.price}</Price>
                    <div>
                      {product.numInStock > 0 ? (
                        cart.find((x) => x._id === product._id) ? (
                          <Button
                            style={{
                              backgroundColor: "var(--color-complimentary)",
                              color: "black",
                            }}
                          >
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
                        <Button
                          disabled
                          style={{
                            backgroundColor: "var(--color-light)",
                            color: "grey",
                          }}
                        >
                          Out Of Stock
                        </Button>
                      )}
                    </div>
                  </ProductContainer>
                ))}
              </ProductsWrapper>
            ) : (
              <SpinnerOne style={{ width: "80vw", height: "80vh" }} />
            )}
            <PaginationWrapper>
              <PaginationDiv
                setCurrentItems={setCurrentItems}
                items={products}
              />
            </PaginationWrapper>
          </RightSection>
        </>
      )}
    </MainWrapper>
  );
};
export default ProductsPage;

const MainWrapper = styled.div`
  padding-top: 70px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
`;

const LeftSection = styled.div`
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RightSection = styled.div`
  // WIDTH might me modified or removed
  width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 40px;
`;

const ProductsWrapper = styled.div`
  padding-bottom: 60px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 2fr));

  a {
    text-decoration: none;
    color: black;
  }
`;

const ProductContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 5px 15px 31px 4px #dfdfdf;
`;

const ProductImg = styled.img`
  max-width: 120px;
`;

const ProductName = styled.div`
  font-size: 1em;
  font-weight: 700;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
`;

const Price = styled.div`
  font-size: 0.8em;
  font-weight: 600;
  font-style: italic;
  color: #8e8e8e;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
`;

const Button = styled.button`
  display: flex;
  border-radius: 4px;
  border: none;
  background-color: var(--color-primary);
  cursor: pointer;
  padding: 5px 10px;

  &:hover {
    background-color: var(--color-secondary);
    color: white;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

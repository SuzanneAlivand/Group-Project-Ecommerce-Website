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
                        <Button disabled>Out Of Stock</Button>
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
  align-items: flex-start;
`;

const LeftSection = styled.div`
  padding: 40px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RightSection = styled.div`
// WIDTH might me modified or removed
width: 1200px;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
`;

const ProductsWrapper = styled.div`
  padding-bottom: 60px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 2fr));

  /* display: grid;
  justify-items: center;
  grid-template: 1fr 1fr / 1fr 1fr 1fr;
  gap: 100px;
  margin: 20px 70px 70px 70px; */
  a {
    text-decoration: none;
    color: black;
    /* display: flex;
    justify-content: center; */
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

  /* position: relative;
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
  padding-left: 10px; */
`;



const ProductImg = styled.img`
  max-width: 120px;

  /* position: absolute;
  top: -15px;
  width: 150px;
  border-radius: 20px;
  max-height: 150px; */
`;

const ProductName = styled.div`
  font-size: 1.2em;
  font-weight: 700;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;

  /* font-size: 15px;
  font-weight: bold; */
`;

const Price = styled.div`
  font-size: 1em;
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
  background-color: lightblue;
  cursor: pointer;
  padding: 5px 10px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

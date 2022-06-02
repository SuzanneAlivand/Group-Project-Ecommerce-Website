import styled from "styled-components";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useContext, useEffect, useState, useRef } from "react";
import { CartState } from "../context/Context";
import { CgProfile } from "react-icons/cg";
import { UserContext } from "../context/Context";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { GoSignOut } from "react-icons/go";

const Header = () => {
  const [toggleCart, setToggleCart] = useState(false);
  const [toggleUserMenu, setToggleUserMenu] = useState(false);
  const cartBtnRef = useRef(); //for using cart dropdown as a reference
  const userMenuRef = useRef(); //for using user profile dropdown as a reference
  const location = useLocation();

  //cart state passed through context
  const {
    state: { cart },
    dispatch,
  } = CartState();

  //authenticated user passed through context; holds username
  const { user, setUser } = useContext(UserContext);

  //adding event listener to close cart dropdown when clicking away from dropdown
  useEffect(() => {
    const closeCart = (e) => {
      if (
        e.path[0] !== cartBtnRef.current &&
        e.path[1] !== cartBtnRef.current &&
        e.path[2] !== cartBtnRef.current &&
        e.path[3] !== cartBtnRef.current
      ) {
        setToggleCart(false);
      }
    };
    document.body.addEventListener("click", closeCart);

    return () => {
      document.body.removeEventListener("click", closeCart);
    };
  }, []);

  //adding event listener to close user profile dropdown when clicking away from dropdown
  useEffect(() => {
    const closeUserMenu = (e) => {
      if (
        e.path[0] !== userMenuRef.current &&
        e.path[1] !== userMenuRef.current &&
        e.path[2] !== userMenuRef.current &&
        e.path[3] !== userMenuRef.current
      ) {
        setToggleUserMenu(false);
      }
    };
    document.body.addEventListener("click", closeUserMenu);

    return () => {
      document.body.removeEventListener("click", closeUserMenu);
    };
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <HeaderSection>
      <NavLinkStyled exact to="/">
        <h1 style={{"color" : "#4E4E4E"}}>World Of Wearables</h1>
      </NavLinkStyled>
      <CartBtnAndProfileBtnDiv>
      {/* Cart Dropdown/menu and icon are not displayed when checking out or viewing details of cart */}
      {location.pathname !== "/cart" && location.pathname !== "/checkout" && (
        <CartBtnWrapper>
          <CartBtn
            ref={cartBtnRef}
            onClick={() => {
              setToggleCart(!toggleCart);
            }}
          >
            <FaShoppingCart color="white" size={20} />
            <CartCount>{cart.length}</CartCount>
          </CartBtn>
          {/* Cart dropdown only drops when there is something in the cart. */}
          {/* 'isOpen' prop is passed to get rid of a small div display that shows when cart is empty. See CSS below. */}
          <CartWrapper isOpen={toggleCart && cart.length > 0 ? true : false}>
            {toggleCart &&
              cart.map((product) => (
                <ProductWrapper>
                  <ProductLink to={`/items/${product._id}`}>
                    <Avatar src={product.imageSrc} />
                    <NamePriceDiv>
                      <Name>{product.name}</Name>
                      <Price>${product.price}</Price>
                    </NamePriceDiv>
                  </ProductLink>
                  <AiFillDelete
                    size={20}
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation(); //prevents the dropdown from closing when clicking to remove item
                      dispatch({
                        type: "REMOVE_ITEM",
                        payload: product._id,
                      });
                    }}
                  />
                </ProductWrapper>
              ))}
              <LinkToCart to="/cart" style={{"text-decoration": "none"}}>
                <BtnGoToCart>Go To Cart</BtnGoToCart>
              </LinkToCart>     
          </CartWrapper>          
        </CartBtnWrapper>
      )}
      <NavLinkStyled
        // if user is not logged in, then this link directs to login page. If user is logged in, then clicking here opens a drop down menu
        to={!user && "/login"}
        onClick={() => setToggleUserMenu(!toggleUserMenu)}
        ref={userMenuRef}
      >
        <CgProfile size={30} color="var(--color-secondary)" />
        {user ? (
          <Greeting>Welcome, {user}</Greeting>
        ) : (
          <LoginDesign>Login</LoginDesign>
        )}
        {user && toggleUserMenu && (
          <UserMenuWrapper>
            <MenuItem>
              <LinkStyled to={`/user/${user}`}>
                <MdOutlineHistoryEdu />
                <div>Order History</div>
              </LinkStyled>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <GoSignOut />
              <div>Log Out</div>
            </MenuItem>
          </UserMenuWrapper>
        )}
      </NavLinkStyled>
      </CartBtnAndProfileBtnDiv>
    </HeaderSection>
  );
};

export default Header;

const LoginDesign = styled.span`
  color: var(--color-secondary);
  font-size: 1.2em;
  font-weight: 700;
`;

const HeaderSection = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-left: 20px;
  margin-right: 20px;
`;

const NavLinkStyled = styled(NavLink)`
    display: flex;
    align-items: center;
    text-decoration: none;
    gap: 10px;
`;

const CartBtnAndProfileBtnDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 30%;
`;

const LinkStyled = styled(Link)`
    text-decoration: none;
    display: flex;
    gap: 11px;
    align-items: center;
    justify-content: flex-start;
`;

const CartBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-secondary);
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  gap: 5px;
  cursor: pointer;
`;

const CartCount = styled.div`
  color: white;
  font-weight: bold;
`;

const CartWrapper = styled.div`
    padding: 10px;
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: 5px 15px 31px 4px #dfdfdf;
    top: 65px;   
    z-index: 2;
    //passing a prop to determine display none or not.
    // Otherwise a small square box on the div shows when cart is closed.
    display: ${(p) => !p.isOpen && "none"}  
`;

const CartBtnWrapper = styled.div`
  display: flex;
`;

const ProductWrapper = styled.div`
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: var(--color-light);
  }
`;

const ProductLink = styled(Link)`
  text-decoration: none;
  display: flex;
`;

const Avatar = styled.img`
    width: 35px; 
    height: 35px;
    padding-right: 10px;

`;

const NamePriceDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10px;
`;

const Name = styled.div`
  font-size: 14px;
`;

const Price = styled.div`
  font-size: 14px;
`;

const BtnGoToCart = styled.button`
  position: relative;
  margin: 20px 50px 10px 50px;
  padding: 5px;
  border-radius: 5px;
  border: 1px #e4e8eb;
  width: 100%;
  cursor: pointer;

  &:hover {
    color: #FFFEFD;
    background-color: var(--color-secondary);
  }
`;

const LinkToCart = styled(Link)`
  display: flex;
  justify-content: center;
  margin: 0;
`;

const Greeting = styled.div`
  font-weight: bold;
  text-decoration: none;
  color: #4E4E4E;
`;

const UserMenuWrapper = styled(CartWrapper)`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 65px;
`;

const MenuItem = styled(ProductWrapper)`

    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 11px;
`;

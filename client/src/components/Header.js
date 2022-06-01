import styled from 'styled-components';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {FaShoppingCart} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import { useContext, useEffect, useState, useRef, createRef } from 'react';
import { CartState } from '../context/Context';
import {CgProfile} from 'react-icons/cg';
import { UserContext } from '../context/Context';

const Header = () => {
    const [toggleCart, setToggleCart] = useState(false);
    const [toggleUserMenu, setToggleUserMenu] = useState(false);
    const cartBtnRef = useRef();
    const userMenuRef = useRef();
    const location = useLocation();

    const {
        state: { cart },
        dispatch,
        products,
        setProducts
        } = CartState(); 

    const {user, setUser} = useContext(UserContext);        

    useEffect(() => {
        const closeCart = (e) => {
            if(e.path[0] !== cartBtnRef.current 
                && e.path[1] !== cartBtnRef.current 
                && e.path[2] !== cartBtnRef.current 
                && e.path[3] !== cartBtnRef.current) {
                    setToggleCart(false);
            }           
        }
        document.body.addEventListener("click", closeCart);

        return (() => {
            document.body.removeEventListener("click", closeCart);
        })
    }, []);

    useEffect(() => {
        const closeUserMenu = (e) => {
            if(e.path[0] !== userMenuRef.current 
                && e.path[1] !== userMenuRef.current 
                && e.path[2] !== userMenuRef.current 
                && e.path[3] !== userMenuRef.current) {
                    setToggleUserMenu(false);
            }           
        }
        document.body.addEventListener("click", closeUserMenu);

        return (() => {
            document.body.removeEventListener("click", closeUserMenu);
        })
    }, []);    

    const handleLogout = () => {
        setUser(null);
    }

    return (
        <HeaderSection>
            <NavLinkStyled exact to="/"><h1>Watchie's Warehouse of Watches</h1></NavLinkStyled>
            {(location.pathname !== "/cart" && location.pathname !== "/checkout") && (
                <CartBtnWrapper>
                    <CartBtn ref={cartBtnRef} onClick={() => {
                        setToggleCart(!toggleCart)
                    }}>
                        <FaShoppingCart color="white" size={20} />
                        <CartCount>{cart.length}</CartCount>
                    </CartBtn>
                    <CartWrapper isOpen={toggleCart && cart.length > 0 ? true : false}>
                        {toggleCart && cart.map(product => (
                            <ProductWrapper>
                                <ProductLink to={`/items/${product._id}`}>
                                    <Avatar src={product.imageSrc} />
                                    <NamePriceDiv>
                                        <Name>{product.name}</Name>   
                                        <Price>${product.price}</Price>                                
                                    </NamePriceDiv>
                                </ProductLink>
                                <AiFillDelete style={{"cursor":"pointer"}} onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch({
                                        type: "REMOVE_ITEM",
                                        payload: product._id,
                                    })}} />                             
                            </ProductWrapper>                
                        ))}
                        {toggleCart && cart.length > 0 && <BtnGoToCart><Link to="/cart">Go To Cart</Link></BtnGoToCart>}       
                    </CartWrapper>                    
                </CartBtnWrapper>                           
            )}
            <NavLinkStyled 
                to={!user && "/login"} 
                onClick={() => setToggleUserMenu(!toggleUserMenu)} 
                ref={userMenuRef}>
                    <CgProfile size={30} color="blue"/>
                    {user ? <Greeting>Welcome, {user}</Greeting> : "Login"}
                    {user && toggleUserMenu && (
                        <UserMenuWrapper>
                            <MenuItem><LinkStyled to={`/user/${user}`}>Order History</LinkStyled></MenuItem>
                            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                        </UserMenuWrapper>
                    )}
            </NavLinkStyled> 
        </HeaderSection>
    );
}
export default Header;

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
    /* list-style-type: none; */
    text-decoration: none;
    gap: 10px;
`;

const LinkStyled = styled(Link)`
    text-decoration: none;
`;

const CartBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: blue;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    gap: 5px;
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
    display: ${(p) => !p.isOpen && "none"}   
`;

const CartBtnWrapper = styled.div`
    display: flex;
`;

const ProductWrapper = styled.div`
    padding: 8px;
    display: flex;
    justify-content: space-between;

    &:hover {
        background-color: whitesmoke;
    }
`;

const ProductLink = styled(Link)`
    text-decoration: none;
    display: flex;
`;

const Avatar = styled.img`
    width: 30px; 
    border-radius: 50%;
    padding-right: 8px;
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
margin: 20px 50px 10px 50px;
padding: 10px;
border-radius: 5px;
border: 1px #e4e8eb;
`
const Greeting = styled.div`
    font-weight: bold;
    text-decoration: none;
`;

const UserMenuWrapper = styled(CartWrapper)`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 65px;
`;

const MenuItem = styled(ProductWrapper)`
`;

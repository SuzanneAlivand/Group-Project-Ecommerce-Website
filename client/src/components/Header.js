import styled from 'styled-components';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {FaShoppingCart} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import { useEffect, useState, useRef, createRef } from 'react';
import { CartState } from '../context/Context';
import {CgProfile} from 'react-icons/cg';

const Header = () => {
    const [toggleCart, setToggleCart] = useState(false);
    const cartBtnRef = useRef();
    const location = useLocation();

    const {
        state: { cart },
        dispatch,
        products,
        setProducts
        } = CartState(); 

    useEffect(() => {
        const closeCart = (e) => {
            (console.log(e.target));
            console.log(e.composedPath());
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
                    <CartWrapper>
                        {toggleCart && cart.map(product => (
                            <ProductWrapper>
                                <Avatar src={product.imageSrc} />
                                <NamePriceDiv>
                                    <Name>{product.name}</Name>   
                                    <Price>{product.price}</Price>                                
                                </NamePriceDiv>
                                <AiFillDelete onClick={() => {
                                    dispatch({
                                        type: "REMOVE_ITEM",
                                        payload: product,
                                    })}} />
                            </ProductWrapper>                
                        ))}
                        {toggleCart && cart.length > 0 && <button><Link to="/cart">Go To Cart</Link></button>}       
                    </CartWrapper>                    
                </CartBtnWrapper>                           
            )}
             <NavLink to="/login"><CgProfile size={30} color="blue"/></NavLink> 
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
    /* display: flex;
    list-style-type: none;
    text-decoration: none; */
    text-decoration: none;
    gap: 50px;
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
    position: absolute;
    display: flex;
    flex-direction: column;
    /* border: 1px blue solid; */
    top: 65px;
    
    z-index: 2;
`;

const CartBtnWrapper = styled.div`
    display: flex;
`;

const ProductWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    &:hover {
        background-color: lightgray;
    }
`;

const Avatar = styled.img`
    width: 30px; 
    border-radius: 50%;
`;

const NamePriceDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const Name = styled.div`
    font-size: 14px;
`;

const Price = styled.div`
    font-size: 14px;
`;

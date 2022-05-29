import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import {FaShoppingCart} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import { useState } from 'react';
import { CartState } from '../context/Context';

const Header = () => {
    const [toggleCart, setToggleCart] = useState(false);

    const {
        state: { cart },
        dispatch,
        products,
        setProducts
        } = CartState(); 

    return (
        <HeaderSection>
            <h1>Watchie's Warehouse of Watches</h1>
            <List>
                <li>
                    <CartBtn onClick={() => {
                        setToggleCart(!toggleCart)
                        console.log(toggleCart);
                    }}>
                        <FaShoppingCart color="white" size={20}>
                            {/* <NavLink to="/cart">My Cart</NavLink> */}
                        </FaShoppingCart>
                    </CartBtn>
                </li>
                <CartWrapper>
                    {toggleCart && cart.map(product => (
                        <ProductWrapper>
                            <Avatar src={product.imageSrc} />
                            <NamePriceDiv>
                                <Name>{product.name}</Name>   
                                <Price>{product.price}</Price>                                
                            </NamePriceDiv>
                            <AiFillDelete />
                        </ProductWrapper>                
                    ))}
                    {toggleCart && <button><Link to="/cart">Go To Checkout</Link></button>}
        
                </CartWrapper>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>

            </List>
        </HeaderSection>
    );
}
export default Header;

const HeaderSection = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 30px;
`;

const List = styled.ul`
    display: flex;
    list-style-type: none;
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
`;

const CartWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    /* border: 1px blue solid; */
    top: 65px;
    z-index: 2;
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

import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <HeaderSection>
            <h1>Watchie's Warehouse of Watches</h1>
            <List>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/cart">My Cart</NavLink>
                </li>
            </List>
        </HeaderSection>
    );
}
export default Header;

const HeaderSection = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
`;

const List = styled.ul`
    display: flex;
    list-style-type: none;
    text-decoration: none;
    gap: 50px;
`;

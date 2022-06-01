import styled from "styled-components";
import { useContext, useEffect, useState  } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../context/Context";

const OrderHistory = () => {
    const [orders, setOrders] = useState(null);
    const {userName} = useParams();
    const {user, setUser} = useContext(UserContext);
    
    useEffect(() => {
        const fetchOrders = async () => {
            const data = await fetch(`/api/user/${userName}`);
            const json = await data.json();
            setOrders(json.data);
            console.log(json.data);
        };
        fetchOrders();
    },[]);

    return (
        <Wrapper> 
            <Header>Order History</Header>
            {user && orders && orders.map(order => 
            <OrderWrapper>
                <OrderInfo>
                    <OrderTotal>TOTAL: ${order.total}</OrderTotal>
                    <OrderShipTo>SHIPPED TO: {order.givenName} {order.surname}</OrderShipTo>
                    <OrderNum>ORDER #: {order._id}</OrderNum>
                </OrderInfo>

                {order.cart.map((item) => (
                <ItemContainer>
                    <img src={item.imageSrc} />
                    <ItemLink to={`/items/${item._id}`}><ItemName>{item.name}</ItemName></ItemLink>
                    <p>$ {item.price}</p>
                    <p>Quantity: {item.qty}</p>
                    <p>Subtotal: ${(item.price * item.qty).toFixed(2)}</p>
                </ItemContainer>
                ))}
            </OrderWrapper>    
            )}
        </Wrapper>
    );
}
export default OrderHistory;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Header = styled.h1`
    text-align: center;
`;

const OrderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 75%;
    margin: 20px;
    padding: 10px;
    border: 1px solid slategray;
    border-radius: 10px;
`;

const OrderInfo = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: whitesmoke;
    font-size: 0.8rem;
`;

const OrderTotal = styled.div`
`;

const OrderShipTo = styled.div`
`;

const OrderNum = styled.div`
`;

const ItemContainer = styled.div`
    display: flex;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
    img {
        width: 100px;
    }
    p {
        padding: 0 30px;
    }
`;

const ItemLink = styled(Link)`
    text-decoration: none;
    width: 20%;
`;

const ItemName = styled.div`
`;

const OrderPriceTotal = styled.div`
    font-weight: bold;
`;


import React, {FC, useRef, useState} from 'react';
import {FaShoppingCart} from "react-icons/fa";
import {IconContext} from "react-icons";
import styled from "@emotion/styled";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import OrderItem from "../OrderItem/OrderItem";
import {burgerSlice} from "../../store/reducers/burgerSlice";
import {useOnClickOutside} from "../../hooks/useOutsideClick";

const Order:FC = () => {

    const totalOrderCount = useAppSelector( s => s.burgerReducer.totalOrderCount);
    const totalSum = useAppSelector( s => s.burgerReducer.totalSum);
    const [openOrder, setOpenOrder] = useState<boolean>(false);
    const order = useAppSelector( s => s.burgerReducer.order);
    const ref = useRef<HTMLDivElement>(null);
    const { completeOrder } = burgerSlice.actions;
    const dispatch = useAppDispatch();
    useOnClickOutside(ref, () => setOpenOrder(false));

    return (
        <RelativeBlock>
            <IconContext.Provider value={{color: "green"}}>
                <FaShoppingCart
                    style={{width: '40px', height: "40px", cursor: "pointer"}}
                    onClick={() => setOpenOrder((o) =>!o)}
                />
            </IconContext.Provider>
            {totalOrderCount > 0 && <NumberBlock>{totalOrderCount}</NumberBlock>}
            {openOrder &&
                <OrderBlock ref={ref}>

                    {order.map( (el, index) =>
                        <OrderItem
                            key={el.id}
                            order={el}
                            index={index + 1}
                        />
                    )}
                    {totalOrderCount ? <OrderBlockSum>
                        <div>
                            Общая стоимость заказа: <span style={{fontWeight: "700"}}>{totalSum} ₽</span>
                        </div>
                        <OrderButton onClick={() => dispatch(completeOrder())}>Заказать</OrderButton>
                    </OrderBlockSum>
                    :
                        <p>В корзине товаров нет</p>
                    }
                </OrderBlock>
            }
        </RelativeBlock>
    );
};

const RelativeBlock = styled.div`
  position: relative;
`;

const NumberBlock = styled.div`
  position: absolute;
  top: -1rem;
  right: -.35rem;
  background: red;
  padding: 3px 6px;
  color: #fff;
  font-weight: 700;
  border-radius: 100%;
  font-size: 10px;
`

const OrderBlock = styled.div`
  position: absolute;
  background: #fff;
  z-index: 2;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(51, 225, 202, 0.7);
  -moz-box-shadow: 0px 0px 4px 0px rgba(51, 225, 202, 0.7);
  box-shadow: 0px 0px 4px 0px rgba(51, 225, 202, 0.7);
  padding: 20px;
  width: 550px;
  & p {
    display: flex;
    justify-content: center;
  }
`

const OrderBlockSum = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const OrderButton = styled.button`
    background: green;
    color: #FFF;
    font-weight: 700;
    text-align: center;
    padding: 10px 30px;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    border-radius: 20px;
    transition: background .3s ease-in-out;
    &:hover {
      background: darkgreen;
    }
`

export default Order;
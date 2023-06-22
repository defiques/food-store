import React, {FC} from 'react';
import styled from "@emotion/styled";
import {IBurgerOrder} from "../../models/IBurgerOrder";
import {FaPlusSquare, FaMinusSquare, FaTrash} from "react-icons/fa";
import {IconContext} from "react-icons";
import {css} from "@emotion/react";
import {burgerSlice} from "../../store/reducers/burgerSlice";
import {useAppDispatch} from "../../hooks/redux";


interface OrderItemProps {
    order: IBurgerOrder,
    index: number
}

const OrderItem:FC<OrderItemProps> = ({order, index}) => {

    const { addOrderItem, removeOrderItem, deleteOrderItem } = burgerSlice.actions;
    const dispatch = useAppDispatch();

    return (
        <OrderItemWrapper>
            <OrderIndex>{index}</OrderIndex>
            <OrderImageBlock>
                <OrderImage src={order.image} alt={order.image}/>
            </OrderImageBlock>
            <OrderItemInfo>
                <OrderItemInfoName>{order.name}</OrderItemInfoName>
                <OrderItemInfoCount>{order.count} шт</OrderItemInfoCount>
            </OrderItemInfo>
            <OrderItemInfoPrice>{order.price * order.count}₽</OrderItemInfoPrice>
            <OrderItemButtons>
                <OrderItemButton
                    fType="add"
                    onClick={() => dispatch(addOrderItem(order.id))}
                >
                    <IconContext.Provider value={{color: "green"}}>
                        <FaPlusSquare style={{width: "20px", height: "20px"}} />
                    </IconContext.Provider>
                </OrderItemButton>
                <OrderItemButton
                    fType="remove"
                    onClick={() => dispatch(removeOrderItem(order.id))}
                >
                    <IconContext.Provider value={{color: "orange"}}>
                        <FaMinusSquare style={{width: "20px", height: "20px"}} />
                    </IconContext.Provider>
                </OrderItemButton>
                <OrderItemButton
                    fType="delete"
                    onClick={() => dispatch(deleteOrderItem(order.id))}
                >
                    <IconContext.Provider value={{color: "red"}}>
                        <FaTrash style={{width: "20px", height: "20px"}} />
                    </IconContext.Provider>
                </OrderItemButton>
            </OrderItemButtons>
        </OrderItemWrapper>
    );
};

const OrderItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const OrderIndex = styled.div`
    font-weight: 700;
    padding-right: 10px;
`

const OrderImageBlock = styled.div`
  padding-right: 15px;
`

const OrderImage = styled.img`
  width: 128px;
`

const OrderItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 20px;
`

const OrderItemInfoName = styled.div`
  padding-bottom: 10px;
  font-size: 15px;
`

const OrderItemInfoCount = styled.div`
  font-size: 12px;
`

const OrderItemInfoPrice = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin-right: 10px;
`

const OrderItemButtons = styled.div`
  display: flex;
  align-items: center;
`

interface OrderItemButtonProps {
    fType: "add" | "remove" | "delete"
}

const OrderItemButton = styled.button<OrderItemButtonProps>`
  margin-right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  transition: box-shadow .2s ease-in-out;
  padding: 5px;
  &:hover {
    -webkit-box-shadow: 0px 0px 5px 0px rgba(204, 135, 0, 1);
    -moz-box-shadow: 0px 0px 5px 0px rgba(204, 135, 0, 1);
    box-shadow: 0px 0px 5px 0px rgba(204, 135, 0, 1);
  }
  ${({fType}) =>
      fType === "add" && css`
        &:hover {
          -webkit-box-shadow: 0px 0px 5px 0px green;
          -moz-box-shadow: 0px 0px 5px 0px green;
          box-shadow: 0px 0px 5px 0px green;
        }
      `
    }
  ${({fType}) =>
      fType === "remove" && css`
        &:hover {
          -webkit-box-shadow: 0px 0px 5px 0px orange;
          -moz-box-shadow: 0px 0px 5px 0px orange;
          box-shadow: 0px 0px 5px 0px orange;
        }
      `
  }
  ${({fType}) =>
      fType === "delete" && css`
        &:hover {
          -webkit-box-shadow: 0px 0px 5px 0px red;
          -moz-box-shadow: 0px 0px 5px 0px red;
          box-shadow: 0px 0px 5px 0px red;
        }
      `
  }
`


export default OrderItem;
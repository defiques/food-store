import React, {FC} from 'react';
import {IBurger} from "../../models/IBurger";
import styled from "@emotion/styled";
import {FaCartPlus} from "react-icons/fa";
import { IconContext } from "react-icons";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {burgerSlice} from "../../store/reducers/burgerSlice";

interface BurgerItemListProps {
    data: IBurger
}

const BurgerItemList:FC<BurgerItemListProps> = ({data: { id, image, name, price }}) => {

    const dispatch = useAppDispatch();
    const { addOrderItem, removeOrderItem } = burgerSlice.actions;
    const order = useAppSelector( s => s.burgerReducer.order);
    const elId = order.findIndex( el => el.id === id);

    return (
        <BurgerContainer onClick={() => dispatch(addOrderItem(id))}>
            <div><img src={image} alt={image}/></div>
            <BurgerText>{name}</BurgerText>
            <BurgerFlexRow>
                <BurgerPrice>от {price} ₽</BurgerPrice>
                {elId > -1 &&
                    <div>
                        <button
                            onClick={(event) => {
                                event.stopPropagation()
                                dispatch(removeOrderItem(id))}}>-</button>
                        <span>{order[elId].count}</span>
                        <button
                            onClick={(event) => {
                                event.stopPropagation();
                                dispatch(addOrderItem(id))}}>+</button>
                    </div>
                }
                <IconContext.Provider value={{color: 'orange'}}>
                    <FaCartPlus style={{width: '40px', height: '40px'}}/>
                </IconContext.Provider>
            </BurgerFlexRow>
        </BurgerContainer>
    );
};

const BurgerContainer = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 0px 0px 8px -1px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 8px -1px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 8px -1px rgba(34, 60, 80, 0.2);
  transition: box-shadow .2s linear ;
  cursor: pointer;
  padding: 20px 15px;
  &:hover {
    -webkit-box-shadow: 0 0 8px 2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0 0 8px 2px rgba(34, 60, 80, 0.2);
    box-shadow: 0 0 8px 2px rgba(34, 60, 80, 0.2);
  }
`

const BurgerText = styled.div`
  text-align: center;
  font-size: 17px;
  margin-bottom: 15px;
`

const BurgerPrice = styled.div`
  font-weight: 700;
  font-size: 17px;
`

const BurgerFlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  & button {
    border: none;
    border-radius: 5px;
    font-size: 20px;
    padding: 5px 10px;
    background: lightgray;
    font-weight: 700;
    cursor: pointer;
    transition: background .3s ease-in-out;
    width: 30px;
    &:hover {
      background: gray;
    }
  }
  & span {
    margin: 0 10px
  }
`

export default BurgerItemList;
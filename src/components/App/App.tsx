import React, {FC} from 'react';
import {Container} from "../../styled/Container";
import SearchPanel from "../SearchPanel/SearchPanel";
import BurgerFilter from "../BurgerFilter/BurgerFilter";
import BurgerList from "../BurgerList/BurgerList";
import {css, Global} from "@emotion/react";
import {FlexRowContainer} from "../../styled/FlexRowContainer";
import Order from "../Order/Order";
import Header from "../Header/Header";

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
`

const App:FC = () => {
    return (
            <Container>
                <Global styles={globalStyles} />
                <Header />
                <FlexRowContainer style={{width: '100%', justifyContent: 'space-evenly'}}>
                    <SearchPanel />
                    <Order />
                </FlexRowContainer>
                <BurgerFilter />
                <BurgerList />
            </Container>
    );
};

export default App;
import React, {FC} from 'react';
import {FlexRowContainer} from "../../styled/FlexRowContainer";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {MainCategory} from "../../styled/MainCategory";
import {InternalCategory} from "../../styled/InternalCategory";
import {burgerSlice} from "../../store/reducers/burgerSlice";
import { v4 as uuidv4 } from 'uuid';

const BurgerFilter:FC = () => {

    const categories = useAppSelector( s => s.burgerReducer.shopCategories);
    const mainCategoryFilter = useAppSelector( s => s.burgerReducer.mainFilter);
    const internalCategoryFilter = useAppSelector( s => s.burgerReducer.internalFilter);
    const { mainFilterHandler, internalFilterHandler } = burgerSlice.actions;
    const dispatch = useAppDispatch();

    return (
        <>
            <FlexRowContainer>
                {categories.map( (c, index) =>
                    <MainCategory
                        key={index}
                        active={c.mainCategory === mainCategoryFilter}
                        onClick={() => dispatch(mainFilterHandler(c.mainCategory))}
                    >
                        {c.mainCategory}
                    </MainCategory>
                )}
            </FlexRowContainer>
            <FlexRowContainer>
                {categories.map( (c) =>
                    c.mainCategory === mainCategoryFilter
                        && c.internalCategory?.map( ic =>
                            <InternalCategory
                                key={uuidv4()}
                                active={ic === internalCategoryFilter}
                                onClick={() => dispatch(internalFilterHandler(ic))}
                            >
                                {ic}
                            </InternalCategory>
                    )
                )}
            </FlexRowContainer>
        </>
    );
};

export default BurgerFilter;
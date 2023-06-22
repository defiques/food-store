import React, {FC} from 'react';
import {FlexRowContainer} from "../../styled/FlexRowContainer";
import {useAppSelector} from "../../hooks/redux";
import {IBurger} from "../../models/IBurger";
import BurgerItemList from "../BurgerItemList/BurgerItemList";

const BurgerList:FC = () => {

    const mainCategoryFilter = useAppSelector( s => s.burgerReducer.mainFilter);
    const internalCategoryFilter = useAppSelector( s => s.burgerReducer.internalFilter);
    const burgers = useAppSelector( s => s.burgerReducer.burgers);
    const search = useAppSelector( s => s.burgerReducer.search);

    const filterData = (data: IBurger[], mFilter: string, iFilter: string | null) => {

        const filteredData = data.filter( (d) => d.categories.mainCategory.includes(mFilter))

        if (iFilter === "Все" || iFilter === null) {
            return filteredData
        }
        return (
            filteredData.filter( (d) => d.categories.internalCategory === internalCategoryFilter)
        )
    }

    const searchData = (data: IBurger[], search: string) => {
        if (!search) {
            return data
        }
        return data.filter( (d) => d.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
    }

    const filterBurgers = searchData(filterData(burgers, mainCategoryFilter, internalCategoryFilter), search);

    if (filterBurgers.length === 0) {
        return <div>Таких товаров нет</div>
    }


    return (
        <FlexRowContainer>
            {
                filterBurgers.map( i =>
                    <BurgerItemList key={i.id} data={i}/>
                )
            }
        </FlexRowContainer>
    );
};

export default BurgerList;
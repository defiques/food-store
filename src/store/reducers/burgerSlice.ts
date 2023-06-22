import {IBurger} from "../../models/IBurger";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICategories} from "../../models/ICatergories";
import {IBurgerOrder} from "../../models/IBurgerOrder";

interface BurgerState {
    burgers: IBurger[]
    mainFilter: string,
    internalFilter: string | null
    search: string,
    shopCategories: ICategories[],
    order: IBurgerOrder[],
    totalOrderCount: number
    totalSum: number
}

const initialState: BurgerState = {
    burgers: [
        {
            id: 1,
            name: 'Барселона Бургер',
            image: '/assets/barcelona.png',
            categories: {
                mainCategory: [
                    'Новинки', 'Бургеры и роллы'
                ],
                internalCategory: 'Говядина'
            },
            price: 239
        },
        {
            id: 2,
            name: 'Чикен Премьер',
            image: '/assets/chicken-prem.png',
            categories: {
                mainCategory: [
                    'Популярное', 'Бургеры и роллы'
                ],
                internalCategory: 'Курица'
            },
            price: 159
        },
        {
            id: 3,
            name: 'Гранд фри',
            image: '/assets/grand-fri.png',
            categories: {
                mainCategory: [
                    'Картофель, стартеры и салаты'
                ],
                internalCategory: 'Картофель'
            },
            price: 65
        },
        {
            id: 4,
            name: 'Биг хит',
            image: '/assets/big-hit.png',
            categories: {
                mainCategory: [
                    'Популярное', 'Бургеры и роллы'
                ],
                internalCategory: 'Говядина'
            },
            price: 165
        },
        {
            id: 5,
            name: 'Наггетсы',
            image: '/assets/naggets.png',
            categories: {
                mainCategory: [
                    'Популярное', 'Картофель, стартеры и салаты'
                ],
                internalCategory: 'Стартеры'
            },
            price: 59
        },
        {
            id: 6,
            name: 'Двойной Фиш Бургер',
            image: '/assets/fish-burger.png',
            categories: {
                mainCategory: [
                    'Новинки', 'Бургеры и роллы'
                ],
                internalCategory: 'Морепродукты'
            },
            price: 221
        },
        {
            id: 7,
            name: 'Биг Спешиал Ролл',
            image: '/assets/big-special-roll.png',
            categories: {
                mainCategory: [
                    'Бургеры и роллы'
                ],
                internalCategory: 'Роллы'
            },
            price: 221
        }
    ],
    mainFilter: "Новинки",
    internalFilter: null,
    search: '',
    shopCategories: [
        {
            mainCategory: "Новинки",
            internalCategory: null
        },
        {
            mainCategory: "Популярное",
            internalCategory: null
        },
        {
            mainCategory: "Бургеры и роллы",
            internalCategory: [
                "Все", "Говядина", "Курица", "Морепродукты", "Роллы"
            ]
        },
        {
            mainCategory: "Картофель, стартеры и салаты",
            internalCategory: [
                "Все", "Картофель", "Стартеры", "Салаты"
            ]
        }
    ],
    order: [],
    totalOrderCount: 0,
    totalSum: 0
};

export const burgerSlice = createSlice({
    name: 'burger',
    initialState,
    reducers: {
        mainFilterHandler(state, action:PayloadAction<string>) {
            state.mainFilter = action.payload;
            const iCategory = state.shopCategories.filter( i => i.mainCategory === action.payload)[0].internalCategory;
            !iCategory ? state.internalFilter = iCategory : state.internalFilter = iCategory[0]
        },

        internalFilterHandler(state, action:PayloadAction<string>) {
            state.internalFilter = action.payload;
        },

        searchHandler(state, action:PayloadAction<string>) {
            state.search = action.payload;
        },

        addOrderItem(state, action: PayloadAction<number>) {
            const elOrdId = state.order.findIndex( el => el.id === action.payload );
            if (elOrdId > -1) {
                state.order[elOrdId].count += 1;
                state.totalSum += state.order[elOrdId].price;
            }
            else {
                const elBurgId = state.burgers.findIndex( el => el.id === action.payload );
                state.order.push({
                    id: action.payload,
                    name: state.burgers[elBurgId].name,
                    image: state.burgers[elBurgId].image,
                    price: state.burgers[elBurgId].price,
                    count: 1
                });
                state.totalSum += state.burgers[elBurgId].price;
            }
            state.totalOrderCount += 1;
        },

        removeOrderItem(state, action: PayloadAction<number>) {
            const elOrdId = state.order.findIndex( el => el.id === action.payload );
            if (state.order[elOrdId].count === 1) {
                state.totalSum -= state.order[elOrdId].price;
                state.order = state.order.filter( el => el.id !== action.payload);
            }
            else {
                state.order[elOrdId].count -= 1;
                state.totalSum -= state.order[elOrdId].price;
            }
            state.totalOrderCount -= 1;

        },
        deleteOrderItem(state, action: PayloadAction<number>) {
            const elOrdId = state.order.findIndex( el => el.id === action.payload );
            state.totalSum -= state.order[elOrdId].price * state.order[elOrdId].count;
            state.totalOrderCount -= state.order[elOrdId].count;
            state.order = state.order.filter( el => el.id !== action.payload);
        },

        completeOrder(state) {
            state.order = [];
            state.totalSum = 0;
            state.totalOrderCount = 0;
            alert("Вы успешно сделали заказ, ждем Вас снова");
        }

    }
});

export default burgerSlice.reducer;



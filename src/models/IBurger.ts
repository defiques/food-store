interface IBurgerCategories {
    mainCategory: string[],
    internalCategory: string
}

export interface IBurger {
    id: number,
    name: string,
    price: number,
    image: string,
    categories: IBurgerCategories
}
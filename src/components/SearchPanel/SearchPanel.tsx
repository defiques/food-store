import React, {ChangeEvent, FC, useState} from 'react';
import {InputField} from "../../styled/InputField";
import {useAppDispatch } from "../../hooks/redux";
import {burgerSlice} from "../../store/reducers/burgerSlice";

const SearchPanel:FC = () => {

    const [value, setValue] = useState<string>('');
    const { searchHandler } = burgerSlice.actions;
    const dispatch = useAppDispatch();

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        dispatch(searchHandler(e.target.value))
    }

    return (
        <InputField
            placeholder="Введите название продукта"
            value={value}
            onChange={onChangeHandler}
        />

    );
};

export default SearchPanel;
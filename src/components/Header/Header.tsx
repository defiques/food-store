import React, {FC} from 'react';
// @ts-ignore
import logo from './logo.png'

const Header:FC = () => {

    return (
        <div>
            <img src={logo} alt="Logo" style={{padding: 10}}/>
        </div>
    );
};

export default Header;
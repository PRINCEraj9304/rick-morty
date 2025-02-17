/*

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../images/download.jpeg';

const Header = ({ setText }) => {
    const [isdarkmode, isSetdarkmode] = useState(false);

    const location = useLocation();
    const isCharcterdetailpage = location.pathname.startsWith('/character/');

    const togglemode = () => {
        isSetdarkmode(!isdarkmode);
        if (!isdarkmode) {
            document.body.style.backgroundColor = 'black';
        } else {
            document.body.style.backgroundColor = 'white';
        }
    };

    const getText = (e) => {
        setText(e.target.value);
    };

    if (isCharcterdetailpage) {
        return null;
    }

    return (
        <div className="navbar">
            <div className="navbar-container">
                <img src={logo} alt="logo" className="logo" />
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search By Name"
                        onChange={getText}
                    />
                </div>
                <button className="toggle-btn" onClick={togglemode}>
                    {isdarkmode ? 'Light' : 'Dark'}
                </button>
            </div>
        </div>
    );
};

export default Header;

*/

import { useDispatch } from 'react-redux';
import { setSearchText } from '../slices/searchSlice';
import { useLocation } from 'react-router-dom';
import logo from '../images/download.jpeg';
import { toggleTheme } from '../slices/themeSlice';
import {useSelector} from 'react-redux';

const Header = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const isCharacterDetailPage = location.pathname.startsWith('/character/');
    const isDarkmode = useSelector((state) => state.theme.isDarkmode);

    if (isCharacterDetailPage) {
        return null;
    }

    return (
        <div className="navbar">
            <div className="navbar-container">
                <img src={logo} alt="logo" className="logo" />
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search By Name"
                        onChange={(e) => dispatch(setSearchText(e.target.value))}
                    />
                </div>
                <button className='toggle-btn' onClick={() => dispatch(toggleTheme())}> {isDarkmode ? 'Light' : 'Dark'} </button>
            </div>
        </div>
    );
};

export default Header;


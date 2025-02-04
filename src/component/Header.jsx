
import { AppBar, Box, InputBase, styled, Toolbar } from '@mui/material'
import logo from '../images/download.jpeg'
import SearchIcon from '@mui/icons-material/Search';

const Appbarccss = styled(AppBar)`
   background: #000;
   padding : 10px;
   height: 90px
`

const BoxCss = styled(Box)`
     background-color: rgb(255,255,255,0.15);
     margin-left:25px;
     border-radius:5px
     position: relative
`

const InputBaseCss = styled(InputBase)`
      color: inherit;
      margin: 0 70px;
`

const SearchIconcss = styled(SearchIcon)`
     position: absolute;
     margin-top: 5px;
     margin-left: 5px;

`

const Header = ({setText}) => {


    const getText = (e)=>{
      setText(e.target.value);
    }

    return (
        <Appbarccss position='static'>
            <Toolbar>
                <img src={logo} alt="logo" style={{ width: 70 }} />
                <BoxCss>
                    <SearchIconcss />
                    <InputBaseCss
                        placeholder="Search By Name"
                        onChange={(e) => getText(e)} />
                </BoxCss>   
            </Toolbar>
        </Appbarccss>
    )
}


export default Header
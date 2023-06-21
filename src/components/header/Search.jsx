import { Box, InputBase, List, ListItem, styled } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";
import { Link } from "react-router-dom";
const SearchContainer = styled(Box)`
    background-color: #fff;
    width: 38%;
    border-radius: 2px;
    margin-left: 10px;
    display: flex;
`
const InputSearchBase = styled(InputBase)`
    padding-left: 20px;
    width: 100%;
    font-size: unset;
`
const SearchIconWrapper = styled(Box)`
    color: blue;
    padding: 5px;
    display: flex;
`

const ListWrapper=styled(List)(({theme})=>({
    position:'absolute',
    color:'black',
    background:'white',
    marginTop:30,
}))
const Search = () => {
    const [text, setText] = useState('');
    const getText = (text) => {
        setText(text);
    }
    const [textValue, setTextValue]=useState('');
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.getProducts);

    console.log(products)
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    return (
        <SearchContainer>
            <InputSearchBase
                placeholder="Search for products, brands and more...."
                onChange={(e) => getText(e.target.value)}

                value={!text ?textValue :text}
            />
            <SearchIconWrapper>
                <SearchOutlined />
            </SearchIconWrapper>
            {text && (
                <ListWrapper>
                    {
                        products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                            <ListItem>
                                <Link className="link" to={`/product/${product.id}`} onClick={()=>{setText(''); setTextValue(product.title.longTitle);}}>
                                {product.title.longTitle}
                                </Link>
                            </ListItem>
                        ))
                    }
                </ListWrapper>
            )}
        </SearchContainer>
    )
}
export default Search;
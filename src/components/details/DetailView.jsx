import React from 'react'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../redux/actions/productActions';
import { Box, Grid, Typography, styled } from '@mui/material';
import ActionItem from './ActionItem';
import { fassured } from '../../constants/data';
import ProductDetail from './ProductDetail';

const Component = styled(Box)`
  background: #f2f2f2;
  margin-top: 55px;
`

const Container = styled(Grid)(({theme})=>({
  backgroundColor: '#ffffff',
  display: 'flex',
  [theme.breakpoints.down('md')]:{
    margin:0,
    paddingRight:10
  }
}))


const RightContainer = styled(Grid)`
margin-top: 50px;
`
const DetailView = () => {

  const dispatch = useDispatch();
  const { loading, product } = useSelector(state => state.getProductDetails);
  const { id } = useParams();
  console.log(product);
  console.log(loading);
  useEffect(() => {
    if (product && id !== product.id)
      dispatch(getProductDetails(id));
  }, [dispatch, id, loading]);


  return (
    <Component>
      {
        !loading && product && Object.keys(product).length && (
          <Container container>
            <Grid style={{margin:0}} item lg={5} md={5} sm={12} xs={12}>
              <ActionItem product={product} />
            </Grid>
            <RightContainer item lg={7} md={7} sm={12} xs={12} >
              
              <ProductDetail product={product} />
            </RightContainer>
          </Container>
        )
      }
    </Component>
  )
}

export default DetailView
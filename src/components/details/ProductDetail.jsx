import { Box, Table, TableBody, TableCell, TableRow, Typography, styled } from '@mui/material'
import React from 'react'
import { fassured, flipkartPoint } from '../../constants/data'
import { LocalOffer } from '@mui/icons-material'

const SmallText = styled(Box)`
font-size: 14px;
vertical-align: baseline;
&> p{
    font-size: 14px;
    margin-top: 10px;
}
`

const StyledBadge = styled(LocalOffer)`
    margin-right: 10px;
    color: #00CC00;
    font-size: 15px;
`

const ColoumnText = styled(TableRow)`
    font-size: 14px;
    vertical-align: baseline;
    &> td{
        font-size: 14px;
        margin-top: 10px;
        border: none;
    }
`
const Image=styled('img')(({theme})=>({
    width:'100%',
    [theme.breakpoints.down('md')]:{
        display:'none'
    }
}))

const ResImage= styled('img')(({theme})=>({
    width:'100%',
    display:'none',
    [theme.breakpoints.down('md')]:{
        display:'flex'
    }
}))

const DescTableCell= styled(TableCell)(({theme})=>({
    width:'30%',
    // background:'#8f0d58',
}))

const DetailTableCell= styled(TableCell)(({theme})=>({
    textAlign:'justify'
}))
const ProductDetail = ({ product }) => {
    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000));
    return (
        <>
            <Typography>{product.title.longTitle} </Typography>
            <Typography style={{ marginTop: 5, color: '#878787', fontSize: 14 }}>8 Rating & 1 reviews
                <Box component="span"><img src={fassured} style={{ width: 77, marginLeft: 20 }} alt="" /> </Box>
            </Typography>
            <Typography>
                <Box component="span" style={{ fontSize: 28 }} >₹{product.price.cost} </Box>&nbsp;&nbsp;&nbsp;
                <Box component="span" style={{ color: '#878787' }} ><strike> ₹{product.price.mrp}</strike> </Box>&nbsp;&nbsp;&nbsp;
                <Box component="span" style={{ color: '#388E3C' }} >{product.price.discount} off </Box>
            </Typography>
            <Typography>Available Offers</Typography>
            <SmallText>
                <Typography><StyledBadge /> Get extra 20% off upto ₹ 50 on 1 item(s) T&C</Typography>
                <Typography><StyledBadge /> Get extra 13% off (price inclusive of discount) T&C</Typography>
                <Typography><StyledBadge /> Sign up for Flipkart Pay later and get Flipkart Gift Card worth ₹100* Know More</Typography>
                <Typography><StyledBadge /> Buy 2 items save 5%; Buy 3 or more save 10% T&C</Typography>
                <Typography><StyledBadge /> 5% Cashback on Flipkart Axis Bank Card</Typography>
                <Typography><StyledBadge /> No Cost EMI on Bajaj Finserv EMI Card on cart value above ₹2999 T&C</Typography>

            </SmallText>
            <Table>
                <TableBody>
                     <ColoumnText>
                        <DescTableCell style={{ color: "#878787" }} >Delievery</DescTableCell>
                        <DetailTableCell style={{ fontWeight: 600, }} >Delievery by {date.toDateString()} | ₹40 </DetailTableCell>
                    </ColoumnText>
                    <ColoumnText>
                        <DescTableCell style={{ color: "#878787" }} >Warranty</DescTableCell>
                        <DetailTableCell >No Warranty </DetailTableCell>
                    </ColoumnText>
                    <ColoumnText>
                        <DescTableCell style={{ color: "#878787" }} >Seller</DescTableCell>
                        <DetailTableCell style={{ color: '#2874f0' }} >
                            <Box component="span">
                                SuperRetail
                            </Box>
                            <Typography>GST invoice available</Typography>
                            <Typography>View more sellers starting from ₹{product.price.cost} </Typography>
                        </DetailTableCell>
                    </ColoumnText>
                    <ColoumnText>
                        <DescTableCell>
                            <Image src={flipkartPoint} width={390} alt="flipkartPoints" />
                        </DescTableCell>
                        <DetailTableCell>
                            <ResImage src={flipkartPoint} width={390} alt="flipkartPoints" />
                        </DetailTableCell>
                    </ColoumnText> 
                    <ColoumnText>
                        <DescTableCell style={{ color: '#878787' }}>Description</DescTableCell>
                        <DetailTableCell>{product.description} </DetailTableCell>
                    </ColoumnText>
                </TableBody>
            </Table>
        </>
    )
}

export default ProductDetail
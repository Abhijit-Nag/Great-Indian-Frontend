import { LocalOffer } from '@mui/icons-material'
import { Box, Grid, Typography, styled } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    background: 'white',
    margin: 10,
    padding: 30,

    [theme.breakpoints.down('sm')]: {
        // flexDirection:'column'
    }

}))

const StyledSpan = styled('span')(({ theme }) => ({
    fontFamily: 'Gabriola',
    fontSize: 18,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: 1.6,
    opacity: 0.6,
    margin: 10,
    [theme.breakpoints.down('sm')]: {
        display: 'none',
        margin: 6
    }
}))

const StyledBadge = styled(LocalOffer)`
    margin: 0px 10px;
    color: #00CC00;
    font-size: 15px;
`

const ImageWrapper = styled(Box)(({ theme }) => ({
    padding: 30, borderRadius: 6, flex: 3,
    [theme.breakpoints.down('sm')]: {
        padding: 0,
        marginRight: 16
    }
}))
const Image = styled('img')(({ theme }) => ({
    width: 180,
    borderRadius: 6,
    [theme.breakpoints.down('sm')]: {
        width: 60
    }
    // boxShadow:'1px 2px 10px 0px rgb(0,0,0,0.3)'
}))

const Description = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 9,
    [theme.breakpoints.down('sm')]: {

    }
}))

const Header = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column'
    }
}));

const Heading = styled(Typography)(({ theme }) => ({
    fontSize: 22,
    marginRight: 30,
    // textDecoration: 'underline',
    fontFamily:'Montserrat',
    fontWeight:500,
    [theme.breakpoints.down('sm')]: {
        fontSize: 16,
        margin: 0
    }
}));

const ExtraTitle = styled(Box)(({ theme }) => ({
    display: 'flex'
}));

const ShortTitle = styled(Typography)(({ theme }) => ({
    fontSize: 16,
    margin: 10,
    marginLeft: 100,
    background: '#f2f2f2',
    borderRadius: 6,
    padding: 6,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        margin: 10,
        padding: 1,
        fontSize: 15,
        width: 120,
    },
    [theme.breakpoints.down('sm')]: {
        margin: 10,
        padding: 1,
        fontSize: 11,
        width: 100,
    }
}));

const Tagline = styled(Typography)(({ theme }) => ({
    fontSize: 16,
    margin: 10,
    marginLeft: 100,
    background: '#d3895e',
    borderRadius: 6,
    color: 'white',
    textAlign: 'center',

    padding: 6,
    [theme.breakpoints.down('md')]: {
        margin: 10,
        padding: 1,
        fontSize: 15,
        width: 120,
    },
    [theme.breakpoints.down('sm')]: {
        margin: 10,
        padding: 1,
        fontSize: 11,
        width: 100,
    }
}));

const PriceWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('md')]: {
        justifyContent: 'space-around'
    },
    [theme.breakpoints.down('sm')]: {
        margin: 0,
        '&> p': {
            fontSize: 16
        },
        '& > span': {

        }
    }
}));

const OrderWrapper = styled(Box)(({ theme }) => ({
    // display:'flex',
    // [theme.breakpoints.down('md')]:{
    //     flexDirection:'column'
    // }
}));

const DeliveryWrapper = styled(Typography)(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.up('md')]: {

        alignItems: 'center',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'none'
    }

}));

const OrderTimeWraper = styled(Typography)(({ theme }) => ({
    display: 'flex',

    [theme.breakpoints.up('md')]: {

        alignItems: 'center',
        '&>p': {
            display: 'flex',
            alignItems: 'center'
        }
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'none'
    },
}));

const DeliveryText = styled(Typography)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center'
    // [theme.breakpoints.up('md')]:{

    //     alignItems:'center',
    // },
    // [theme.breakpoints.down('md')]:{
    //     flexDirection:'column',
    //     alignItems:'none'
    // }

}));

const StatusText = styled(Typography)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center'
    // [theme.breakpoints.up('md')]:{

    //     alignItems:'center',
    // },
    // [theme.breakpoints.down('md')]:{
    //     flexDirection:'column',
    //     alignItems:'none'
    // }


}));

const PriceText = styled(Typography)(({ theme }) => ({
    display: 'flex',
    alignItems: "center",
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'row'
    }
}))
const OrderItem = ({ item , orderDetails}) => {
    const details = item;
    const date = new Date(orderDetails.orderPaymentDetails.timeOfPayment);
    const deliveryDate = (new Date(date.getTime() + 5 * 24 * 60 * 60 * 1000)).toLocaleString();
    // console.log(deliveryDate);
    return (
        <Link to={`/product/${item.id}`} className='link'>

            <Container>
                <ImageWrapper >

                    <Image src={details.detailUrl} alt="" backgroundColor="#f2f2f2" />
                </ImageWrapper>
                <Description>
                    <Header style={{ display: 'flex', justifyContent: 'space-between', width: '100%', }}>
                        <Heading ><StyledBadge /> {details.title.longTitle} </Heading>
                        <Typography><StyledBadge />{details.price.discount} OFF </Typography>
                    </Header>
                    <ExtraTitle>
                        <ShortTitle ><StyledBadge />{details.title.shortTitle} </ShortTitle>
                        <Tagline ><LocalOffer style={{ marginRight: 10, fontSize: 15, color: "white" }} />{details.tagline} </Tagline>
                    </ExtraTitle>
                    <Typography style={{ display: 'flex', alignItems: 'center' }} > <StyledSpan><StyledBadge />Quantity : </StyledSpan> {details.quantity} </Typography>
                    <PriceWrapper >

                        <PriceText fontWeight="bold" > <StyledSpan><StyledBadge /> Price : </StyledSpan>₹ {details.price.cost} </PriceText>
                        <PriceText >  <StyledSpan><StyledBadge /> MRP : </StyledSpan> <strike>₹ {details.price.mrp}</strike> </PriceText>
                        <PriceText > <StyledSpan><StyledBadge /> Discount : </StyledSpan> {details.price.discount}OFF </PriceText>
                    </PriceWrapper>

                    <OrderWrapper >
                        <DeliveryWrapper>

                            <DeliveryText style={{ fontSize: 20, marginRight: 30, fontFamily: 'robotto' }}><StyledBadge /> <StyledSpan style={{ color: 'black', opacity: 0.6, display: 'block' }}>Delivery By : </StyledSpan> {deliveryDate} </DeliveryText>
                            <StatusText><StyledBadge /> <StyledSpan style={{ color: 'black', opacity: 0.6, display: 'block' }}>Delivery Status : </StyledSpan> On the way.. </StatusText>
                        </DeliveryWrapper>
                        <OrderTimeWraper>
                            <Typography > <StyledSpan style={{ color: 'black', opacity: 0.6, display: 'block' }}><StyledBadge />Ordered On : </StyledSpan> {orderDetails.orderPaymentDetails.timeOfPayment} </Typography>
                            <Typography > <StyledSpan style={{ color: 'black', opacity: 0.6, display: 'block' }}><StyledBadge />Order ID : </StyledSpan> {orderDetails.orderPaymentDetails.razorpay_order_id} </Typography>
                        </OrderTimeWraper>

                    </OrderWrapper>
                </Description>
            </Container>
        </Link>
    )
}

export default OrderItem
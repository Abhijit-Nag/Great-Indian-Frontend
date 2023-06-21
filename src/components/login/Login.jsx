import React, { useContext, useState } from 'react'
import { Box, Button, Dialog, TextField, Typography, styled } from "@mui/material";
import { authenticateLogin, authenticateSignup } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { signInWithGoogle } from '../../firebaseConfig';

const Component = styled(Box)(({ theme }) => ({

    height: '70vh',
    width: '90vh',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height:'100%',
        // background:'green'
    }
}))

const Image = styled(Box)(({ theme }) => ({

    background: '#2874f0 url("https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png") center 85% no-repeat',
    height: '100%',
    width: '40%',
    '&> h5': {
        marginTop: 45,
        marginLeft: 35,
        marginRight: 35,
        color: 'white',
        fontWeight: 600,
    },
    '&>p': {
        marginTop: 45,
        marginLeft: 35,
        marginRight: 35,
        color: 'white',
        fontWeight: 600,
    },
    [theme.breakpoints.down('sm')]:{
        width:'100%',
        margin:0,
        display:'none',
        '&>h5':{
            marginTop:30,
            marginLeft:30,
            display:'block'
        },
        '&>p':{
            margin:10,
            marginBottom:30
        }
    }
}));
const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 25px 35px;
    flex: 1;

    &> div, &>button, &>p{
        margin-top: 20px;
    }
`;
const LoginButton = styled(Button)`
    text-transform: none;
    background-color: #fb641b;
    color: white;
    height: 48px;
    border-radius: 2px;
`
const RequestOTP = styled(Button)`
    text-transform: none;
    background-color: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`
const Text = styled(Typography)`
    font-size: 12px;
    color: #878787;
`
const CreateAccount = styled(Typography)`
    font-size: 14px;
    text-align: center;
    color: #2874f0;
    font-weight: 600;
    cursor: pointer;

`
const Error = styled(Typography)`
    color: #ff6161;
    font-size: 10px;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
const Login = ({ open, setOpen }) => {

    const handleClose = () => {
        setOpen(false);
        setCustomerAccount(accountFields.login);
        setError(false);
        setErrorMessage("");
    }

    const accountFields = {
        login: {
            view: 'login',
            heading: "Login",
            subHeading: "Get access to your Orders, Wishlist and Recommendations"
        },
        signUp: {
            view: 'signup',
            heading: "Looks like you're new here!",
            subHeading: "Sign up with your mobile number to get started"
        }
    }

    const signUpInitialValues = {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        phone: ''
    }

    const loginInitialValues = {
        username: '',
        password: ''
    }
    const [CustormerAccount, setCustomerAccount] = useState(accountFields.login);
    const [signUp, setSignUp] = useState(signUpInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const { setAccount } = useContext(DataContext);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const toggleSignUp = () => {
        setCustomerAccount(accountFields.signUp);
    }

    const onInputChange = (e) => {
        setSignUp({ ...signUp, [e.target.name]: e.target.value });
        console.log(signUp);
    }
    const signUpUser = async () => {
        let response = await authenticateSignup(signUp);
        console.log(response);
        if (response.status === 200) {
            handleClose();
            setAccount(signUp.firstname);
        }
        else {
            setErrorMessage(response.data.errorResponse);
            setError(true);
            return;
        };

    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        let response = await authenticateLogin(login);
        console.log(response);
        const { data } = response.data;
        if (response.status === 200) {
            setAccount(response.data.data.firstname);
            handleClose();
            localStorage.setItem('username', data.username);
            localStorage.setItem('email', data.email);
            localStorage.setItem('firstname', data.firstname);
            localStorage.setItem('lastname', data.lastname);
            localStorage.setItem('phone', data.phone);
            localStorage.setItem('userId', data._id);
            const address=data.address[data.address.length-1];
            localStorage.setItem("country", address.country);
            localStorage.setItem("state", address.state);
            localStorage.setItem("district", address.district);
            localStorage.setItem("postalCode", address.postalCode);
            localStorage.setItem("fullAddress", address.fullAddress);
            // window.localStorage.setItem({
            //     'username': data.username,
            //     // 'email':data.email,
            //     // 'firstname':data.firstname,
            //     // 'lastname': data.lastname,
            //     // 'phone':data.phone,
            //     // 'userId':data.id
            // });
            // window.localStorage.setItem({
            //     'username': login.username
            // })
        }
        else {
            setError(true);
            setErrorMessage(response.data.errorResponse);
        }
    }
    return (
        <Dialog open={open}  onClose={handleClose} PaperProps={{ sx: { maxWidth: "unset" } }} >
            <Component>
                <Image>
                    <Typography variant='h5' >{CustormerAccount.heading} </Typography>
                    <Typography style={{ marginTop: "20px" }} >{CustormerAccount.subHeading} </Typography>
                </Image>
                {
                    CustormerAccount.view === 'login' ? (
                        <Wrapper>
                            <TextField variant='standard' name='username' onChange={(e) => onValueChange(e)} label='Enter Username' />
                            {error && <Error>{errorMessage} </Error>}
                            <TextField variant='standard' name='password' onChange={(e) => onValueChange(e)} label='Enter Password' />
                            <Text>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Text>
                            <LoginButton onClick={loginUser}>Login</LoginButton>
                            <Typography style={{ textAlign: "center" }}>OR</Typography>
                            {/* <RequestOTP>Request OTP</RequestOTP> */}
                            <RequestOTP onClick={signInWithGoogle} ><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png" style={{width:30, marginRight:10}} alt="" /> Google</RequestOTP>
                            <CreateAccount onClick={toggleSignUp} >New to Flipkart? Create an account</CreateAccount>
                        </Wrapper>
                    )
                        :
                        (
                            <Wrapper>
                                {error && <Error>username or email already exists! </Error>}
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name='firstname' label='Enter First Name' />
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name='lastname' label='Enter LastName' />
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name='username' label='Enter username' />
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name='phone' label='Enter Phone' />
                                <LoginButton onClick={signUpUser} >Continue</LoginButton>

                            </Wrapper>
                        )
                }

            </Component>
        </Dialog>
    )
}

export default Login
import { Send } from '@mui/icons-material';
import { Box, TextareaAutosize, Typography, styled } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import Loader from './Loader';
import ai_background from '../../assets/ai_background.png';

const InputSearchBase= styled(TextareaAutosize)(({theme})=>({
    width:'90%',
    // position:'fixed',
    // bottom:10,
    border:'none',
    // margin:10,
    // borderRadius:3,
    padding:10,
    resize:'none',

    '&:focus':{
        outline:'none'
    },

   [theme.breakpoints.down('sm')]:{
    marginLeft:10
   }
    
  
}))

const SearchWrapper= styled(Box)(({theme})=>({
    width:'80%',
    position:'fixed',
    display:'flex',
    bottom:10,
    alignItems:'center',
    border:'gray 1px solid',
    margin:10,
    borderRadius:3,
    padding:10,
    background:'white',

    [theme.breakpoints.down('sm')]:{
        width:'100%',
        margin:0,
        paddingRight:30,
        bottom:-6
    }
}));

const Text= styled(Typography)(({theme})=>({
    color:'white',
    fontFamily:'Montserrat',
    fontSize:20,
    textAlign:'justify',
    // letterSpacing:1.3
    wordSpacing:3,

    [theme.breakpoints.down('sm')]:{
        fontSize:18,
        wordSpacing:'normal'
    }
}))

const Container= styled(Box)(({theme})=>({
    background:`url(${ai_background})`,
    backgroundRepeat:'repeat',
    backgroundSize:'cover',
    height:'100vh',
    overflow:'scroll',
    [theme.breakpoints.up('sm')]:{

        display:'flex',
        justifyContent:'center',
    },

    [theme.breakpoints.down('sm')]:{

        display:'flex',
        justifyContent:'center',
    }
}))

const AnswerWrapper=styled(Box)(({theme})=>({
    [theme.breakpoints.up('sm')]:{
        marginTop:100
    }
}))
const Ai = () => {
    const [question, setQuestion]=useState("");
    const [response, setResponse]= useState([]);
    const [loading, setLoading]=useState(false);
    // const url= "http://localhost:8000";
    const url =process.env.REACT_APP_SERVER_API_KEY;
    const handleClick=async()=>{
    
        setLoading(true);
        setResponse([]);
        
        const {data}= await axios.post(`${url}/ai/send`,{
            question:question
        });
        setLoading(false);
        setResponse(data.answer);
        setQuestion("");
    }
    
    console.log(response);
  return (
    <Container style={{
    backgroundColor:"#ececf1"}}>
         
        {loading && <Loader/> }
        <SearchWrapper>

        <InputSearchBase autoFocus placeholder='Search you query..' value={question} onChange={(e)=>setQuestion(e.target.value)} onKeyDown={(e)=>{if(e.key==='Enter'){
            e.preventDefault(); // in order to to prevent the default behavior of the "Enter" key, which is to create a new line or submit a form, you can use the event.preventDefault() method inside the handleKeyPress function.
            handleClick();
        }}} />
        <Send onClick={handleClick}/>
        </SearchWrapper>
        <AnswerWrapper>
            {/* <img src={ai_background} alt="" /> */}
            {response.map((item)=>(
                <>
                {/* <Box style={{border:"1px solid gray", padding:10, borderRadius:3, background:'rgba(34, 33, 33, 0.831)', color:'white'}}> */}
                <Box style={{border:"1px solid gray", padding:10, borderRadius:1, background:'rgba(34, 33, 33, 0.3)', color:'white'}}>
                   <Text >{item}</Text> 
                </Box>
                </>
            ))}
        </AnswerWrapper>

    </Container>
  )
}

export default Ai
import { PowerSettingsNew } from '@mui/icons-material';
import { Box, Menu, MenuItem, Typography, styled } from '@mui/material'
import React, { useState } from 'react'


const Component = styled(Menu)`
  margin-top: 5px;
`

const Logout = styled(Typography)`
  font-size: 14px;
  margin-left: 20px;
`
const Profile = ({ account, setAccount , mobile }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setOpen(event.currentTarget);
    console.log(event);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const LogOut = () => {
    setAccount('');
    localStorage.clear();
  }
  return (
    <>
      <Box onClick={handleClick} style={{width:'100%' }}>

        {
          mobile? (

            <Typography style={{ marginTop: 2, fontSize:18, lineHeight:3 }}>{account} </Typography>
            ):(
              
              <Typography style={{ marginTop: 2, marginLeft:100 }}>{account} </Typography>
          )
        }
      </Box>
      <Component
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleClose(); LogOut(); }}>
          <PowerSettingsNew color='primary' fontSize='small' />
          <Logout> Logout</Logout>
        </MenuItem>
      </Component>
    </>
  )
}

export default Profile
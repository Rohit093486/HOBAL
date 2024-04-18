import React, { useState, useEffect } from "react";
import { Avatar, Drawer, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material";
import { ChatBox, ReceiverMessage, SenderMessage } from "mui-chat-box";
import SendIcon from '@mui/icons-material/Send';
import './App.css';


function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [message, setMessage] = useState('');
  const fb = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
  
    // Check if the current time is 4:30 PM
    if (hours === 17 && minutes === 44) {
     
      setDrawerOpen(true);
    }else{
      setTimeout(fb, 10);
    }
  };
setTimeout(fb, 10);
   

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // Handle sending the message logic here
    console.log("Message sent:", message);
    // Clear the input field after sending
    setMessage('');
  };

  return (
    <Drawer anchor="right" open={drawerOpen} >
      <h2 style={{ padding: '2px 15px' }}>HoABL bot Feedback</h2>
      <ChatBox>
        <ReceiverMessage avatar={<Avatar sx={{background:'blue'}}>AF</Avatar>}>
          We propose 20:80 payment plan:-
          10% at the time of booking,
          10% 1month after booking,
          80% at the time of possession
        </ReceiverMessage>       
      </ChatBox>
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
        <TextField
          label="Type your message..."
          variant="outlined"
          value={message}
          onChange={handleMessageChange}
          fullWidth
          style={{ borderRadius: 20 }}
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </div>
    </Drawer>
  );
}

export default App;

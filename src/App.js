import React, { useEffect, useState } from "react";
import { Avatar, Drawer, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material";
import { ChatBox, ReceiverMessage, SenderMessage } from "mui-chat-box";
import SendIcon from '@mui/icons-material/Send';
import './App.css';
import axios from "axios";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    // Initial messages, you can replace these with API fetched messages
    { sender: 'bot', text: 'We propose 20:80 payment plan: 10% at the time of booking, 10% 1 month after booking, 80% at the time of possession' },
    { sender: 'bot', text: 'We propose 2:80 payment plan: 10% at the time of booking, 10% 1 month after booking, 80% at the time of possession' }

  ]);

  // Function to open drawer automatically at a specific time
  // const botSender =  () => {
  //   // const currentTime = new Date();
  //   // const hours = currentTime.getHours();
  //   // const minutes = currentTime.getMinutes();

  //   // // Check if the current time is 12:24 PM
  //   // if (hours === 12 && minutes === 36) {
  //   //   setDrawerOpen(true);
  //   // }
  //   axios.post('http://localhost:8085/copilot_feedback/1')
  //   .then(response => {
      
  //           console.log('API response:', response.data);
  //   })
  //   .catch(error => {
  //     // Handle error
  //     console.error('Error fetching data:', error);
  //   });
  // };

  const botSender = async () => {
    try {
      const response = await axios.post('http://localhost:5000/copilot_feedback/1');
      console.log('API response:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchTime()
  }, [])
  const fetchTime = async () => {
    try {
      const response = await axios.post('http://localhost:5000/launch_copilot');
      setDrawerOpen(true);
      console.log('API response:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  // Call checkTime every second to check if the current time matches
  setInterval(botSender, 1000);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // Add the user's message to the messages state
    setMessages([...messages, { sender: 'user', text: message }]);
    // Clear the input field after sending
    setMessage('');
  };

  return (
    <Drawer anchor="right" open={drawerOpen} >
      <h2 style={{ padding: '2px 15px' }}>HoABL Copilot</h2>
      <ChatBox>
        {messages.map((msg, index) => (
          <React.Fragment key={index}>
            {/* {msg.sender === 'bot' ? ( */}
              <ReceiverMessage avatar={<Avatar sx={{ background: 'blue' }}>AF</Avatar>}>
                {msg.text}
              </ReceiverMessage>
            {/* ) : (
              <SenderMessage>
                {msg.text}
              </SenderMessage>
            )} */}
          </React.Fragment>
        ))}
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

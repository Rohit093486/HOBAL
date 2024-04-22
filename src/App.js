import React, { useEffect, useState } from "react";
import { Avatar, Drawer, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material";
import { ChatBox, ReceiverMessage, SenderMessage } from "mui-chat-box";
// import SendIcon from '@mui/icons-material/Send';
import './App.css';
import axios from "axios";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([])


  const botSender = async () => {
    try {
      const response = await axios.get('http://localhost:5000/copilot_feedback/1');
      console.log('API response:', response.data);
      setMessages(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {

    fetchTime()
  }, [])
  const fetchTime = async () => {
    try {
      const response = await axios.get('http://localhost:5000/launch_copilot');
      setDrawerOpen(true);
      console.log('API response:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // Call checkTime every second to check if the current time matches
  setInterval(botSender, 5000);

  // const handleMessageChange = (event) => {
  //   setMessage(event.target.value);
  // };

  // const handleSendMessage = () => {
  //   // Add the user's message to the messages state
  //   setMessages([...messages, { sender: 'user', text: message }]);
  //   // Clear the input field after sending
  //   setMessage('');
  // };

  return (
    <Drawer anchor="right" open={drawerOpen} >
      <h2 style={{ padding: '2px 15px' }}>HoABL Copilot</h2>
      <ChatBox>
        {messages?.map((msg, index) => (
          <React.Fragment key={index}>          
              <ReceiverMessage avatar={<Avatar sx={{ background: 'blue' }}>AF</Avatar>}>
                {msg}
              </ReceiverMessage>          
          </React.Fragment>
        ))}
      </ChatBox>     
    </Drawer>
  );
}

export default App;

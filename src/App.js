import React, { useEffect, useState } from "react";
import { Avatar,  Drawer, Grid } from "@mui/material";
import { ChatBox, ReceiverMessage} from "mui-chat-box";
import './App.css';
import axios from "axios";

const boxShadowStyle = {
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Adjust as needed
  padding: '10px', // Adding padding for aesthetic purposes
};

const splitTextIntoLines = (text) => {
  const lines = text.split('\n');
  return lines.map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < lines.length - 1 && <br />} {/* Add a line break except for the last line */}
    </React.Fragment>
  ));
};
function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  // const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([])
  const [customerMessage, setCustomerMessage] = useState([])

  const botSender = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/copilot_feedback/1"
      );
      console.log("API response:", response.data);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setTimeout(botSender, 3000);
  };

  const customerSender = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/copilot_feedback/2"
      );
      console.log("API response:", response.data);
      setCustomerMessage(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setTimeout(customerSender, 15000);
  };

  useEffect(() => {
    fetchTime()
  }, [])
  const fetchTime = async () => {
    try {
      const response = await axios.get('http://localhost:5000/launch_copilot');
      setDrawerOpen(true);
      botSender();
      customerSender();
      console.log('API response:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // Call checkTime every second to check if the current time matches

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
    // <Drawer anchor="right" open={drawerOpen} >
    <>
      <h2 style={{ padding: '2px 15px' }}>HoABL Copilot</h2>
      <Grid sx={{height:'100%'}} container spacing={2} columns={16}>
        <Grid item xs={8} style={boxShadowStyle}>
          <ChatBox>
            {messages?.map((msg, index) => (
              <React.Fragment key={index}>
                <ReceiverMessage avatar={<Avatar sx={{ background: 'blue' }}>AF</Avatar>}>
                {splitTextIntoLines(msg)}

                </ReceiverMessage>
              </React.Fragment>
            ))}
          </ChatBox>
        </Grid>
        <Grid item xs={8} style={boxShadowStyle}>
          <ChatBox>
            {customerMessage?.map((msg, index) => (
              <React.Fragment key={index}>
                <ReceiverMessage avatar={<Avatar sx={{ background: 'blue' }}>SF</Avatar>}>
                {splitTextIntoLines(msg)}

                </ReceiverMessage>
              </React.Fragment>
            ))}
          </ChatBox>
        </Grid>
      </Grid>
      </>
    // </Drawer>
  );
}

export default App;
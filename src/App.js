import React, { useEffect, useState } from "react";
import { Avatar, Grid } from "@mui/material";
import { ChatBox, ReceiverMessage } from "mui-chat-box";
import './App.css';
import axios from "axios";

const boxShadowStyle = {
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Adjust as needed
  padding: '10px', // Adding padding for aesthetic purposes
};

const getColorForSentiment = (line) => {
  if (line.includes("Customer Sentiment")) {
    if (line.includes("Not Interested") || line.includes("Confused")) {
      return '#ffcc00';
    } else if (line.includes("Angry")) {
      return 'red';
    } else if (line.includes("Interested")) {
      return 'green';
    }
  }
  return 'inherit'; // Default color if no specific sentiment keyword
};

const splitTextIntoLines = (text) => {
  const lines = text.split('\n');
  return lines.map((line, index) => {
    const color = getColorForSentiment(line);
    const fontWeight = color === 'inherit' ? 'normal' : 'bold';
    return (
      <React.Fragment key={index}>
        <span style={{ color: color, fontWeight: fontWeight }}>{line}</span>
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
};

function App() {
  const [messages, setMessages] = useState([]);
  const [customerMessage, setCustomerMessage] = useState([]);

  const botSender = async () => {
    try {
      const response = await axios.get("http://localhost:5000/copilot_feedback/1");
      console.log("API response:", response.data);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setTimeout(botSender, 3000);
  };

  const customerSender = async () => {
    try {
      const response = await axios.get("http://localhost:5000/copilot_feedback/2");
      console.log("API response:", response.data);
      setCustomerMessage(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setTimeout(customerSender, 15000);
  };

  useEffect(() => {
    fetchTime();
  }, []);

  const fetchTime = async () => {
    try {
      const response = await axios.get('http://localhost:5000/launch_copilot');
      botSender();
      customerSender();
      console.log('API response:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <h2 style={{ padding: '2px 15px' }}>HoABL Copilot</h2>
      <Grid sx={{ height: '100%' }} container spacing={2} columns={16}>
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
  );
}

export default App;

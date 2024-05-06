/* eslint-disable react-hooks/exhaustive-deps */
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
  const res = `<span style="color: {color}">{param}</span>`;
  if (line.includes("Customer Sentiment")) {
    if (line.includes("Neutral") || line.includes("Confused")) {
      return line.replaceAll(line.includes("Neutral") ? "Neutral" : "Confused", res.replace('{color}', '#ffcc00').replace('{param}', line.includes("Neutral") ? "Neutral" : "Confused"));
    } else if (line.includes("Angry")) {
      return line.replaceAll("Angry", res.replace('{color}', 'red').replace('{param}', 'Angry'));
    } else if (line.includes("Interested")) {
      return line.replaceAll("Interested", res.replace('{color}', 'green').replace('{param}', 'Interested'));
    }
  }
  if (line.includes("Sales Clarity")) {
    if (line.includes("Neutral")) {
      return line.replaceAll("Neutral", res.replace('{color}', '#ffcc00').replace('{param}', 'Neutral'));
    } else if (line.includes("Bad")) {
      return line.replaceAll("Bad", res.replace('{color}', 'red').replace('{param}', 'Bad'));
    } else if (line.includes("Good")) {
      return line.replaceAll("Good", res.replace('{color}', 'green').replace('{param}', 'Good'));
    }
  }
  return line; // Default color if no specific sentiment keyword
};

const splitTextIntoLines = (text) => {
  const lines = text.split('\n');
  return lines.map((line, index) => {
    return (
      <React.Fragment key={index}>
        <span
          style={{}}
          dangerouslySetInnerHTML={{
            __html: getColorForSentiment(line),
          }}
        ></span>
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

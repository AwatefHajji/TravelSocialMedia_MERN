import React from 'react'
import styled from 'styled-components'
import welcome from "../image/welcome.jpg";
export default function Welcome({currentUser}) {
  return (
    <Container>
      <img src={welcome} alt="" />
        <h1>
            Welcome, <span>{currentUser.firstName}!</span>
        </h1>
        <h3>Please select a chat to start Messaging.</h3>
    </Container>
  )
}
const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: black;
img{
    height: 27rem;
}
span{
    color: #4e00ff;
    text-transform: capitalize;
}
`;
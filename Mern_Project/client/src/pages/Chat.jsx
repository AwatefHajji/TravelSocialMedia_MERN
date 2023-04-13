import styled from "styled-components"
import { useState, useEffect , useRef} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";


export default function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  

  useEffect( ()=>{
     const navigationTo = async () => {
      if (!localStorage.getItem('userLogedIn'))
      {
        navigate("/login");
      }
      else {
        setCurrentUser(await JSON.parse(localStorage.getItem('userLogedIn')));
        setIsLoaded(true);
      }
    }
    navigationTo();
   }, []);

   useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
   },[currentUser]);

  useEffect( () => {
    const getCurrentUser = async()=>{
      if( currentUser)  {
      
        const data = await  axios.get(`${allUsersRoute}/${currentUser._id}`);
        console.log(data);
        setContacts(data.data);
      
    }
    }
      getCurrentUser();
  }, [currentUser]);

  const handleChatChange = (chat) =>{
    setCurrentChat(chat);
  }

  return (
    <Container>
      <div className="container">
         <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />  
        { isLoaded &&
          currentChat === undefined ?
           <Welcome currentUser={currentUser}/> : 
          <ChatContainer 
          currentChat={currentChat}
          currentUser={currentUser} 
          socket ={socket}/>
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  
  
  background-color: #ffffff;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #ffffff;
    display: grid;
    
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

import React,{useState} from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'

export default function ChatInput({handleSendMsg}) {
     const [showEmojiPicker, setShowEmojiPicker] = useState(false);
     const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = ()=>{
       setShowEmojiPicker(!showEmojiPicker);
     };

     const handleEmojiClick = (e,emoji)=>{
        console.log(e)
        let message= msg;
        message += emoji.emoji;
        setMsg(message);
     }

    const sendChat = (e)=>{
        e.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg('');
        }
 }
  return (
    <Container>
        <div className="button-container">
            <div className="emoji" >
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                { showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/> }
            </div> 
        </div>
        <form className='input-container' onSubmit={(e)=>sendChat(e)}>
            <input type="text" placeholder='Type your message here!' value={msg} onChange={(e)=>{setMsg(e.target.value)}}/>
            <button className="submit">
                <IoMdSend />
            </button>
        </form>
    </Container>
  )
}
const Container = styled.div`
display: grid;
grid-template-columns: 5% 95%;
align-items: center;
background-color: white;
padding: 0 2rem;
padding-bottom: 0.3rem;
@media screen and (min-width: 720px) and (max-width: 1080px){
    padding: 0 1rem;
    gap: 1rem;
}
.button-container{
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji{
        position: relative;
        svg{
            font-size: 1.5rem;
            color: black;
            cursor: pointer;
        }
        .emoji-picker-react{
            position: absolute;
            top: -350px;
            background-color:#f8f8ff;
            box-shadow: 0 5px 10px  #DAA520;;
            border-color:  #DAA520;
            .emoji-scroll-wrapper::-webkit-scrollbar{
                background-color: #f8f8ff;
                width: 5px;
                &-thumb {
                    background-color: #f8f8ff;
                }
            }
            .emoji-categories{
                button{
                    filter: contrast(0);
                }
            }
            .emoji-search{
                background-color: transparent;
                border-color: #DAA520;
                color: white;
            }
            .emoji-group:before {
                background-color:  #f8f8ff;
            }
        }
    }
}

.input-container{
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #f8f8ff;
    input{
        width: 90%;
        height: 60%;
        background-color: transparent;
        color: black;
        border: none;
        padding-left: 1rem;
        font-size: 1.2rem;
        &::selection{
            background-color: #f8f8ff;
        }
        &:focus{
            outline: none;
        }
    }
    button{
        padding: 0.3rem 2rem;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #DAA520;
        border: none;
        cursor: pointer;
        @media screen and (min-width: 720px) and (max-width: 1080px){
            padding: 0.3rem 1rem;
            svg{
            font-size: 1rem;
            color: white;
        }
        }
        svg{
            font-size: 2rem;
            color: white;
        }
    } 
}
`;
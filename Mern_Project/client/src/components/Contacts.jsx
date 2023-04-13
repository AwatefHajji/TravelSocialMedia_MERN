import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import Logo from '../image/logo.png'

export default function Contacts({ contacts, currentUser, changeChat }) {
    const [currentUserFirstName, setCurrentFirstUserName] = useState(undefined);
    const [currentUserLastName, setCurrentLastUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.image);
            setCurrentFirstUserName(currentUser.firstName);
            setCurrentLastUserName(currentUser.lastName);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => { 
        setCurrentSelected(index);
        changeChat(contact);
    };
    
    return (
        <>
            {
                currentUserFirstName && (
                    <Container>
                        <div className="brand">
                            <img src={Logo} alt="logo" />
                            <h3>Travel Me</h3>
                        </div>
                        <div className="contacts">
                            {
                              contacts.map((contact, index) => {
                                    return (
                                        <div
                                         className={`contact ${
                                            index === currentSelected ? "selected" : ""
                                            }`}
                                             key={contact._id}
                                              onClick={()=>changeCurrentChat(index,contact)}>
                                            <div className="username">
                                                <h3>{contact.firstName} {contact.lastName}</h3>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="current-user">
                                            <div className="username">
                                                <h2>{currentUserFirstName} {currentUserLastName}</h2>
                                            </div>
                        </div>
                    </Container>
                )
            }
        </>
    )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color:#f8f8ff;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: black;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color:#f8f8ff;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: black;
          text-transform: capitalize;
        }
      }
    }
    .selected {
      background-color: #DAA520;
    }
  }
  .current-user {
    background-color:#DAA520;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
        text-transform: capitalize;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
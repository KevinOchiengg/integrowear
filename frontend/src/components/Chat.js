import React, { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'
import styled from 'styled-components'
import { FaTimes, FaPaperPlane } from 'react-icons/fa'
import { BiMessageRounded } from 'react-icons/bi'

const ENDPOINT =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:5000'
    : window.location.host

const Chat = (props) => {
  const { userInfo } = props
  const [socket, setSocket] = useState(null)
  const uiMessagesRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [messageBody, setMessageBody] = useState('')
  const [messages, setMessages] = useState([
    { name: 'Integro', body: 'Hello there, Please ask your question.' },
  ])

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: 'smooth',
      })
    }
    if (socket) {
      socket.emit('onLogin', {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      })
      socket.on('message', (data) => {
        setMessages([...messages, { body: data.body, name: data.name }])
      })
    }
  }, [userInfo._id, userInfo.name, messages, userInfo.isAdmin, isOpen, socket])

  const supportHandler = () => {
    setIsOpen(true)
    console.log(ENDPOINT)
    const sk = socketIOClient(ENDPOINT)
    setSocket(sk)
  }
  const submitHandler = (e) => {
    e.preventDefault()
    if (!messageBody.trim()) {
      alert('Please type message.')
    } else {
      setMessages([...messages, { body: messageBody, name: userInfo.name }])
      setMessageBody('')
      setTimeout(() => {
        socket.emit('onMessage', {
          body: messageBody,
          name: userInfo.name,
          isAdmin: userInfo.isAdmin,
          _id: userInfo._id,
        })
      }, 1000)
    }
  }
  const closeHandler = () => {
    setIsOpen(false)
  }
  return (
    <Wrapper>
      {!isOpen ? (
        <button type='button' className='message-icon' onClick={supportHandler}>
          <BiMessageRounded />
        </button>
      ) : (
        <div className='chat'>
          <div className='contact bar'>
            <div className='name'>
              <h3>Integrowears</h3>
              <p className='seen'>Online</p>
            </div>
            <FaTimes onClick={closeHandler} />
          </div>
          <div className='messages' id='chat'>
            <div className='time'>
              Today at {new Date().getHours() + ':' + new Date().getMinutes()}
            </div>

            <ul ref={uiMessagesRef}>
              {messages.map((msg, index) => (
                <li className='message' key={index}>
                  {msg.body}
                </li>
              ))}
            </ul>

            <div className='message stark'>
              <div className='typing typing-1'></div>
              <div className='typing typing-2'></div>
              <div className='typing typing-3'></div>
            </div>
          </div>
          <form onSubmit={submitHandler} className='input'>
            <input
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              type='text'
              placeholder='Type your message here!'
            />

            <button type='submit'>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </Wrapper>
  )
}

export default Chat

const Wrapper = styled.section`
  color: var(--clr-blue);
  position: fixed;
  right: 1rem;
  bottom: 2rem;
  font-size: 2rem;
  padding: 2rem;

  .message-icon {
    background: none;
    font-size: 4rem;
    color: var(--green);
  }

  .chatbox li {
    margin-bottom: 1rem;
  }

  .chat {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 90%;
    height: 50rem;
    border-radius: 2rem;
    background: var(--clr-white);
    box-shadow: var(--dark-shadow);
    right: 2rem;
    bottom: 2rem;
    left: 2rem;
    font-size: 2rem;
    padding: 2rem;
    z-index: 2;
  }

  @media (min-width: 800px) {
    .chat {
      width: 35%;
      right: 40%;
      bottom: 2rem;
      height: 55rem;
      left: 30%;
      font-size: 2rem;
      padding: 2rem;
    }
  }

  .contact {
    position: relative;
    margin-bottom: 1rem;
    padding-left: 5rem;
    height: 4.5rem;
    display: flex;
    justify-content: space-between;
  }

  .message {
    padding: 1rem 1.5rem;
    margin: 2rem;
    border-radius: 1.5rem 1.5rem 1.5rem 0;
    min-height: 2.25rem;
    width: fit-content;
    max-width: 66%;
    box-shadow: var(--light-shadow);
  }

  li:nth-child(even) {
    padding: 1rem 1.5rem;
    margin: 2rem;
    background: #fff;
    border-radius: 1.5rem 1.5rem 1.5rem 0;
    min-height: 2.25rem;
    width: fit-content;
    max-width: 66%;
    box-shadow: var(--light-shadow);
  }

  li:nth-child(odd) {
    margin: 1.5rem 1.5rem 1.5rem auto;
    border-radius: 1rem 1.5rem 0 1rem;
    background: var(--clr-blue);
    color: var(--clr-white);
  }
  .name {
    font-weight: 500;
    margin-bottom: 0.125rem;
  }

  .seen {
    font-size: 1.7rem;
    color: var(--green);
  }

  .bar {
    flex-basis: 3.5rem;
    flex-shrink: 0;
    margin: 1rem;
    box-sizing: border-box;
  }
  .messages {
    padding: 2rem;
    background: #f7f7f7;
    flex-shrink: 2;
    overflow-y: auto;
  }
  .time {
    font-size: 1.5rem;
    background: #eee;
    padding: 0.25rem 1rem;
    border-radius: 2rem;
    color: #999;
    width: fit-content;
    margin: 0 auto;
  }

  .typing {
    display: inline-block;
    width: 1.7rem;
    height: 1.7rem;
    margin-right: 1rem;
    background: var(--clr-light-grey);
    border-radius: 50%;
  }
  .typing.typing-1 {
    animation: typing 1s infinite;
  }
  .typing.typing-2 {
    animation: typing 1s 250ms infinite;
  }
  .typing.typing-3 {
    animation: typing 1s 500ms infinite;
  }
  .input {
    flex-basis: 4rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding: 2rem 1rem;
  }
  .bar svg {
    cursor: pointer;
  }
  .chat .input svg {
    font-size: 2.5rem;
    margin-right: 1rem;
    color: var(--clr-blue);
    cursor: pointer;
  }
  .input svg:hover {
    color: var(--clr-yellow);
  }
  input {
    border: none;
    background-image: none;
    background: var(--clr-white);
    padding: 2.7rem 1rem;
    margin-right: 1rem;
    border-radius: 1.125rem;
    flex-grow: 2;
    box-shadow: var(--dark-shadow);
    font-weight: 400;
    letter-spacing: 0.025em;
    color: var(--clr-blue);
  }
  input:placeholder {
    color: #999;
  }

  @-webkit-keyframes typing {
    0%,
    75%,
    100% {
      transform: translate(0, 0.25rem) scale(0.9);
      opacity: 0.5;
    }
    25% {
      transform: translate(0, -0.25rem) scale(1);
      opacity: 1;
    }
  }

  @keyframes typing {
    0%,
    75%,
    100% {
      transform: translate(0, 0.25rem) scale(0.9);
      opacity: 0.5;
    }
    25% {
      transform: translate(0, -0.25rem) scale(1);
      opacity: 1;
    }
  }
`

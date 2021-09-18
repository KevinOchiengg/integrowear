import React, { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
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
        <div className='card card-body'>
          <div className='row'>
            <strong>Support </strong>
            <button type='button' className='close-btn' onClick={closeHandler}>
              <FaTimes />
            </button>
          </div>
          <ul ref={uiMessagesRef}>
            {messages.map((msg, index) => (
              <li key={index}>
                <strong>{`${msg.name}: `}</strong> {msg.body}
              </li>
            ))}
          </ul>
          <div>
            <form onSubmit={submitHandler} className='row'>
              <input
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                type='text'
                placeholder='type message...'
              />
              <button type='submit' className='btn'>
                Send
              </button>
            </form>
          </div>
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
  .chatbox ul {
    overflow: scroll;
    max-height: 20rem;
  }

  .card-body {
    background: var(--clr-white);
    box-shadow: var(--dark-shadow);
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    left: 2rem;
    font-size: 2rem;
    padding: 2rem;
  }
  .close-btn {
    background: none;
    color: var(--clr-blue);
  }
  .message-icon {
    background: none;
    font-size: 4rem;
    color: var(--green);
  }
  .card-body ul {
    margin: 2rem 0;
    line-height: 1.5;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  form.row {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  }
  .chatbox li {
    margin-bottom: 1rem;
  }
  .chatbox input {
    width: calc(100% - 9rem);
    height: 9rem;
  }

  @media (min-width: 800px) {
    .card-body {
      right: 30%;
      bottom: 2rem;
      left: 30%;
      font-size: 2rem;
      padding: 2rem;
    }
  }
`

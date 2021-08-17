import React, { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'
import styled from 'styled-components'

const ENDPOINT =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:5000'
    : window.location.host

const ChatBox = (props) => {
  const { userInfo } = props
  const [socket, setSocket] = useState(null)
  const uiMessagesRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [messageBody, setMessageBody] = useState('')
  const [messages, setMessages] = useState([
    { name: 'Admin', body: 'Hello there, Please ask your question.' },
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
  }, [messages, isOpen, socket])

  const supportHandler = () => {
    setIsOpen(true)
    console.log(ENDPOINT)
    const sk = socketIOClient(ENDPOINT)
    setSocket(sk)
  }
  const submitHandler = (e) => {
    e.preventDefault()
    if (!messageBody.trim()) {
      alert('Error. Please type message.')
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
        <button type='button' onClick={supportHandler}>
          <i className='fa fa-support' />
        </button>
      ) : (
        <div className='card card-body'>
          <div className='row'>
            <strong>Support </strong>
            <button type='button' onClick={closeHandler}>
              <i className='fa fa-close' />
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
                placeholder='type message'
              />
              <button type='submit'>Send</button>
            </form>
          </div>
        </div>
      )}
    </Wrapper>
  )
}

export default ChatBox

const Wrapper = styled.section`
  color: #000000;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  .chatbox ul {
    overflow: scroll;
    max-height: 20rem;
  }
  .chatbox li {
    margin-bottom: 1rem;
  }
  .chatbox input {
    width: calc(100% - 9rem);
  }

  .support-users {
    background: #f0f0f0;
    height: 100%;
  }
  .support-users li {
    background-color: #f8f8f8;
  }
  .support-users button {
    background-color: transparent;
    border: none;
    text-align: left;
  }
  .support-users li {
    margin: 0;
    background-color: #f0f0f0;
    border-bottom: 0.1rem #c0c0c0 solid;
  }

  .support-users li:hover {
    background-color: #f0f0f0;
  }
  .support-users li.selected {
    background-color: #c0c0c0;
  }
  .support-messages {
    padding: 1rem;
  }
  .support-messages input {
    width: calc(100% - 9rem);
  }
  .support-messages ul {
    height: calc(100vh - 18rem);
    max-height: calc(100vh - 18rem);
    overflow: scroll;
  }
  .support-messages li {
    margin-bottom: 1rem;
  }

  .support-users span {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    position: absolute;
    margin-left: -25px;
    margin-top: 10px;
  }
  .support-users .offline {
    background-color: #808080;
  }
  .support-users .online {
    background-color: #20a020;
  }
  .support-users .unread {
    background-color: #f02020;
  }
`

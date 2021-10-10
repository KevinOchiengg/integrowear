import React, { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import { BiMessageDetail } from 'react-icons/bi'
import { IoMdSend } from 'react-icons/io'

const ENDPOINT =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:5000'
    : window.location.host

const Chat = ({ userInfo }) => {
  const [socket, setSocket] = useState(null)
  const uiMessagesRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [messageBody, setMessageBody] = useState('')
  const [messages, setMessages] = useState([
    {
      name: 'Kevin Ochieng(admin)',
      body: 'Hello there, Please ask your question.',
    },
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
      alert('Please type your message.')
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
          <BiMessageDetail />
        </button>
      ) : (
        <section className='container section-center'>
          <div className='content'>
            <header className='content-header'>
              <img src='images/admin/kevin.jpg' alt='admin' />

              <div className='info'>
                <h3>Kevin</h3>
                <span className='time'>online</span>
              </div>

              <FaTimes className='close-btn' onClick={closeHandler} />
            </header>

            <ul className='message-wrap' ref={uiMessagesRef}>
              {messages.map((msg, index) => (
                <li className={`message-list`} key={index}>
                  <p className='msg'>{msg.body}</p>
                  <span className='time'>
                    {new Date().getHours() + ':' + new Date().getMinutes()}
                  </span>
                </li>
              ))}
            </ul>

            <form onSubmit={submitHandler}>
              <input
                type='text'
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                placeholder='Type text message'
              />

              <button type='submit'>
                <IoMdSend className='send-btn' />
              </button>
            </form>
          </div>
        </section>
      )}
    </Wrapper>
  )
}

export default Chat

const Wrapper = styled.section`
  color: var(--clr-blue);

  .message-icon {
    position: fixed;
    right: 1rem;
    bottom: 2rem;
    color: var(--green);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
    box-shadow: var(--dark-shadow);
    background: var(--green);
  }
  .message-icon svg {
    color: var(--clr-white);
    font-size: 3rem;
  }
  .container {
    display: flex;
    box-shadow: var(--dark-shadow);
    position: fixed;
    width: 60%;
    top: 12rem;
    font-size: 2rem;
    left: 30rem;
    height: 80%;
  }

  .content-header {
    height: 8rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #f6f6f6;
    background: #fff;
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    background: #e4e4e4;
  }

  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 6rem;
    padding: 4rem 2rem;
  }

  input {
    flex: 1;
    height: 5rem;
    border-radius: 20rem;
    margin: 0 auto;
    border: none;
    margin-left: 10px;
    box-shadow: var(--dark-shadow);
    padding: 0 20px;
  }

  .close-btn,
  .send-btn {
    font-size: 3rem;
    color: var(--clr-blue);
    cursor: pointer;
  }

  .send-btn {
    margin-left: 2rem;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--clr-white);
  }

  header img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
    box-shadow: var(--dark-shadow);
  }
  .info {
    flex: 1;
  }
  h3 {
    font-size: 2rem;
    font-weight: 600;
  }

  .message-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem 3rem;
    overflow-y: scroll;
    /* background: url(../../images/background/chat.jpg);
    background-repeat: repeat;
    background-position: center; */
  }

  .message-list {
    align-self: flex-start;
    max-width: 70%;
  }

  .message-wrap > li:nth-child(even) {
    align-self: flex-end;
    & .msg {
      background: #e4e4e4;
    }
  }
  .msg {
    background: var(--clr-white);
    box-shadow: var(--dark-shadow);
    padding: 1.7rem;
    margin-bottom: 10px;
    border-radius: 5px;
  }

  p,
  span {
    font-size: 1.7rem;
  }

  .content-header span {
    color: var(--green);
  }

  @media only screen and (max-width: 480px),
    only screen and (max-width: 767px) {
    .container {
      top: 10rem;
      font-size: 2rem;
      left: 2rem;
      bottom: 2rem;
      right: 2rem;
      width: 100%;
    }
  }
`

import React, { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'
import styled from 'styled-components'
import { FaTimes, FaPaperPlane } from 'react-icons/fa'
import { BiMessageDetail } from 'react-icons/bi'
import { IoIosArrowRoundBack } from 'react-icons/io'

const ENDPOINT =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:5000'
    : window.location.host

const Chat = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const openSidebar = () => {
    setIsSidebarOpen(true)
  }
  const { userInfo } = props
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
        <div className='container section-center'>
          <div
            className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}
          >
            <div className='sidebar-header'>
              <h2>Open a chat</h2>
              <IoIosArrowRoundBack onClick={closeSidebar} />
            </div>
            <div className='users-list-container'>
              <article className='single-user-wrapper'>
                <img src='images/customers/customer-1.jpg' alt='' />
                <div className='info'>
                  <h3>{userInfo.name}</h3>
                </div>
              </article>
            </div>
          </div>
          <div className='content'>
            <header className='content-header'>
              <img src='images/customers/customer-1.jpg' alt='' />
              <div className='info'>
                <h3>{userInfo.name}</h3>
                <span className='time'>
                  {new Date().getHours() + ':' + new Date().getMinutes()}
                </span>
              </div>
              <div className='open'>
                <BiMessageDetail onClick={openSidebar} />
              </div>
              <div className='close'>
                <FaTimes onClick={closeHandler} />
              </div>
            </header>
            <ul className='message-wrap' ref={uiMessagesRef}>
              {messages.map((msg, index) => (
                <div className={`message-list`} key={index}>
                  <p className='msg'>{msg.body}</p>
                  <span className='time'>
                    {new Date().getHours() + ':' + new Date().getMinutes()}
                  </span>
                </div>
              ))}
            </ul>
            <form className='sidebar__search' onSubmit={submitHandler}>
              <div className='sidebar__searchContainer'>
                <input
                  type='text'
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  placeholder='Type message here'
                />
              </div>
              <button type='submit'>
                <FaPaperPlane />
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
    width: 80%;
    top: 10rem;
    font-size: 2rem;
    left: 14rem;
    height: 80%;
  }
  .sidebar-header,
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
  .sidebar-header svg {
    font-size: 4rem;
    display: none;
  }
  .sidebar__search {
    display: flex;
    align-items: center;
    background-color: #f6f6f6;
    height: 6rem;
    padding: 2rem;
  }

  .sidebar__searchContainer {
    display: flex;
    align-items: center;
    background-color: white;
    width: 90%;
    height: 5rem;
    border-radius: 20px;
    margin: 0 auto;
  }

  .sidebar__searchContainer > input {
    border: none;
    margin-left: 10px;
  }

  .sidebar-header h2 {
    font-size: 2.5rem;
  }
  .sidebar {
    display: flex;
    background: #fff;
    flex-direction: column;
    border-right: 1px solid #f6f6f6;
    transition: var(--transition);
    width: 30%;
  }

  .logo {
    display: flex;
    margin: 10px 0 0 0;
    padding-bottom: 10px;
    align-items: center;
    justify-content: center;
    color: #000;
    font-size: 3em;
    letter-spacing: 7px;
    border-bottom: 1px solid #f6f6f6;
  }
  .users-list-container {
    padding: 1rem;
    width: 100%;
    overflow-y: scroll;
  }
  svg {
    font-size: 3rem;
  }
  .single-user-wrapper {
    border-bottom: 1px solid #f6f6f6;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 5px;
    height: 70px;
    cursor: pointer;
  }
  .single-user-wrapper:hover,
  .single-user-wrapper.active {
    background: #f4f7f9;
  }
  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
    box-shadow: var(--dark-shadow);
  }
  .single-user-wrapper .info {
    flex: 1;
  }
  .info .user {
    font-weight: 700;
  }
  .info .text {
    display: flex;
    margin-top: 3px;
    font-size: 1.7rem;
  }
  .single-user-wrapper .time {
    margin-right: 5px;
    margin-left: 5px;
    font-size: 1.3rem;
    color: #a9a9a9;
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
  .time {
    display: flex;
    margin-top: 3px;
    font-size: 2rem;
  }
  .open {
    margin-right: 2rem;
    display: none;
  }

  .message-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem 3rem;
    overflow-y: scroll;
  }

  .message-list {
    align-self: flex-start;
    max-width: 70%;
  }

  .message-wrap > div:nth-child(even) {
    align-self: flex-end;
    & .msg {
      background: #bde2f7;
    }
  }
  .msg {
    background: #fff;
    box-shadow: var(--dark-shadow);
    padding: 1.7rem;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  .time {
    text-align: right;
    color: #999;
    font-size: 1.7rem;
  }

  p,
  span {
    font-size: 2rem;
  }

  .message-footer {
    border-top: 1px solid #ddd;
    background: #eee;
    padding: 10px;
    display: flex;
    height: 60px;
  }
  input {
    flex: 1;
    padding: 0 20px;
    border-radius: 5px;
  }

  @media only screen and (max-width: 480px),
    only screen and (max-width: 767px) {
    .sidebar {
      position: absolute;
      width: 100%;
      height: 100%;
      box-shadow: var(--dark-shadow);
      transform: translate(-110%);
    }

    .container {
      display: flex;
      box-shadow: var(--dark-shadow);
      position: fixed;
      width: 100%;
      top: 10rem;
      font-size: 2rem;
      left: 2rem;
      bottom: 2rem;
      right: 2rem;
    }

    .sidebar-header svg {
      font-size: 4rem;
      display: block;
    }

    .show-sidebar {
      transform: translate(0);
    }

    .open {
      display: block;
    }
  }
`

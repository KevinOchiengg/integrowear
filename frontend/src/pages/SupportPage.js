import React, { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Message from '../components/Message'
import { BiMessageDetail } from 'react-icons/bi'
import { IoIosArrowRoundBack, IoMdSend } from 'react-icons/io'
import { FaRegUserCircle } from 'react-icons/fa'

let allUsers = []
let allMessages = []
let allSelectedUser = {}
const ENDPOINT =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:5000'
    : window.location.host

export default function SupportPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const openSidebar = () => {
    setIsSidebarOpen(true)
  }

  const [selectedUser, setSelectedUser] = useState({})
  const [socket, setSocket] = useState(null)
  const uiMessagesRef = useRef(null)
  const [messageBody, setMessageBody] = useState('')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: 'smooth',
      })
    }

    if (!socket) {
      const sk = socketIOClient(ENDPOINT)
      setSocket(sk)
      sk.emit('onLogin', {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      })
      sk.on('message', (data) => {
        if (allSelectedUser._id === data._id) {
          allMessages = [...allMessages, data]
        } else {
          const existUser = allUsers.find((user) => user._id === data._id)
          if (existUser) {
            allUsers = allUsers.map((user) =>
              user._id === existUser._id ? { ...user, unread: true } : user
            )
            setUsers(allUsers)
          }
        }
        setMessages(allMessages)
      })
      sk.on('updateUser', (updatedUser) => {
        const existUser = allUsers.find((user) => user._id === updatedUser._id)
        if (existUser) {
          allUsers = allUsers.map((user) =>
            user._id === existUser._id ? updatedUser : user
          )
          setUsers(allUsers)
        } else {
          allUsers = [...allUsers, updatedUser]
          setUsers(allUsers)
        }
      })
      sk.on('listUsers', (updatedUsers) => {
        allUsers = updatedUsers
        setUsers(allUsers)
      })
      sk.on('selectUser', (user) => {
        allMessages = user.messages
        setMessages(allMessages)
      })
    }
  }, [userInfo._id, userInfo.name, userInfo.isAdmin, messages, socket, users])

  const selectUser = (user) => {
    allSelectedUser = user
    setSelectedUser(allSelectedUser)
    const existUser = allUsers.find((x) => x._id === user._id)
    if (existUser) {
      allUsers = allUsers.map((x) =>
        x._id === existUser._id ? { ...x, unread: false } : x
      )
      setUsers(allUsers)
    }
    socket.emit('onUserSelected', user)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (!messageBody.trim()) {
      alert('Error. Please type message.')
    } else {
      allMessages = [...allMessages, { body: messageBody, name: userInfo.name }]
      setMessages(allMessages)
      setMessageBody('')
      setTimeout(() => {
        socket.emit('onMessage', {
          body: messageBody,
          name: userInfo.name,
          isAdmin: userInfo.isAdmin,
          _id: selectedUser._id,
        })
      }, 1000)
    }
  }

  return (
    <Wrapper>
      <div className='container section-center'>
        <div
          className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}
        >
          <div className='sidebar-header'>
            <h2>chat with</h2>
            <IoIosArrowRoundBack onClick={closeSidebar} />
          </div>
          <div className='users-list-container'>
            {users
              .filter((x) => x._id !== userInfo._id)
              .map((user) => (
                <article
                  className='single-user-wrapper'
                  onClick={() => selectUser(user, setIsSidebarOpen(false))}
                  key={userInfo._id}
                >
                  <FaRegUserCircle />
                  <div className='info'>
                    <h3>{user.name}</h3>
                    <span>{user.online ? 'online' : ''}</span>
                  </div>
                </article>
              ))}
          </div>
        </div>
        <div className='content'>
          <header className='content-header'>
            {selectedUser.online ? <FaRegUserCircle /> : ''}

            <div className='info'>
              <h3>{selectedUser.name}</h3>
              <span>{selectedUser.online ? 'online' : ''}</span>
            </div>

            <BiMessageDetail className='open' onClick={openSidebar} />
          </header>
          {!selectedUser._id ? (
            <Message
              message='no messages found. please select an online user to chat with'
              name='hide'
            />
          ) : (
            <ul className='message-wrap' ref={uiMessagesRef}>
              {messages.map((msg, index) => (
                <li
                  className={`message-sent ${
                    selectedUser._id && 'message-list'
                  }`}
                  key={index}
                >
                  <p className='msg'>{msg.body}</p>
                  <span className='time'>
                    {new Date().getHours() + ':' + new Date().getMinutes()}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={submitHandler}>
            <input
              placeholder='Type text message'
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              type='text'
            />

            <button type='submit'>
              <IoMdSend className='send-btn' />
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 12rem 0;
  height: 90vh;
  color: var(--clr-blue);
  .container {
    display: flex;
    height: 80%;
    box-shadow: var(--dark-shadow);
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

  .send-btn {
    font-size: 3rem;
    color: var(--clr-blue);
    cursor: pointer;
    margin-left: 2rem;
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
  .users-list-container svg,
  .content-header svg {
    font-size: 5rem;
    margin-right: 10px;
    color: var(--clr-light-grey);
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
  .alert {
    text-align: center;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .info {
    flex: 1;
  }
  h3 {
    font-size: 2rem;
    font-weight: 700;
  }
  .time {
    display: flex;
    margin-top: 3px;
    font-size: 2rem;
  }
  .open {
    display: none;
  }
  .open a {
    color: #000;
    letter-spacing: 3px;
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

  .message-wrap > li:nth-child(even) {
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
    font-size: 1.7rem;
  }

  span {
    color: var(--green);
  }

  @media only screen and (max-width: 480px),
    only screen and (max-width: 767px) {
    .sidebar {
      position: absolute;
      width: 90%;
      height: 100%;
      box-shadow: var(--dark-shadow);
      transform: translate(-110%);
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

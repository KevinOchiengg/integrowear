import React, { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Message from '../components/Message'
import { FaUsers } from 'react-icons/fa'

let allUsers = []
let allMessages = []
let allSelectedUser = {}
const ENDPOINT =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:5000'
    : window.location.host

export default function SupportPage() {
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
      <div className='section-center'>
        <div className='row top full-container'>
          <div className='col-1 support-users'>
            {users.filter((x) => x._id !== userInfo._id).length === 0 && (
              <Message message='No Online user' name='hide' />
            )}
            <ul>
              {users
                .filter((x) => x._id !== userInfo._id)
                .map((user) => (
                  <li
                    key={user._id}
                    className={
                      user._id === selectedUser._id ? '  selected' : '  '
                    }
                  >
                    <button
                      className='block'
                      type='button'
                      onClick={() => selectUser(user)}
                    >
                      {user.name}
                    </button>
                    <span
                      className={
                        user.unread
                          ? 'unread'
                          : user.online
                          ? 'online'
                          : 'offline'
                      }
                    />
                  </li>
                ))}
            </ul>
          </div>
          <div className='col-3 support-messages'>
            {!selectedUser._id ? (
              <Message message='Select a user to start chat' name='hide' />
            ) : (
              <div>
                <div className='row'>
                  <strong>Chat with {selectedUser.name} </strong>
                </div>
                <ul ref={uiMessagesRef}>
                  {messages.length === 0 && <li>No message.</li>}
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
                    <button type='submit' className='btn'>
                      Send
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='app'>
        <div className='app_body'>
          <div className='sidebar'>
            <div className='sidebar__header'>
              <h2>Start conversation with the customer</h2>
            </div>
            <div className='sidebar__chats'>
              <div className='sidebarChat'>
                <FaUsers />
                <div className='sidebarChat__info'>
                  <h2>Room name</h2>
                  <p>onine</p>
                </div>
              </div>
              <div className='sidebarChat'>
                <FaUsers />
                <div className='sidebarChat__info'>
                  <h2>Room name</h2>
                  <p>onine</p>
                </div>
              </div>
              <div className='sidebarChat'>
                <FaUsers />
                <div className='sidebarChat__info'>
                  <h2>Room name</h2>
                  <p>onine</p>
                </div>
              </div>
            </div>
          </div>
          <div className='chat'>
            <div className='chat__header'>
              <FaUsers />

              <div className='chat__headerInfo'>
                <h3>Room name</h3>
                <p>Last seen at...</p>
              </div>

              <div className='chat__headerRight'>
                <FaUsers />
              </div>
            </div>

            <div className='chat__body'>
              {/* {messages.map((message) => (
          <p className={`chat__message ${message.received && 'chat_receiver'}`}>
            <span className='chat__name'>{message.name}</span>
            {message.message}
            <span className='chat__timestamp'>{message.timestamp}</span>
          </p>
        ))} */}

              <p className='chat__message'>
                <span className='chat__name'>Sonny</span>
                This is a message
                <span className='chat__timestamp'>
                  {new Date().toUTCString()}
                </span>
              </p>

              <p className='chat__message chat__receiver'>
                <span className='chat__name'>Kevin</span>
                This is a message
                <span className='chat__timestamp'>
                  {new Date().toUTCString()}
                </span>
              </p>

              <p className='chat__message'>
                <span className='chat__name'>Sonny</span>
                This is a message
                <span className='chat__timestamp'>
                  {new Date().toUTCString()}
                </span>
              </p>
            </div>

            <div className='chat__footer'>
              <FaUsers />
              <form>
                <div className='sidebar__searchContainer'>
                  <input placeholder='Type a message' type='text' />
                </div>

                <button type='submit'>Send a message</button>
              </form>
              <FaUsers />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .app {
    display: grid;
    place-items: center;
    height: 100vh;
    background: #dadbd3;
  }

  .app_body {
    display: flex;
    background: #ededed;
    margin-top: -50px;
    height: 90vh;
    width: 90vw;
    box-shadow: var(--dark-shadow);
  }

  .chat {
    display: flex;
    flex-direction: column;
    flex: 0.75;
  }

  .chat__header {
    padding: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
  }

  .chat__headerInfo {
    flex: 1;
    padding-left: 20px;
  }

  h3 {
    margin-bottom: 3px;
    font-weight: 500;
    font-size: 2rem;
  }

  .chat__headerinfo > p {
    color: gray;
  }

  .chat__body {
    flex: 1;
    background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
    background-repeat: repeat;
    background-position: center;
    padding: 30px;
    overflow: scroll;
  }

  .chat__message {
    position: relative;
    font-size: 16px;
    padding: 10px;
    width: fit-content;
    border-radius: 10px;
    background-color: #ffffff;
    margin-bottom: 30px;
  }

  .chat__receiver {
    margin-left: auto;
    background-color: var(--clr-blue);
    color: var(--clr-white);
  }

  .chat__timestamp {
    margin-left: 10px;
    font-size: xx-small;
  }

  .chat__name {
    position: absolute;
    top: -15px;
    font-weight: 800;
    font-size: 1.5rem;
  }

  .chat__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 62px;
    border-top: 1px solid lightgray;
  }

  .chat__footer > form {
    flex: 1;
    display: flex;
  }

  .chat__footer > form > input {
    flex: 1;
    outline-width: 0;
    border-radius: 30px;
    padding: 10px;
    border: none;
  }
  .chat__footer > form > button {
    display: none;
  }

  .chat__footer > svg {
    padding: 10px;
    color: gray;
  }
  .sidebar {
    display: flex;
    flex-direction: column;
    flex: 0.25;
  }

  .sidebar__header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-right: 1px solid lightgray;
  }

  .sidebar__headerRight {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 10vw;
  }

  svg {
    margin-top: 1rem;
    font-size: 24px;
  }

  .sidebar__search {
    display: flex;
    align-items: center;
    background-color: #f6f6f6;
    height: 39px;
    padding: 10px;
  }

  .sidebar__searchContainer {
    display: flex;
    align-items: center;
    background-color: white;
    width: 100%;
    height: 35px;
    border-radius: 20px;
  }

  .sidebar__searchContainer > svg {
    color: gray;
    padding: 10px;
  }

  .sidebar__searchContainer > input {
    border: none;
    /* outline-width: 0; */ /*포커스 상태일때 파란색 outline 표시*/
    margin-left: 10px;
  }

  .sidebar__chats {
    flex: 1;
    background-color: white;
    overflow: scroll;
  }
  .sidebarChat {
    display: flex;
    padding: 20px;
    cursor: pointer;
    border-bottom: 1px solid #f6f6f6;
  }

  .sidebarChat:hover {
    background-color: #ebebeb;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 8px;
  }

  .sidebarChat__info {
    margin-left: 15px;
  }
`

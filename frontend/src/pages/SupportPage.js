import React, { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Message from '../components/Message'

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
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 12rem 0;
  .alert {
    align-items: center;
  }

  .center {
    position: absolute;
    top: 50%;
    left: calc(50% + 12rem);
    transform: translate(-50%, -50%);
  }

  .pic {
    width: 4rem;
    height: 4rem;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
  }

  .contact {
    position: relative;
    margin-bottom: 1rem;
    padding-left: 5rem;
    height: 4.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .contact .pic {
    position: absolute;
    left: 0;
  }
  .contact .name {
    font-weight: 500;
    margin-bottom: 0.125rem;
  }
  .contact .message,
  .contact .seen {
    font-size: 0.9rem;
    color: #999;
  }
  .contact .badge {
    box-sizing: border-box;
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    text-align: center;
    font-size: 0.9rem;
    padding-top: 0.125rem;
    border-radius: 1rem;
    top: 0;
    left: 2.5rem;
    background: #333;
    color: white;
  }

  .contacts {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-6rem, -50%);
    width: 24rem;
    height: 32rem;
    padding: 1rem 2rem 1rem 1rem;
    box-sizing: border-box;
    border-radius: 1rem 0 0 1rem;
    cursor: pointer;
    background: white;
    box-shadow: 0 0 8rem 0 rgba(0, 0, 0, 0.1),
      2rem 2rem 4rem -3rem rgba(0, 0, 0, 0.5);
    transition: transform 500ms;
  }
  .contacts h2 {
    margin: 0.5rem 0 1.5rem 5rem;
  }
  .contacts .fa-bars {
    position: absolute;
    left: 2.25rem;
    color: #999;
    transition: color 200ms;
  }
  .contacts .fa-bars:hover {
    color: #666;
  }
  .contacts .contact:last-child {
    margin: 0;
  }
  .contacts:hover {
    transform: translate(-23rem, -50%);
  }

  .chat {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 24rem;
    height: 38rem;
    z-index: 2;
    box-sizing: border-box;
    border-radius: 1rem;
    background: white;
    box-shadow: 0 0 8rem 0 rgba(0, 0, 0, 0.1),
      0rem 2rem 4rem -3rem rgba(0, 0, 0, 0.5);
  }
  .chat .contact.bar {
    flex-basis: 3.5rem;
    flex-shrink: 0;
    margin: 1rem;
    box-sizing: border-box;
  }
  .chat .messages {
    padding: 1rem;
    background: #f7f7f7;
    flex-shrink: 2;
    overflow-y: auto;
    box-shadow: inset 0 2rem 2rem -2rem rgba(0, 0, 0, 0.05),
      inset 0 -2rem 2rem -2rem rgba(0, 0, 0, 0.05);
  }
  .chat .messages .time {
    font-size: 0.8rem;
    background: #eee;
    padding: 0.25rem 1rem;
    border-radius: 2rem;
    color: #999;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    margin: 0 auto;
  }
  .chat .messages .message {
    box-sizing: border-box;
    padding: 0.5rem 1rem;
    margin: 1rem;
    background: #fff;
    border-radius: 1.125rem 1.125rem 1.125rem 0;
    min-height: 2.25rem;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    max-width: 66%;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.075),
      0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.1);
  }
  .chat .messages .message.parker {
    margin: 1rem 1rem 1rem auto;
    border-radius: 1.125rem 1.125rem 0 1.125rem;
    background: #333;
    color: white;
  }
  .chat .messages .message .typing {
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0rem;
    box-sizing: border-box;
    background: #ccc;
    border-radius: 50%;
  }
  .chat .messages .message .typing.typing-1 {
    -webkit-animation: typing 3s infinite;
    animation: typing 3s infinite;
  }
  .chat .messages .message .typing.typing-2 {
    -webkit-animation: typing 3s 250ms infinite;
    animation: typing 3s 250ms infinite;
  }
  .chat .messages .message .typing.typing-3 {
    -webkit-animation: typing 3s 500ms infinite;
    animation: typing 3s 500ms infinite;
  }
  .chat .input {
    box-sizing: border-box;
    flex-basis: 4rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding: 0 0.5rem 0 1.5rem;
  }
  .chat .input i {
    font-size: 1.5rem;
    margin-right: 1rem;
    color: #666;
    cursor: pointer;
    transition: color 200ms;
  }
  .chat .input i:hover {
    color: #333;
  }
  .chat .input input {
    border: none;
    background-image: none;
    background-color: white;
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    border-radius: 1.125rem;
    flex-grow: 2;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1),
      0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.2);
    font-family: Red hat Display, sans-serif;
    font-weight: 400;
    letter-spacing: 0.025em;
  }
  .chat .input input:placeholder {
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
  .pic.stark {
    background-image: url('https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/7/73/SMH_Mentor_6.png');
  }

  .pic.banner {
    background-image: url('https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/4/4f/BruceHulk-Endgame-TravelingCapInPast.jpg');
  }

  .pic.thor {
    background-image: url('https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/9/98/ThorFliesThroughTheAnus.jpg');
  }

  .pic.danvers {
    background-image: url('https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/0/05/HeyPeterParker.png');
  }

  .pic.rogers {
    background-image: url('https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/7/7c/Cap.America_%28We_Don%27t_Trade_Lives_Vision%29.png');
  }
`

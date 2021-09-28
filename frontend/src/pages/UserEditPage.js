import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { detailsUser, updateUser } from '../actions/userActions'
import Loading from '../components/Loading'
import Message from '../components/Message'
import { USER_UPDATE_RESET } from '../constants/userConstants'

export default function UserEditPage(props) {
  const userId = props.match.params.id
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSeller, setIsSeller] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  const dispatch = useDispatch()
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      props.history.push('/userlist')
    }
    if (!user) {
      dispatch(detailsUser(userId))
    } else {
      setName(user.name)
      setEmail(user.email)
      setIsSeller(user.isSeller)
      setIsAdmin(user.isAdmin)
    }
  }, [dispatch, props.history, successUpdate, user, userId])

  const submitHandler = (e) => {
    e.preventDefault()
    // dispatch update user
    dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }))
  }
  return (
    <Wrapper>
      <div className='section-center'>
        <form className='form' onSubmit={submitHandler}>
          <div>
            <h3 className='sub-heading'>user</h3>
            <h1 className='heading'>Edit User</h1>
            {loadingUpdate && <Loading />}
            {errorUpdate && (
              <Message
                variant='danger'
                message='error updating user'
                name='hide'
              />
            )}
          </div>
          {loading ? (
            <Loading />
          ) : error ? (
            <Message
              variant='danger'
              message='error editing user'
              name='hide'
            />
          ) : (
            <>
              <div className='field-container'>
                <label htmlFor='name'>Name</label>
                <input
                  id='name'
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='field-container'>
                <label htmlFor='email'>Email</label>
                <input
                  id='email'
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='checkbox-container'>
                <input
                  id='isSeller'
                  type='checkbox'
                  checked={isSeller}
                  className='checkbox'
                  onChange={(e) => setIsSeller(e.target.checked)}
                />
                <label htmlFor='isSeller'>Seller</label>
              </div>
              <div className='checkbox-container'>
                <input
                  id='isAdmin'
                  type='checkbox'
                  checked={isAdmin}
                  className='checkbox'
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label htmlFor='isAdmin'>Admin</label>
              </div>
              <div>
                <button type='submit' className='btn primary'>
                  Update
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 12rem 0;
  .checkbox-container {
    display: flex;
    flex-direction: row;
  }

  .checkbox {
    margin-top: 1.02rem;
    height: 1rem;
    width: 1rem;
    margin-right: 1.5rem;
  }

  .primary {
    font-size: 2rem;
  }

  @media screen and (min-width: 800px) {
    .checkbox {
      height: 2rem;
      width: 2rem;
    }
  }
`

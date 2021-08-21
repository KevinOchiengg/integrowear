import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { detailsUser, updateUser } from '../actions/userActions'
import LoadingBox from '../components/Loading'
import MessageBox from '../components/Message'
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
            <h3 className='title'>Edit User</h3>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant='danger'>{errorUpdate}</MessageBox>
            )}
          </div>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant='danger'>{error}</MessageBox>
          ) : (
            <>
              <div>
                <label htmlFor='name'>Name</label>
                <input
                  id='name'
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
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
                <label htmlFor='isSeller'>Is Seller</label>
                <input
                  id='isSeller'
                  type='checkbox'
                  checked={isSeller}
                  className='checkbox'
                  onChange={(e) => setIsSeller(e.target.checked)}
                />
              </div>
              <div className='checkbox-container'>
                <label htmlFor='isAdmin'>Is Admin</label>
                <input
                  id='isAdmin'
                  type='checkbox'
                  checked={isAdmin}
                  className='checkbox'
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
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
  margin: 6em 0;
  color: var(--clr-grey);
  .form {
    width: 100%;
  }
  input {
    border: 1px solid var(--clr-light-grey);
    height: 3.5em;
  }

  .title {
    margin-bottom: 0;
  }

  .checkbox-container {
    align-items: center;
    flex-direction: row;
  }

  .checkbox {
    height: 1em;
    width: 1em;
    margin-left: 1.5em;
  }

  .primary {
    color: var(--clr-blue);
    font-size: 1rem;
  }

  @media screen and (min-width: 800px) {
    .form {
      width: 60%;
    }

    .checkbox {
      height: 1.5em;
      width: 1.5em;
    }
  }
`

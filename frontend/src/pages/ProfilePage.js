import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { detailsUser, updateUserProfile } from '../actions/userActions'
import Loading from '../components/Loading'
import Message from '../components/Message'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

export default function ProfilePage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [sellerName, setSellerName] = useState('')
  const [sellerLogo, setSellerLogo] = useState('')
  const [sellerDescription, setSellerDescription] = useState('')

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile
  const dispatch = useDispatch()
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
      dispatch(detailsUser(userInfo._id))
    } else {
      setName(user.name)
      setEmail(user.email)
      if (user.seller) {
        setSellerName(user.seller.name)
        setSellerLogo(user.seller.logo)
        setSellerDescription(user.seller.description)
      }
    }
  }, [dispatch, userInfo._id, user])
  const submitHandler = (e) => {
    e.preventDefault()
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched')
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
          sellerName,
          sellerLogo,
          sellerDescription,
        })
      )
    }
  }
  return (
    <Wrapper>
      <div className='section-center'>
        <form className='form' onSubmit={submitHandler}>
          <h3 className='sub-heading'>profile</h3>
          <h1 className='heading'>User Profile</h1>
          {loading ? (
            <Loading />
          ) : error ? (
            <Message
              variant='danger'
              message='Error occured Loading profile page'
              name='hide'
            />
          ) : (
            <>
              {loadingUpdate && <Loading />}
              {errorUpdate && (
                <Message
                  variant='danger'
                  message='Error Loading updates '
                  name='hide'
                />
              )}
              {successUpdate && (
                <Message
                  variant='success'
                  message='Error occured '
                  name='hide'
                />
              )}
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
              <div>
                <label htmlFor='password'>Password</label>
                <input
                  id='password'
                  type='password'
                  placeholder='Enter password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor='confirmPassword'>confirm Password</label>
                <input
                  id='confirmPassword'
                  type='password'
                  placeholder='Enter confirm password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {user.isSeller && (
                <>
                  <div>
                    <label htmlFor='sellerName'>Seller Name</label>
                    <input
                      id='sellerName'
                      type='text'
                      placeholder='Enter Seller Name'
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor='sellerLogo'>Seller Logo</label>
                    <input
                      id='sellerLogo'
                      type='text'
                      placeholder='Enter Seller Logo'
                      value={sellerLogo}
                      onChange={(e) => setSellerLogo(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor='sellerDescription'>
                      Seller Description
                    </label>
                    <input
                      id='sellerDescription'
                      type='text'
                      placeholder='Enter Seller Description'
                      value={sellerDescription}
                      onChange={(e) => setSellerDescription(e.target.value)}
                    />
                  </div>
                </>
              )}

              <button className=' btn primary' type='submit'>
                Update
              </button>
            </>
          )}
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 12rem 0;
  color: var(--clr-dark-grey);

  .primary {
    width: 40%;
    font-size: 2rem;
  }

  .alert {
    text-align: center;
  }

  @media screen and (min-width: 800px) {
  }
`

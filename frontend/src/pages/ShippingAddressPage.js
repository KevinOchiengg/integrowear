import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingAddressPage(props) {
  const userSignin = useSelector((state) => state.userSignin)

  const { userInfo } = userSignin
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const [lat, setLat] = useState(shippingAddress.lat)
  const [lng, setLng] = useState(shippingAddress.lng)
  const userAddressMap = useSelector((state) => state.userAddressMap)
  const { address: addressMap } = userAddressMap

  if (!userInfo) {
    props.history.push('/signin')
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName)
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    const newLat = addressMap ? addressMap.lat : lat
    const newLng = addressMap ? addressMap.lng : lng
    if (addressMap) {
      setLat(addressMap.lat)
      setLng(addressMap.lng)
    }
    let moveOn = true
    if (!newLat || !newLng) {
      moveOn = window.confirm('You did not set your location on map. Continue?')
    }
    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
        })
      )
      props.history.push('/payment')
    }
  }
  const chooseOnMap = () => {
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        postalCode,
        country,
        lat,
        lng,
      })
    )
    props.history.push('/map')
  }
  return (
    <Wrapper>
      <div className='section-center'>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <form className='form' onSubmit={submitHandler}>
          <h3 className='sub-heading'>shipping</h3>
          <h1 className='heading'>shippingAddress</h1>
          <div>
            <label htmlFor='fullName'>Full Name</label>
            <input
              type='text'
              id='fullName'
              placeholder='Enter full name'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              id='address'
              placeholder='Enter address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor='city'>City</label>
            <input
              type='text'
              id='city'
              placeholder='Enter city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor='postalCode'>Postal Code</label>
            <input
              type='text'
              id='postalCode'
              placeholder='Enter postal code'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor='country'>Country</label>
            <input
              type='text'
              id='country'
              placeholder='Enter country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor='chooseOnMap'>Location</label>
            <button type='button' className='primary' onClick={chooseOnMap}>
              Choose On Map
            </button>
          </div>
          <div>
            <button className='btn primary' type='submit'>
              Continue
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  margin: 10rem 0;
  color: var(--clr-grey);

  .sub-heading {
    margin-top: 3rem;
  }

  .checkbox-container {
    align-items: center;
    flex-direction: row;
  }

  .primary {
    font-size: 2rem;
  }

  @media screen and (min-width: 800px) {
    .checkbox {
      height: 1.5em;
      width: 1.5em;
    }
  }
`

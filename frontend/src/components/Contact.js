import React from 'react'
import styled from 'styled-components'
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa'

const Contact = () => {
  return (
    <Wrapper className='contact section-center'>
      <h3 className='sub-heading'>contacts</h3>
      <h1 className='heading'>Contact us</h1>

      <div className='icons-container'>
        <div className='icons'>
          <i>
            <FaMapMarkerAlt />
          </i>
          <h3>address</h3>
          <p>Shoppers, nakuru, kenya - 600204</p>
        </div>

        <div className='icons'>
          <i>
            <FaEnvelope />
          </i>
          <h3>email</h3>
          <p>mosesjuma83@gmail.com</p>
          <p>integrowears@gmail.com</p>
        </div>

        <div className='icons'>
          <i>
            <FaPhone />
          </i>
          <h3>phone</h3>
          <p>+254758231661</p>
          <p>+254712 312336</p>
        </div>
      </div>

      <div className='row'>
        <form action=''>
          <h3>get in touch</h3>
          <div className='inputBox'>
            <input type='text' placeholder='your name' />
            <input type='email' placeholder='your email' />
          </div>
          <div className='inputBox'>
            <input type='number' placeholder='your number' />
            <input type='text' placeholder='your subject' />
          </div>
          <textarea placeholder='your message' cols='30' rows='10'></textarea>
          <button type='submit' className='btn'>
            send message
          </button>
        </form>

        <iframe
          className='map'
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30153.788252261566!2d72.82321484621745!3d19.141690214227783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63aceef0c69%3A0x2aa80cf2287dfa3b!2sJogeshwari%20West%2C%20Mumbai%2C%20Maharashtra%20400047!5e0!3m2!1sen!2sin!4v1633431163028!5m2!1sen!2sin'
          allowFullScreen=''
          loading='lazy'
        ></iframe>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-bottom: 6rem;
  .icons-container {
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: (minmax(25rem, 1fr)) [auto-fit];
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    gap: 1.5rem;
  }

  .icons {
    padding: 2rem;
    border-radius: 0.5rem;
    border: 0.1rem solid rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    box-shadow: var(--light-shadow);
    text-align: center;
  }

  .icons svg {
    font-size: 3.5rem;
    color: var(--clr-blue);
  }

  .icons h3 {
    font-size: 2.2rem;
    padding: 1rem 0;
    color: var(--clr-blue);
  }

  .icons p {
    font-size: 1.5rem;
    line-height: 2;
    color: var(--clr-light-grey);
  }

  .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 2rem;
  }

  form {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 42rem;
    flex: 1 1 42rem;
    padding: 2rem;
    border: 0.1rem solid rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
  }

  form h3 {
    font-size: 3rem;
    padding-bottom: 1rem;
    color: var(--clr-blue);
  }

  .inputBox {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  input {
    width: 49%;
  }

  input,
  textarea {
    border: 0.1rem solid rgba(0, 0, 0, 0.3);
    border-radius: 0.5rem;
    padding: 1rem 1.2rem;
    font-size: 1.6rem;
    color: var(--clr-blue);
    text-transform: none;
    margin: 0.7rem 0;
  }

  textarea {
    height: 15rem;
    resize: none;
    width: 100%;
  }

  .map {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 42rem;
    flex: 1 1 42rem;
    width: 100%;
    padding: 2rem;
    border: 0.1rem solid rgba(0, 0, 0, 0.3);
    border-radius: 0.5rem;
    -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  }
`

export default Contact

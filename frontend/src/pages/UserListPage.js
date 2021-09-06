import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { deleteUser, listUsers } from '../actions/userActions'
import Loading from '../components/Loading'
import LoadingBox from '../components/Loading'
import Message from '../components/Message'
import MessageBox from '../components/Message'
import { USER_DETAILS_RESET } from '../constants/userConstants'

export default function UserListPage(props) {
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userDelete = useSelector((state) => state.userDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listUsers())
    dispatch({
      type: USER_DETAILS_RESET,
    })
  }, [dispatch, successDelete])
  const deleteHandler = (user) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user._id))
    }
  }
  return (
    <Wrapper>
      <div className='section-center'>
        <h3 class='sub-heading'>users</h3>
        <h1 class='heading'>user list</h1>

        <div className='row'>
          {loadingDelete && <LoadingBox></LoadingBox>}
          {errorDelete && <Message variant='danger' massage='User' />}
          {successDelete && (
            <Message variant='success' massage='User Deleted Successfully' />
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant='danger' massage='error' />
          ) : (
            <table className='table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>SELLER</th>
                  <th>ADMIN</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isSeller ? 'YES' : ' NO'}</td>
                    <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                    <td>
                      <button
                        type='button'
                        onClick={() =>
                          props.history.push(`/user/${user._id}/edit`)
                        }
                      >
                        Edit
                      </button>
                      <button type='button' onClick={() => deleteHandler(user)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 12rem 0;
  color: var(--clr-grey);
  .table {
    margin-top: 3em;
    width: 100%;
    border-collapse: collapse;
  }
  .table tbody tr:nth-of-type(odd) {
    background: var(--clr-light-blue);
  }

  .row {
    overflow-x: auto;
  }

  td,
  th {
    text-align: center;
    border: 0.1em solid #e4e4e4;
    padding: 0.5em;
  }
  .table button {
    margin: 0 0.2rem;
  }

  .primary {
    color: var(--clr-blue);
    font-size: 1rem;
  }
  h3 {
    margin-bottom: 0;
  }

  a {
    color: var(--clr-blue);
  }

  .table button {
    margin: 0.2rem;
    padding: 0.5rem;
  }
`

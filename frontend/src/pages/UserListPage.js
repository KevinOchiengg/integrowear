import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { deleteUser, listUsers } from '../actions/userActions'
import Loading from '../components/Loading'
import Message from '../components/Message'
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
        <h3 className='sub-heading'>users</h3>
        <h1 className='heading'>user list</h1>

        <div className='row'>
          {loadingDelete && <Loading />}
          {errorDelete && (
            <Message
              variant='danger'
              message='Unable to delete User'
              name='hide'
            />
          )}
          {successDelete && (
            <Message
              variant='success'
              message='User Deleted Successfully'
              name='hide'
            />
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message
              variant='danger'
              message='error loading users'
              name='hide'
            />
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
                        className='edit-btn '
                        onClick={() =>
                          props.history.push(`/user/${user._id}/edit`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        type='button'
                        className='delete-btn '
                        onClick={() => deleteHandler(user)}
                      >
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
  tr:nth-of-type(odd) {
    background: var(--clr-light-blue);
  }

  .row {
    overflow-x: auto;
  }

  .alert {
    text-align: center;
  }

  button {
    background: #e4e4e4;
    color: var(--clr-blue);
    margin: 0.4rem;
  }

  .edit-btn {
    padding: 0.8rem 1.8rem;
  }

  .delete-btn {
    padding: 0.8rem;
  }

  td,
  th {
    text-align: center;
    border: 0.1em solid #e4e4e4;
    padding: 0.5em;
  }

  h3 {
    margin-bottom: 0;
  }

  a {
    color: var(--clr-blue);
  }
`

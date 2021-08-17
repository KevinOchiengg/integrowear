import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { deleteUser, listUsers } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_DETAILS_RESET } from '../constants/userConstants'

export default function UserListScreen(props) {
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
        <h3 className='title'>Users</h3>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}
        {successDelete && (
          <MessageBox variant='success'>User Deleted Successfully</MessageBox>
        )}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>IS SELLER</th>
                <th>IS ADMIN</th>
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
                      className='edit-btn'
                      onClick={() =>
                        props.history.push(`/user/${user._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type='button'
                      className='delete-btn'
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
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 6em 0;
  color: var(--clr-grey);
  .table {
    margin-top: 3em;
    width: 100%;
    border-collapse: collapse;
  }
  .table tbody tr:nth-of-type(odd) {
    background: var(--clr-light-blue);
  }

  td,
  th {
    text-align: center;
    border: 0.1em solid #e4e4e4;
    padding: 1em;
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
  .page-btn {
    margin: 20px auto 80px;
  }

  a {
    color: var(--clr-blue);
  }

  .page-btn span {
    display: inline-block;
    border: 1px solid var(--clr-blue);
    margin: 5px;
    width: 40px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    line-height: 40px;
    color: var(--clr-blue);
    transition: var(--transition);
  }

  .page-btn span:hover {
    background: var(--clr-hover);
  }
  .page-btn .active {
    background: var(--clr-yellow);
  }

  .edit-btn,
  .delete-btn {
    padding: 0.5em;
  }
`

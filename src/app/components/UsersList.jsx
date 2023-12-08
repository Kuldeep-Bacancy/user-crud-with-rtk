import React, { useEffect } from 'react';
import { deleteUser, editUser, fetchUsers } from '../../features/users/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import NewUserForm from './NewUserForm';
import { useGetUsersQuery } from '../../services/userApi';


function UsersList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const { data, isLoading, isFetching, isError } = useGetUsersQuery();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (loading || isLoading || isFetching) {
    return 'loading...'
  }

  if (error || isError) {
    return error;
  }


  return (
    <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md mt-3">
      <h3 className="text-4xl text-gray-800 text-center">Users List</h3>
      <NewUserForm />
      <ul className="divide-y divide-gray-300">
        {
          users.length > 0 ?
          users.map((user) => (
            <li className="p-4 flex justify-between items-center" key={user.id}>
              <span className="text-gray-800">{user.id}</span>
              <span className="text-gray-800">{user.email}</span>
              <div className="space-x-2">
                <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={ ()=>{dispatch(editUser(user.id))} }>Edit</button>
                <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => { dispatch(deleteUser(user.id))}}>Delete</button>
              </div>
            </li>
          ))
          :
          <div>No Users Found!</div>
        }
      </ul>
    </div>
  );
}

export default UsersList;

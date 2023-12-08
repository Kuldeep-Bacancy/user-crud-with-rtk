import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, updateUser } from '../../features/users/userSlice'



function NewUserForm() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users);
  const editUserID = useSelector((state) => state.users.editUserID)
  const user = users.find((user) => user.id === editUserID)
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
  

  const submitHandler = (data) => {
    dispatch(createUser(data))
    reset()
  }

  const updateHandler = (data) => {
    dispatch(updateUser({ id: editUserID, data: data }))
    reset()
  }

  useEffect(()=>{
    setValue('email', user?.email || "");
  }, [user, setValue])

  return (
    <div>
      <h2 className="text-2xl text-gray-400 text-center mt-3">{ editUserID ? 'Update' : 'Create' } User</h2>
      <form className="space-y-4" onSubmit={handleSubmit(editUserID ? updateHandler : submitHandler)}>
        <div>
          <label htmlFor="email" className="block font-medium text-gray-600">Email</label>
          <input type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md text-gray-800" {...register('email',{ required: 'Email is required'})} />
          <p className='error'>{errors.email?.message}</p>
        </div>
        <div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">{ editUserID ? 'Update' : 'Create'}</button>
        </div>
      </form>
    </div>
  )
}

export default NewUserForm
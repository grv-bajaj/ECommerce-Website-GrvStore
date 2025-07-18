import {useState, useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { toast, Flip } from 'react-toastify'
import { Link } from 'react-router-dom'
import Loader from "../../components/Loader"
import { setCredientials } from "../../redux/features/auth/authSlice"
import { useProfileMutation } from '../../redux/api/usersApiSlice'

const Profile = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) =>state.auth)
  const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation()

  useEffect(() => {
    setUsername(userInfo.username)
    setEmail(userInfo.email)
    
  }, [userInfo.username, userInfo.email])

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        });
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredientials({ ...res }));
        toast.success("Profile updated successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        });
      } catch (err) {
        toast.error(err?.data?.message || err.error, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        });
      }
    }
  };
  
  return (
    <div className="container mx-auto p-4 mt-[4rem]">
      <div className="flex ml-[6rem] justify-between align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-input p-4 rounded-sm w-full border"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input p-4 rounded-sm w-full border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-input p-4 rounded-sm w-full border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="form-input p-4 rounded-sm w-full border"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between mt-[3rem]">
              <button
                type="submit"
                className="text-white py-2 px-4 rounded bg-blue-400 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-300 transition-all duration-200"
              >
                Update
              </button>

              <Link
                to="/user-orders"
                className="text-white py-2 px-4 rounded bg-blue-400 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-300 transition-all duration-200"
              >
                My Orders
              </Link>
            </div>
            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
        <img
          src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt=""
          className="h-[47rem] w-[51%] hidden xl:block md:hidden sm:hidden rounded-lg absolute right-5 top-3"
        />
      </div>
    </div>
  )
}

export default Profile
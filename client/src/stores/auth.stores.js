import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import toast from 'react-hot-toast';
import { axiosInstance } from './../utils/index.utils.js'

export const useAuthStore = create( persist( set => ({
  isAuthenticated: false,
  user: null, // this contains the current user's data. make sure to replace the mockUserProfile with this.

  setUser: (updatedProfile) => set({ user: updatedProfile}),
  signUp: async (userData) => {
    try {
      const res = await axiosInstance.post('/auth/signup', userData);
      if(res.data?.success){
        set({ isAuthenticated: true, user: res.data.user });
        toast.success("Signup successful")
        return res.data
      } else {
        toast.error(res.data.message)
        return res.data
      }
    } catch (err) {
      console.log('Signup failed', err.response.data.message);
      toast.error(`Signup failed ${err.response.data.message}`)
      return err
    }
  },
  login: async (credentials) => {
    try {
      const res = await axiosInstance.post('/auth/login', credentials);
      if(res.data?.success){
        set({ isAuthenticated: true, user: res.data.user });
        toast.success(res.data.message)
        return res.data
      } else {
        toast.error(res.data.message)
        return res.data
      }
    } catch (err) {
      console.log('Login failed', err.response.data.message);
      toast.error(`Login failed ${err.response.data.message}`)
      return err
    }
  },
  logout: async () => {
    try {
      let res = await axiosInstance.post('/auth/logout');
      if(res.data?.success){
      // if(true){
        set({ isAuthenticated: false, user: null });
        toast.success("Logout successful")
        return res.data
      } else {
        toast.error(res.data.message)
        return res.data
      }
    } catch (err) {
      console.log('Logout error', err.response.data.message);
      toast.error(`Logout error ${err.response.data.message}`)
      return err
    }
  },
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check-auth');
      if(res.data?.success){
        set({ isAuthenticated: true, user: res.data.user });
      } else {
        set({ isAuthenticated: false, user: null });
      }
      // console.log("SS")
    } catch (err) {
      console.log('Check auth failed', err);
      set({ isAuthenticated: false, user: null });
      // toast.error(`${err.response.data.message}`)
    }
  }
}),
  { 
    name: 'auth-store',
    onRehydrateStorage: () => (state) => {
      if (state) state.checkAuth(); 
    }
  }
));

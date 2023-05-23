'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Profile from '@components/Profile'


const UserProfile = () => {
 
  const [posts, setPosts] = useState([])
  const {data: session} = useSession()
  useEffect(() => {

    if(session?.user.id){
        (async () => {
          const response = await fetch(`api/users/${session?.user.id}/posts`);
          const data = await response.json();
          setPosts(data)
        })()  
    }

  },[])  
    
  return (
    <div className='w-full'>
      <Profile
        name="My"
        desc="Welcome to your profile page."
        data={posts}
      />
    </div>
  )
}

export default UserProfile

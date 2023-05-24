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

  const handleDeletePost = async (post) => {
    const hasConfirmed = confirm("Are you sure, you want to delete this post?")
    if(hasConfirmed){
      try {
        const filteredPosts = posts.filter(p => p._id !== post._id)
        setPosts(filteredPosts)
        
        await fetch(`/api/prompt/${post._id.toString()}`,{
          method: 'DELETE'
        });


      } catch (error) {
        console.log("Delete post error: ",error);
      }
    }
  }
    
  return (
    <div className='w-full'>
      <Profile
        name="My"
        desc="Welcome to your profile page."
        data={posts}
        handleDeletePost={handleDeletePost}
      />
    </div>
  )
}

export default UserProfile

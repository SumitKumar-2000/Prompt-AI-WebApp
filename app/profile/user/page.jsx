'use client'
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

const UsersProfile = () => {

  const [posts, setPosts] = useState([])  
  const {data:session} = useSession({
    required: true,
    onUnauthenticated() {
        redirect("/")
        setPosts([])
    }
  })  
  const searchParams = useSearchParams();
  const userId = searchParams.get('id')  

  useEffect(()=>{
    if(userId){
        (async ()=>{
            const response = await fetch(`http://localhost:3000/api/users/${userId}/posts`);
            const data = await response.json()
            setPosts(data)
        })()
    }
  },[userId])
    
  return (
    <div className="w-full">
      <Profile
        name={`${posts.length !== 0 && posts[0].creator.username}`}
        desc={`Welcome to ${posts.length !== 0 && posts[0].creator.username} profile page`}
        data={posts}
      />
    </div>
  )
}

export default UsersProfile

'use client'
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

const UsersProfile = ({params}) => {

  const [posts, setPosts] = useState([])  
  const {data:session} = useSession({
    required: true,
    onUnauthenticated() {
        redirect("/")
        setPosts([])
    }
  })  
  const searchParams = useSearchParams();
  const userName = searchParams.get('name')  

  useEffect(()=>{
    if(params?.id){
        (async ()=>{
            const response = await fetch(`http://localhost:3000/api/users/${params?.id}/posts`);
            const data = await response.json()
            setPosts(data)
        })()
    }
  },[params.id])
    
  return (
    <div className="w-full">
      <Profile
        name={userName}
        desc={`Welcome to ${userName} profile page`}
        data={posts}
      />
    </div>
  )
}

export default UsersProfile

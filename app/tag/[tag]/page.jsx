'use client'

import PromptCard from "@components/PromptCard"
import { useState, useEffect } from "react"


const Tag = ({params}) => {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    if(params?.tag){
      (async ()=>{
        const response = await fetch(`http://localhost:3000/api/prompt/tag/${params?.tag}`) 
        const data = await response.json();
        setPosts(data);
      })()
    }
  },[params?.tag])

  return (
    <div className="w-full">
        <div className="mt-6 pb-4 text-3xl md:text-6xl font-extrabold orange_gradient">
            #{params?.tag}
        </div>

        <div className="mt-4 md:mt-16 prompt_layout">
          {
            posts.map((post) => (
                <PromptCard
                  key={post._id}  
                  post={post}
                />
              )
            )
          }
        </div>
    </div>

    
  )
}

export default Tag

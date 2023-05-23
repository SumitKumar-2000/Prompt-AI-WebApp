'use client'

import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { MdCheckCircle, MdContentCopy } from "react-icons/md"

const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {

  const [copy, setCopy] = useState(false)

  const handleCopy = () => {
    setCopy(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopy(false),3000);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between gap-5">
        <div className="flex-1 flex-start items-center gap-3 cursor-pointer">  
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <p className="font-semibold text-sm text-gray-900">{post.creator.username}</p>
            <p className="text-xs md:text-sm text-gray-500">{post.creator.email}</p>
          </div>
        </div>
        <div 
          onClick={handleCopy}
          className="copy_btn"
        >
          {copy ? (
            <MdCheckCircle
              className="h-3 w-3 md:h-4 md:w-4 text-green-600"
            />
            ) : (
            <MdContentCopy
              className="h-3 w-3 md:h-4 md:w-4 text-yellow-600"
            />
          )}            
        </div>
      </div>

      <div className="my-4 text-sm text-gray-700">
        {post.prompt}
      </div>   

      <div 
        onClick={()=>handleTagClick(post.tag)}
        className="text-sm blue_gradient cursor-pointer"
      >
        {post.tag}
      </div>
              
    </div>
  )
}

export default PromptCard

'use client'

import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { MdCheckCircle, MdContentCopy, MdDelete, MdEditNote } from "react-icons/md"
import Link from "next/link"

const PromptCard = ({post, handleDeletePost}) => {

  const pathName = usePathname()
  const router = useRouter();
  const {data:session} = useSession();
  const [copy, setCopy] = useState(false)
  
  const handleCopy = () => {
    setCopy(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopy(false),3000);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between gap-5">
        <Link href={session?.user.id === post.creator._id ? `/profile` : `/profile/${post.creator._id}?name=${post.creator.username}`} className="flex-1 flex-start items-center gap-3 cursor-pointer">  
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
        </Link>
        <div 
          onClick={handleCopy}
          className="copy_btn"
        >
          {copy ? (
            <MdCheckCircle
              className="h-3 w-3 md:h-4 md:w-4 text-green-600 cursor-pointer"
            />
            ) : (
            <MdContentCopy
              className="h-3 w-3 md:h-4 md:w-4 text-gray-500 cursor-pointer"
            />
          )}            
        </div>
      </div>

      <div className="my-4 text-sm text-gray-700">
        {post.prompt}
      </div>   

      <Link
        href={`/tag/${post.tag.toString()}`} 
        className="text-sm blue_gradient cursor-pointer"
      >
        #{post.tag}
      </Link>

      {session?.user.id === post.creator._id && pathName === "/profile" ? <div className="w-full flex-end">
        <div className="edit_delete_container">  
          <MdEditNote
            className="text-green-400 cursor-pointer h-3 w-3 md:h-4 md:w-4"
            onClick={()=>router.push(`/update-prompt?id=${post._id}`)}
          />
          <div className="w-[2px] h-[60%] bg-gray-200"/>
          <MdDelete
            className="text-red-400 cursor-pointer h-3 w-3 md:h-4 md:w-4"
            onClick={()=>handleDeletePost(post)}
          />
        </div>
      </div> : null}        
              
    </div>
  )
}

export default PromptCard

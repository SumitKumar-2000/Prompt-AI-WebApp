'use client'

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Form from '@components/Form'

const CreatePrompt = () => {
  const router = useRouter();
  const {data: session} = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true)

    try{
      const response = await fetch("/api/prompt/new",{
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id  
        })
      })  

      if(response.ok){
        router.push("/")
      }
    } catch(err){
      console.log("Post submit error: ",err);
    } finally{
      setSubmitting(false)
    }
  }

  return (
    <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        setSubmitting={setSubmitting}
        handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt

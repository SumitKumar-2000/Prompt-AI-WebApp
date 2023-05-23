'use client'

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Form from '@components/Form'

const EditPrompt = () => {
  
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  })
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id')

  useEffect(()=>{
    if(promptId){
        (async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        })()
    }
  },[promptId])

  const editPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true)

    try{
      console.log("update prompt test: ",post);
      const response = await fetch(`api/prompt/${promptId}`,{
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
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
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        setSubmitting={setSubmitting}
        handleSubmit={editPrompt}
    />
  )
}

export default EditPrompt

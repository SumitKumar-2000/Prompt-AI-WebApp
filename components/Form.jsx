'use client'

import Link from "next/link"

const Form = ({type, post, setPost, submitting, handleSubmit}) => {

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="orange_gradient">{type} Post.</span>
      </h1>
      <p className="desc text-left max-w-md"> 
        {type === "Create" ? "ImagiGen":"Re-ImagiGen"} your post
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 bg-[#f9f9f9] glassmorphism"
      >
        <label>
          <span className="font-semibold text-base text-gray-700">
            Prompt
          </span>

          <textarea 
            value={post.prompt}
            onChange={(e)=> setPost({...post, prompt: e.target.value})}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />

        </label>
        
        <label>
          <span className="font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="text-base font-normal">(#webdev, #mern, #react)</span>
          </span>

          <input 
            type="text"  
            value={post.tag}
            onChange={(e)=>setPost({...post, tag: e.target.value})}
            placeholder="#tag"
            required
            className="form_input"
          />

        </label>

        <div className="flex-end mx-3 gap-4 mb-3">
          <Link href="/" className="text-gray-500 text-sm hover:text-black duration-500 transition-all">
            Cancel
          </Link>
          
          <button
            type="submit"
            disabled={submitting}
            className="px-5 rounded-full bg-[#0ea5e9] py-1.5 text-sm text-white hover:shadow-xl transition-all duration-500"
          >
            {submitting ?  `${type}...` : `${type}`}
          </button>
        </div>

      </form>

    </section>
  )
}

export default Form

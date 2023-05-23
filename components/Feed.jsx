'use client'

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {
        data.map((post) => (
            <PromptCard
              key={post._id}  
              post={post}
              handleTagClick={handleTagClick}
            />
          )
        )
      }
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([])

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data)
    })()

  },[])

  return (
    <section className="feed">
      <form className="w-full relative flex-center">
        <input 
          type="search" 
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={e=>setSearchText(e.target.value)}
          className="search_input"
        />
      </form>

      <PromCardList
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed

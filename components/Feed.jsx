'use client'

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({data}) => {
  return (
    <div className="mt-16 prompt_layout">
      {
        data.map((post) => (
            <PromptCard
              key={post._id}  
              post={post}
            />
          )
        )
      }
    </div>
  )
}

const Feed = () => {

  const [posts, setPosts] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data)
    })()
  },[])

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchQuery(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="feed">
      <form 
        className="w-full relative flex-center"
      >
        <input 
          type="search" 
          placeholder="Search for a tag or a username"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search_input"
        />
      </form>

       {searchQuery ? (
        <PromptCardList
          data={searchedResults}
        />
      ) : (
        <PromptCardList data={posts}/>
      )}
    </section>
  )
}

export default Feed

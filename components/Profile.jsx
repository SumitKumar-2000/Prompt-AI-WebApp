import PromptCard from "./PromptCard"

const Profile = ({name, desc, data, handleDeletePost}) => {
  return (
    <section className='w-full max-w-full flex flex-col flex-start'>
      <h1 className="head_text">
        <span className="orange_gradient">{name} Profile.</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-16 prompt_layout">
      {
        data.map((post) => (
            <PromptCard
              key={post._id}  
              post={post}
              handleDeletePost={handleDeletePost}
            />
          )
        )
      }
      </div>
    </section>
  )
}

export default Profile




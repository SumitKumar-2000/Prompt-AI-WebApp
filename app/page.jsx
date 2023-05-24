import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <div className="head_text text-center">
            <div className="mb-1 mb:mb-2">ImagiGen</div>
            <div className="orange_gradient text-center">
                Explore & Share
            </div>
        </div>
        <div className="desc text-center">
          Empowering you to discover, create, and share limitless creative prompts.
        </div>

        <Feed/>
    </section>
  )
}

export default Home

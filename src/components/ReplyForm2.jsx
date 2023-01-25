import { useState, useContext } from "react"
import CommentContext from "../context/commentContext"
import data from "../data/data"

function ReplyForm2({user, comment}) {

  const [content, setContent] = useState("")

  const {addReply2} = useContext(CommentContext)

  const handleTextChange = (e) => {
    setContent(e.target.value)  
  }

  const handleClick = (e) => {
    e.preventDefault()
    const newReply = {

      content: content,
      createdAt: "just now",
      timestamp: new Date(),
      score: 0,
      user: {
        image: { 
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp"
        },
        username: "juliusomo"
      }
    }

    addReply2(newReply, comment.id, comment.replies, user.user.username)
  }

  return (
    <section className={`reply-form ${user.user.username}`}>
      <form>
        <div>
          <textarea onChange={handleTextChange} className="textarea" name="textarea" placeholder="Add a comment..."></textarea>
          <div className="bottom">
            <img src={data.currentUser.image.png}/>
            <button onClick={handleClick}>REPLY</button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default ReplyForm2
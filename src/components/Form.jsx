import { useState, useContext, useEffect } from "react"
import CommentContext from "../context/commentContext"
import data from "../data/data"

function Form({user}) {

  const [content, setContent] = useState("")
  
  const {addComment} = useContext(CommentContext)
  

  const handleTextChange = (e) => {
    setContent(e.target.value)  
  }

  const handleClick = (e) => {
    e.preventDefault()
    if(document.querySelector(".main-text-area").value === ""){
      return
    }
    const newComment = {

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
      },
      replies: []

    }

    addComment(newComment)
    document.querySelector(".main-text-area").value = ""
    setContent("")
  }

  return (
    <section>
      <form>
        <div>
          <textarea onChange={handleTextChange} className={`textarea main-text-area`} name="textarea" placeholder="Add a comment..."></textarea>
          <div className="bottom">
            <img src={data.currentUser.image.png}/>
            <button onClick={handleClick}>SEND</button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default Form
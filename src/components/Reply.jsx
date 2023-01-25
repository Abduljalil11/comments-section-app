import { useContext, useEffect, useState } from "react"
import CommentContext from "../context/commentContext"

function Reply({user}) {
  const {deleteComment} = useContext(CommentContext)
  const {clickReply} = useContext(CommentContext)
  const {handleVote} = useContext(CommentContext)
  const {editComment} = useContext(CommentContext)
  const {updateReply} = useContext(CommentContext)

  const {calculateTimeSinceComment} = useContext(CommentContext)
  const [timeSinceComment, setTimeSinceComment] = useState(calculateTimeSinceComment(user.timestamp));  

  useEffect(() => { 
    const intervalId = setInterval(() => { 
        setTimeSinceComment(calculateTimeSinceComment(user.timestamp)); 
    }, 5000); 

    return () => clearInterval(intervalId); 
  }, [user]);

  return (
    <div className="card">
        <div className={`comment ${user.id}`}>
            <div className="comment-head">
              <img className="avater" src={user.user.image.png}/>
              <p className="username">{user.user.username}</p>
              <p className="period">{timeSinceComment}</p>
            </div>
            <div className={`comment-text ${user.id}`}>
               <span className="tag">@{user.replyingTo}</span> {user.content}
            </div>
            <div className="comment-buttons">
              {user.user.username != "juliusomo" && <button onClick={() => clickReply(user.user.username)} className="reply"><img src="./images/icon-reply.svg"/>Reply</button>}
              {user.user.username == "juliusomo" && <button onClick={() => deleteComment(user.id)} className={`delete ${user.id}`}><img src="./images/icon-delete.svg"/>Delete</button>}
              {user.user.username == "juliusomo" && <button onClick={() => editComment(user.id, user.content)} className={`edit ${user.id}`}><img src="./images/icon-edit.svg"/>Edit</button>}
              {user.user.username == "juliusomo" && <button onClick={() => updateReply(user.id, user.content, user.replyingTo)} className={`update ${user.id}`}>UPDATE</button>}
            </div>
        </div>
        <div className="vote" onClick={(e) => handleVote(e)}>
            <div className="plus">
              <img src="images/icon-plus.svg" />
            </div>
              <p>{user.score}</p>
            <div className="minus">
              <img src="images/icon-minus.svg" />
            </div>
        </div>
    </div>
  )
}

export default Reply
import {motion, AnimatePresence} from "framer-motion"
import { useContext, useEffect, useState } from "react"
import CommentContext from "../context/commentContext"
import Reply from "./Reply"
import ReplyForm from "./ReplyForm"
import ReplyForm2 from "./ReplyForm2"

function Comment({user}) {

  const {deleteComment} = useContext(CommentContext)
  const {clickReply} = useContext(CommentContext)
  const {handleVote} = useContext(CommentContext)
  const {editComment} = useContext(CommentContext)
  const {updateComment} = useContext(CommentContext)

  const {calculateTimeSinceComment} = useContext(CommentContext)
  const [timeSinceComment, setTimeSinceComment] = useState(calculateTimeSinceComment(user.timestamp));  

  useEffect(() => { 
    const intervalId = setInterval(() => { 
        setTimeSinceComment(calculateTimeSinceComment(user.timestamp)); 
    }, 5000); 

    return () => clearInterval(intervalId); 
  }, [user]);

  return (
    <section>
      <div className="card">
      <div className={`comment ${user.id}`}>
            <div className="comment-head">
              <img className="avater" src={user.user.image.png}/>
              <p className="username">{user.user.username}</p>
              <p className="period">{timeSinceComment}</p>
            </div>
            <div className={`comment-text ${user.id}`}>
               {user.content}
            </div>
            <div className="comment-buttons">
              {user.user.username != "juliusomo" && <button onClick={() => clickReply(user.id)} className="reply"><img src="./images/icon-reply.svg"/>Reply</button>}
              {user.user.username == "juliusomo" && <button onClick={() => deleteComment(user.id)} className={`delete ${user.id}`}><img src="./images/icon-delete.svg"/>Delete</button>}
              {user.user.username == "juliusomo" && <button onClick={() => editComment(user.id, user.content)} className={`edit ${user.id}`}><img src="./images/icon-edit.svg"/>Edit</button>}
              {user.user.username == "juliusomo" && <button onClick={() => updateComment(user.id, user.content)} className={`update ${user.id}`}>UPDATE</button>}
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
      <div className="replies">
        <AnimatePresence>
          {user.replies.map((reply) => (
            <motion.div 
            key={reply.id}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
              <div key={reply.id}>
              <Reply  user={reply} />
              {reply.user.username !== "juliusomo" && <ReplyForm2 user={reply} comment={user}/>}
              </div>
           </motion.div> 
          ))}
        </AnimatePresence>
        {user.user.username !== "juliusomo" && <ReplyForm user={user}/>}
      </div>
    </section>
  )
}

export default Comment
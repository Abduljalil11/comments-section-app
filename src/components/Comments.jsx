import {motion, AnimatePresence} from "framer-motion"
import Comment from "./Comment"
import {useContext} from "react"
import CommentContext from "../context/commentContext"

function Comments() {

  const {comments} = useContext(CommentContext)

  return (
    <>
        <AnimatePresence>
          {comments.map((user)=>(
            user.length === undefined &&
              <motion.div 
                key={user.id}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
              >
                <Comment key={user.id} user={user} />
              </motion.div>
          ))}
        </AnimatePresence>
    </>
  )

  // return (
  //   <>
  //       {comments.map((user)=>(
  //           <Comment key={user.id} user={user} />
  //       ))}
        
  //   </>
  // )
}

export default Comments
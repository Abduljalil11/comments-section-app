import { v4 as uuidv4 } from "uuid"
import {createContext, useState} from "react"
import data from "../data/data"

const CommentContext = createContext()

export const CommentProvider = ({children}) => {
  
    const [comments, setComments] = useState(data.comments)

    //  const deleteComment = (id) => {

    //    let cancel = document.querySelector("#cancel");
    //    let confirmDelete = document.querySelector("#confirmDelete");
    //    let modal = document.getElementById("modal");
    //    let mainBody = document.querySelector("#main-body");  
      
    //    mainBody.style.filter = "brightness(0.3)";
    //    mainBody.style.backgroundColor = "rgba(0,0,0,0.7)";
    //    modal.style.display = "flex" ;

    //    confirmDelete.addEventListener("click", ()=>{
    //       for(let i=0; i<comments.length; i++){
    //        comments[i].replies = comments[i].replies.filter((item) => item.id!==id)
    //       }
    //       console.log(id)
    //      setComments(comments.filter((item) => item.id!==id))
    //      mainBody.style.filter = "brightness(1)";
    //      mainBody.style.backgroundColor = "transparent";
    //      modal.style.display = "none" ;
    //      return
    //    })

    //    cancel.addEventListener("click", ()=>{
    //      mainBody.style.filter = "brightness(1)";
    //      mainBody.style.backgroundColor = "transparent";
    //      modal.style.display = "none" ;
    //      return
    //    })
       
    //  }

    const deleteComment = (id) => {
      if(window.confirm("are you sure you want to delete?")){
        for(let i=0; i<comments.length; i++){
                comments[i].replies = comments[i].replies.filter((item) => item.id!==id)
        }
        console.log(id)
        setComments(comments.filter((item) => item.id!==id))
      }
    }

    const addComment = (newComment) => {

      newComment.id = uuidv4()
      setComments([...comments, newComment])
    }

    const clickReply = (id) => {
      let forms = Array.from(document.querySelectorAll(".reply-form"))
      forms.map((form) => {
        if(form.className === `reply-form ${id}`){
          form.style.display = "block"
          form.firstElementChild.firstElementChild.firstElementChild.focus()
        }
        else{
          form.style.display = "none"
        }
      })
    }

    const addReply = (newReply, id, replies, replyingTo) => {
      newReply.id = uuidv4()
      newReply.replyingTo = replyingTo
      for(let i=0; i<comments.length; i++){
        if(comments[i].id === id){
          comments[i].replies = [...replies, newReply]
        }
      }   
      setComments([...comments])

      let forms = Array.from(document.querySelectorAll(".reply-form"))
      forms.map((form) => {
        if(form.className === `reply-form ${id}`){
          form.firstElementChild.firstElementChild.firstElementChild.value = ""
          form.style.display = "none"
        }
      })
    }

    const addReply2 = (newReply, id, replies, replyingTo) => {
      newReply.id = uuidv4()
      newReply.replyingTo = replyingTo
      for(let i=0; i<comments.length; i++){
        if(comments[i].id === id){
          comments[i].replies = [...replies, newReply]
        }
      }   
      setComments([...comments])

      let forms = Array.from(document.querySelectorAll(".reply-form"))
      forms.map((form) => {
        if(form.className === `reply-form ${replyingTo}`){
          form.firstElementChild.firstElementChild.firstElementChild.value = ""
          form.style.display = "none"
        }
      })
    }

    const editComment = (id, content) => {

      const handleTextChange = (e) => {
        //e.target.value
        comments.map((comment) => {
          comment.replies.map((reply) => {
            if(reply.id === id){
              reply.content = e.target.value
            }
          })
          if(comment.id === id){
            comment.content = e.target.value
          }
        })
      }

      let myComments = Array.from(document.querySelectorAll(".comment"))
      let textarea = document.createElement("textarea")
      let deleteBtn = Array.from(document.querySelectorAll(".delete"))
      let edit = Array.from(document.querySelectorAll(".edit"))
      let update = Array.from(document.querySelectorAll(".update"))
      textarea.className = "textarea"
      textarea.value = content
      textarea.onchange = (e) => handleTextChange(e)


      myComments.map((myComment) => {
        if(myComment.className === `comment ${id}`){
          myComment.replaceChild(textarea, myComment.children[1])
          textarea.focus()
        }
      })

      deleteBtn.map((btn) => {
        if(btn.className === `delete ${id}`) btn.style.display = "none"
      })

      edit.map((btn) => {
        if(btn.className === `edit ${id}`) btn.style.display = "none"
      })

      update.map((btn) => {
        if(btn.className === `update ${id}`) btn.style.display = "block"
      })
    }

    const updateReply = (id, content, replyingTo) => {
      let myComments = Array.from(document.querySelectorAll(".comment"))
      let deleteBtn = Array.from(document.querySelectorAll(".delete"))
      let edit = Array.from(document.querySelectorAll(".edit"))
      let update = Array.from(document.querySelectorAll(".update"))
      let div = document.createElement("div")
      div.innerHTML = `<span class="tag">@${replyingTo}</span> ${content}`
      div.className = `comment-text ${id}`

      myComments.map((myComment) => {
        if(myComment.className === `comment ${id}`){
          myComment.replaceChild(div, myComment.children[1])
        }
      })

      deleteBtn.map((btn) => {
        if(btn.className === `delete ${id}`) btn.style.display = "flex"
      })

      edit.map((btn) => {
        if(btn.className === `edit ${id}`) btn.style.display = "flex"
      })

      update.map((btn) => {
        if(btn.className === `update ${id}`) btn.style.display = "none"
      })
    }

    const updateComment = (id, content) => {
      let myComments = Array.from(document.querySelectorAll(".comment"))
      let deleteBtn = Array.from(document.querySelectorAll(".delete"))
      let edit = Array.from(document.querySelectorAll(".edit"))
      let update = Array.from(document.querySelectorAll(".update"))
      let div = document.createElement("div")
      div.innerHTML = `${content}`
      div.className = `comment-text ${id}`

      myComments.map((myComment) => {
        if(myComment.className === `comment ${id}`){
          myComment.replaceChild(div, myComment.children[1])
        }
      })

      deleteBtn.map((btn) => {
        if(btn.className === `delete ${id}`) btn.style.display = "flex"
      })

      edit.map((btn) => {
        if(btn.className === `edit ${id}`) btn.style.display = "flex"
      })

      update.map((btn) => {
        if(btn.className === `update ${id}`) btn.style.display = "none"
      })
    }
    
    const handleVote = (e) => {
      if(e.target.matches(".minus") || e.target.matches(".minus-on") || e.target.matches(".plus") || e.target.matches(".plus-on")){
        return
      }
      if(e.target.closest(".plus") || e.target.closest(".plus-on")){   
        var vote = e.target.parentElement.parentElement.children[1];
        let counter = parseInt(vote.innerText);
        let dislike_state = false ;
        if(e.target.parentElement.parentElement.children[2].className === "minus-on") {
            dislike_state = true ;
        }
        else {
            dislike_state = false
        }
        if (dislike_state) {
            counter += 2;
            e.target.parentElement.parentElement.children[2].className = 'minus'
            vote.innerText = counter
            e.target.parentElement.className = 'plus-on'
        }
        else {
            if (e.target.parentElement.className === 'plus') {
                e.target.parentElement.className = "plus-on" ;
                counter += 1;
                vote.innerText = counter
            }
            else {
                e.target.parentElement.className = "plus"
                counter += -1;
                vote.innerText = counter
            }
         }
      }
      if(e.target.closest(".minus") || e.target.closest(".minus-on")){   
        var vote = e.target.parentElement.parentElement.children[1];
        let counter = parseInt(vote.innerText);
        let like_state = false ;
        if(e.target.parentElement.parentElement.children[0].className === "plus-on") {
            like_state = true ;
        }
        else {
            like_state = false
        }
        if (like_state) {
            counter += -2;
            e.target.parentElement.parentElement.children[0].className = 'plus'
            vote.innerText = counter
            e.target.parentElement.className = 'minus-on'
        }
        else {
            if (e.target.parentElement.className === 'minus') {
                e.target.parentElement.className = "minus-on" ;
                counter += -1;
                vote.innerText = counter
            }
            else {
                e.target.parentElement.className = "minus"
                counter += 1;
                vote.innerText = counter
            }
         }
      } 
    }

    const calculateTimeSinceComment = (timestamp) => { 
      const secondsSinceComment = (Date.now() - timestamp) / 1000; 
  
      if (secondsSinceComment < 60) { 
          return `${secondsSinceComment.toFixed(0)} seconds ago`; 
      }
  
      else if (secondsSinceComment < 3600) { 
        if((secondsSinceComment / 60).toFixed(0) === "1"){
          return `${(secondsSinceComment / 60).toFixed(0)} minute ago`;
        }
        else{
          return `${(secondsSinceComment / 60).toFixed(0)} minutes ago`;
        } 
      }
  
      else if (secondsSinceComment < 86400) { 
        if((secondsSinceComment / 3600).toFixed(0) === "1"){
          return `${(secondsSinceComment / 3600).toFixed(0)} hour ago`;
        }
        else{
          return `${(secondsSinceComment / 3600).toFixed(0)} hours ago`;
        } 
      }

      else if (secondsSinceComment < 604800) { 
        if((secondsSinceComment / 86400).toFixed(0) === "1"){
          return `${(secondsSinceComment / 86400).toFixed(0)} day ago`; 
        }
        else{
          return `${(secondsSinceComment / 86400).toFixed(0)} days ago`;
        } 
      }

      else if (secondsSinceComment < 2419200) {
        if((secondsSinceComment / 604800).toFixed(0) === "1"){
          return `${(secondsSinceComment / 604800).toFixed(0)} week ago`
        }
        else{
          return `${(secondsSinceComment / 604800).toFixed(0)} weeks ago`
        }
      }

      else if (secondsSinceComment < 29030400) {
        if((secondsSinceComment / 2419200).toFixed(0) === "1"){
          return `${(secondsSinceComment / 2419200).toFixed(0)} month ago`
        }
        else{
        return `${(secondsSinceComment / 2419200).toFixed(0)} months ago`
        }
      }
  
      else { 
        if((secondsSinceComment / 29030400).toFixed(0) === "1"){
          return `${(secondsSinceComment / 29030400).toFixed(0)} year ago`;
        }
        else{
          return `${(secondsSinceComment / 29030400).toFixed(0)} years ago`; 
        }  
      } 
  }
    
    return  (
        <CommentContext.Provider 
            value={{
            comments,
            deleteComment,
            addComment,
            addReply,
            addReply2,
            clickReply,
            editComment,
            handleVote,
            updateReply,
            updateComment,
            calculateTimeSinceComment
        }}>
            {children}
        </CommentContext.Provider>
    )
}

export default CommentContext
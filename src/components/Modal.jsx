function Modal() {
  return (
    <div id="modal">
      <div>
          <h1>Delete comment</h1>
          <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
          <div>
              <button id="cancel">NO, CANCEL</button>
              <button id="confirmDelete">YES, DELETE</button>
          </div>
      </div>
  </div>
  )
}

export default Modal
import Comments from './components/Comments'
import data from './data/data'
import Form from './components/Form';
import { CommentProvider } from "./context/commentContext";
import Modal from './components/Modal';


function App() {
  return (
    <CommentProvider>
      <>
        <Modal/>
        <div id='main-body'>
          <article>
              <Comments />
              <Form user={data.currentUser} />
          </article>
        </div>
      </>
   </CommentProvider>
  );
}

export default App;

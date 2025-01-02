import './App.css';
import NestedComments from './components/NestedComments';
import comments from './data/comments';

function App() {
  console.log(comments);
  return (
    <>
      <NestedComments
        comments={comments}
        onSubmit={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </>
  );
}

export default App;

import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(createAnecdote(content));
    dispatch(showNotification(`You created '${content}'`, 5));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" placeholder="type new anecdote" />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          create
        </button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

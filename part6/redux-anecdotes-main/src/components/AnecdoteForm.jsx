import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
import { appendAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(appendAnecdote(content));
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

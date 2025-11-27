import { useSelector, useDispatch } from "react-redux";
import { getId } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) =>
    [...state].sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch({ type: "VOTE", data: { id } });
  };

  const addAnecdote = (event) => {
    event.preventDefault();
    console.log("event.target:", event.target);
    console.log("event.target.anecdote:", event.target.anecdote);
    console.log("event.target.anecdote.value:", event.target.anecdote.value);

    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch({
      type: "CREATE",
      data: {
        content,
        votes: 0,
        id: getId(),
      },
    });
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;

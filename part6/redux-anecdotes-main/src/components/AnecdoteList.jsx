import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    const filter = state.filter.toLowerCase();
    return state.anecdotes
      .filter((a) => a.content.toLowerCase().includes(filter))
      .sort((a, b) => b.votes - a.votes);
  });

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(showNotification(`You voted '${anecdote.content}'`, 5));
  };

  if (anecdotes.length === 0) {
    return (
      <div style={{ color: "rgba(235, 17, 17, 1)", fontWeight: "bold" }}>
        No such anecdote...
      </div>
    );
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)} style={{ margin: "10px" }}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;

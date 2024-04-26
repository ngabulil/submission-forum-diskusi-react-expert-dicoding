/* eslint-disable react/jsx-key */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { downVoteThreadAsyncAction, getThreadsAndUsersAsyncAction, neutralizeThreadVoteAsyncAction, upVoteThreadAsyncAction } from "../states/threadsAndUsers/action";
import { formatDate } from "../utils/formatDate";

const Home = () => {
  const { users, threads } = useSelector((state) => state.threadsAndUsers);
  const loadingState = useSelector((state) => state.loadingBar)
  const loading = loadingState.default;
  const { profile, isLogin } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const handleNeutralize = (threadId) => {
      dispatch(neutralizeThreadVoteAsyncAction({ threadId, userId: profile.id }))
  }
  const handleUpVote = (threadId) => {
    if (loading) return
    const selectedThread = threads.find((thread) => thread.id === threadId);
    if (!selectedThread.upVotesBy.includes(profile.id)) {
      dispatch(upVoteThreadAsyncAction({ threadId, userId: profile.id }))
    } else {
      handleNeutralize(threadId)
    }
  }
  const handleDownVote = (threadId) => {
    if (loading) return
    const selectedThread = threads.find((thread) => thread.id === threadId);
    if (!selectedThread.downVotesBy.includes(profile.id)) {
      dispatch(downVoteThreadAsyncAction({ threadId, userId: profile.id }))
    } else {
      handleNeutralize(threadId)
    }
  }
  useEffect(() => {
    dispatch(getThreadsAndUsersAsyncAction())
  }, []);
  return (
    <div>
      <p className="text-2xl font-bold">homepage</p>
      <div>
        {threads.length > 0 && threads.map((thread) => {
          return (
            <div className="bg-slate-200 mb-4 gap-2 flex flex-col">
              <Link className="text-2xl text-blue-600" to={`/threads/${thread.id}`}>{thread.title}</Link>
              <p>{thread.body}</p>
              <p className="text-red-500 font-bold">{users.find((user) => user.id === thread.ownerId).name}</p>
              <p>{formatDate(thread.createdAt)}</p>
              <div className="flex gap-6">
                <div className={`${thread.upVotesBy.includes(profile.id) && "font-bold text-blue-500"} cursor-pointer`} onClick={() => handleUpVote(thread.id)}>
                  <p>up vote</p>
                  <p>{thread.upVotesBy.length}</p>
                </div>
                <div className={`${thread.downVotesBy.includes(profile.id) && "font-bold text-blue-500"} cursor-pointer`} onClick={() => handleDownVote(thread.id)}> 
                  <p>down vote</p>
                  <p>{thread.downVotesBy.length}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {isLogin && (
      <div className="fixed right-8 bottom-8 text-xl">
        <Link to="/create-diskusi">create diskusi</Link>
      </div>
      )}
    </div>
  );
};

export default Home;

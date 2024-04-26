/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createCommentAsyncAction,
  downVoteThreadDetailAsyncAction,
  getThreadDetailAsyncAction,
  neutralizeThreadDetailVoteAsyncAction,
  upVoteThreadDetailAsyncAction,
} from "../states/threadDetail/action";
import { formatDate } from "../utils/formatDate";

const ThreadDetail = () => {
  const [content, setContent] = useState("");
  const { id } = useParams();
  const { threadDetail, commentCreated } = useSelector(
    (state) => state.threadDetail
  );
  const { profile } = useSelector((state) => state.auth);
  const loadingState = useSelector((state) => state.loadingBar);
  const loading = loadingState.default;
  const dispatch = useDispatch();
  const handleNeutralVote = (threadId) => {
    dispatch(
      neutralizeThreadDetailVoteAsyncAction({ threadId, userId: profile.id })
    );
  };
  const handleUpVote = (threadId) => {
    if (loading) return;
    if (!threadDetail.upVotesBy.includes(profile.id)) {
      dispatch(upVoteThreadDetailAsyncAction({ threadId, userId: profile.id }));
    } else {
      handleNeutralVote(threadId);
    }
  };
  const handleDownVote = (threadId) => {
    if (loading) return;
    if (!threadDetail.downVotesBy.includes(profile.id)) {
      dispatch(
        downVoteThreadDetailAsyncAction({ threadId, userId: profile.id })
      );
    } else {
      handleNeutralVote(threadId);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCommentAsyncAction({ threadId: id, content }));
  };
  const changeContent = (e) => {
    setContent(e.target.value);
  };
  useEffect(() => {
    if (commentCreated) {
      setContent("");
      dispatch(getThreadDetailAsyncAction(id));
    }
  }, [commentCreated]);
  useEffect(() => {
    dispatch(getThreadDetailAsyncAction(id));
  }, []);
  return (
    <div>
      <p className="text-2xl font-bold">thread detail</p>
      <div className="flex flex-col gap-4">
        <p>{`#${threadDetail.category}`}</p>
        <p className="text-2xl">{threadDetail.title}</p>
        <p>{threadDetail.body}</p>
        <div className="flex items-center">
          <img src={threadDetail.owner?.avatar} alt="" />
          <p>{threadDetail.owner?.name}</p>
        </div>
        <p>{formatDate(threadDetail.createdAt)}</p>
        <div className="flex gap-6">
          <div
            className={`${
              threadDetail.upVotesBy?.includes(profile.id) &&
              "text-blue-500 font-bold"
            } cursor-pointer`}
            onClick={() => handleUpVote(threadDetail.id)}
          >
            <p>up vote</p>
            <p>{threadDetail.upVotesBy?.length}</p>
          </div>
          <div
            className={`${
              threadDetail.downVotesBy?.includes(profile.id) &&
              "text-blue-500 font-bold"
            } cursor-pointer`}
            onClick={() => handleDownVote(threadDetail.id)}
          >
            <p>down vote</p>
            <p>{threadDetail.downVotesBy?.length}</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="border-2 border-solid border-black"
          value={content}
          onChange={changeContent}
        ></textarea>
        <button className="p-4 bg-blue-500" type="submit">Comment</button>
      </form>
      <div>
        <p>{`Jumlah Komen ${threadDetail.comments?.length}`}</p>
        {threadDetail.comments?.map((comment) => (
          <div className="bg-slate-100 flex flex-col gap-4 mb-4">
            <div className="flex justify-between">
              <div className="flex items-center">
                <img src={comment.owner?.avatar} alt="" />
                <p>{comment.owner?.name}</p>
              </div>
              <p>{formatDate(comment.createdAt)}</p>
            </div>
            <p>{comment.content}</p>
            <div className="flex gap-6">
              <div>
                <p>up vote</p>
                <p>{comment.upVotesBy?.length}</p>
              </div>
              <div>
                <p>down vote</p>
                <p>{threadDetail.downVotesBy?.length}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreadDetail;

/* eslint-disable react/jsx-key */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLeaderboardsAsyncAction } from '../states/leaderboards/action';

const Leaderboards = () => {
  const { leaderboards } = useSelector((state) => state.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaderboardsAsyncAction())
  }, [])
  return (
    <div>
      <p className="text-2xl">Leaderboards</p>
      {leaderboards.map((leaderboard) => (
        <div className='flex justify-evenly'>
          <div>{leaderboard.user.name}</div>
          <div>{leaderboard.score}</div>
        </div>
      ))}
    </div>
  )
}

export default Leaderboards
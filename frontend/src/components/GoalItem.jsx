import { useDispatch} from 'react-redux'
import { deleteGoals} from '../features/goals/goalSlice'
function GoalItem({goal}) {

    
    const dispatch= useDispatch()
  return (
    <div className="goal">

        <div>
            {new Date(goal.createdAt).toLocaleString('en-US')}
            <h2>{goal.text}</h2>
            <button onclick = {()=>dispatch( deleteGoals(goal._id))}className="close">X</button>
        </div>
      
    </div>
  )
}

export default GoalItem

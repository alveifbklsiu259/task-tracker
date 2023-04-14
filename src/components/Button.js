import PropTypes from 'prop-types'
import { useTasksFunc } from './TasksProvider'

const Button = () => {
    const {state, dispatch} = useTasksFunc()

    return (
        <button 
            onClick={() => { dispatch({type: 'toggleAddForm'})}} 
            style={{backgroundColor: state.showAddTask ? "red" : "green"}} 
            className="btn"
        >{state.showAddTask ? 'Close' : "Add"}
        </button>
    ) 
}

export default Button

Button.defaultProps = {
    color: 'steelblue',
}

Button.prototype = {
    text : PropTypes.string.isRequired,
    color: PropTypes.string,
    handleAddForm: PropTypes.func
}
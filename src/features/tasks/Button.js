import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux';
import { addFormToggled, selectShowAddTaskVal } from './tasksSlice';

const Button = () => {
    const showAddTask = useSelector(selectShowAddTaskVal);
    const dispatch = useDispatch();

    return (
        <button 
            onClick={() => { dispatch(addFormToggled())}} 
            style={{backgroundColor: showAddTask ? "red" : "green"}} 
            className="btn"
        >{showAddTask ? 'Close' : "Add"}
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
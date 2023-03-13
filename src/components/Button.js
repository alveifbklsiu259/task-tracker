import PropTypes from 'prop-types'

const Button = ({handleAddForm, color, text}) => {

    return <button onClick={handleAddForm} style={{backgroundColor: color}} className="btn">{text}</button>
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
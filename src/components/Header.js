import Button from './Button'

export default function Header({handleAddForm, showAddTask}) {
    return (
        <header className="header">
            <h1>Task Tracker</h1>
            <Button handleAddForm={handleAddForm} color={showAddTask ? "red" : "green"} text={showAddTask ? 'Close' : "Add"}/>
        </header>
    )
}
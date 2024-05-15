const Total = ({ parts }) => {
    const exercises = parts.map(part => part.exercises);
    const total = exercises.reduce((total, exercise) => {
        return total + exercise;
    })

    return (
        <b>total of {total} exercises</b>
    )
}

const Part = ({ part }) => {
    return <p>{part.name} {part.exercises}</p>
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part} />
            )}

            <Total parts={parts} />
        </div>
    )
}

const Header = ({ name }) => {
    return <h1>{name}</h1>
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course
// Header component
const Header = ({ text }) => {
    return (
        <h2>{text}</h2>
    )
}

// Content component
const Part = (props) => {
    const { exam, note } = props;
    return (
        <p>{`${exam} ${note}`}</p>
    )
}

// Total component
const Total = ({ total }) => {
    return (
        <h4>{`total of ${total} exercises`}</h4>
    )
}

const Content = ({ parts }) => {
    console.log(parts)
    let total = parts.map(part=>part.exercises).reduce((a, b) => a + b, 0)
    console.log(total)
    return (
        <>
            {parts.map(part=>
                <Part key={part.id}
                exam={part.name} 
                note={part.exercises}
                />
            )}
            <Total total={total}/>
        </>
    )
}

const Course = ({course}) => {
    const { name, parts } = course;
    return (
        <>
            <Header text={name} />
            <Content parts={parts} />
        </>
    )
}

export default Course;
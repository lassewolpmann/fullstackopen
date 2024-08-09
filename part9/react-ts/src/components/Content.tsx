interface CoursePart {
  name: string,
  exerciseCount: number
}

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = (props: ContentProps) => (
  props.courseParts.map(part => (
    <p>{part.name} {part.exerciseCount}</p>
  ))
)

export default Content
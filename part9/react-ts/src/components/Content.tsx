import Part from "./Part.tsx";
import { CoursePart } from "../types.ts";

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = (props: ContentProps) => (
  props.courseParts.map(part => (
    <Part key={part.name} part={part} />
  ))
)

export default Content
import Header from "./components/Header.tsx";
import Content from "./components/Content.tsx";
import Total from "./components/Total.tsx";

import data from './data.ts'

const App = () => {
  return (
    <div>
      <Header courseName={data.courseName} />
      <Content courseParts={data.courseParts} />
      <Total totalExercises={data.totalExercises} />
    </div>
  );
};

export default App;
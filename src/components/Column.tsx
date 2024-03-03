import { ColumnProps } from "../common/types";
import Card from "./Card";

export default function Column(props: ColumnProps) {
  return (
    <div className="column">
      <h2 className="column__title">{props.title}</h2>
      {props.tasks.map((task) => (
        <Card
          key={task.id}
          id={task.id}
          title={task.title}
          columnId={task.columnId}
        ></Card>
      ))}
    </div>
  );
}

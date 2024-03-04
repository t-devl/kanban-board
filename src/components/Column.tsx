import Card from "./Card";

type ColumnProps = {
  id: string;
  title: string;
  tasks: {
    id: number;
    title: string;
    columnId: string;
  }[];
  addTask: (columnId: string) => void;
  updateTask: (id: number, text: string) => void;
  deleteTask: (id: number) => void;
};

export default function Column(props: ColumnProps) {
  return (
    <div className="column">
      <div className="column__main">
        <h2 className="column__title">{props.title}</h2>
        {props.tasks.map((task) => (
          <Card
            key={task.id}
            id={task.id}
            title={task.title}
            updateTask={props.updateTask}
            deleteTask={props.deleteTask}
          ></Card>
        ))}
      </div>
      <button
        onClick={() => props.addTask(props.id)}
        className="column__button"
      >
        + Create task
      </button>
    </div>
  );
}

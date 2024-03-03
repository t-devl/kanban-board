import { CardProps } from "../common/types";
import Column from "./Column";

export default function Board() {
  const tasks: CardProps[] = [
    { id: 1, title: "Ticket title 1", columnId: "toDo" },
    { id: 2, title: "Ticket title 2", columnId: "toDo" },
    { id: 3, title: "Ticket title 3", columnId: "inProgress" },
    { id: 4, title: "Ticket title 4", columnId: "inProgress" },
    { id: 5, title: "Ticket title 5", columnId: "inQA" },
    { id: 6, title: "Ticket title 6", columnId: "inQA" },
    { id: 7, title: "Ticket title 7", columnId: "done" },
    { id: 8, title: "Ticket title 8", columnId: "done" },
  ];

  const columns: { id: string; title: string }[] = [
    {
      id: "toDo",
      title: "To do",
    },
    {
      id: "inProgress",
      title: "In progress",
    },
    {
      id: "inQA",
      title: "In QA",
    },
    {
      id: "done",
      title: "Done",
    },
  ];

  return (
    <div className="board">
      <h1 className="board__title">Board</h1>
      <div className="columns">
        {columns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={tasks.filter((task) => task.columnId === column.id)}
          ></Column>
        ))}
      </div>
    </div>
  );
}

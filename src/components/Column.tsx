import { SortableContext } from "@dnd-kit/sortable";
import Card from "./Card";
import { ColumnProps } from "./common/types";
import { useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";

export default function Column(props: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: props.id,
    data: {
      type: "Column",
      column: {
        id: props.id,
        title: props.title,
        tasks: props.tasks,
      },
    },
  });

  const taskIds = useMemo(() => {
    return props.tasks.map((task) => task.id);
  }, [props.tasks]);

  return (
    <div className="column" ref={setNodeRef}>
      <div className="column__main">
        <h2 className="column__title">{props.title}</h2>
        <SortableContext items={taskIds}>
          {props.tasks.map((task) => (
            <Card
              key={task.id}
              id={task.id}
              title={task.title}
              updateTask={props.updateTask}
              deleteTask={props.deleteTask}
            ></Card>
          ))}
        </SortableContext>
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

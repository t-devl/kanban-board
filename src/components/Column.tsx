import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "./Card";
import { ColumnProps } from "./common/types";
import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";

export default function Column(props: ColumnProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.id,
    data: {
      column: {
        id: props.id,
        title: props.title,
        tasks: props.tasks,
      },
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const taskIds = useMemo(() => {
    return props.tasks.map((task) => task.id);
  }, [props.tasks]);

  return (
    <div
      className={`column ${isDragging ? "column--dragging" : ""}`}
      ref={setNodeRef}
      style={style}
    >
      <div className="column__main">
        <div className="column__header">
          <h2 className="column__title">{props.title}</h2>
          <FontAwesomeIcon
            className="column__icon"
            icon={faGripVertical}
            {...attributes}
            {...listeners}
          />
        </div>
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

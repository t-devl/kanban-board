import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "./Card";
import { ColumnProps } from "./common/types";
import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faTrash } from "@fortawesome/free-solid-svg-icons";

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

  const [isEditing, setIsEditing] = useState(false);

  const taskIds = useMemo(() => {
    return props.tasks.map((task) => task.id);
  }, [props.tasks]);

  function toggleEditing() {
    setIsEditing(!isEditing);
  }

  function handleKeyDown(key: string) {
    if (key === "Enter") {
      toggleEditing();
    }
  }

  return (
    <div
      className={`column ${isDragging ? "column--dragging" : ""}`}
      ref={setNodeRef}
      style={style}
    >
      <div className="column__main">
        <div className="column__header">
          {isEditing ? (
            <>
              <textarea
                className="column__title column__title--edit"
                value={props.title}
                autoFocus
                onBlur={toggleEditing}
                onKeyDown={(e) => handleKeyDown(e.key)}
                onChange={(e) => props.updateColumn(props.id, e.target.value)}
              ></textarea>
              <button
                className="column__button column__button--delete"
                title="Delete column"
                onMouseDown={() => {
                  props.deleteColumn(props.id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </>
          ) : (
            <>
              <h2 className="column__title" onClick={toggleEditing}>
                {props.title}
              </h2>
              <FontAwesomeIcon
                className="column__icon"
                icon={faGripVertical}
                {...attributes}
                {...listeners}
              />
            </>
          )}
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

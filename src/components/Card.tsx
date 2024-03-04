import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { CardProps } from "./common/types";

export default function Card(props: CardProps) {
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
      task: {
        id: props.id,
        title: props.title,
      },
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const [isEditing, setIsEditing] = useState(false);

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
      className={`card ${isDragging ? "card--dragging" : ""}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {isEditing ? (
        <>
          <textarea
            className="card__title card__title--edit"
            value={props.title}
            autoFocus
            onClick={toggleEditing}
            onBlur={toggleEditing}
            onKeyDown={(e) => handleKeyDown(e.key)}
            onChange={(e) => props.updateTask(props.id, e.target.value)}
          ></textarea>

          <button
            className="card__button card__button--delete"
            onMouseDown={() => {
              props.deleteTask(props.id);
            }}
          >
            Delete
          </button>
        </>
      ) : (
        <h3
          className="card__title"
          onClick={toggleEditing}
          onBlur={toggleEditing}
        >
          {props.title}
        </h3>
      )}
    </div>
  );
}

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { CardProps } from "./common/types";
import CardModal from "./CardModal";

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

  const [isModalActive, setIsModalActive] = useState(false);

  function toggleEditing() {
    setIsModalActive(!isModalActive);
  }

  useEffect(() => {
    document.body.style.overflow = isModalActive ? "hidden" : "unset";
  }, [isModalActive]);

  return (
    <div className="card-container">
      <div
        className={`card ${isDragging ? "card--dragging" : ""}`}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <h3 className="card__title" onClick={toggleEditing}>
          {props.title}
        </h3>
      </div>
      {isModalActive && (
        <CardModal
          task={props}
          toggleModal={toggleEditing}
          updateTask={props.updateTask}
        ></CardModal>
      )}
    </div>
  );
}

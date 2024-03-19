import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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

  return (
    <div className="card-container">
      <div
        className={`card ${isDragging ? "card--dragging" : ""}`}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <h3 className="card__title" onClick={() => props.selectTask(props.id)}>
          {props.title}
        </h3>
      </div>
    </div>
  );
}

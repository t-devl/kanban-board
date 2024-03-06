import { useSortable } from "@dnd-kit/sortable";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BinColumn() {
  const { setNodeRef, isOver } = useSortable({
    id: "bin",
    data: {
      column: {
        id: "bin",
      },
    },
  });

  return (
    <div
      className={`column-bin ${isOver ? "column-bin--hover" : ""}`}
      ref={setNodeRef}
    >
      <h2 className="column-bin__title">Bin</h2>
      <div className="column-bin__icon">
        {" "}
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
}

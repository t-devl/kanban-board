import { useSortable } from "@dnd-kit/sortable";

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
    </div>
  );
}

type Props = {
  columnId: string;
  columns: { id: string; title: string }[];
  createTask: (task: {
    columnId: string;
    title: string;
    description: string;
  }) => void;
  closeModal: () => void;
};

export default function CardCreateModal(props: Props) {
  function handleSubmit(e: any) {
    e.preventDefault();

    const task = {
      columnId: e.target.column.value,
      title: e.target.title.value,
      description: e.target.description.value,
    };

    props.createTask(task);
    props.closeModal();
  }

  return (
    <div className="card-modal-container ">
      <div className="card-modal">
        <h2 className="card-modal__heading">Create a Task</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <select className="card-modal__dropdown" name="column">
            {props.columns.map((column) => (
              <option
                className="card-modal__option"
                selected={column.id === props.columnId}
                key={column.id}
                value={column.id}
                label={column.title}
              ></option>
            ))}
          </select>
          <input
            className="card-modal__title card-modal__title--edit"
            placeholder="Enter a title..."
            autoFocus
            name="title"
            required
          ></input>

          <textarea
            className="card-modal__description card-modal__description--edit"
            autoFocus
            placeholder="Enter a description..."
            name="description"
          ></textarea>
          <div className="card-modal__buttons card-modal__buttons--create">
            <button
              className="card-modal__button card-modal__button--save"
              type="submit"
            >
              Create
            </button>
            <button
              className="card-modal__button card-modal__button--cancel"
              onClick={props.closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

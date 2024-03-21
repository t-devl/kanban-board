import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Label, Task } from "./common/types";
import LabelsModal from "./LabelsModal";

type Props = {
  task: Task;
  columnName: string;
  columns: { id: string; title: string }[];
  labels: Label[];
  toggleModal: () => void;
  selectTask: (taskId: number | null) => void;
  updateTask: (id: number, text: { [key: string]: string | Label[] }) => void;
  deleteTask: (id: number) => void;
};

export default function CardModal(props: Props) {
  const { task } = props;

  const [description, setDescription] = useState(props.task.description);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingColumn, setIsEditingColumn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLabelsModalActive, setIsLabelsModalActive] = useState(false);

  function toggleLabelsModal() {
    setIsLabelsModalActive(!isLabelsModalActive);
  }

  const tagOptions = props.labels.map((tag) => {
    return {
      ...tag,
      active: task.labels.some((activeLabel) => activeLabel.id === tag.id),
    };
  });

  function updateTitle(text: string) {
    props.updateTask(task.id, { title: text });

    if (!text) {
      setErrorMessage("Title cannot be empty.");
    } else if (errorMessage) {
      setErrorMessage("");
    }
  }

  function updateLabels(labels: Label[]) {
    props.updateTask(task.id, { labels });
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    updateTitle(e.target.value);
  }

  function handleSave() {
    props.updateTask(task.id, { description: description });
    setIsEditingDescription(false);
  }

  function handleCancel() {
    setIsEditingDescription(false);
    setDescription(task.description);
  }

  function handleColumnChange(columnId: string) {
    props.updateTask(task.id, { columnId: columnId });
    setIsEditingColumn(false);
  }

  const titleRows = (task.title.match(/\n/g) || "").length + 1;

  return (
    <div className="card-modal-container ">
      <div className="card-modal">
        <div className="card-modal__header">
          <textarea
            className="card-modal__title"
            value={task.title}
            rows={titleRows}
            onChange={(e) => handleChange(e)}
          ></textarea>

          <button
            className="card-modal__button"
            onClick={() => !errorMessage && props.selectTask(null)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        {errorMessage && <p className="card-modal__error">{errorMessage}</p>}
        <div className="card-modal__info">
          <p className="card-modal__column-text">
            In column{" "}
            {!isEditingColumn && (
              <span
                className="card-modal__column"
                onClick={() => setIsEditingColumn(true)}
              >
                {props.columnName}
              </span>
            )}
          </p>
          {isEditingColumn && (
            <select
              className="card-modal__dropdown"
              name="column"
              onChange={(e) => handleColumnChange(e.target.value)}
              onBlur={() => setIsEditingColumn(false)}
            >
              {props.columns.map((column) => (
                <option
                  className="card-modal__option"
                  selected={column.id === task.columnId}
                  key={column.id}
                  value={column.id}
                  label={column.title}
                ></option>
              ))}
            </select>
          )}
        </div>

        <div className="card-modal__labels">
          {task.labels.map((label) => (
            <div
              className="card-modal__label"
              key={label.id}
              style={{ backgroundColor: label.colour }}
            >
              {label.title}
            </div>
          ))}

          <button className="labels__button" onClick={toggleLabelsModal}>
            +
          </button>
          {isLabelsModalActive && (
            <LabelsModal
              options={tagOptions}
              updateLabels={updateLabels}
              toggleModal={toggleLabelsModal}
            ></LabelsModal>
          )}
        </div>

        <textarea
          className="card-modal__description"
          value={description}
          placeholder="Add a more detailed description..."
          onFocus={() => setIsEditingDescription(true)}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {isEditingDescription && (
          <div className="card-modal__buttons">
            <button
              className="card-modal__button card-modal__button--save"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="card-modal__button card-modal__button--cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

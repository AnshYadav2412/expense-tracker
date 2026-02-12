import React from "react";

const DeleteAlert = ({ content, onDelete, deleting }) => {
  return (
    <div>
      <p className="text-sm">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className={`add-btn ${!deleting && "add-btn-fill"}`}
          onClick={onDelete}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;

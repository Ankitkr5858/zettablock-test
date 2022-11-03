import React from "react";

export default function EditPopup({ ClosePopup, DeleteArticle }) {
  return (
    <div className="Popup">
      <h4>Are you sure you want to delete ?</h4>
      <div className="actions">
        <button className="btn btn-edit" onClick={() => DeleteArticle()}>
          Yes
        </button>
        <button className="btn btn-delete" onClick={() => ClosePopup()}>
          No
        </button>
      </div>
    </div>
  );
}

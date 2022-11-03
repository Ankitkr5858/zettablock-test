import React from "react";

export default function EditPopup({
  setEditArticle,
  editArticle,
  Edit,
  ClosePopup,
  tabs,
}) {
  return (
    <div className="Popup">
      <input type="hidden" value={editArticle.id} />
      {tabs === "Article" ? (
        <div>
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={editArticle.title}
            onChange={(e) => {
              setEditArticle({ ...editArticle, title: e.target.value });
            }}
          />
        </div>
      ) : (
        <div>
          <label htmlFor="">Company</label>
          <input
            type="text"
            value={editArticle.company}
            onChange={(e) => {
              setEditArticle({ ...editArticle, company: e.target.value });
            }}
          />
        </div>
      )}
      {tabs !== "Article" && (
        <div>
          <label htmlFor="">Model</label>
          <input
            type="text"
            value={editArticle.carModel}
            onChange={(e) => {
              setEditArticle({ ...editArticle, carModel: e.target.value });
            }}
          />
        </div>
      )}
      <div>
        <label htmlFor="">Description</label>
        <textarea
          cols="30"
          rows="10"
          value={editArticle.description}
          onChange={(e) => {
            setEditArticle({ ...editArticle, description: e.target.value });
          }}
        ></textarea>
      </div>
      <div>
        <button
          className="btn btn-edit"
          onClick={() => {
            Edit();
            setEditArticle(null);
          }}
        >
          Save Changes
        </button>
        <button className="btn btn-delete" onClick={() => ClosePopup()}>
          Cancel
        </button>
      </div>
    </div>
  );
}

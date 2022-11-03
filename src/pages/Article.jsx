import React from "react";

const Article = ({ Sort, OpenEditPopup, OpenDeletePopup, data }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th onClick={() => Sort()}>Title</th>
            <th>Created Date</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((article, i) => {
            return (
              <>
                <tr
                  key={i}
                  onClick={(e) => {
                    if (e.target.parentElement.tagName === "TR") {
                      if (
                        e.target.parentElement.nextSibling.classList.contains(
                          "hidden"
                        )
                      ) {
                        e.target.parentElement.nextSibling.classList.remove(
                          "hidden"
                        );
                      } else {
                        e.target.parentElement.nextSibling.classList.add(
                          "hidden"
                        );
                      }
                    } else if (e.target.parentElement.tagName === "TD") {
                      if (
                        e.target.parentElement.parentElement.nextSibling.classList.contains(
                          "hidden"
                        )
                      ) {
                        e.target.parentElement.parentElement.nextSibling.classList.remove(
                          "hidden"
                        );
                      } else {
                        e.target.parentElement.parentElement.nextSibling.classList.add(
                          "hidden"
                        );
                      }
                    }
                  }}
                >
                  <td>{article.id}</td>
                  <td>{article.title}</td>
                  <td>{article.createdAt}</td>
                  <td>
                    <img height={70} src={article.Image} alt="" />
                  </td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn  btn-edit"
                        type="button"
                        onClick={() => OpenEditPopup(article.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        type="button"
                        onClick={() => OpenDeletePopup(article)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="hidden">
                  <td colSpan={5}>{article.description}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Article;

import React from "react";

const car = ({ Sort, OpenEditPopup, OpenDeletePopup, data }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th onClick={() => Sort()}>company</th>
            <th>Model</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((car, i) => {
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
                    <td>{car.id}</td>
                    <td>{car.company}</td>
                    <td>{car.carModel}</td>
                    <td>
                      <img height={70} src={car.Image} alt="" />
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn  btn-edit"
                          type="button"
                          onClick={() => OpenEditPopup(car.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-delete"
                          type="button"
                          onClick={() => OpenDeletePopup(car)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hidden">
                    <td colSpan={5}>{car.description}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default car;

import { useEffect, useState } from "react";
import axios from "axios";
import EditPopup from "./components/EditPopup";
import DeletePopup from "./components/DeletePopup";
import Article from "./pages/Article";
import Cars from "./pages/Cars";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [editArticle, setEditArticle] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState("");
  const [sorting, setSorting] = useState("normal");
  const [tabs, setTabs] = useState("Article");
  const [page, setPage] = useState(1);
  const [oldData, setOldData] = useState(null) 
  const getData = async () => {
    if (tabs === "Article") {
      axios
        .get(
          `https://63603673ca0fe3c21aaed451.mockapi.io/api/vi/articles?p=${page}&l=10`
        )
        .then((res) => {
          if (filter !== "") {
            let Data = res.data.filter((x) =>
              x.title.toLowerCase().includes(filter)
            );
            if (sorting === "asc") {
              Data = Data.sort((a, b) => (a.title > b.title ? 1 : -1));
            } else if (sorting === "dec") {
              Data = Data.sort((a, b) => (a.title < b.title ? 1 : -1));
            }

            setData((pre) => Data);
          } else {
            let Data = res.data;
            if (sorting === "asc") {
              Data = Data.sort((a, b) => (a.title > b.title ? 1 : -1));
            } else if (sorting === "dec") {
              Data = Data.sort((a, b) => (a.title < b.title ? 1 : -1));
            }

            setData((pre) => Data);
          }
        });
    } else {
      axios
        .get(
          `https://63603673ca0fe3c21aaed451.mockapi.io/api/vi/Cars?p=${page}&l=10`
        )
        .then((res) => {
          if (filter !== "") {
            let Data = res.data.filter((x) =>
              x.company.toLowerCase().includes(filter)
            );

            if (sorting === "asc") {
              Data = Data.sort((a, b) => (a.company > b.company ? 1 : -1));
            } else if (sorting === "dec") {
              Data = Data.sort((a, b) => (a.company < b.company ? 1 : -1));
            }

            setData((pre) => Data);
          } else {
            let Data = res.data;

            if (sorting === "asc") {
              Data = Data.sort((a, b) => (a.company > b.company ? 1 : -1));
            } else if (sorting === "dec") {
              Data = Data.sort((a, b) => (a.company < b.company ? 1 : -1));
            }

            setData((pre) => Data);
          }
        });
    }
  };
  useEffect(() => {
    setData([]);
getData()
   
  }, [filter, tabs, page]);

  const OpenEditPopup = (id) => {
    if (tabs === "Article") {
      axios
        .get(
          `https://63603673ca0fe3c21aaed451.mockapi.io/api/vi/articles/${id}`
        )
        .then((res) => {
          setEditArticle(res.data);
        });
    } else {
      axios
        .get(`https://63603673ca0fe3c21aaed451.mockapi.io/api/vi/Cars/${id}`)
        .then((res) => {
          setEditArticle(res.data);
        });
    }
  };
  const Edit = () => {
      const index = data.findIndex(x => {
        return x.id === editArticle.id
      })
      const item = data[index]
      setOldData({
        type: "edit",
        data: {...item}
      })
    
      
    
    if (tabs === "Article") {
      axios
        .put(
          `https://63603673ca0fe3c21aaed451.mockapi.io/api/vi/articles/${editArticle.id}`,
          editArticle
        )
        .then((res) => {
          setData(() => {
            return data.map((x) => {
              if (x.id === res.data.id) {
                x = res.data;
              }
              return x;
            });
          });
        });
    } else {
      axios
        .put(
          `https://63603673ca0fe3c21aaed451.mockapi.io/api/vi/Cars/${editArticle.id}`,
          editArticle
        )
        .then((res) => {
          setData(() => {
            return data.map((x) => {
              if (x.id === res.data.id) {
                x = res.data;
              }
              return x;
            });
          });
        });
    }

    setDeletePopup(false);
  };

  const Sort = () => {
    getData();
    if (sorting === "asc") {
      setSorting("dec");
    } else if (sorting === "dec") {
      setSorting("normal");
    } else {
      setSorting("asc");
    }
  };
  const OpenDeletePopup = (id) => {
    setDeleteId(id);
    setDeletePopup(true);
  };
  const DeleteArticle =() => {
   setOldData({
      type: "delete",
      data: {...deleteId}
    })
    if (deleteId.id !== 0) {
      if (tabs === "Article") {
        axios
          .delete(
            `https://63603673ca0fe3c21aaed451.mockapi.io/api/vi/articles/${deleteId.id}`
          )
          .then((res) => {
            setData(() => data.filter((x) => x.id !== deleteId.id));
            ClosePopup();
          });
      } else {
        axios
          .delete(
            `https://63603673ca0fe3c21aaed451.mockapi.io/api/vi/Cars/${deleteId.id}`
          )
          .then((res) => {
            setData(() => data.filter((x) => x.id !== deleteId.id));
            ClosePopup();
          });
      }
    }
  };
  const ClosePopup = () => {
    setDeletePopup(false);
    setEditArticle(null);
    setDeleteId(0);
  };
  const undoLastTask = async() => {
    if(oldData.type === "edit") {
      if (tabs === "Article") {
      await  axios
          .put(
            `https://63603673ca0fe3c21aaed451.mockapi.io/api/vi/articles/${oldData.data.id}`,
            oldData.data
          )
          .then((res) => {
            setData(() => {
              return data.map((x) => {
                if (x.id === res.data.id) {
                  x = res.data;
                }
                return x;
              });
            });
          });
      } else {
      await  axios
          .put(
            `https://63603673ca0fe3c21aaed451.mockapi.io/api/vi/Cars/${oldData.data.id}`,
            oldData.data
          )
          .then((res) => {
            setData(() => {
              return data.map((x) => {
                if (x.id === res.data.id) {
                  x = res.data;
                }
                return x;
              });
            });
          });
      }
    }
    else if(oldData.type === "delete") {
      if (tabs === "Article") {
     await   axios.post("https://63603673ca0fe3c21aaed451.mockapi.io/api/vi/articles/", oldData.data).then(res => {
          setData([ res.data, ...data])
        })
      }
    else {
await axios.post("https://63603673ca0fe3c21aaed451.mockapi.io/api/vi/Cars/", oldData.data).then(res => {
  setData([res.data, ...data ])
})
    }
  }
  setOldData(null)
  }
  return (
    <div className="App">
      <div className="tabs">
        <ul>
          <li
            style={{
              background: tabs === "Article" && "rgb(9, 152, 152)",
              fontWeight: tabs === "Article" && "bold",
            }}
            onClick={() => {
              setPage(1)
              setTabs("Article");
              getData();
            }}
          >
            Articles
          </li>
          <li
            style={{
              background: tabs === "Cars" && "rgb(9, 152, 152)",
              fontWeight: tabs === "Cars" && "bold",
            }}
            onClick={() => {
              setPage(1)
              setTabs("Cars");
            }}
          >
            Cars
          </li>
        </ul>
      </div>
      <div className="tables">
        <div className="SearchAndPagination">
          <div className="Search" >
            
            <label htmlFor="">Search</label>
            <input
              type="text"
              onChange={async (e) => {
                setPage(1)
                setFilter(e.target.value);
              }}
              />
              {oldData && (<button style={{padding: "0.5rem 0.75rem", borderRadius: "8px", outline: "none", border: "none", backgroundColor: "blue", color: "#fff"}} onClick={undoLastTask}>Undo</button>
         )} </div>
          <div className="Pagination">
            <button
              className="btn btn-normal"
              disabled={page === 1}
              onClick={() => {
                if (page > 1) {
                  setPage((pre) => pre - 1);
                }
              }}
            >
              {" "}
              Prev{" "}
            </button>
            <span style={{ border: "1px solid black", padding: "0.5rem 1rem" }}>
              {page}
            </span>
            <button
              className="btn btn-normal"
              disabled={page === 10}
              onClick={() => {
                setPage((pre) => pre + 1);
              }}
            >
              {" "}
              Next{" "}
            </button>
          </div>
        </div>
        {tabs === "Article" ? (
          <Article
            data={data}
            OpenDeletePopup={OpenDeletePopup}
            OpenEditPopup={OpenEditPopup}
            Sort={Sort}
          ></Article>
        ) : (
          <Cars
            data={data}
            OpenDeletePopup={OpenDeletePopup}
            OpenEditPopup={OpenEditPopup}
            Sort={Sort}
          ></Cars>
        )}

        {editArticle !== null && (
          <EditPopup
            Edit={Edit}
            editArticle={editArticle}
            setEditArticle={setEditArticle}
            ClosePopup={ClosePopup}
            tabs={tabs}
          ></EditPopup>
        )}
        {deletePopup && (
          <DeletePopup
            ClosePopup={ClosePopup}
            DeleteArticle={DeleteArticle}
          ></DeletePopup>
        )}
        {editArticle !== null || deletePopup ? (
          <div className="overlay"></div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;

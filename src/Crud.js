import React from "react";
import { useState } from "react";
const Crud = () => {
  const [data, setData] = useState("");
  const [store, setStore] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [editItem, setEditItem] = useState(null);

  const handleAdd = (evt) => {
    setData(evt.target.value);
  };

  //  add fields
  const add = () => {
    if (!data) {
    } else if (data && !toggle) {
      setStore(
        store.map((row) => {
          if (row.id === editItem) {
            return { ...row, name: data };
          }
          return row;
        })
      );
      setToggle(true);
      setData("");
      setEditItem(null);
    } else {
      const allInputData = { id: new Date().getTime().toString(), name: data };
      setStore([...store, allInputData]);
      setData("");
    }
  };

  //  -- delete fields

  const valueDel = (index) => {
    console.log(index);
    // const updateItems = store.filter((row, ind) => {
    //   return ind !== id;
    // });

    const updateItems = store.filter((row) => {
      return index !== row.id;
    });
    setStore(updateItems);
  };

  // edit fields

  const valueEdit = (id) => {
    let newEditItem = store.find((row) => {
      return row.id === id;
    });

    console.log(newEditItem);
    // setStore(newEditItem);
    setToggle(false);
    setData(newEditItem.name);
    setEditItem(id);
  };

  // ---- remove all fields
  const removeAll = () => {
    setStore([]);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <h1>todo app</h1>
            <hr />
            <input
              type="test"
              value={data}
              onChange={handleAdd}
              className="pl-2"
            />{" "}
            {toggle ? (
              <input type="button" value=" add " onClick={add} />
            ) : (
              <input type="button" value=" Update " onClick={add} />
            )}
            <input type="button" value=" remove all " onClick={removeAll} />
            <hr />
          </div>

          <div className="row">
            {store?.map((row) => {
              return (
                <div className="col-sm-2" key={row.id}>
                  <div
                    className="card shadow-lg p-3 mb-5 bg-body rounded"
                    style={{ width: "13rem", height: "7rem" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{row.name}</h5>{" "}
                      <input
                        type="button"
                        value=" X "
                        onClick={() => valueDel(row.id)}
                      />
                      &#x2003;
                      <input
                        type="button"
                        value=" edit "
                        onClick={() => valueEdit(row.id)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Crud;

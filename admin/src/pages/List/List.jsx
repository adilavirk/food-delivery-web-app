import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import toast from "react-hot-toast";

const List = ({ url }) => {
  // to store all the data from the database
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {
      _id: foodId,
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-tabel-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list?.map((item) => (
          <div key={item?._id} className="list-tabel-format">
            <img
              src={`${url}/images/` + item?.image}
              alt={`${item?.name}'s image`}
            />
            <p>{item?.name}</p>
            <p>{item?.category}</p>
            <p>${item?.price}</p>
            <p className="cursor" onClick={() => removeFood(item?._id)}>
              x
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

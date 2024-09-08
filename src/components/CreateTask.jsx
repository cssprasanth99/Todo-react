import React, { useState } from "react";

const CreateTask = () => {
  const [task, setTask] = useState({
    id: Date.now(),
    name: "",
    status: "todo",
  });

  const handleChange = (e) => {};

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <button>Create</button>
    </div>
  );
};

export default CreateTask;

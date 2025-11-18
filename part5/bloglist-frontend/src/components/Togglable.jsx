import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={{ margin: "16px 0" }}>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <div style={{ margin: "16px 0" }}>{props.children}</div>
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};

export default Togglable;

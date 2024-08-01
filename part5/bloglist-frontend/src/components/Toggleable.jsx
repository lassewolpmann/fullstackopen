import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { styled } from "styled-components";

const CancelButton = styled.button`
    color: #ff1111;
`

const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <CancelButton onClick={toggleVisibility}>cancel</CancelButton>
      </div>
    </div>
  );
});

Toggleable.displayName = "Toggleable";
Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
export default Toggleable;

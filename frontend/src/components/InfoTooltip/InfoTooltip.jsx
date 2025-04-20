import React, { useRef, useEffect } from "react";
import "./InfoTooltip.css";

function InfoTooltip({ isOpen, onClose, message }) {
  const modalRef = useRef();

  useEffect(() => {
    function handleOutsideClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    function handleEscapeKey(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal modal_open">
      <div className="tooltip" ref={modalRef}>
        {" "}
        <button className="modal__close" onClick={onClose}>
          ×
        </button>
        <p className="modal__message">
          {message.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;

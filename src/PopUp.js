import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "animate.css";

PopUp.propTypes = {
  header: PropTypes.string,
  submit: PropTypes.bool,
  setCity: PropTypes.func.isRequired,
  handlePopUpStatus: PropTypes.func.isRequired,
  popUpStatus: PropTypes.bool.isRequired,
  setSubmit: PropTypes.func.isRequired,
};

export default function PopUp({
  header = "Welcome, Choose The City",
  setCity,
  handlePopUpStatus,
  popUpStatus = true,
  setSubmit,
  submit,
}) {
  const [inputValue, setInputValue] = useState("");
  const element = useRef(null);
  useEffect(() => {
    element.current.focus();
  }, []);
  return (
    <>
      {popUpStatus && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50  backdrop-blur-lg z-40" />
      )}
      <div
        className={`${
          popUpStatus
            ? "animate__animated animate__fadeInDownBig"
            : "animate__animated animate__fadeOutUpBig"
        } fixed inset-0 flex justify-center items-center z-50`}
      >
        <div className="bg-white w-full max-w-md mx-4 sm:mx-auto shadow-2xl border border-gray-400 rounded-md">
          <div className="flex justify-between items-center p-4">
            <h1 className="font-bold italic text-gray-700">{header}</h1>
            <button
              className="text-2xl text-gray-700 cursor-pointer"
              onClick={handlePopUpStatus}
            >
              &times;
            </button>
          </div>
          <hr className="bg-black" />
          <div className="p-4 flex flex-col items-center">
            <input
              ref={element}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              className="w-full sm:w-96 shadow-md p-2 m-4 border-2 border-gray-800 rounded text-gray-700"
              placeholder="Enter a city..."
            />
            <div className="flex justify-end flex-1 mt-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md mr-2 hover:bg-red-700"
                onClick={() => {
                  handlePopUpStatus();
                  setSubmit(!submit);
                  setCity(inputValue);
                  setInputValue(""); // Clear input field after submitting
                }}
              >
                Submit
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={handlePopUpStatus}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

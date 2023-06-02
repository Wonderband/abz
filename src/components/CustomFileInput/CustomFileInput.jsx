import { useEffect, useRef, useState } from "react";
import css from "./CustomFileInput.module.scss";

export const CustomFileInput = ({ setIsValid, passSelectedFile }) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);

  const checkResolution = (value) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      if (value.type === "image/jpeg" || value.type === "image/jpg") {
        img.src = URL.createObjectURL(value);
        img.onload = () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;
          resolve(width >= 70 && height >= 70);
        };
      } else reject("Not image!");
    });
  };

  useEffect(() => {
    const validate = (file) => {
      setIsValid(false);
      if (!file) {
        setError("");
        return;
      }

      if (file && file.type !== "image/jpeg" && file.type !== "image/jpg") {
        setError("Only jpeg/jpg images allowed");
        return;
      }
      if (file && file.size > 5 * 1024 * 1024) {
        setError("Photo exceeds maximum size 5MB");
        return;
      }
      if (file)
        checkResolution(file)
          .then((isValid) => {
            if (isValid) {
              setError("");
              setIsValid(true);
            } else setError("Photo resolution should be at least 70x70px");
          })
          .catch((error) => {
            console.log(error);
          });
    };
    validate(file);
  }, [file, clicked, setIsValid]);

  const handleFileChange = (e) => {
    setFile(e.currentTarget.files[0]);
    passSelectedFile(e.currentTarget.files[0]);
  };

  const handleClick = (e) => {
    inputRef.current.click();
    if (clicked === false) setClicked(true);
  };
  return (
    <div className={css.inputContainer}>
      <div
        onClick={handleClick}
        className={`${css.uploadButton} ${error ? css.error : ""}`}
      >
        Upload
      </div>
      <input
        ref={inputRef}
        id="file"
        name="file"
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <textarea
        className={`${css.uploadFile} ${error ? css.error : ""} ${
          file ? css.enabled : ""
        }`}
        placeholder="Upload your photo"
        value={file ? file.name : ""}
        readOnly
      ></textarea>
      <div className={css.errorMessage}>{error}</div>
    </div>
  );
};

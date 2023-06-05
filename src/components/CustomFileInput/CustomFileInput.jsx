import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectGlobal } from "../../redux/selectors";
import css from "./CustomFileInput.module.scss";

export const CustomFileInput = ({ setIsValid, passSelectedFile }) => {
  const inputRef = useRef(null);
  const textareaRef = useRef(null);
  const [file, setFile] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);
  const [inputLength, setInputLength] = useState(0);
  const { windowWidth } = useSelector(selectGlobal);
  const [truncatedFileName, setTruncatedFileName] = useState("");

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

  useEffect(() => {
    if (windowWidth >= 768) setInputLength(32);
    else setInputLength((windowWidth - 32 - 52 - 110) / 8);
  }, [windowWidth]); //dynamically set file input width, dependent on resize

  useEffect(() => {
    const fileName = file ? file.name : "";
    const truncName =
      fileName.length > inputLength
        ? fileName.slice(0, inputLength - 3) + "..."
        : fileName;
    setTruncatedFileName(truncName);
  }, [file, inputLength]); //adding ellipsis to the file name

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
        } ${file && truncatedFileName !== file?.name ? css.pointer : ""}`}
        placeholder="Upload your photo"
        value={truncatedFileName}
        ref={textareaRef}
        readOnly
      ></textarea>
      <div className={css.toolTip}>{file?.name}</div>
      <div className={css.errorMessage}>{error}</div>
    </div>
  );
};

import { useEffect, useRef, useState } from "react";

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
      if (!file && clicked) {
        setError("REQUIRED");
        return;
      }

      if (file && file.type !== "image/jpeg" && file.type !== "image/jpg") {
        setError("Wrong type");
        return;
      }
      if (file && file.size > 5 * 1024 * 1024) {
        setError("Too big!");
        return;
      }
      if (file)
        checkResolution(file)
          .then((isValid) => {
            if (isValid) {
              setError("");
              setIsValid(true);
            } else setError("Minimum resolution is 70x70px");
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
    <div>
      <div onClick={handleClick}>Upload</div>
      <input
        ref={inputRef}
        id="file"
        name="file"
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <div>{file && file.name}</div>
      <div>{error}</div>
    </div>
  );
};

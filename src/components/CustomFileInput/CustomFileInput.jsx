import { useEffect, useRef, useState } from "react";

export const CustomFileInput = () => {
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
            if (isValid) setError("");
            else setError("Minimum resolution is 70x70px");
          })
          .catch((error) => {
            console.log(error);
          });
    };
    validate(file);
  }, [file, clicked]);

  const handleFileChange = (e) => {
    setFile(e.currentTarget.files[0]);
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

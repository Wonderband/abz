import { useEffect, useRef, useState } from "react";

export const CustomFileInput = ({
  form,
  field,
  // photo,
  // setPhoto,
}) => {
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
          console.log(width, height);
          resolve(width < 70 && height >= 70);
        };
      } else reject("Not image!");
    });
  };

  const validate = (file) => {
    if (!file && clicked) {
      setError("REQUIRED");
      return;
    }
    console.log(file);
    if (file && file.type !== "image/jpeg" && file.type !== "image/jpg") {
      setError("Wrong type");
      return;
    }
    if (file && file.size > 5 * 1024 * 1024) {
      setError("Too big!");
      return;
    }
    checkResolution(file)
      .then((isValid) => {
        if (isValid) setError("");
        else setError("Minimum resolution is 70x70px");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    // form.setFieldValue(field.name, file);
    validate(file);
  }, [file, clicked]);
  // const handleFileChange = (event) => {
  //   const file = event.currentTarget.files[0];
  //   form.setFieldValue(field.name, file);
  //   setPhoto(file.name);
  //   form.setFieldTouched(field.name, true);
  //   console.log(file);
  // };
  // const handleClick = (e) => {
  //   form.setFieldTouched(field.name, true);
  // };
  // const handleBlur = () => {
  //   form.setFieldTouched(field.name, true);
  // };
  // return (
  //   <div>
  //     <label htmlFor="file">Upload</label>
  //     <input
  //       id={field.name}
  //       name={field.name}
  //       type="file"
  //       ref={fileInputRef}
  //       onChange={handleFileChange}
  //       onBlur={handleBlur}
  //       style={{ display: "none" }}
  //     />
  //     <div>{photo}</div>
  //     <div>{error}</div>
  //   </div>
  // );
  //  const CustomFileInput = ({ form, field }) => {
  //    const inputRef = useRef(null);
  //    const checkResolution = (value) => {
  //      return new Promise((resolve, reject) => {
  //        const img = new Image();
  //        if (value.type === "image/jpeg" || value.type === "image/jpg") {
  //          img.src = URL.createObjectURL(value);
  //          img.onload = () => {
  //            const width = img.naturalWidth;
  //            const height = img.naturalHeight;
  //            console.log(width, height);
  //            resolve(width >= 700 && height >= 700);
  //          };
  //        } else reject("Not image!");
  //      });
  //    };
  const handleFileChange = (e) => {
    setFile(e.currentTarget.files[0]);

    // form.setFieldValue(field.name, file);
    // setPhoto(file.name);
    //  checkResolution(file)
    //    .then((isValid) => {
    //      console.log(file);
    //      if (!isValid) {
    //        form.setFieldError(field.name, "Minimum resolution is 70x70px");
    //        // Resolution is not valid, display an error message or take appropriate action
    //      }
    //    })
    //    .catch((error) => {
    //      console.log(error);
    //    });
  };
  const handleClick = (e) => {
    inputRef.current.click();
    if (clicked === false) setClicked(true);
    // const errorMessage = getIn(form.errors, field.name);
    // console.log(errorMessage);
    // form.setFieldTouched(field.name, true);
    // if (errorMessage === "Minimum resolution is 70x70px") {
    //   console.log(errorMessage);
    //   form.setFieldError(field.name, errorMessage);
    //   console.log(errorMessage);
    // }
  };
  return (
    <div>
      <div onClick={handleClick}>Upload</div>
      <input
        ref={inputRef}
        id={field.name}
        name={field.name}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <div>{file && file.name}</div>
      <div>{error}</div>
    </div>
  );
};

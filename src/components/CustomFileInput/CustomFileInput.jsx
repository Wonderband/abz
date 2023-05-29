import { useRef } from "react";

export const CustomFileInput = ({ form, field, photo, setPhoto }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    form.setFieldValue(field.name, file);
    setPhoto(file.name);
    form.setFieldTouched(field.name, true);
    console.log(file);
  };

  const handleClick = (e) => {
    form.setFieldTouched(field.name, true);
  };

  const handleBlur = () => {
    form.setFieldTouched(field.name, true);
  };
  return (
    <div>
      <label htmlFor="file">Upload</label>
      <input
        id={field.name}
        name={field.name}
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        onBlur={handleBlur}
        style={{ display: "none" }}
      />
      <div>{photo}</div>
    </div>
  );
};

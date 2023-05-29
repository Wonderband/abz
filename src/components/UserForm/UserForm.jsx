import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Button } from "../Button/Button";
import * as yup from "yup";
import InputMask from "react-input-mask";
import css from "./UserForm.module.scss";
// import { CustomFileInput } from "../CustomFileInput/CustomFileInput";

export const UserForm = () => {
  const [photo, setPhoto] = useState("Upload your photo");

  const handleSubmit = (e, values) => {
    const { name, email, phone, picked } = values;
    e.preventDefault();
    console.log("Form data:", {
      name,
      email,
      phone,
      picked,
      photo,
    });
  };

  const checkResolution = (value) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(value);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        console.log(width, height);
        resolve(width >= 1000 && height >= 1000);
      };
    });
  };

  const validation = yup.object().shape({
    name: yup
      .string()
      .min(2, "Too short!")
      .max(60, "Too long!")
      .required("Please input name"),
    email: yup
      .string()
      // .email("Invalid email address")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email!!!"
      )
      .max(254, "Email address exceeds the maximum length")
      .required("Email is required"), //.required('Please, select the category'),
    phone: yup
      .string()
      .matches(/^\+\d{2} \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Invalid phone number")
      .required("Phone is required"), //yup.number().positive().required('Please input the amount'),
    file: yup
      .mixed()
      .required("Photo is required")
      .test(
        "fileFormat",
        "Invalid file format. Only JPEG files are allowed.",
        (value) => {
          console.log(value.type);
          return value.type === "image/jpeg" || value.type === "image/jpg";
        }
      )
      .test(
        "fileSize",
        "File size is too large. Maximum allowed size is 5MB.",
        (value) => {
          console.log(value.size);
          return value.size <= 5 * 1024 * 1024; // 5MB in bytes
        }
      ),
    // .test(
    //   "fileResolution",
    //   "Minimum resolution is 70x70px",
    //   async (value) => {
    //     const resolutionResult = await checkResolution(value);
    //     console.log(resolutionResult);
    //     const isValid =
    //       value !== null &&
    //       (value.type === "image/jpeg" || value.type === "image/jpg") &&
    //       value.size <= 5 * 1024 * 1024 &&
    //       resolutionResult;
    //     console.log(isValid);

    //     return isValid;
    //   }
    // ),
  });

  const CustomFileInput = ({ form, field }) => {
    const handleFileChange = (e) => {
      const file = e.currentTarget.files[0];
      console.log(file);
      form.setFieldValue(field.name, file);
      setPhoto(file.name);
      checkResolution(file).then((isValid) => {
        if (!isValid) {
          form.setFieldError(field.name, "Minimum resolution is 70x70px");
          // Resolution is not valid, display an error message or take appropriate action
        }
      });
      // .catch((error) => {
      //   // Handle any error that occurred during resolution validation
      // });
    };

    const handleClick = () => {
      form.setFieldTouched(field.name, true);
    };
    return (
      <div>
        <label htmlFor="file" onClick={handleClick}>
          Upload
        </label>
        <input
          id={field.name}
          name={field.name}
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <div>{photo}</div>
      </div>
    );
  };

  return (
    <section>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          picked: "",
          file: null,
        }}
        validationSchema={validation}
        validateOnChange
        validateOnBlur
      >
        {({ values, setFieldValue }) => (
          <Form
            className={css.addUserForm}
            onSubmit={(e) => handleSubmit(e, values)}
          >
            <label htmlFor="name">Your name</label>
            <Field id="name" name="name" placeholder="Your name" />
            <ErrorMessage name="name" render={(msg) => <div>{msg}</div>} />
            <label htmlFor="email">Email</label>
            <Field id="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" render={(msg) => <div>{msg}</div>} />

            <label htmlFor="phone">Phone</label>
            <Field id="phone" name="phone">
              {({ field }) => (
                <InputMask
                  {...field}
                  // id="phone"
                  mask="+38 (099) 999-99-99"
                  placeholder="Phone"
                  // maskPlaceholder="_"
                  // placeholder="+38 (___) ___-__-__"
                />
              )}
            </Field>
            <ErrorMessage name="phone" render={(msg) => <div>{msg}</div>} />
            <div id="my-radio-group">Select your position</div>
            <div role="group" aria-labelledby="my-radio-group">
              <label>
                <Field type="radio" name="picked" value="Frontend" checked />
                Frontend developer
              </label>
              <label>
                <Field type="radio" name="picked" value="Backend" />
                Backend developer
              </label>
              <label>
                <Field type="radio" name="picked" value="Designer" />
                Designer
              </label>
              <label>
                <Field type="radio" name="picked" value="QA" />
                QA
              </label>
            </div>
            {/* <ErrorMessage render={(msg) => <div>{msg}</div>} name="picked" /> */}

            <Field name="file" component={CustomFileInput} />
            <ErrorMessage name="file" render={(msg) => <div>{msg}</div>} />
            {/* <input
              id="file"
              name="file"
              type="file"
              onChange={(event) => {
                const file = event.currentTarget.files[0];
                console.log(file);
                setFieldValue("file", file ? file.name : null);
                setPhoto(file ? file.name : "Upload your photo");
              }}

              // onChange={handleFileChange}
              // style={{ display: "none" }}
              // onChange={(event) => {
              //   setFieldValue("file", event.currentTarget.files[0]);
              // }}
            /> */}
            <div name="photo">{photo.name}</div>

            <Button
              label="Sign up"
              type="submit"
              clickHandler={() => {
                console.log("submit");
              }}
            />
          </Form>
        )}
      </Formik>
    </section>
  );
};

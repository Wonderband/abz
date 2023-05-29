import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Button } from "../Button/Button";
import * as yup from "yup";
import InputMask from "react-input-mask";
import css from "./UserForm.module.scss";
import { CustomFileInput } from "../CustomFileInput/CustomFileInput";

export const UserForm = () => {
  const [isFileUploadValid, setIsFileUploadValid] = useState(false);
  const [selectedImage, setselectedImage] = useState(null);
  const handleSubmit = (e, values) => {
    const { name, email, phone, picked } = values;
    e.preventDefault();
    console.log("Form data:", {
      name,
      email,
      phone,
      picked,
      selectedImage,
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
    // file: yup
    //   .mixed()
    //   .required("Photo is required")
    //   .test(
    //     "fileFormat",
    //     "Invalid file format. Only JPEG files are allowed.",
    //     (value) => {
    //       console.log(value.type);
    //       return value.type === "image/jpeg" || value.type === "image/jpg";
    //     }
    //   )
    //   .test(
    //     "fileSize",
    //     "File size is too large. Maximum allowed size is 5MB.",
    //     (value) => {
    //       console.log(value.size);
    //       return value.size <= 5 * 1024 * 1024; // 5MB in bytes
    //     }
    //   ),
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

  return (
    <section>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          picked: "Frontend",
          file: null,
        }}
        validationSchema={validation}
        validateOnChange
        validateOnBlur
      >
        {({ values, isValid, dirty }) => (
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

            <CustomFileInput
              isValid={isFileUploadValid}
              setIsValid={setIsFileUploadValid}
              passSelectedFile={setselectedImage}
            />

            <Button
              label="Sign up"
              type="submit"
              disabled={!isValid || !dirty || !isFileUploadValid}
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

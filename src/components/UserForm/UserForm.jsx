import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Button } from "../Button/Button";
import * as yup from "yup";
import InputMask from "react-input-mask";
import css from "./UserForm.module.scss";

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

  const handleFileChange = (e) => {
    if (e.target.files[0]) setPhoto(e.target.files[0].name);
    else setPhoto("Upload your photo");
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
    picked: yup
      .string()
      .min(2, "Select!!!")
      .required("Please, select the position"),
  });

  return (
    <section>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          picked: "",
        }}
        validationSchema={validation}
      >
        {({ values }) => (
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
            <ErrorMessage render={(msg) => <div>{msg}</div>} name="picked" />
            <label htmlFor="file">Upload</label>
            <input
              id="file"
              name="file"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <div>{photo}</div>
            <Button
              label="Sign up"
              type="submit"
              clickHandler={() => {
                console.log("hello");
              }}
            />
          </Form>
        )}
      </Formik>
    </section>
  );
};

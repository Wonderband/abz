import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Button } from "../Button/Button";
import css from "./UserForm.module.scss";

export const UserForm = () => {
  const [photo, setPhoto] = useState("Upload your photo");

  const handleSubmit = () => {};

  const handleFileChange = (event) => {
    setPhoto(event.target.files[0].name);
  };

  return (
    <section>
      <Formik
        initialValues={
          {
            // type: transaction?.type || "EXPENSE",
            // categoryId: defaultCategory || "",
            // amount: defaultAmount || "",
            // transactionDate: transaction?.transactionDate || getParseNewDate(),
            // comment: transaction?.comment || "",
          }
        }
        // onSubmit={}
        // validationSchema={validation}
      >
        {({ values }) => (
          <Form className={css.addUserForm}>
            <label htmlFor="firstName">Your name</label>
            <Field id="firstName" name="firstName" placeholder="Your name" />
            <label htmlFor="firstName">Email</label>
            <Field id="firstName" name="firstName" placeholder="" />
            <label htmlFor="firstName">Phone</label>
            <Field id="firstName" name="firstName" placeholder="" />

            <div id="my-radio-group">Select your position</div>
            <div role="group" aria-labelledby="my-radio-group">
              <label>
                <Field type="radio" name="picked" value="One" />
                Frontend developer
              </label>
              <label>
                <Field type="radio" name="picked" value="Two" />
                Backend developer
              </label>
              <label>
                <Field type="radio" name="picked" value="One" />
                Designer
              </label>
              <label>
                <Field type="radio" name="picked" value="Two" />
                QA
              </label>
              {/* <div>Picked: {values.picked}</div> */}
            </div>
            <label htmlFor="file">Upload</label>
            <input
              id="file"
              name="file"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <div>{photo}</div>
            <Button label="Sign up" onClick={handleSubmit} />
          </Form>
        )}
      </Formik>
    </section>
  );
};

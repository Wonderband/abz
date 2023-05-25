import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRef, useState } from "react";
import css from "./UserForm.module.scss";

export const UserForm = () => {
  const fileInputRef = useRef(null);
  const [photo, setPhoto] = useState("");

  // const handleButtonClick = () => {
  //   fileInputRef.current.click();
  // };

  const handleFileChange = (event) => {
    setPhoto(event.target.files[0].name);

    console.log(photo);
    // Do something with the selected file
  };

  return (
    <section>
      <h2>Working with POST request</h2>
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
            <label
              htmlFor="file"
              // onClick={handleButtonClick}
              // onClick={document.getElementById("file").click()}
            >
              Upload
            </label>
            <input
              id="file"
              name="file"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              // onChange={(event) => {
              //   setFieldValue("file", event.currentTarget.files[0]);
              // }}
              // className="form-control"
            />
            <div>{photo}</div>
            {/* <input
              type="button"
              id="loadFileXml"
              value="loadXml"
              onclick="document.getElementById('file').click();"
            /> */}
            {/* <Thumb file={values.file} /> */}

            <label htmlFor="firstName">Photo</label>
            <Field id="firstName" name="firstName" placeholder="" />

            <div className={css.inputs}>
              {values.type === "EXPENSE" && (
                <label className={css.selector}>
                  {
                    <Field
                      name="categoryId"
                      // component={SelectField}
                      // options={newCategoriesList}
                      required
                    />
                  }
                </label>
              )}
              <ErrorMessage name="categoryId" />
              <div className={css.amountDate}>
                <label>
                  <Field
                    type="number"
                    name="amount"
                    step="0.01"
                    placeholder="0.00"
                    className={css.selectOption}
                  />
                  <ErrorMessage
                    render={(msg) => (
                      <div className={css.errorValidation}>{msg}</div>
                    )}
                    name="amount"
                  />
                </label>

                <label>
                  <Field
                    className={css.selectOption}
                    type="date"
                    name="transactionDate"
                    value={values.transactionDate}
                  />
                </label>
                <ErrorMessage
                  render={(msg) => (
                    <div className={css.errorValidation}>{msg}</div>
                  )}
                  name="transactionDate"
                />
              </div>

              <label>
                <Field
                  as="textarea"
                  name="comment"
                  placeholder="Comment"
                  className={css.commentArea}
                />
              </label>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

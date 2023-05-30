import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import * as yup from "yup";
import InputMask from "react-input-mask";
import css from "./UserForm.module.scss";
import { CustomFileInput } from "../CustomFileInput/CustomFileInput";
import { getPositionsFromAPI } from "../../api/operations";

export const UserForm = () => {
  const [isFileUploadValid, setIsFileUploadValid] = useState(false);
  const [selectedImage, setselectedImage] = useState(null);
  const [positions, setPositions] = useState([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    getPositionsFromAPI()
      .then((res) => {
        if (!res.data.success) {
          console.log(res.data.message);
          return;
        }
        setPositions(res.data.positions);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => setPending(false));
  }, []);

  const handleSubmit = (e, values) => {
    e.preventDefault();
    const { name, email, phone, picked } = values;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("photo", selectedImage);

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
      .required("Email is required")
      // .email("Invalid email address")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address"
      )
      .max(254, "Email address exceeds the maximum length"),
    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^\+\d{2} \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Invalid phone number"),
  });

  return (
    <section>
      {pending && <>Loadind data...</>}
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: "",
          email: "",
          phone: "",
          picked: positions.length > 0 ? positions[0].name : "",
          file: null,
        }}
        validationSchema={validation}
        validateOnChange
        validateOnBlur
      >
        {({ values, isValid, dirty, setFieldValue }) => (
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
                  mask="+38 (099) 999-99-99"
                  placeholder="Phone"
                  // maskPlaceholder="_"
                />
              )}
            </Field>
            <ErrorMessage name="phone" render={(msg) => <div>{msg}</div>} />
            <div id="my-radio-group">Select your position</div>
            <div role="group" aria-labelledby="my-radio-group">
              <ul className={css.positionsList}>
                {positions.map((position, index) => {
                  return (
                    <li key={position.id}>
                      {
                        <label>
                          <Field
                            type="radio"
                            name="picked"
                            value={position.name}
                            checked={values.picked === position.name}
                            onChange={() =>
                              setFieldValue("picked", position.name)
                            }
                          />
                          {position.name}
                        </label>
                      }
                    </li>
                  );
                })}
              </ul>
            </div>

            <CustomFileInput
              isValid={isFileUploadValid}
              setIsValid={setIsFileUploadValid}
              passSelectedFile={setselectedImage}
            />

            <Button
              label="Sign up"
              type="submit"
              disabled={!isValid || !dirty || !isFileUploadValid}
              clickHandler={() => {}}
            />
          </Form>
        )}
      </Formik>
    </section>
  );
};

import { Formik, Form, Field, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import * as yup from "yup";
import InputMask from "react-input-mask";
import css from "./UserForm.module.scss";
import { CustomFileInput } from "../CustomFileInput/CustomFileInput";
import {
  addUserToAPI,
  getPositionsFromAPI,
  getTokenFromAPI,
} from "../../api/operations";
import { useDispatch } from "react-redux";
import {
  setCurrentPage,
  setError,
  setFormSent,
  setPending,
} from "../../redux/globalSlice";

export const UserForm = () => {
  const [isFileUploadValid, setIsFileUploadValid] = useState(false);
  const [selectedImage, setselectedImage] = useState(null);
  const [positions, setPositions] = useState([]);
  // const [pending, setPending] = useState(false);
  const dispatch = useDispatch();

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

  const cleanPhoneNumber = (phoneNumber) => {
    return "+" + phoneNumber.replace(/\D/g, "");
  };

  const handleSubmit = (e, values) => {
    const addUser = (formData, token) => {
      addUserToAPI(formData, token)
        .then((result) => {
          if (!result.data.success) {
            console.log(result.data.message);
            console.log(result.data.fails);
            return;
          }
          dispatch(setFormSent(true));
          dispatch(setCurrentPage(1));
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => dispatch(setPending(false)));
    };

    e.preventDefault();
    const { name, email, phone, picked } = values;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", cleanPhoneNumber(phone));
    formData.append("position_id", picked);
    formData.append("photo", selectedImage);

    dispatch(setPending(true));
    getTokenFromAPI()
      .then((res) => {
        if (!res.data.success) {
          console.log(res.data.message);
          dispatch(setError(res.data.message));
          return;
        }
        const token = res.data.token;
        addUser(formData, token);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => setPending(false));
  };

  const validation = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name should be 2 letters at least")
      .max(60, "Name shouldn't ne longer than 60 letters"),
    email: yup
      .string()
      .required("Email is required")
      .min(2, "Email should be 2 letters at least")
      .max(100, "Email address exceeds the maximum length")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address"
      ),

    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^\+\d{2} \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Invalid phone number"),
  });

  const HelperText = ({ name }) => {
    const { errors, values } = useFormikContext();
    const helperMessages = {
      name: ["Please, input your name", "Your name is fine"],
      email: ["Please, input your email", "Your email is valid"],
      phone: ["+38 (XXX) XXX - XX - XX", "Your phone number is OK"],
    };

    const phoneMaskOrValue =
      values[name] && values[name] !== "+38 (0__) ___-__-__";

    return (
      <>
        {!phoneMaskOrValue && (
          <div className={css.helperText}>{helperMessages[name][0]}</div>
        )}
        {!errors[name] && phoneMaskOrValue && (
          <div className={css.helperText}>{helperMessages[name][1]}</div>
        )}
        {errors[name] && phoneMaskOrValue && (
          <div className={`${css.helperText} ${css.error} `}>
            {errors[name]}
          </div>
        )}
      </>
    );
  };

  return (
    // <div className={css.UserForm}>
    /* {pending && <>Loadind data...</>} */
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: "",
        email: "",
        phone: "",
        picked: positions.length > 0 ? positions[0].id : "",
        file: null,
      }}
      validationSchema={validation}
      validateOnChange
      validateOnBlur
    >
      {({ values, isValid, dirty, setFieldValue, errors, touched }) => (
        <Form
          className={css.addUserForm}
          onSubmit={(e) => handleSubmit(e, values)}
        >
          <div className={css.inputFieldsWrapper}>
            <div className={css.formGroup}>
              <label
                htmlFor="name"
                className={`${css.inputLabel} ${
                  values.name ? css.touched : ""
                } ${errors.name ? css.error : ""}`}
              >
                Your name
              </label>
              <Field
                id="name"
                name="name"
                placeholder="Your name"
                className={`${css.inputField} ${
                  errors.name && values.name ? css.error : ""
                }`}
              />
              <HelperText name="name" />
            </div>
            <div className={css.formGroup}>
              <label
                htmlFor="email"
                className={`${css.inputLabel} ${
                  values.email ? css.touched : ""
                } ${errors.email ? css.error : ""}`}
              >
                Email
              </label>
              <Field
                id="email"
                name="email"
                placeholder="Email"
                className={`${css.inputField} ${
                  errors.email && values.email ? css.error : ""
                }`}
              />
              <HelperText name="email" />
              {/* <ErrorMessage name="email" render={(msg) => <div>{msg}</div>} /> */}
            </div>
            <div className={css.formGroup}>
              <label
                htmlFor="phone"
                className={`${css.inputLabel} ${
                  values.phone ? css.touched : ""
                } ${
                  errors.phone &&
                  values.phone &&
                  values.phone !== "+38 (0__) ___-__-__"
                    ? css.error
                    : ""
                }`}
              >
                Phone
              </label>
              <Field id="phone" name="phone">
                {({ field }) => (
                  <InputMask
                    {...field}
                    mask="+38 (099) 999-99-99"
                    placeholder="Phone"
                    className={`${css.inputField} ${
                      errors.phone &&
                      values.phone &&
                      values.phone !== "+38 (0__) ___-__-__"
                        ? css.error
                        : ""
                    }`}
                    // maskPlaceholder="_"
                  />
                )}
              </Field>
              <HelperText name="phone" />
            </div>
            {/* <div id="my-radio-group" className={css.radioContainer}></div> */}
            <div
              role="group"
              aria-labelledby="my-radio-group"
              className={css.radioContainer}
            >
              <p className={css.radioTitle}>Select your position</p>
              <ul className={css.positionsList}>
                {positions.map((position) => {
                  return (
                    <li key={position.id} className={css.radioItem}>
                      <Field
                        type="radio"
                        name="picked"
                        value={position.id}
                        checked={values.picked === position.id}
                        onChange={() => setFieldValue("picked", position.id)}
                        className={css.radioButton}
                      />
                      <label htmlFor="picked" className={css.radioLabel}>
                        {position.name}
                      </label>
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
          </div>
          <Button
            label="Sign up"
            type="submit"
            disabled={!isValid || !dirty || !isFileUploadValid}
            clickHandler={() => {}}
          />
        </Form>
      )}
    </Formik>
    // </div>
  );
};

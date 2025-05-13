
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from "firebase/auth";
import "./CSS/Regestration.css";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../../firebase.config";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

const Registration = () => {
  const [firebaseError, setFirebaseError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [succMsg, setSuccMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSocialSignUp = async (provider) => {
    try {
      setSocialLoading(true);
      setFirebaseError(null);
      setSuccMsg("");
      
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || 'https://i.imgur.com/6VBx3io.png' // default avatar
      }));

      setSuccMsg("Registration successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Social sign up error:", error);
      
      let errorMessage = "Registration failed. Please try again.";
      switch(error.code) {
        case "auth/account-exists-with-different-credential":
          errorMessage = "Account already exists with different method.";
          break;
        case "auth/popup-closed-by-user":
          errorMessage = "Popup closed. Please try again.";
          break;
        case "auth/cancelled-popup-request":
          errorMessage = "Sign up cancelled. Please try again.";
          break;
      }
      
      setFirebaseError(errorMessage);
    } finally {
      setSocialLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .max(30, "Must be 30 characters or less")
        .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
          "Must contain uppercase, lowercase, number and special character"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm password"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const { name, email, password } = values;
      setLoading(true);
      setFirebaseError(null);
      setSuccMsg("");

      try {
        const auth = getAuth(app);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(userCredential.user, {
          displayName: name,
          photoURL: 'https://i.imgur.com/6VBx3io.png' // default avatar
        });

        dispatch(setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL
        }));

        setSuccMsg("Account created successfully! Redirecting...");
        resetForm();

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        console.error("Registration error:", error);

        let errorMessage = "Registration failed. Please try again.";
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "Email already in use";
            break;
          case "auth/weak-password":
            errorMessage = "Password is too weak";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email address";
            break;
        }

        setFirebaseError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h2 className="registration-title">Create Account</h2>

        {succMsg && <div className="alert alert-success">{succMsg}</div>}
        {firebaseError && <div className="alert alert-error">{firebaseError}</div>}

        <form onSubmit={formik.handleSubmit} className="registration-form">
          <div className={`form-group ${formik.touched.name && formik.errors.name ? "error" : ""}`}>
            <label htmlFor="name" className="input-top">
              <FaUser className="input-icon" /> Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder="Enter your full name"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error-message">{formik.errors.name}</div>
            )}
          </div>

          <div className={`form-group ${formik.touched.email && formik.errors.email ? "error" : ""}`}>
            <label htmlFor="email">
              <FaEnvelope className="input-icon" /> Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error-message">{formik.errors.email}</div>
            )}
          </div>

          <div className={`form-group ${formik.touched.password && formik.errors.password ? "error" : ""}`}>
            <label htmlFor="password">
              <FaLock className="input-icon" /> Password
            </label>
            <div className="password-input">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Enter password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>

          <div className={`form-group ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "error" : ""}`}>
            <label htmlFor="confirmPassword">
              <FaLock className="input-icon" /> Confirm Password
            </label>
            <div className="password-input">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                placeholder="Confirm password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="error-message">{formik.errors.confirmPassword}</div>
            )}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading || !formik.isValid}
          >
            {loading ? <span className="spinner"></span> : "Register"}
          </button>
        </form>

        <div className="social-login-section">
          <p className="divider">Or sign up with</p>
          
          <div className="social-icons">
            <button 
              type="button" 
              className="social-icon-btn google"
              onClick={() => handleSocialSignUp(new GoogleAuthProvider())}
              disabled={socialLoading}
              title="Sign up with Google"
            >
              {socialLoading ? <span className="spinner"></span> : <FaGoogle className="social-icon" />}
            </button>
            
            <button 
              type="button" 
              className="social-icon-btn facebook"
              onClick={() => handleSocialSignUp(new FacebookAuthProvider())}
              disabled={socialLoading}
              title="Sign up with Facebook"
            >
              {socialLoading ? <span className="spinner"></span> : <FaFacebook className="social-icon" />}
            </button>
          </div>
        </div>

        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
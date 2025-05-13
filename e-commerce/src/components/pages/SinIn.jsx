import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaFacebook,
  FaGoogle
} from "react-icons/fa";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app, auth } from "../../firebase.config";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import "./CSS/Login.css";
import gsap from "gsap";

const Login = () => {
  const [errorFirebase, setErrorFirebase] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef();

  const handleSocialLogin = async (provider) => {
    try {
      setSocialLoading(true);
      setErrorFirebase("");
      setSuccMsg("");
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user; ////////////////////////

      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || 'https://i.imgur.com/6VBx3io.png'
      }));
        dispatch(setUser({
          __id: user.uid,
          userName: user.displayName,
          email: user.email,
        }))

      setSuccMsg("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error("Social login error:", error);
      
      let errorMessage = "Login failed. Please try again.";
      switch(error.code) {
        case "auth/account-exists-with-different-credential":
          errorMessage = "Account already exists with different method.";
          break;
        case "auth/popup-closed-by-user":
          errorMessage = "Popup closed. Please try again.";
          break;
        case "auth/cancelled-popup-request":
          errorMessage = "Sign in cancelled. Please try again.";
          break;
      }
      
      setErrorFirebase(errorMessage);
    } finally {
      setSocialLoading(false);
    }
  };

  useEffect(() => {
    gsap.from(formRef.current, {
      duration: 0.8,
      y: 50,
      opacity: 0,
      ease: "power3.out"
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      setLoading(true);
      setErrorFirebase("");
      setSuccMsg("");

      try {
        const auth = getAuth(app);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        dispatch(setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL || 'https://i.imgur.com/6VBx3io.png'
        }));



        setSuccMsg("Login successful! Redirecting to home page...");
        
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        console.error("Login error:", error);
        let errorMessage = "Login failed. Please try again.";
        
        if (error.code.includes("auth/wrong-password")) {
          errorMessage = "Wrong password. Please try again.";
        } else if (error.code.includes("auth/user-not-found")) {
          errorMessage = "No user found with this email.";
        } else if (error.code.includes("auth/too-many-requests")) {
          errorMessage = "Too many attempts. Try again later.";
        }
        
        setErrorFirebase(errorMessage);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
    gsap.to(".form-group:not(." + fieldName + ")", {
      duration: 0.3,
      opacity: 0.7,
      scale: 0.98,
      ease: "power1.out"
    });
  };

  const handleBlur = (fieldName, e) => {
    setActiveField(null);
    formik.handleBlur(e);
    gsap.to(".form-group", {
      duration: 0.3,
      opacity: 1,
      scale: 1,
      ease: "power1.out"
    });
  };

  return (
    <div className="login-container">
      <div className="login-card" ref={formRef}>
        <div className="card-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>

        {succMsg && (
          <div className="alert alert-success animate-pop">
            <div className="alert-content">{succMsg}</div>
          </div>
        )}

        {errorFirebase && (
          <div className="alert alert-error animate-pop">
            <div className="alert-content">{errorFirebase}</div>
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="login-form">
          <div className={`form-group email ${activeField === "email" ? "active" : ""}`}>
            <label htmlFor="email">
              <FaEnvelope className="input-icon" /> Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={(e) => handleBlur("email", e)}
              onFocus={() => handleFocus("email")}
              value={formik.values.email}
              placeholder="your@email.com"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error-message animate-fade">{formik.errors.email}</div>
            )}
          </div>

          <div className={`form-group password ${activeField === "password" ? "active" : ""}`}>
            <label htmlFor="password">
              <FaLock className="input-icon" /> Password
            </label>
            <div className="password-input">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                onBlur={(e) => handleBlur("password", e)}
                onFocus={() => handleFocus("password")}
                value={formik.values.password}
                placeholder="Enter your password"
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
              <div className="error-message animate-fade">{formik.errors.password}</div>
            )}
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="/forgot-password" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? <span className="spinner"></span> : "Sign In"}
          </button>
        </form>

        <div className="social-login-section">
          <p className="divider">Or sign in with</p>
          
          <div className="social-icons">
            <button 
              type="button" 
              className="social-icon-btn google"
              onClick={() => handleSocialLogin(new GoogleAuthProvider())}
              disabled={socialLoading}
              title="Sign in with Google"
            >
              {socialLoading ? <span className="spinner"></span> : <FaGoogle className="social-icon" />}
            </button>
            
            <button 
              type="button" 
              className="social-icon-btn facebook"
              onClick={() => handleSocialLogin(new FacebookAuthProvider())}
              disabled={socialLoading}
              title="Sign in with Facebook"
            >
              {socialLoading ? <span className="spinner"></span> : <FaFacebook className="social-icon" />}
            </button>
          </div>
        </div>

        <div className="register-link">
          Don&apos;t have an account? <Link to="/reg">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
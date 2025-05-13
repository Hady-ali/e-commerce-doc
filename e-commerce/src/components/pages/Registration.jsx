// import { useFormik } from "formik";
// import { useState } from "react";
// import * as Yup from "yup";
// import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import "./CSS/Regestration.css"
// import { useNavigate } from "react-router-dom";

// const Registration = () => {
//   const [firebaseError, setFirebaseError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [succMsg, setSuccMsg] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const nav = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//     validationSchema: Yup.object({
//       name: Yup.string()
//         .required("Please enter your name")
//         .max(30, "Must be 15 characters or less")
//         .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
//       email: Yup.string()
//         .email("Invalid email address")
//         .required("Email is required"),
//       password: Yup.string()
//         .min(6, "Must be at least 8 characters")
//         .matches(
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
//           "Must contain uppercase, lowercase, number and special character"
//         )
//         .required("Password is required"),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref("password"), null], "Passwords must match")
//         .required("Please confirm your password"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       const { name, email, password } = values;
//       setLoading(true);

//           const auth = getAuth();
//           createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//               // Signed up
//               const user = userCredential.user;
//                 updateProfile(auth.currentUser ,{
//                   displayName: name,
//                 });

//                 setSuccMsg("acount created succ!");

//                 setTimeout(()=>{
//                   nav('/')
//                 },2000 );
//             })
//             .catch((error) => {
//               const errorCode = error.code;
//               const errorMessage = error.message;
//               setLoading(false)
//                 if(errorCode.includes("auth/email-already-in-use")) {
//                   setFirebaseError("email already in use, try another one");
//                 }
//             });
//       setFirebaseError(null);

//       try {
//         // هنا يمكنك إضافة منطق Firebase للتسجيل
//         // مثال:
//         // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         // await updateProfile(userCredential.user, { displayName: name });

//         setSuccMsg("Registration successful! Redirecting...");
//         resetForm();

//         // توجيه المستخدم بعد التسجيل
//         // navigate('/dashboard');
//       } catch (error) {
//         setFirebaseError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   return (
//     <div className="registration-container">
//       <div className="registration-card">
//         <h2 className="registration-title">Create Account</h2>

//         {succMsg && (
//           <div className="alert alert-success">
//             {succMsg}
//           </div>
//         )}

//         {firebaseError && (
//           <div className="alert alert-error">
//             {firebaseError}
//           </div>
//         )}

//         <form onSubmit={formik.handleSubmit} className="registration-form">
//           <div className={`form-group ${formik.touched.name && formik.errors.name ? 'error' : ''}`}>
//             <label htmlFor="name">
//               <FaUser className="input-icon" /> Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.name}
//               placeholder="Enter your name"
//             />
//             {formik.touched.name && formik.errors.name && (
//               <div className="error-message">{formik.errors.name}</div>
//             )}
//           </div>

//           <div className={`form-group ${formik.touched.email && formik.errors.email ? 'error' : ''}`}>
//             <label htmlFor="email">
//               <FaEnvelope className="input-icon" /> Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.email}
//               placeholder="Enter your email"
//             />
//             {formik.touched.email && formik.errors.email && (
//               <div className="error-message">{formik.errors.email}</div>
//             )}
//           </div>

//           <div className={`form-group ${formik.touched.password && formik.errors.password ? 'error' : ''}`}>
//             <label htmlFor="password">
//               <FaLock className="input-icon" /> Password
//             </label>
//             <div className="password-input">
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.password}
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             {formik.touched.password && formik.errors.password && (
//               <div className="error-message">{formik.errors.password}</div>
//             )}
//           </div>

//           <div className={`form-group ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'error' : ''}`}>
//             <label htmlFor="confirmPassword">
//               <FaLock className="input-icon" /> Confirm Password
//             </label>
//             <div className="password-input">
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type={showConfirmPassword ? "text" : "password"}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.confirmPassword}
//                 placeholder="Confirm your password"
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//               <div className="error-message">{formik.errors.confirmPassword}</div>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="submit-btn"
//             disabled={loading || !formik.isValid}
//           >
//             {loading ? (
//               <span className="spinner"></span>
//             ) : (
//               "Register"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Registration;
// _________________________________________
// import { useFormik } from "formik";
// import { useState } from "react";
// import * as Yup from "yup";
// import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// import "./CSS/Regestration.css";
// import { useNavigate } from "react-router-dom";
// import { app } from "../../firebase.config";

// const Registration = () => {
//   const [firebaseError, setFirebaseError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [succMsg, setSuccMsg] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//     validationSchema: Yup.object({
//       name: Yup.string()
//         .required("Please enter your name")
//         .max(30, "Must be 30 characters or less")
//         .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
//       email: Yup.string()
//         .email("Invalid email address")
//         .required("Email is required"),
//       password: Yup.string()
//         .min(6, "Must be at least 6 characters")
//         .matches(
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
//           "Must contain uppercase, lowercase, number and special character"
//         )
//         .required("Password is required"),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref("password"), null], "Passwords must match")
//         .required("Please confirm your password"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       const { name, email, password } = values;
//       setLoading(true);
//       setFirebaseError(null);
//       setSuccMsg("");

//       try {
//         const auth = getAuth(app);
//         const userCredential = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );

//         await updateProfile(userCredential.user, {
//           displayName: name,
//         });

//         setSuccMsg("Account created successfully!");
//         resetForm();

//         setTimeout(() => {
//           navigate("/");
//         }, 2000);
//       } catch (error) {
//         console.error("Firebase error:", error);

//         let errorMessage = "Registration failed. Please try again.";
//         switch (error.code) {
//           case "auth/email-already-in-use":
//             errorMessage = "Email already in use, try another one";
//             break;
//           case "auth/weak-password":
//             errorMessage = "Password is too weak";
//             break;
//           case "auth/invalid-email":
//             errorMessage = "Invalid email address";
//             break;
//         }

//         setFirebaseError(errorMessage);
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   return (
//     <div className="registration-container">
//       <div className="registration-card">
//         <h2 className="registration-title">Create Account</h2>

//         {succMsg && <div className="alert alert-success">{succMsg}</div>}

//         {firebaseError && (
//           <div className="alert alert-error">{firebaseError}</div>
//         )}

//         <form onSubmit={formik.handleSubmit} className="registration-form">
//           <div
//             className={`form-group ${
//               formik.touched.name && formik.errors.name ? "error" : ""
//             }`}
//           >
//             <label htmlFor="name">
//               <FaUser className="input-icon" /> Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.name}
//               placeholder="Enter your name"
//             />
//             {formik.touched.name && formik.errors.name && (
//               <div className="error-message">{formik.errors.name}</div>
//             )}
//           </div>

//           <div
//             className={`form-group ${
//               formik.touched.email && formik.errors.email ? "error" : ""
//             }`}
//           >
//             <label htmlFor="email">
//               <FaEnvelope className="input-icon" /> Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.email}
//               placeholder="Enter your email"
//             />
//             {formik.touched.email && formik.errors.email && (
//               <div className="error-message">{formik.errors.email}</div>
//             )}
//           </div>

//           <div
//             className={`form-group ${
//               formik.touched.password && formik.errors.password ? "error" : ""
//             }`}
//           >
//             <label htmlFor="password">
//               <FaLock className="input-icon" /> Password
//             </label>
//             <div className="password-input">
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.password}
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             {formik.touched.password && formik.errors.password && (
//               <div className="error-message">{formik.errors.password}</div>
//             )}
//           </div>

//           <div
//             className={`form-group ${
//               formik.touched.confirmPassword && formik.errors.confirmPassword
//                 ? "error"
//                 : ""
//             }`}
//           >
//             <label htmlFor="confirmPassword">
//               <FaLock className="input-icon" /> Confirm Password
//             </label>
//             <div className="password-input">
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type={showConfirmPassword ? "text" : "password"}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.confirmPassword}
//                 placeholder="Confirm your password"
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             {formik.touched.confirmPassword &&
//               formik.errors.confirmPassword && (
//                 <div className="error-message">
//                   {formik.errors.confirmPassword}
//                 </div>
//               )}
//           </div>

//           <button
//             type="submit"
//             className="submit-btn"
//             disabled={loading || !formik.isValid}
//           >
//             {loading ? <span className="spinner"></span> : "Register"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Registration;


// ________________________________________


// import { useFormik } from "formik";
// import { useState } from "react";
// import * as Yup from "yup";
// import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
//   GoogleAuthProvider,
//   FacebookAuthProvider,
//   signInWithPopup
// } from "firebase/auth";
// import "./CSS/Regestration.css";
// import { Link, useNavigate } from "react-router-dom";
// import { app } from "../../firebase.config";
// import { useDispatch } from "react-redux";
// import { setUser } from "../../redux/userSlice";

// const Registration = () => {
//   const [firebaseError, setFirebaseError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [socialLoading, setSocialLoading] = useState(false);
//   const [succMsg, setSuccMsg] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // دالة للتعامل مع التسجيل عبر وسائل التواصل الاجتماعي
//   const handleSocialSignUp = async (provider) => {
//     try {
//       setSocialLoading(true);
//       setFirebaseError(null);
//       setSuccMsg("");
      
//       const auth = getAuth(app);
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       dispatch(setUser({
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName || user.email.split('@')[0],
//         photoURL: user.photoURL
//       }));

//       setSuccMsg("تم التسجيل بنجاح! يتم التوجيه الآن...");
//       setTimeout(() => navigate("/"), 1500);
//     } catch (error) {
//       console.error("خطأ في التسجيل عبر وسائل التواصل:", error);
      
//       let errorMessage = "فشل التسجيل. يرجى المحاولة مرة أخرى.";
//       switch(error.code) {
//         case "auth/account-exists-with-different-credential":
//           errorMessage = "هذا الحساب مسجل بالفعل بطريقة أخرى. يرجى استخدام طريقة تسجيل الدخول الأصلية.";
//           break;
//         case "auth/popup-closed-by-user":
//           errorMessage = "تم إغلاق نافذة التسجيل. يرجى المحاولة مرة أخرى.";
//           break;
//         case "auth/cancelled-popup-request":
//           errorMessage = "تم إلغاء عملية التسجيل. يرجى المحاولة مرة أخرى.";
//           break;
//       }
      
//       setFirebaseError(errorMessage);
//     } finally {
//       setSocialLoading(false);
//     }
//   };

//   // دالة للتعامل مع التسجيل اليدوي
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//     validationSchema: Yup.object({
//       name: Yup.string()
//         .required("الرجاء إدخال الاسم")
//         .max(30, "يجب أن يكون الاسم 30 حرفًا أو أقل")
//         .matches(/^[aA-zZ\s\u0600-\u06FF]+$/, "يجب أن يحتوي الاسم على أحرف فقط"),
//       email: Yup.string()
//         .email("بريد إلكتروني غير صالح")
//         .required("البريد الإلكتروني مطلوب"),
//       password: Yup.string()
//         .min(6, "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل")
//         .matches(
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
//           "يجب أن تحتوي على حروف كبيرة وصغيرة وأرقام ورموز خاصة"
//         )
//         .required("كلمة المرور مطلوبة"),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref("password"), null], "كلمات المرور غير متطابقة")
//         .required("يرجى تأكيد كلمة المرور"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       const { name, email, password } = values;
//       setLoading(true);
//       setFirebaseError(null);
//       setSuccMsg("");

//       try {
//         const auth = getAuth(app);
//         const userCredential = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );

//         await updateProfile(userCredential.user, {
//           displayName: name,
//         });

//         dispatch(setUser({
//           uid: userCredential.user.uid,
//           email: userCredential.user.email,
//           displayName: userCredential.user.displayName
//         }));

//         setSuccMsg("تم إنشاء الحساب بنجاح! يتم التوجيه الآن...");
//         resetForm();

//         setTimeout(() => {
//           navigate("/");
//         }, 2000);
//       } catch (error) {
//         console.error("خطأ في التسجيل:", error);

//         let errorMessage = "فشل التسجيل. يرجى المحاولة مرة أخرى.";
//         switch (error.code) {
//           case "auth/email-already-in-use":
//             errorMessage = "البريد الإلكتروني مستخدم بالفعل، يرجى استخدام بريد آخر";
//             break;
//           case "auth/weak-password":
//             errorMessage = "كلمة المرور ضعيفة جدًا";
//             break;
//           case "auth/invalid-email":
//             errorMessage = "بريد إلكتروني غير صالح";
//             break;
//         }

//         setFirebaseError(errorMessage);
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   return (
//     <div className="registration-container">
//       <div className="registration-card">
//         <h2 className="registration-title">إنشاء حساب جديد</h2>

//         {succMsg && <div className="alert alert-success">{succMsg}</div>}
//         {firebaseError && <div className="alert alert-error">{firebaseError}</div>}

//         <form onSubmit={formik.handleSubmit} className="registration-form">
//           <div
//             className={`form-group ${
//               formik.touched.name && formik.errors.name ? "error" : ""
//             }`}
//           >
//             <label htmlFor="name">
//               <FaUser className="input-icon" /> الاسم الكامل
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.name}
//               placeholder="أدخل اسمك الكامل"
//             />
//             {formik.touched.name && formik.errors.name && (
//               <div className="error-message">{formik.errors.name}</div>
//             )}
//           </div>

//           <div
//             className={`form-group ${
//               formik.touched.email && formik.errors.email ? "error" : ""
//             }`}
//           >
//             <label htmlFor="email">
//               <FaEnvelope className="input-icon" /> البريد الإلكتروني
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.email}
//               placeholder="أدخل بريدك الإلكتروني"
//             />
//             {formik.touched.email && formik.errors.email && (
//               <div className="error-message">{formik.errors.email}</div>
//             )}
//           </div>

//           <div
//             className={`form-group ${
//               formik.touched.password && formik.errors.password ? "error" : ""
//             }`}
//           >
//             <label htmlFor="password">
//               <FaLock className="input-icon" /> كلمة المرور
//             </label>
//             <div className="password-input">
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.password}
//                 placeholder="أدخل كلمة المرور"
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             {formik.touched.password && formik.errors.password && (
//               <div className="error-message">{formik.errors.password}</div>
//             )}
//           </div>

//           <div
//             className={`form-group ${
//               formik.touched.confirmPassword && formik.errors.confirmPassword
//                 ? "error"
//                 : ""
//             }`}
//           >
//             <label htmlFor="confirmPassword">
//               <FaLock className="input-icon" /> تأكيد كلمة المرور
//             </label>
//             <div className="password-input">
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type={showConfirmPassword ? "text" : "password"}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.confirmPassword}
//                 placeholder="أعد إدخال كلمة المرور"
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             {formik.touched.confirmPassword &&
//               formik.errors.confirmPassword && (
//                 <div className="error-message">
//                   {formik.errors.confirmPassword}
//                 </div>
//               )}
//           </div>

//           <button
//             type="submit"
//             className="submit-btn"
//             disabled={loading || !formik.isValid}
//           >
//             {loading ? <span className="spinner"></span> : "تسجيل حساب جديد"}
//           </button>
//         </form>

//         <div className="social-login-section">
//           <p className="divider">أو سجل باستخدام</p>
          
//           <div className="social-icons">
//             <button 
//               type="button" 
//               className="social-icon-btn google"
//               onClick={() => handleSocialSignUp(new GoogleAuthProvider())}
//               disabled={socialLoading}
//               title="تسجيل الدخول باستخدام جوجل"
//             >
//               {socialLoading ? (
//                 <span className="spinner"></span>
//               ) : (
//                 <FaGoogle className="social-icon" />
//               )}
//             </button>
            
//             <button 
//               type="button" 
//               className="social-icon-btn facebook"
//               onClick={() => handleSocialSignUp(new FacebookAuthProvider())}
//               disabled={socialLoading}
//               title="تسجيل الدخول باستخدام فيسبوك"
//             >
//               {socialLoading ? (
//                 <span className="spinner"></span>
//               ) : (
//                 <FaFacebook className="social-icon" />
//               )}
//             </button>
//           </div>
//         </div>

//         <div className="login-link">
//           لديك حساب بالفعل؟ <Link to="/login">سجل الدخول</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Registration;

















// ___________________________

import { useFormik } from "formik";
import { useState, useCallback } from "react";
import * as Yup from "yup";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaGoogle, 
  FaFacebook 
} from "react-icons/fa";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../../firebase.config";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import "./CSS/Regestration.css";

const Registration = () => {
  // State management
  const [firebaseError, setFirebaseError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [succMsg, setSuccMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Constants
  const DEFAULT_AVATAR = 'https://i.imgur.com/6VBx3io.png';

  // Handlers
  const handleSocialSignUp = useCallback(async (provider) => {
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
        photoURL: user.photoURL || DEFAULT_AVATAR
      }));

      setSuccMsg("Registration successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Social sign up error:", error);
      
      const errorMessages = {
        "auth/account-exists-with-different-credential": 
          "Account already exists with different method.",
        "auth/popup-closed-by-user": "Popup closed. Please try again.",
        "auth/cancelled-popup-request": "Sign up cancelled. Please try again."
      };
      
      setFirebaseError(errorMessages[error.code] || 
        "Registration failed. Please try again.");
    } finally {
      setSocialLoading(false);
    }
  }, [dispatch, navigate]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  // Form configuration
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
        .max(15, "Must be 15 characters or less")
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
          photoURL: DEFAULT_AVATAR
        });

        dispatch(setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL
        }));

        setSuccMsg("Account created successfully! Redirecting...");
        resetForm();

        setTimeout(() => navigate("/login"), 1000);
      } catch (error) {
        console.error("Registration error:", error);

        const errorMessages = {
          "auth/email-already-in-use": "Email already in use",
          "auth/weak-password": "Password is too weak",
          "auth/invalid-email": "Invalid email address"
        };

        setFirebaseError(errorMessages[error.code] || 
          "Registration failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  // Helper function to render form field
  const renderFormField = (fieldName, config) => {
    const { label, icon, type, placeholder, showToggle, toggleHandler } = config;
    const isError = formik.touched[fieldName] && formik.errors[fieldName];
    
    return (
      <div className={`form-group ${isError ? "error" : ""}`}>
        <label htmlFor={fieldName}>
          {icon} {label}
        </label>
        <div className="password-input">
          <input
            id={fieldName}
            name={fieldName}
            type={type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[fieldName]}
            placeholder={placeholder}
          />
          {showToggle && (
            <button
              type="button"
              className="toggle-password"
              onClick={toggleHandler}
              aria-label={`Toggle ${fieldName} visibility`}
            >
              {type === "text" ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>
        {isError && (
          <div className="error-message">{formik.errors[fieldName]}</div>
        )}
      </div>
    );
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h2 className="registration-title">Create Account</h2>

        {succMsg && <div className="alert alert-success">{succMsg}</div>}
        {firebaseError && <div className="alert alert-error">{firebaseError}</div>}

        <form onSubmit={formik.handleSubmit} className="registration-form">
          {renderFormField("name", {
            label: "Name",
            icon: <FaUser className="input-icon" />,
            type: "text",
            placeholder: "Enter your name"
          })}

          {renderFormField("email", {
            label: "Email",
            icon: <FaEnvelope className="input-icon" />,
            type: "email",
            placeholder: "Enter your email"
          })}

          {renderFormField("password", {
            label: "Password",
            icon: <FaLock className="input-icon" />,
            type: showPassword ? "text" : "password",
            placeholder: "Enter password",
            showToggle: true,
            toggleHandler: togglePasswordVisibility
          })}

          {renderFormField("confirmPassword", {
            label: "Confirm Password",
            icon: <FaLock className="input-icon" />,
            type: showConfirmPassword ? "text" : "password",
            placeholder: "Confirm password",
            showToggle: true,
            toggleHandler: toggleConfirmPasswordVisibility
          })}

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
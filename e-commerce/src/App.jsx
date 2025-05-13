import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Card from "./components/pages/Card";
import Registration from "./components/pages/Registration";
import { productsData } from "./components/api/Api";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";
import { clearUser, setUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import Login from "./components/pages/Login";
import LoadingScreen from "./components/pages/LoadingScreen";





const Layout = () => {


 const [isLoading, setIsLoading] = useState(true);
 const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }));
      } else {
        dispatch(clearUser());
      }
      setIsLoading(false);
    });


    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  //   return () => unsubscribe();
  // }, [dispatch]);






  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} loader={productsData} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/card" element={<Card />}/>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;

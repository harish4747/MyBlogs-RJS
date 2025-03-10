import { Outlet } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NavBar from "./components/navbar/NavBar";
import CreateBlog from "./components/createBlog/CreateBlog";

const App = () => {
  return (
    <section>
      <div>
        <NavBar />
      </div>
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default App;

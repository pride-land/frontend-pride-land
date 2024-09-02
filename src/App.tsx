import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/homeComponents/Layout";
import Home from "./pages/Home";
import AdminLogin from "./Admin/admin-components/AdminLogin";
import { AuthProvider } from "./Admin/admin-authContext/AuthContext";
import AdminRegistration from "./Admin/admin-components/AdminRegistration";
import AdminLayout from "./Admin/admin-components/AdminLayout";
import Dashboard from "./Admin/admin-pages/Dashboard";
import BlogsAdmin from "./Admin/admin-pages/BlogsAdmin";
import Volunteer from "./Admin/admin-pages/Volunteer";
import Comments from "./Admin/admin-pages/Comments";
import AdminControl from "./Admin/admin-pages/AdminControl";
import Layouts from "./Admin/admin-pages/Layouts";
import VolunteerPage from "./pages/VolunteerPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="volunteers" element={<VolunteerPage />} />
            </Route>

            <Route path="login" element={<AdminLogin />} />
            <Route path="register" element={<AdminRegistration />} />
            <Route path="admin-layout" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="blogs-admin" element={<BlogsAdmin />} />
              <Route path="volunteer" element={<Volunteer />} />
              <Route path="layouts" element={<Layouts />} />
              <Route path="comments" element={<Comments />} />
              <Route path="admin-controls" element={<AdminControl />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;

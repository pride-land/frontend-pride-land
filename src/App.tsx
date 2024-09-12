import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/homeComponents/Layout";
import Home from "./pages/Home";
import AdminLogin from "./Admin/admin-components/AdminLogin";
import { AuthProvider } from "./Admin/admin-authContext/AuthContext";
import AdminRegistration from "./Admin/admin-components/AdminRegistration";
import AdminLayout from "./Admin/admin-components/AdminLayout";
import VolunteerPage from "./pages/VolunteerPage";
import BlogPage from "./pages/BlogPage";
import AdminVolunteer from "./Admin/admin-components/AdminVolunteer";
import AdminBlogs from "./Admin/admin-components/AdminBlogs";
import AdminDashboard from "./Admin/admin-components/AdminDashboard";
import AdminComments from "./Admin/admin-components/AdminComments";
import AdminControlDashboard from "./Admin/admin-components/AdminControlDashboard";
import AdminGallery from "./Admin/admin-components/AdminGallery";
import CommentsPage from "./pages/CommentsPage";
import AboutUsPage from "./pages/AboutUsPage";
import { createContext, useEffect, useState } from "react";
import MushroomGame from "./pages/MushroomGame";


const App = () => {
    let LanguageContext = createContext("");
    const [currentLang, setCurrentLang] = useState("");
        
    // Get the language from local storage so it doesn't change on refresh
    useEffect(() => {
        const lang = sessionStorage.getItem("lang");
        console.log(lang);
        if (lang) {
            setCurrentLang(lang);
            LanguageContext = createContext(lang);
        } else {
            setCurrentLang("jp");
            LanguageContext = createContext("jp");

        }
    }, []);


    return (
        <LanguageContext.Provider value={currentLang}>
            <BrowserRouter>
                <AuthProvider>
                    { currentLang &&
                    <Routes>
                        <Route path="/" element={<Layout setCurrentLang={setCurrentLang} currentLang={currentLang}/>}>
                            <Route index element={<Home />} />
                            <Route path="blogs" element={<BlogPage />} />
                            <Route path="contactus" element={<CommentsPage/>}/>
                            <Route path="aboutus" element={<AboutUsPage/>}/>
                            <Route path="volunteers" element={<VolunteerPage />} />
                            <Route path="pridefarmgame" element={<MushroomGame />} />
                        </Route>    
                        <Route path="/login" element={<AdminLogin/>}/>
                        <Route path="/register" element={<AdminRegistration/>} />
                        <Route path="/admin-layout" element={<AdminLayout/>}>
                              <Route index element={<AdminDashboard/>} />
                              <Route path="blogs-admin" element={<AdminBlogs/>} />
                              <Route path="volunteer" element={<AdminVolunteer/>} />
                              <Route path="gallery" element={<AdminGallery/>} />
                              <Route path="comments" element={<AdminComments/>} />
                              <Route path="admin-controls" element={<AdminControlDashboard/>} />
                        </Route>
                    </Routes>
}
                </AuthProvider>
            </BrowserRouter>
        </LanguageContext.Provider>
        
    )
};


export default App;
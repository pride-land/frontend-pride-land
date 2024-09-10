import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom';
import Langs from '../../interfaces/LayoutType';



const Layout = ({ setCurrentLang, currentLang }: Langs) => {

  return (
    <section>
       <Navbar setCurrentLang={setCurrentLang} currentLang={currentLang} />
        <Outlet />
        <Footer/>
    </section>
  )
};

export default Layout;
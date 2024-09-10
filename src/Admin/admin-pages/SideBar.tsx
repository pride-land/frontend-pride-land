import { useContext } from "react";
import AuthContext from "../admin-authContext/AuthContext";
import { PiFarm } from "react-icons/pi";
import { DASHBOARD_SIDEBAR_LINKS } from '../admin-utils/lib/Navigation';
import { HiOutlineLogout, HiOutlineArchive } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import classNames from 'classnames'

interface SideBar {
    elt : any,
}

const linkClass =
	'flex items-center gap-2 font-light px-3 py-2 hover:bg-gray-400 hover:no-underline active:bg-gray-400 rounded-sm text-base'

const SideBar = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider.");
    }

    let {  logoutUser } = authContext

  return (
    <>
    <div className='bg-gray-500 flex flex-col w-64 p-2'>
        <div className='flex justify-center gap-2 items-center p-2'>
            <span className='text-2xl font-mono font-bold text-white'>ぷらいどらんど</span><PiFarm fontSize={30} />
        </div>
        <div className="mt-10 mb-0.5">
            <div className={classNames(' text-white hover:cursor-pointer ', linkClass)}><HiOutlineArchive />
            <span className="text-[1rem] flex items-center"><Link to="/" >メインページ</Link></span>
            </div>
        </div>

        <div className='flex-1  flex flex-col gap-0.5'>
            {DASHBOARD_SIDEBAR_LINKS.map((elt) => (
                <SideBarLink key={elt.key} elt={elt}/>
            ))}
        </div>
        <hr className="mb-3"/>
        <div><div className={classNames(' text-red-500 hover:cursor-pointer ', linkClass)} onClick={logoutUser}>
            <span className="text-xl"><HiOutlineLogout /></span>ログアウト</div></div>
        </div>

    </>
  )
}

function SideBarLink({ elt }: SideBar) {

    const { pathname }= useLocation();

    return (
        <Link to={elt.path} className={classNames(pathname === elt.path ? 'bg-gray-400 text-white': 'text-white', linkClass)}>
                <span  className="text-xl">{elt.icon}</span>
                {elt.label}
        </Link>
    )
}

export default SideBar
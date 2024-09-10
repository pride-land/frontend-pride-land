
import {
	HiOutlineViewGrid,
	HiOutlineBookOpen,
	HiOutlineDocumentText,
	HiOutlineCollection,
	HiOutlineAnnotation,
	HiOutlineCog,
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'ダッシュボード',
		path: '/admin-layout',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'blogsadmin',
		label: 'ブログ',
		path: 'blogs-admin',
		icon: <HiOutlineBookOpen />
	},
	{
		key: 'volunteer',
		label: 'ボランティア',
		path: 'volunteer',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'gallery',
		label: 'ギャラリー',
		path: 'gallery',
		icon: <HiOutlineCollection />
	},
	{
		key: 'comments',
		label: 'コメント',
		path: 'comments',
		icon: <HiOutlineAnnotation />
	},
	{
		key: 'admin-controls',
		label: 'サイト管理',
		path: 'admin-controls',
		icon: <HiOutlineCog />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'logout',
		label: 'ログアウト',
		path:  'login',
		icon: <HiOutlineCog />
	},
	
]
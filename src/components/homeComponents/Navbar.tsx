import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next';
import Langs from '../../interfaces/LayoutType';

const langs: any = {
  en: { nativeName: 'English', flag: "/flagassets/us.svg" },
  jp: { nativeName: '日本語', flag: "/flagassets/jp.svg"}, 
  it: { nativeName: 'Italiano', flag: "/flagassets/it.svg"},
  de: { nativeName: 'Deutsch', flag: "/flagassets/de.svg"},
  pt: { nativeName: 'Português', flag: "/flagassets/br.svg"},
};

interface Navigation  { 
  name: any;
  href: string;
  key: string;
}

const Navbar = ({ setCurrentLang, currentLang }: Langs) => {
  const { t, i18n } = useTranslation();

  const handleLangChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    sessionStorage.setItem("lang", lang);
  }

  const navigation: Navigation[] = [
    { name: t("navbar.blog"), href: "/blogs", key: "blog" },
    { name: t("navbar.join"), href: "/volunteers", key: "join" },
    { name: t("navbar.contact"), href: '/contactus', key: "contact" },
    { name: t("navbar.about"), href: '/aboutus', key: "about" },
    { name: t("navbar.game"), href: "/pridefarmgame", key: "game" },
  ];

  return (
    <nav className="bg-gradient-to-br from-green-500 via-green-600 to-green-600 shadow-2xl md:sticky top-0 z-50">
      <div className="flex h-24 items-center justify-between px-4">
        {/* Logo */}
        <a href="./">
          <img
            alt="プライドランドロゴ"
            src='/logo.png'
            className="h-24 p-2 m-0"
          />
        </a>
        {/* desktop view links */}
        <div className="hidden md:flex space-x-4">
          {navigation.map((nav) => (
            <a
              key={nav.key}
              href={nav.href}
              className="px-4 py-6 text-lg font-medium rounded-lg text-white hover:bg-green-800 hover:text-yellow-200"
            >
              {nav.name}
            </a>
          ))}
        </div>
        {/* language menu */}
        <Menu as="div" className="relative ml-3">
          <MenuButton className="px-4 py-6 text-lg font-medium rounded-lg text-white hover:bg-green-800 hover:text-secondary focus:outline-none focus:ring-inset">
          <img src={langs[currentLang].flag} alt={`${currentLang} flag`} className="h-12 w-12 mx-4" />          </MenuButton>
          <MenuItems className="bg-gradient-to-br from-green-500 via-green-600 to-green-600 absolute right-0 w-48 mt-2 origin-top-right divide-y divide-gray-100 shadow-lg focus:outline-none shadow-xl">
            {Object.keys(langs).map((lang) => (
              <MenuItem key={lang}>
                {({ active }) => (
                  <button
                    onClick={() => handleLangChange(lang)}
                    className={`w-full flex px-4 py-2 text-sm text-white ${active ? 'text-secondary bg-green-300' : ''}`}                  >
                      <img src={langs[lang].flag} alt={`${lang} flag`} className="h-8 w-8 mx-4" />
                    {langs[lang].nativeName}
                  </button>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
        {/* hamburger menu for mobile view */}
        <Menu as="div" className="relative md:hidden">
          <MenuButton className="px-4 py-6 text-lg font-medium rounded-lg text-white hover:bg-green-800 hover:text-yellow-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <Bars3Icon className="h-8 w-8" />
          </MenuButton>
          <MenuItems className="bg-gradient-to-br from-green-500 via-green-600 to-green-600 absolute right-0 w-48 mt-2 origin-top-right divide-y divide-gray-100 shadow-lg focus:outline-none shadow-xl">
            {navigation.map((nav) => (
              <MenuItem key={nav.key}>
                {({ active }) => (
                  <a
                    href={nav.href}
                    className={`block px-4 py-2 text-sm text-white ${active ? 'text-secondary' : ''}`}
                  >
                    {nav.name}
                  </a>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>

      </div>
    </nav>
  );
};

export default Navbar;

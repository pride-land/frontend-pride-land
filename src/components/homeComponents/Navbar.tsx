import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next';
import Langs from '../../interfaces/LayoutType';



const langs: any = {
  en: { nativeName: 'English'},
  jp: { nativeName: '日本語'}, 
  it: { nativeName: 'Italiano'},
  de: { nativeName: 'Deutsch'},
  pt: { nativeName: 'Português'},
};

interface Navigation  { 
  name: any;
  href: string;
  current: boolean;
  key: string;
};

const Navbar = ({ setCurrentLang, currentLang }: Langs) => {
  const { t, i18n } = useTranslation();
  
  const handleLangChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    sessionStorage.setItem("lang", lang);
    console.log(sessionStorage.getItem("lang"));
  }
  
  const navigation: Navigation[] = [
    { name: t("navbar.blog"), href: "/blogs", current: false, key: "blog"},
    { name: t("navbar.join"), href: "/volunteers", current: false, key: "join"},
    { name: t("navbar.contact"), href: '/contactus', current: false, key: "contact" },
    { name: t("navbar.about"), href: '/aboutus', current: false, key: "about" },
    { name: t("navbar.game"), href: "/pridefarmgame", current: false, key: "game" },
  ];
  
  
  return (
    <Disclosure as="nav" className="bg-gradient-to-br from-green-500 via-green-600 to-green-600 shadow-2xl sticky top-0 z-50">
      <div className="px-6 md:px-2">
        <div className="relative flex h-24 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <DisclosureButton className="inline-flex items-center justify-center p-2 text-white hover:bg-green-700 
            focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-transform transform hover:scale-105">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true"className="h-8 w-8" />
              <XMarkIcon aria-hidden="true"className="h-8 w-8 hidden" />
            </DisclosureButton>
          </div>
              <img
                alt="プライドランドロゴ"
                src='/logo.png'
                className="h-40 p-0 m-0"
              />
              <div className='hidden md:flex md:items-center md:space-x-4'>
              <a key="home" href="./" className='px-4 py-6 text-lg font-medium rounded-lg transition-colors duration-300 hover:bg-green-800 hover:text-yellow-200 text-white text-md'>{t("navbar.home")}</a>
              </div>
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-end">
            <div className="hidden md:ml-6 md:block">
              <div className="flex">
                {navigation.map((nav) => <a key={nav.key} href={nav.href}  className=
                      ' px-4 py-6 text-lg font-medium rounded-lg gap-2  transition-colors duration-300 hover:bg-green-800  hover:text-yellow-200 text-white text-md'>{nav.name}</a> )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">

<select defaultValue={currentLang} onChange={(e) => handleLangChange(e.target.value)} className="bg-white dark:bg-gray-700 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2">
  <span className="ms-4 ">{langs[currentLang].nativeName} </span>
    // Dropdown items mapped from langs object
       {Object.keys(langs).map((lang) => (
    <option key={lang} value={lang}>
        <span className="ms-4">{langs[lang].nativeName}</span>
      </option>
    ))}
</select>
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className=
                'bg-green-700 text-white block rounded-md px-3 py-2 text-lg font-medium'
            > 
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default Navbar;
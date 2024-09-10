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

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'About', href: '/about', current: false },
  { name: 'Contact', href: '/contact', current: false },
];

const Navbar = ({ setCurrentLang, currentLang }: Langs) => {
  const { t, i18n } = useTranslation();

  const handleLangChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    sessionStorage.setItem("lang", lang);
    console.log(sessionStorage.getItem("lang"));
  }

  return (
    <Disclosure as="nav" className="bg-primary sticky top-0 z-50">
      <div className="px-6 md:px-2">
        <div className="relative flex h-24 items-center md:justify-between pl-36 sm:pl-72 md:px-0">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="text-secondary block h-8 w-8 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden text-secondary h-8 w-8 group-data-[open]:block" />
            </DisclosureButton>
          </div>
              <img
                alt="プライドランドロゴ"
                src='../src/assets/logo.png'
                className="h-40 p-0 m-0"
              />
              <div className='flex'>
              <a key="home" href="./" className='hidden md:ml-2 md:block flex-1 items-center justify-center text-secondary text-lg hover:text-white px-10 py-6'>{t("navbar.home")}</a>
              </div>
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-end">
            <div className="hidden md:ml-6 md:block">
              <div className="flex">
                  <a
                    key={"Pride Farm"}
                    href={"#"}
                    className=
                      'hover:text-white text-secondary px-4 py-6 text-md font-medium'
                  >
                    {t("navbar.prideFarm")}
                  </a>
                  <a
                    key={"join"}
                    href={"/volunteers"}
                    className=
                      'hover:text-white text-secondary px-4 py-6 text-md font-medium'
                  >
                    {t("navbar.join")}
                  </a>
                  <a
                    key={"About Us"}
                    href={"/aboutus"}
                    className=
                      'hover:text-white text-secondary px-4 py-6 text-md font-medium'
                  >
                    {t("navbar.about")}
                  </a>
                  <a
                    key={"shop"}
                    href={"#"}
                    className=
                      'hover:text-white text-secondary px-4 py-6 text-md font-medium'
                  >
                    {t("navbar.shop")}
                  </a>
                  <a
                    key={"contact us"}
                    href={"/contactus"}
                    className=
                      'hover:text-white text-secondary px-4 py-6 text-md font-medium'
                      >
                    {t("navbar.contact")}
                      </a>
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
                'bg-primary text-secondary block rounded-md px-3 py-2 text-lg font-medium'
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
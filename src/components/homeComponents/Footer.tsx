import { FaFacebookF, FaYoutube, FaGithub } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full flex px-4 py-8 sm:py-5 md:px-8 md:py-10 
      bg-gradient-to-br from-green-500 to-green-600 text-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 md:flex-row md:justify-between">
        <div className=" text-center flex-1 flex flex-col gap-4">
            <p className="text-lg font-semibold">{t("footer.follow")}</p>
            <div className="justify-center flex gap-7">
              <a
                href="https://www.facebook.com/prideland4u"
                className="cursor-pointer duration-150 flex items-center text-white hover:text-yellow-300 transition-colors ">
                <FaFacebookF className="text-3xl mr-2" />
                {/* <h1>{t("footer.facebook")}</h1> */}
              </a>
              <a
                href="https://github.com/pride-land"
                className="cursor-pointer duration-150  flex items-center text-white hover:text-yellow-300 transition-colors ">
                <FaGithub className="text-3xl mr-2" />
                {/* <h1>{t("footer.github")}</h1> */}
              </a>
              <a href="https://www.youtube.com/channel/UCInYpCvSPY0ezO-gDb7R75Q"
                className="cursor-pointer duration-150 flex items-center text-white hover:text-yellow-300 transition-colors ">
                <FaYoutube className="text-3xl mr-2" />
                {/* <h1>{t("footer.Youtube")}</h1> */}
              </a>
            </div>
          </div>
          <div className="justify-center text-center flex-1 flex flex-col gap-4">
            <h1 className="text-xl font-semibold">{t("footer.tm-header")}</h1>
            <p>{t("footer.trademark")}</p>
          </div>
          <div className="justify-center text-center flex-1 flex flex-col gap-4">
            <h1 className="text-xl font-semibold">{t("footer.pridelandInfo")}</h1>
            <p className="mt-0 text-sm">{t("footer.emailContact")}</p>
          </div>
      </div>
    </footer>
  );
}

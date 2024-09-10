import { FaFacebookF, FaYoutube, FaGithub } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full px-4 py-8 sm:py-12 md:px-8 md:py-16 
      bg-gradient-to-br from-green-500 to-green-600 text-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 md:flex-row md:justify-between">
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-xl font-semibold">{t("footer.tm-header")}</h1>
          <p>{t("footer.trademark")}</p>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <p className="text-lg font-semibold">{t("footer.support")}</p>
          <a
            href="/contactus"
            className="text-white hover:text-yellow-300 transition-colors duration-200">
            {t("footer.contact")}
          </a>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <p className="text-lg font-semibold">{t("footer.about")}</p>
          <a
            href="/aboutus"
            className="text-white hover:text-yellow-300 transition-colors duration-200">
            {t("footer.mission")}
          </a>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <p className="text-lg font-semibold">{t("footer.follow")}</p>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/prideland4u"
              className="cursor-pointer duration-150 flex items-center text-white hover:text-yellow-300 transition-colors ">
              <FaFacebookF className="text-xl mr-2" />
              {t("footer.facebook")}
            </a>
            <a
              href="https://github.com/pride-land"
              className="cursor-pointer duration-150  flex items-center text-white hover:text-yellow-300 transition-colors ">
              <FaGithub className="text-xl mr-2" />
              {t("footer.github")}
            </a>
            <a href="https://www.youtube.com/channel/UCInYpCvSPY0ezO-gDb7R75Q"
              className="cursor-pointer duration-150 flex items-center text-white hover:text-yellow-300 transition-colors ">
              <FaYoutube className="text-xl mr-2" />
              {t("footer.Youtube")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

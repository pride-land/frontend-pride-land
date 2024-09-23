import { useTranslation } from "react-i18next";

export default function Slogan() {
const { t } = useTranslation();

   return (
      <div className="bg-secondary item-center p-4">
         <div className="portrait:mt-5 flex flex-col gap-10 flex-1 items-center justify-center pb-10 md:py-24">
            <h2 className="text-brown text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl max-w-[1200px] mx-auto w-full text-center font-semibold">{t("main.sloganBR")} <span className="text-primary">{t("main.sloganGR")}</span>
         <br/>
         <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-brown">{t("main.subheadingBR1")} <span className="text-primary">{t("main.subheadingGR1")}</span> {t("main.subheadingBR2")} <br/><span className="text-primary">{t("main.subheadingGR2")}</span> {t("main.subheadingBR3")} <span className="text-primary">{t("main.subheadingGR3")}</span> {t("main.subheadingBR4")}</span>
      </h2>
   </div>
</div>
   );
}
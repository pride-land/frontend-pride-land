import { useTranslation } from 'react-i18next';
export default function MissionStatement() {

   const { t } = useTranslation();
   
   return (
<div>
   <div className="flex flex-col portrait:gap-3 gap-10 flex-1 items-center justify-center  md:py-16">
      <h1 className="text-brown text-3xl p-4 portrait:text-xl lg:text-3xl xl:text-5xl max-w-[1200px] mx-auto w-full text-center font-semibold">{t("main.vision")}</h1>
      <h2 className="text-brown text-xl lg:text-lg portrait:text-lg xl:text-3xl max-w-[1200px]  w-full text-center font-semibold">{t("main.category")}</h2>
      <ul className="text-brown text-lg p-4 lg:text-xl portrait:text-sm xl:text-2xl max-w-[1200px] mx-auto w-full text-center font-semibold">
         <li>{t("main.list1")}</li>
         <li>{t("main.list2")}</li>
         <li>{t("main.list3")}</li>
         </ul>
   </div>
</div>
   );
}
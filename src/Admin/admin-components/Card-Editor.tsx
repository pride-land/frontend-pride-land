// import { AdminCardPropsType, AdminCardDataPropsType } from '../admin-interface/AdminGalleryTypes';
// import { useState } from 'react';
// import AdminCard from './AdminCard';


// const CardEditor = () => {
//   const [cardEditView, setCardEditView] = useState<string>("none");
//   const [cardrefs, setCardRefs] = useState<AdminCardPropsType[] | null>(null);
//   const [cardData, setCardData] = useState<AdminCardDataPropsType>({
//     id: 0,
//     title: "",
//     description: "",
//     imgsrc: "",
//     link: "#",
//     setCardEditView: () => {"none"},
    
//   });


//   const handleFieldChange = (field: string, value: string) => {
//   setCardData((prevData) => {
//     const updatedData = { ...prevData, [field]: value };

//     setCardRefs((prevCardRefs) =>
//       prevCardRefs.map((card) =>
//         card.id === updatedData.id ? { ...card, [field]: value } : card
//       )
//     );
    
//     return updatedData;
//   });
// };

// const renderContent = () => {
//   switch (cardEditView) {
//     case "title":
//       return (
//         <input
//           type="text"
//           value={cardData.title}
//           onChange={(e) => handleFieldChange("title", e.target.value)}
//           className="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
//         />
//       );
//     case "description":
//       return (
//         <textarea
//           value={cardData.description}
//           onChange={(e) => handleFieldChange("description", e.target.value)}
//           className="mb-4 font-normal text-gray-700 dark:text-gray-400"
//         />
//       );
//     case "imgsrc":
//       return (
//         <input
//           type="text"
//           value={cardData.imgsrc}
//           onChange={(e) => handleFieldChange("imgsrc", e.target.value)}
//           className="rounded-t-md w-full h-[50%]"
//         />
//       );
//     case "link":
//       return (
//         <input
//           type="text"
//           value={cardData.link}
//           onChange={(e) => handleFieldChange("link", e.target.value)}
//           className="text-blue-500 underline"
//         />
//       );
//     default:
//       return (
//         <>
//           <h5 className="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//             {cardData.title}
//           </h5>
//           <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
//             {cardData.description}
//           </p>
//           <img className="rounded-t-md w-full h-[50%]" src={cardData.imgsrc} alt="" />
//           <a href={cardData.link} className="text-blue-500 underline">
//             {cardData.link}
//           </a>
//         </>
//       );
//   }
// };
// return (
//    <div>
// <h2>Create Cards for your Activities Portal</h2>
// <div className="snap-x snap-mandatory align-middle bg-gray-200 p-10 overflow-scroll rounded-md grid grid-rows-1 grid-flow-col gap-6 overflow-scroll w-5/6">
//   {/* create a method to click 6 of those categories and set them as selected for the front page. */}
//   {/* add a button to add categories to the db */}
// {cardrefs.map((card, index) => (
//   <div className="m-6 w-[400px]" onClick={() => setCardData(card)}>

// //   <AdminCard
//     setCardRefs={setCardRefs}
//     cardrefs={cardrefs}
//     key={card.id}  
//     id={index}
//     title={card.title}
//     description={card.description}
//     imgsrc={card.imgsrc}
//     link={card.link}
//     setCardEditView={setCardEditView}
//    />

//   </div>
// ))}
// </div>
// {renderContent()}
// </div>
// );


// }

// export default CardEditor;
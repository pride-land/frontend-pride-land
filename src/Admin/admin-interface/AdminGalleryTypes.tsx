export interface Image {
id?: number,
blob_img: string,
alt_text: string,
set_as_hero: boolean,
date_created: string,
}

export interface AdminCardPropsType {
id: number,
title: string,
description: string,
imgsrc: string,
link: string,
setCardEditView: (imgsrc: string) => void,
setCardRefs: (cardrefs: AdminCardPropsType[]) => void,
cardrefs: AdminCardPropsType[],
}

export interface AdminCardRefPropsType {
    id: number, 
    title: string, 
    description: string,
    imgsrc: string, 
    link: string, 
    setCardEditView: (imgsrc: string) => void
    setCardRefs: (cardrefs: AdminCardRefPropsType[]) => void
}

export interface AdminCardDataPropsType {
   id: number,
   title: string,
   description: string,
   imgsrc: string,
   link: string,
   setCardEditView: (imgsrc: string) => void,
}


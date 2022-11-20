export interface NotificationType{
    message : string,
    responseType : ResponseType
}


export enum ResponseType{
    SUCCESS , FAILURE
}
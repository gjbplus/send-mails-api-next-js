import { BodySendMailRequest } from "@/models/bodySendMailRequest.model";
import { extractEmail } from "@/utils/email.utils";


export const validateBodySendMailRequest = (body: BodySendMailRequest) => {
    // FROM 
    if (!body.from || body.from.trim() === "") { 
        return { isValid: false, message: "El remitente es requerido." }; 
    } 
    
    const fromEmail = extractEmail(body.from); 
    if (!fromEmail) { 
        return { isValid: false, message: "Formato de email de remitente incorrecto." }; 
    }

    // TO 
    if (!body.to || body.to.trim() === "") { 
        return { isValid: false, message: "El email de destino es requerido." }; 
    } 
    
    const toEmail = extractEmail(body.to); 
    if (!toEmail) { 
        return { isValid: false, message: "Formato de email de destino incorrecto." }; 
    }

    // SUBJECT
    if (!body.subject) {
        return { isValid: false, message: "El asunto es requerido." };
    }

    // CONTENT
    if (!body.content) {
        return { isValid: false, message: "El mensaje es requerido." };
    }
    
    return { isValid: true, message: "" };
 };
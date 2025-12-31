import nodemailer from "nodemailer";
import { BodySendMailRequest } from "@/models/bodySendMailRequest.model";
import { formatServiceError } from "@/utils/format.serviceError";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, 
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendEmailService = async (body: BodySendMailRequest) => {
    try{
        await transporter.sendMail({
            from: body.from,
            to: body.to,
            subject: body.subject,
            text: body.content,
        }) ;
        return { success: true, message: "Email enviado con éxito"};
    } catch (error){
        return { success: false, message: formatServiceError(error)}
    }
};
    


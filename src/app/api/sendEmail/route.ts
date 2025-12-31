import { BodySendMailRequest } from "@/models/bodySendMailRequest.model";
import { NextRequest, NextResponse } from "next/server";
import { validateBodySendMailRequest } from "./validator";
import { sendEmailService } from "@/services/sendEmails/sendEmail.service";

export async function POST(request: NextRequest) {
    const body: BodySendMailRequest = await request.json();

    //validation request body
    const validation = validateBodySendMailRequest(body);
    if (!validation.isValid) {
        return NextResponse.json(
            { message: validation.message, success: false },
            { status: 400 });
    }

    // send email service
    const result = await sendEmailService(body);

    if (!result.success) {
        return NextResponse.json(result, { status: 500 });
    }

    return NextResponse.json(result, { status: 201 });
}

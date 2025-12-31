"use client"

import { useState } from "react";

export default function Home() {

  const [alertMessage, setAlertMessage] = useState({
    message: '',
    status: ''
  });

  const [emailInfo, setEmailInfo] = useState({
    from: '',
    to: '',
    subject: '',
    content: ''
  })

  const sendEmail = async () => {
    //envio de correo

    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailInfo)
    });

    const responseJson = await response.json();

    if (responseJson.success) {

      setEmailInfo({
        from: '',
        to: '',
        subject: '',
        content: ''
      })

      setAlertMessage({
        message: 'Correo enviado correctamente',
        status: 'success'
      })

    } else {
      setAlertMessage({
        message: responseJson.message || 'Error al enviar el correo',
        status: 'error'
      })
    }

  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-lg mt-10">
        <h1 className="text-xl text-center">Envío de correos</h1>
        <div >

          <input value={emailInfo.from} onChange={(e) => {
            setEmailInfo({ ...emailInfo, from: e.target.value })
          }} className="border w-full mt-2 rounded p-2" type="text" placeholder="From" />

          <input value={emailInfo.to} onChange={(e) => {
            setEmailInfo({ ...emailInfo, to: e.target.value })
          }} className="border w-full mt-2 rounded p-2" type="text" placeholder="To" />

          <input value={emailInfo.subject} onChange={(e) => {
            setEmailInfo({ ...emailInfo, subject: e.target.value })
          }} className="border w-full mt-2 rounded p-2" type="text" placeholder="Asunto" />

          <textarea value={emailInfo.content} onChange={(e) => {
            setEmailInfo({ ...emailInfo, content: e.target.value })
          }} className="border w-full mt-2 rounded p-2" rows={5} name="" id="" placeholder="Mensaje">
          </textarea>

          {
            alertMessage.message && <div className={`mt-2 p-2 ${alertMessage.status === 'success' ? 'bg-green-100' : 'bg-red-100'} rounded`}>
              {alertMessage.message}
            </div>
          }

          <button onClick={sendEmail} className="w-full bg-blue-500 rounded mt-5 p-2 text-white">Enviar</button>
        </div>
      </div>
    </div>
  );
}

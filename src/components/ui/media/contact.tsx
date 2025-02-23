"use client";

import * as React from "react";

import { Button, Container, Img, Motion } from "@/components";

import { FaWhatsapp } from "react-icons/fa6";
export const Contacts = () => {
  const initValues = { firstName: "", email: "", lastName: "", phoneNumber: "", message: "" };
  const [input, setInput] = React.useState(initValues);
  const [error, setError] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, firstName, lastName, message, phoneNumber } = input;

    if (!email || !firstName || !lastName || !message || !phoneNumber) {
      setError(true);
      return;
    }

    // Send data to server here
    console.log(`${email} ${firstName} ${lastName}`);

    setInput(initValues);
  };
  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 py-12">
      <Motion tag="div" initialX={-40} animateX={0} duration={0.3}>
        <Img src="/images/office-building.webp" alt="klinik sari dharma office" className="w-full min-h-300" cover />
        <menu className="space-y-2 mt-4">
          <li className="flex items-center gap-3 text-sm sm:text-base">
            <Img src="/icons/workspace.svg" alt="icon location" className="min-w-10 aspect-square" /> Jl. Pulau Seram No.1 Dauh Puri Klod, Denpasar Barat, Bali 80113
          </li>
          <li className="flex items-center gap-3 text-sm sm:text-base">
            <Img src="/icons/call.svg" alt="icon call" className="min-w-10 aspect-square" /> 0254 - 7932385
          </li>
          <li className="flex items-center gap-3 text-sm sm:text-base">
            <Img src="/icons/message.svg" alt="icon email" className="min-w-10 aspect-square" /> saridharma@gmail.com
          </li>
        </menu>
        <a href="https://wa.me/6281234105663" rel="noreferrer" target="_blank" className="block mt-6">
          <Button className="flex items-center justify-center w-full gap-2 btn-green">
            <FaWhatsapp className="size-4 sm:size-5 md:size-6" /> Hubungi WhatsApp Kami
          </Button>
        </a>
      </Motion>
      <Motion tag="div" initialX={40} animateX={0} duration={0.6} delay={0.3} className="px-4 py-4 space-y-4 md:px-8 rounded-md bg-light border border-gray/20 text-dark">
        <div className="space-y-2">
          <h4 className="text-xl font-semibold sm:text-2xl text-primary">Butuh bantuan kami?</h4>
          <p className="text-sm">Anda akan menerima feedback pelayanan dalam 1x24 jam</p>
        </div>
        <form className="space-y-5" onSubmit={submitForm} autoComplete="off">
          <div className="grid grid-cols-2 gap-5">
            <div className="w-full">
              <input type="text" placeholder="Nama Depan" name="firstName" onChange={handleChange} value={input.firstName} className={`form-contact-input`} />
              {error && !input.firstName && <small className="text-red-500">Enter your first name</small>}
            </div>

            <div className="w-full">
              <input type="text" placeholder="Nama Belakang" name="lastName" onChange={handleChange} value={input.lastName} className={`form-contact-input`} />
              {error && !input.lastName && <small className="text-red-500">Enter your last name</small>}
            </div>

            <div className="w-full col-span-2">
              <input type="email" placeholder="Email" name="email" onChange={handleChange} value={input.email} className={`form-contact-input`} />
              {error && !input.email && <small className="text-red-500">Enter your email</small>}
            </div>

            <div className="w-full col-span-2">
              <input type="tel" placeholder="Nomor Telepon" name="phoneNumber" onChange={handleChange} value={input.phoneNumber} className={`form-contact-input`} />
              {error && !input.phoneNumber && <small className="text-red-500">Enter your number phone</small>}
            </div>
            <div className="w-full col-span-2">
              <textarea rows={5} placeholder="Silahkan masukkan pesan" onChange={handleChange} value={input.message} name="message" className="form-contact-input" />
              {error && !input.message && <small className="text-red-500">Enter your messages</small>}
            </div>
          </div>
          <Button type="submit" className={`btn-primary w-full`}>
            Kirim
          </Button>
        </form>
      </Motion>
    </Container>
  );
};

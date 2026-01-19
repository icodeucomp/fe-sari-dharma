"use client";

import * as React from "react";
import { Button, Container, Img, Motion } from "@/components";
import { FaWhatsapp, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export const Contacts = () => {
  const initValues = {
    firstName: "",
    email: "",
    lastName: "",
    phoneNumber: "",
    message: "",
  };

  const [input, setInput] = React.useState(initValues);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^[0-9+\-\s()]+$/;
    return re.test(phone) && phone.replace(/\D/g, "").length >= 10;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!input.firstName.trim()) {
      newErrors.firstName = "Nama depan harus diisi";
    }

    if (!input.lastName.trim()) {
      newErrors.lastName = "Nama belakang harus diisi";
    }

    if (!input.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!validateEmail(input.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!input.phoneNumber.trim()) {
      newErrors.phoneNumber = "Nomor telepon harus diisi";
    } else if (!validatePhone(input.phoneNumber)) {
      newErrors.phoneNumber = "Nomor telepon tidak valid (min. 10 digit)";
    }

    if (!input.message.trim()) {
      newErrors.message = "Pesan harus diisi";
    } else if (input.message.trim().length < 10) {
      newErrors.message = "Pesan terlalu pendek (min. 10 karakter)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Clear submit status when user starts typing
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Pesan Anda berhasil dikirim! Kami akan menghubungi Anda dalam 1x24 jam.",
        });
        setInput(initValues);
        setErrors({});

        // Auto hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Gagal mengirim pesan. Silakan coba lagi.",
        });
      }
    } catch (err) {
      setSubmitStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Terjadi kesalahan koneksi. Silakan periksa internet Anda dan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeAlert = () => {
    setSubmitStatus(null);
  };

  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 py-12">
      {/* Left Column - Contact Info */}
      <Motion tag="div" initialY={-40} animateY={0} duration={0.3}>
        <Img src="/images/home-3.webp" alt="klinik sari dharma office" className="w-full min-h-300" cover />
        <menu className="space-y-2 mt-4">
          <li className="flex items-center gap-3 text-sm sm:text-base">
            <Img src="/icons/workspace.svg" alt="icon location" className="min-w-10 aspect-square" /> Jl. Pulau Seram No.1, Dauh Puri Klod, Kec. Denpasar Barat, Kota Denpasar, Bali 80113
          </li>
          <li className="flex items-center gap-3 text-sm sm:text-base">
            <Img src="/icons/call.svg" alt="icon call" className="min-w-10 aspect-square" /> (0361) 226866
          </li>
          <li className="flex items-center gap-3 text-sm sm:text-base">
            <Img src="/icons/message.svg" alt="icon email" className="min-w-10 aspect-square" /> info.saridharma@gmail.com
          </li>
        </menu>
        <a href="https://wa.me/628113881248" rel="noreferrer" target="_blank" className="block mt-6">
          <Button className="flex items-center justify-center w-full gap-2 btn-green">
            <FaWhatsapp className="size-4 sm:size-5 md:size-6" /> Hubungi WhatsApp Kami
          </Button>
        </a>
      </Motion>

      {/* Right Column - Contact Form */}
      <Motion tag="div" initialY={40} animateY={0} duration={0.6} delay={0.3} className="relative">
        <div className="bg-white rounded-xl p-6 md:p-8 border border-gray/20">
          {/* Header */}
          <div className="mb-6">
            <h4 className="text-2xl md:text-3xl font-bold text-dark mb-2">Butuh Bantuan Kami?</h4>
            <p className="text-dark">Isi form di bawah ini dan kami akan merespon dalam 1x24 jam</p>
          </div>

          {/* Status Alert */}
          {submitStatus && (
            <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 animate-fadeIn ${submitStatus.type === "success" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
              {submitStatus.type === "success" ? (
                <FaCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-0.5" />
              ) : (
                <FaExclamationCircle className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
              )}
              <p className={`flex-1 text-sm ${submitStatus.type === "success" ? "text-green-800" : "text-red-800"}`}>{submitStatus.message}</p>
              <button onClick={closeAlert} className={`flex-shrink-0 ${submitStatus.type === "success" ? "text-green-600 hover:text-green-800" : "text-red-600 hover:text-red-800"}`}>
                <IoMdClose className="text-xl" />
              </button>
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={submitForm} autoComplete="off">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* First Name */}
              <div className="w-full">
                <label htmlFor="firstName" className="block text-sm font-medium text-dark mb-2">
                  Nama Depan <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Masukkan nama depan"
                  name="firstName"
                  onChange={handleChange}
                  value={input.firstName}
                  disabled={isSubmitting}
                  className={`form-contact-input ${errors.firstName ? "border-red-300 focus:border-red-500" : ""} ${isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""}`}
                />
                {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div className="w-full">
                <label htmlFor="lastName" className="block text-sm font-medium text-dark mb-2">
                  Nama Belakang <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Masukkan nama belakang"
                  name="lastName"
                  onChange={handleChange}
                  value={input.lastName}
                  disabled={isSubmitting}
                  className={`form-contact-input ${errors.lastName ? "border-red-300 focus:border-red-500" : ""} ${isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""}`}
                />
                {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div className="w-full">
              <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="nama@email.com"
                name="email"
                onChange={handleChange}
                value={input.email}
                disabled={isSubmitting}
                className={`form-contact-input ${errors.email ? "border-red-300 focus:border-red-500" : ""} ${isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div className="w-full">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-dark mb-2">
                Nomor Telepon <span className="text-red-500">*</span>
              </label>
              <input
                id="phoneNumber"
                type="tel"
                placeholder="08123456789"
                name="phoneNumber"
                onChange={handleChange}
                value={input.phoneNumber}
                disabled={isSubmitting}
                className={`form-contact-input ${errors.phoneNumber ? "border-red-300 focus:border-red-500" : ""} ${isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>}
            </div>

            {/* Message */}
            <div className="w-full">
              <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
                Pesan <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Silahkan tulis pesan Anda di sini..."
                onChange={handleChange}
                value={input.message}
                name="message"
                disabled={isSubmitting}
                className={`form-contact-input resize-none ${errors.message ? "border-red-300 focus:border-red-500" : ""} ${isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              <p className="mt-1 text-xs text-gray">Minimal 10 karakter</p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary w-full py-4 text-base font-semibold transition-all ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:scale-105"}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Mengirim Pesan...
                </span>
              ) : (
                "Kirim Pesan"
              )}
            </Button>
          </form>
        </div>
      </Motion>
    </Container>
  );
};

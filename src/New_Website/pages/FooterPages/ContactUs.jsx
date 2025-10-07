import React, { useState } from "react";
import {
    FaInstagram,
} from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { enquiryForm } from "../../../api/user.api";
import Swal from "sweetalert2";
import { MainContent } from "../../../constants/mainContent";

export default function ContactUs() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let tempErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (!formData.name.trim()) tempErrors.name = "Name is required";
        if (!formData.email || !emailRegex.test(formData.email)) tempErrors.email = "Valid email is required";
        if (!formData.phone || !phoneRegex.test(formData.phone)) tempErrors.phone = "Valid 10-digit phone number is required";
        if (!formData.subject.trim()) tempErrors.subject = "Subject is required";
        if (!formData.message.trim()) tempErrors.message = "Message is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;
        try {
            setLoading(true);
            await enquiryForm(formData);
            Swal.fire({
                title: "Success",
                text: "Your message has been sent successfully",
                icon: "success",
            });
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center relative mt-20"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80')",
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div className="relative z-10 container mx-auto px-6 py-20">
                <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left Side */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Orgacure India</h2>
                            <p className="mt-2 text-gray-700">
                                <strong>Address:</strong> Office No: 9, 1st Floor,  Plot No. 4, pecific Complex, RNT Marg Bhopal, Madhya Pradesh, 4520676
                            </p>
                            {/* <p className="text-gray-700"><strong>CIN:</strong> U14101AS2024PTC026780</p>
                            <p className="text-gray-700"><strong>GSTIN:</strong> 23ABBCA1033C1ZO</p> */}
                            <p className="text-gray-700"><strong>Mobile:</strong> +91-95205 01840</p>
                            <p className="text-gray-700">
                                <strong>Email:</strong>{" "}
                                <a href={`mailto:${MainContent.email}`} className="text-blue-600">
                                    {MainContent.email}
                                </a>
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Opening Hours</h2>
                            <p className="text-gray-700">Mon-Sat: 10am - 8pm</p>
                            <p className="text-gray-700">Sunday: 11am - 5pm</p>
                            <p className="text-red-600">Wednesday closed</p>
                        </div>

                        <div className="flex space-x-4 text-xl text-gray-700">
                            {/* <a
                                href="https://www.instagram.com/aetheric_dynamics?igsh=ZDA5dmlxbnk2Ymlm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition text-sm md:text-base"
                            >
                                <FaInstagram size={20} className="hover:text-pink-500 cursor-pointer" />
                            </a> */}
                            <a href="https://www.facebook.com/profile.php?id=61575750372570" className="text-gray-400 hover:text-white transition text-sm md:text-base">
                                <FaFacebookSquare size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <h2 className="text-3xl font-bold mb-2 text-gray-800">Get In Touch</h2>
                        <p className="text-sm text-gray-600">Please fill your query. Feel free to contact us.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>

                            <div>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            <div>
                                <input
                                    name="phone"
                                    type="text"
                                    maxLength={10}
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>

                            <div>
                                <input
                                    name="subject"
                                    type="text"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
                            </div>
                        </div>

                        <div>
                            <textarea
                                name="message"
                                placeholder="Your Message..."
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition rounded"
                        >
                            SEND MESSAGE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

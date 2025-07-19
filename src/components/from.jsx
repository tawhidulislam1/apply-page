import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
const imageHostingKey = import.meta.env.VITE_IMAGE_API;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const From = () => {
    const [formData, setFormData] = useState({
        move_in_date: "",
        applying_as: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        social_security_number: "",
        phone_number: "",
        email: "",
        // current_address: "",
        // city: "",
        // state_province: "",
        // zip_postal_code: "",
        // country: "United States",
        employer_name: "",
        job_title: "",
        monthly_income: "",
        id_proof_front: null,
        id_proof_back: null,
        photo_selfie: null,
    });
    const [searchParams] = useSearchParams();
    let ref = searchParams.get("ref"); // যেকোনো dynamic value

    // যদি quote (") দিয়ে আসে, তাহলে সেটা কেটে ফেলার লজিক
    if (ref?.startsWith('"') && ref?.endsWith('"')) {
        ref = ref.slice(1, -1);
    }
    console.log(ref);
    const [errors, setErrors] = useState({}); // For validation errors

    const [previews, setPreviews] = useState({
        id_proof_front: null,
        id_proof_back: null,
        photo_selfie: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error on change
        setErrors((prev) => ({ ...prev, [name]: false }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
            const previewUrl = URL.createObjectURL(files[0]);
            setPreviews((prev) => ({ ...prev, [name]: previewUrl }));
            setErrors((prev) => ({ ...prev, [name]: false }));
        }
    };

    const validate = () => {
        let newErrors = {};
        // Simple required validation
        const requiredFields = [
            "move_in_date",
            "applying_as",
            "first_name",
            "last_name",
            "date_of_birth",
            "social_security_number",
            "phone_number",
            "email",
            "monthly_income",
            "id_proof_front",
            "id_proof_back",
            "photo_selfie",
        ];

        requiredFields.forEach((field) => {
            if (!formData[field] || (typeof formData[field] === "string" && formData[field].trim() === "")) {
                newErrors[field] = true;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const payload = {};
        for (const key in formData) {
            if (formData[key] && typeof formData[key] !== "object") {
                payload[key] = formData[key];
            }
        }

        // 👇 Add the ref to the payload (if it exists)
        if (ref) {
            payload.referrer = ref; // you can name the field as you wish (referrer, referredBy, referralName, etc.)
        }
        // ✅ Add apply date
        const today = new Date();
        payload.apply_date = today.toISOString().split('T')[0]; // format: YYYY-MM-DD
        try {
            // Upload images
            const uploadImage = async (file) => {
                const imageFormData = new FormData();
                imageFormData.append("image", file);
                const res = await axios.post(imageHostingApi, imageFormData);
                return res.data.data.url;
            };

            const [frontUrl, backUrl, selfieUrl] = await Promise.all([
                uploadImage(formData.id_proof_front),
                uploadImage(formData.id_proof_back),
                uploadImage(formData.photo_selfie),
            ]);

            payload.id_proof_front_url = frontUrl;
            payload.id_proof_back_url = backUrl;
            payload.photo_selfie_url = selfieUrl;

            // 👇 Submit to backend
            const res = await axios.post("http://localhost:5000/apply", payload);

            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your apply is submitted",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    timer: 1500
                });
            }

        } catch (err) {
            console.error("Submission error:", err);
            alert("Something went wrong.");
        }
    };



    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg text-gray-100 font-sans">

            <h3 className="text-xl font-bold mb-2">Rental Application</h3>
            <p className="mb-6 text-gray-400">Take the first step towards your dream home.</p>

            <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
                {/* Move-in Date */}
                <div className="mb-5">
                    <label className="block font-semibold mb-1" htmlFor="move_in_date">
                        Move-in Date:{" "}
                        <span className="text-gray-500 text-sm font-normal">(important)</span>
                    </label>
                    <input
                        type="date"
                        id="move_in_date"
                        name="move_in_date"
                        className={`input p-4 w-full  rounded-lg text-base transition-colors duration-300 border-white/30 focus:outline-[#24b77f] focus:border-[#24b77f] input-bordered bg-gray-800 text-gray-100 ${errors.move_in_date ? "input-error border-red-600" : ""
                            }`}
                        value={formData.move_in_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Applying As */}
                <div className="mb-5">
                    <label className="block font-semibold mb-1" htmlFor="applying_as">
                        Applying as:{" "}
                        <span className="text-gray-500 text-sm font-normal">
                            (I am applying as a guarantor or a tenant)
                        </span>
                    </label>
                    <select
                        id="applying_as"
                        name="applying_as"
                        className={`select select-bordered w-full bg-gray-800 text-gray-100 ${errors.applying_as ? "border-red-600" : ""
                            }`}
                        value={formData.applying_as}
                        onChange={handleChange}
                        required
                    >
                        <option value="">----------</option>
                        <option value="Tenant">Tenant</option>
                        <option value="Guarantor">Guarantor</option>
                    </select>
                </div>

                {/* First Name */}
                <div className="mb-5">
                    <label className="block font-semibold mb-1" htmlFor="first_name">
                        First Name: <span className="text-gray-500 text-sm font-normal">(important)</span>
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        maxLength={100}
                        className={`input focus:outline-[#24b77f] focus:border-[#24b77f] input-bordered w-full bg-gray-800 text-gray-100 ${errors.first_name ? "input-error border-red-600" : ""
                            }`}
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Last Name */}
                <div className="mb-5">
                    <label className="block font-semibold mb-1" htmlFor="last_name">
                        Last Name: <span className="text-gray-500 text-sm font-normal">(important)</span>
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        maxLength={100}
                        className={`input focus:outline-[#24b77f] focus:border-[#24b77f] input-bordered w-full bg-gray-800 text-gray-100 ${errors.last_name ? "input-error border-red-600" : ""
                            }`}
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Date of Birth */}
                <div className="mb-5">
                    <label className="block font-semibold mb-1" htmlFor="date_of_birth">
                        Date of Birth: <span className="text-gray-500 text-sm font-normal">(important)</span>
                    </label>
                    <input
                        type="date"
                        id="date_of_birth"
                        name="date_of_birth"
                        className={`input focus:outline-[#24b77f] focus:border-[#24b77f] input-bordered w-full bg-gray-800 text-gray-100 ${errors.date_of_birth ? "input-error border-red-600" : ""
                            }`}
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Social Security Number */}
                <div className="mb-5">
                    <label className="block font-semibold mb-1" htmlFor="social_security_number">
                        Social Security Number:{" "}
                        <span className="text-gray-500 text-sm font-normal">(important)</span>
                    </label>
                    <input
                        type="text"
                        id="social_security_number"
                        name="social_security_number"
                        maxLength={255}
                        className={`input focus:outline-[#24b77f] focus:border-[#24b77f] input-bordered w-full bg-gray-800 text-gray-100 ${errors.social_security_number ? "input-error border-red-600" : ""
                            }`}
                        value={formData.social_security_number}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Phone Number */}
                <div className="mb-5">
                    <label className="block font-semibold mb-1" htmlFor="phone_number">
                        Phone Number:{" "}
                        <span className="text-gray-500 text-sm font-normal">
                            <i className="fa-solid fa-flag-usa mr-1"></i> (+1 ***-***-****)
                        </span>
                    </label>
                    <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        maxLength={15}
                        className={`input input-bordered w-full bg-gray-800 text-gray-100 ${errors.phone_number ? "input-error border-red-600" : ""
                            }`}
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Email */}
                <div className="mb-5">
                    <label className="block font-semibold mb-1" htmlFor="email">
                        Email: <span className="text-gray-500 text-sm font-normal">(important)</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        maxLength={254}
                        className={`input focus:outline-[#24b77f] focus:border-[#24b77f] input-bordered w-full bg-gray-800 text-gray-100 ${errors.email ? "input-error border-red-600" : ""
                            }`}
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Current Address */}
                {/* <div className="mb-5">
                    <label className="block font-semibold mb-1" htmlFor="current_address">
                        Current Address:{" "}
                        <span className="text-gray-500 text-sm font-normal">(important)</span>
                    </label>
                    <input
                        type="text"
                        id="current_address"
                        name="current_address"
                        className={`input focus:outline-[#24b77f] focus:border-[#24b77f] input-bordered w-full bg-gray-800 text-gray-100 ${errors.current_address ? "input-error border-red-600" : ""
                            }`}
                        value={formData.current_address}
                        onChange={handleChange}
                        required
                    />
                </div> */}

                {/* Address Grid: City and State */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div>
                        <label className="block font-semibold mb-1" htmlFor="city">
                            City: <span className="text-gray-500 text-sm font-normal">(important)</span>
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            maxLength={100}
                            className={`input focus:outline-[#24b77f] focus:border-[#24b77f] input-bordered w-full bg-gray-800 text-gray-100 ${errors.city ? "input-error border-red-600" : ""
                                }`}
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1" htmlFor="state_province">
                            State/Province:{" "}
                            <span className="text-gray-500 text-sm font-normal">(important)</span>
                        </label>
                        <input
                            type="text"
                            id="state_province"
                            name="state_province"
                            maxLength={100}
                            className={`input focus:outline-[#24b77f] focus:border-[#24b77f] input-bordered w-full bg-gray-800 text-gray-100 ${errors.state_province ? "input-error border-red-600" : ""
                                }`}
                            value={formData.state_province}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div> */}

                {/* Address Grid: ZIP and Country */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div>
                        <label className="block font-semibold mb-1" htmlFor="zip_postal_code">
                            ZIP/Postal Code:{" "}
                            <span className="text-gray-500 text-sm font-normal">(important)</span>
                        </label>
                        <input
                            type="text"
                            id="zip_postal_code"
                            name="zip_postal_code"
                            maxLength={20}
                            className={`input focus:outline-[#24b77f] focus:border-[#24b77f] input-bordered w-full bg-gray-800 text-gray-100 ${errors.zip_postal_code ? "input-error border-red-600" : ""
                                }`}
                            value={formData.zip_postal_code}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1" htmlFor="country">
                            Country: <span className="text-gray-500 text-sm font-normal">(important)</span>
                        </label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            maxLength={100}
                            className={`input focus:outline-[#24b77f] focus:border-[#24b77f] input-bordered w-full bg-gray-800 text-gray-100 ${errors.country ? "input-error border-red-600" : ""
                                }`}
                            value={formData.country}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div> */}

                {/* Employer Name */}
                <div className="mb-5">
                    <label className="block font-semibold mb-1" htmlFor="employer_name">
                        Employer Name: <span className="text-gray-500 text-sm font-normal">(Optional)</span>
                    </label>
                    <input
                        type="text"
                        id="employer_name"
                        name="employer_name"
                        maxLength={255}
                        className="input input-bordered w-full bg-gray-800 focus:outline-[#24b77f]  text-gray-100 focus:border-[#24b77f] input-bordered"
                        value={formData.employer_name}
                        onChange={handleChange}
                    />
                </div>

                {/* Job Title */}
                <div className="mb-5">
                    <label className="block font-semibold mb-1" htmlFor="job_title">
                        Job Title: <span className="text-gray-500 text-sm font-normal">(Optional)</span>
                    </label>
                    <input
                        type="text"
                        id="job_title"
                        name="job_title"
                        maxLength={255}
                        className="input input-bordered w-full bg-gray-800 focus:outline-[#24b77f]  text-gray-100 focus:border-[#24b77f] input-bordered"
                        value={formData.job_title}
                        onChange={handleChange}
                    />
                </div>

                {/* Monthly Income */}
                <div className="mb-5">
                    <label className="block font-semibold mb-1" htmlFor="monthly_income">
                        Monthly Income: <span className="text-gray-500 text-sm font-normal">(important)</span>
                    </label>
                    <input
                        type="number"
                        id="monthly_income"
                        name="monthly_income"
                        className={`input  focus:outline-[#24b77f] focus:border-[#24b77f] input-bordered w-full bg-gray-800 text-gray-100 ${errors.monthly_income ? "input-error border-red-600" : ""
                            }`}
                        value={formData.monthly_income}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* File Uploads */}
                {[
                    {
                        id: "id_proof_front",
                        label: "Upload Front part of your ID",
                        name: "id_proof_front",
                        preview: previews.id_proof_front,
                        error: errors.id_proof_front,
                        important: ` Driver's License/State ID card important`
                    },
                    {
                        id: "id_proof_back",
                        label: "Upload Back part of your ID",
                        name: "id_proof_back",
                        preview: previews.id_proof_back,
                        error: errors.id_proof_back,
                        important: ` Driver's License/State ID card important`

                    },
                    {
                        id: "photo_selfie",
                        label: "Upload Your Selfie",
                        name: "photo_selfie",
                        preview: previews.photo_selfie,
                        error: errors.photo_selfie,
                        important: ` Important`

                    },
                ].map(({ id, label, name, preview, error, important }) => {
                    const getIcon = (type) => {
                        switch (type) {
                            case "id_proof_front":
                                return (
                                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M5 6h14M5 6a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2M5 6l1.5-2h11L19 6" />
                                    </svg>
                                );
                            case "id_proof_back":
                                return (
                                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M4 4h16v16H4V4zm4 4h8v8H8V8z" />
                                    </svg>
                                );
                            case "photo_selfie":
                                return (
                                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M12 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                );
                            default:
                                return null;
                        }
                    };

                    return (
                        <div key={id} className="mb-6">
                            <label className="block font-semibold mb-1" htmlFor={id}>
                                <span className="text-white flex items-center gap-2">
                                    {getIcon(id)}
                                    {label}:
                                    <span className="text-gray-400 text-sm font-normal">({important})</span>
                                </span>
                            </label>

                            {/* Hidden file input */}
                            <input
                                type="file"
                                id={id}
                                name={name}
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            {/* Custom styled label as button */}
                            <label
                                htmlFor={id}
                                className={`cursor-pointer inline-flex items-center gap-2 border rounded-sm px-4 py-2 transition
                ${error ? "border-red-600 text-red-600" : "border-green-400 text-green-400 hover:bg-green-900/20"}`}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4-4m0 0l-4 4m4-4v12" />
                                </svg>
                                <span className="font-semibold text-white">{label}</span>
                            </label>

                            {/* Preview image if uploaded */}
                            {preview && (
                                <img
                                    src={preview}
                                    alt={`${label} preview`}
                                    className="mt-2 max-h-40 rounded border border-gray-700 object-contain"
                                />
                            )}
                        </div>
                    );
                })}

                <button
                    type="submit"
                    className="btn btn-primary w-full max-w-sm mx-auto block"
                    aria-label="Submit Application"
                >
                    <i className="fas fa-paper-plane mr-2"></i> Submit Application
                </button>
            </form>

            <style>{`
        /* Custom input-error styles overriding DaisyUI for dark mode */
        input.input-error, select.border-red-600, textarea.textarea-bordered.border-red-600 {
          border-color: #dc2626 !important; /* Tailwind red-600 */
          box-shadow: 0 0 0 1px #dc2626 !important;
        }
      `}</style>
        </div>
    );
};

export default From;

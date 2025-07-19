import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddNew = () => {
    const Navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        trackingCode: '',
        referralLink: '',
    });

    // Dynamically update referral link when name changes
    useEffect(() => {
        const baseURL = "http://localhost:5173"; // change to your actual domain
        const cleanName = formData.name.trim().toLowerCase().replace(/\s+/g, '-');
        const referralLink = `${baseURL}/?ref=${cleanName}`;
        setFormData(prev => ({ ...prev, referralLink }));
    }, [formData.name]);


    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        console.log('Submitted:', formData);
        try {
            console.log(formData);
            const res = await axios.post("http://localhost:5000/promoters", formData);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your apply is submitted",
                    showConfirmButton: false,
                    timer: 1500
                });
                Navigate('/dashboard/promoters')
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
        <div>
            <div className="max-w-xl mx-auto p-6 bg-[#34d399] shadow rounded-md">
                <h2 className="text-xl font-semibold mb-4">Add promoter</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-medium">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Tracking Code */}
                    <div>
                        <label className="block mb-1 font-medium">Tracking code:</label>
                        <input
                            type="text"
                            name="trackingCode"
                            value={formData.trackingCode}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex flex-wrap gap-2">
                        <button type="submit" className="btn btn-primary">
                            SAVE
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNew;
import React, { useState } from 'react';

const AddNew = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        trackingCode: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Submitted:', formData);
        // Add submit logic here
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
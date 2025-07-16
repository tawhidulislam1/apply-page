import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const FormDetails = () => {
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/apply/${id}`)
            .then((res) => {
                setForm(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching form details:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!form) return <div className="text-center mt-10 text-red-600">Form not found</div>;

    return (
        <div className="w-full min-h-screen bg-base-200 px-4 py-10">
            <div className="max-w-4xl mx-auto card bg-base-100 shadow-xl border">
                <div className="card-body">
                    <h2 className="card-title text-2xl">
                        {form.first_name} {form.last_name}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <p><strong>Applying As:</strong> {form.applying_as}</p>
                            <p><strong>DOB:</strong> {form.date_of_birth}</p>
                            <p><strong>Phone:</strong> {form.phone_number}</p>
                            <p><strong>Email:</strong> {form.email}</p>
                            <p><strong>Move-in Date:</strong> {form.move_in_date}</p>
                        </div>
                        <div>
                            <p><strong>Address:</strong></p>
                            <p>{form.current_address}</p>
                            <p>{form.city}, {form.state_province}</p>
                            <p>{form.zip_postal_code}, {form.country}</p>
                        </div>
                    </div>

                    <div className="divider" />

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <p><strong>Employer:</strong> {form.employer_name}</p>
                            <p><strong>Job Title:</strong> {form.job_title}</p>
                            <p><strong>Monthly Income:</strong> ${form.monthly_income}</p>
                        </div>
                        <div>
                            <p><strong>References:</strong> {form.references}</p>
                            <p><strong>Comments:</strong> {form.additional_comments}</p>
                            <p><strong>SSN:</strong> {form.social_security_number}</p>
                        </div>
                    </div>

                    <div className="divider" />

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                        <div>
                            <p className="font-semibold mb-1">ID Proof (Front)</p>
                            <img src={form.id_proof_front_url} alt="ID Front" className="rounded shadow" />
                        </div>
                        <div>
                            <p className="font-semibold mb-1">ID Proof (Back)</p>
                            <img src={form.id_proof_back_url} alt="ID Back" className="rounded shadow" />
                        </div>
                        <div>
                            <p className="font-semibold mb-1">Selfie</p>
                            <img src={form.photo_selfie_url} alt="Selfie" className="rounded-full shadow border w-28 h-28" />
                        </div>
                    </div>

                    <div className="mt-6 text-right">
                        <Link to="/apply" className="btn btn-outline btn-primary">
                            Back to Applications
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormDetails;

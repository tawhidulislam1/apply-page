import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Promoters = () => {
    const [promoters, setPromoters] = useState([]);

    useEffect(() => {
        const fetchPromoters = async () => {
            try {
                const res = await axios.get('http://localhost:5000/promoters');
                setPromoters(res.data);
            } catch (error) {
                console.error("Failed to fetch promoters:", error);
            }
        };
        fetchPromoters();
    }, []);

    const handleCopy = (link) => {
        navigator.clipboard.writeText(link)
            .then(() => {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Referral link copied!',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to copy the link!',
                });
            });
    };

    return (
        <div className="p-4">
            {/* Top bar with button */}
            <div className="flex justify-end mb-4">
                <Link to={'/dashboard/add-new-promoters'}>
                    <button className="btn btn-primary">
                        Add New Promoters
                    </button>
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Tracking Code</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {promoters.length > 0 ? (
                            promoters.map((promoter, index) => (
                                <tr key={promoter._id}>
                                    <td>{index + 1}</td>
                                    <td>{promoter.name}</td>
                                    <td>{promoter.email}</td>
                                    <td>{promoter.trackingCode || '—'}</td>
                                    
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline"
                                            onClick={() => handleCopy(promoter.referralLink)}
                                        >
                                            Copy Link
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No promoters found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Promoters;

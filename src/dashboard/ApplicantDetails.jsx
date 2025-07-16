import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FormList = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/apply")
      .then((res) => {
        setForms(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching form data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="w-full min-h-screen px-4 py-8 bg-base-200">
      <h1 className="text-3xl font-bold text-center mb-6">Application Table</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300 text-base-content">
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Applying As</th>
              <th>Move-in</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{form.first_name} {form.last_name}</td>
                <td>{form.phone_number}</td>
                <td>{form.email}</td>
                <td>{form.applying_as}</td>
                <td>{form.move_in_date}</td>
                <td>
                  {/* Replace with modal or route link if needed */}
                  <Link
                    to={`/apply/view/${form._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormList;

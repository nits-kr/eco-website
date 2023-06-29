import React, {  useState } from 'react'
import axios from "axios";
import Sidebar from './Sidebar';

function EditStaffMember() {
    const [modules, setModules] = useState([]);

    const [staff, setStaff] = useState({
        nameEn: '',
        email: '',
        modules: '',
        password: '',
        confirmPassword: '',
        categoryId: '',
    });
    axios.defaults.headers.common["x-auth-token-user"] =
        localStorage.getItem("token");
    
    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setStaff({ ...staff, [name]: value });
    // };
    const handleInputChange = (event) => {
        const { name, value = '' } = event.target;
        setStaff({ ...staff, [name]: value });
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.patch(
                "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/staff/staff/updateStaff/643f9caa63c68a49553ca615",
                {
                    Email: staff.email,

                }
            );
            console.log(response.data.results.updateData);
            setStaff(response.data.results.updateData)

            if (!response.data.error) {
                alert("Saved!");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
        <Sidebar/>
            <div className="modal fade Edit_modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Staff Member</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="form-design p-3 help-support-form row align-items-start justify-content-center" action="" onSubmit={handleSubmit}>
                                <div className="form-group col-6">
                                    <label htmlFor="">Staff Name</label>
                                    <input type="text" className="form-control" name="nameEn" id="nameEn" value={staff ? staff.nameEn : ''} onChange={handleInputChange} />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Email</label>
                                    <input type="text" className="form-control" name="email" id="email" value={staff ? staff.email : ''} onChange={handleInputChange} />
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="">Select Module</label>
                                    <select className="select form-control" size={15} name="models" id="models" value={staff ? staff.modules : ''} onChange={handleInputChange}>
                                        {Array.isArray(modules) && modules.map((module) => (
                                            <option key={module._id} value={module._id}>{module.modules}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Password</label>
                                    <input type="text" className="form-control" value={staff ? staff.password : ''} onChange={handleInputChange} name="password" id="password" />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Confirm Password</label>
                                    <input type="text" className="form-control" value={staff ? staff.confirmPassword : ''} onChange={handleInputChange} name="confirmPassword" id="confirmPassword" />
                                </div>
                                <div className="form-group mb-0 col-auto"> <button className="comman_btn2">Save</button> </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditStaffMember

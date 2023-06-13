import React, { useState } from 'react'
import axios from "axios";
import Swal from 'sweetalert2';

export default function HelpEditModelEn(props) {
    const [formData, setFormData] = useState({ questions: '', answers: '' });
    axios.defaults.headers.common["x-auth-token-user"] =
        localStorage.getItem("token");
    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post('http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/help/help/updateQuestion/645df288ee8a5bc9341d6de5', {
            Question: formData.questions,
            Answer: formData.answers
        })
            .then(response => {
                console.log(response.data.results);
                const updatedData = response.data.results.updateData;
                if (updatedData && updatedData.questions && updatedData.answer) {
                    setFormData(updatedData);
                    props.refreshList();
                    //window.location.reload(); 
                    Swal.fire({
                        title: 'Question Updated!',
                        text: 'Your question has been updated successfully.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    })
                    // .then((result) => {
                    //     if (result.isConfirmed) {
                    //         window.location.reload();
                    //     }
                    // });
                   
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <div className="modal fade Edit_help Edit_modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="form-design row mx-0 py-2" action="" onSubmit={handleFormSubmit}>
                                <div className="form-group col-12">
                                    <label htmlFor="quesstioon">Question</label>
                                    <input className="form-control" type="text" id="questions" name="questions"
                                        value={formData.questions} onChange={handleInputChange} />
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="quesstioon">Answer</label>
                                    <textarea className="form-control" name="answers" id="answers"
                                        style={{ height: '150px' }} value={formData.answers} onChange={handleInputChange}></textarea>

                                </div>
                                <div className="form-group col-12 text-center mb-0">
                                    <button type="submit" className="comman_btn2" >Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

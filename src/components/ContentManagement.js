import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios";

function ContentManagement() {
    const [contentList, setContentList] = useState('')
    const [formData, setFormData] = useState({ questions: '', answers: '' });
    axios.defaults.headers.common["x-auth-token-user"] =
        localStorage.getItem("token");
        const handleInputChange = (event) => {
            const { name, value } = event.target;
            setFormData({ ...formData, [name]: value });
        };
    useEffect(() => {
        userList();
    }, []);
    const userList = async () => {
        const { data } = await axios.post("http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/content/content/list", {
        });
        setContentList(data.results.list);
        console.log(data);
    };
    const updateList = (event) =>{
        event.preventDefault();
        axios.post("http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/content/content/updateContent/644a08dc84ab4b696d963b42", {
            title:formData.questions
        })
        .then(response => {
            console.loh(response.data.results.updateData)
            setFormData(response.data.results.updateData);

        })
        .catch(error => {
            console.log(error.response.data.results)
        })
    }
    return (
        <>
            <div className="admin_main">
                <div className="admin_main_inner">
                    <div className="admin_panel_data height_adjust">
                        <div className="row content_management justify-content-center">
                            {(contentList || []).map((data, index) => (
                                <div className="col-12 mb-5" key={index}>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-stretch">
                                            <div className="row content_management_box me-0">
                                                <h2>{data.title}</h2>
                                                <Link className="edit_content_btn comman_btn" data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop" to="javscript:;"><i
                                                        className="far fa-edit me-2"></i>Edit</Link>
                                                <p>{data.Description}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6 d-flex align-items-stretch">
                                            <div className="row content_management_box ms-0 text-end">
                                                <h2>معلومات عنا</h2>
                                                <Link className="edit_content_btn comman_btn" data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop1" to="javscript:;"><i
                                                        className="far fa-edit me-2"></i>Edit</Link>
                                                <p>لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار النشوة وتمجيد الألم نشأت
                                                    بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو
                                                    يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن
                                                    نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد
                                                    من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد تكمن
                                                    السعاده فيما نتحمله من كد وأسي.
                                                    و سأعرض مثال حي لهذا، من منا لم يتحمل جهد بدني شاق إلا من أجل الحصول على ميزة أو فائدة؟
                                                    ولكن من لديه الحق أن ينتقد شخص ما أراد أن يشعر بالسعادة التي لا تشوبها عواقب أليمة أو آخر
                                                    أراد أن يتجنب الألم الذي ربما تنجم عنه بعض المتعة
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade Edit_help Edit_modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="form-design row mx-0 py-2" action="" onSubmit={updateList}>
                                <div className="form-group col-12">
                                    <label htmlFor="quesstioon">Title</label>
                                    <input className="form-control" type="text" id="questions" name="questions"
                                        value={formData.questions} onChange={handleInputChange} />
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="quesstioon">Description</label>
                                    <textarea className="form-control" name="answers" id="answers" style={{ height: '150px' }} value={formData.answers} onChange={handleInputChange} />

                                </div>
                                <div className="form-group col-12 text-center mb-0">
                                    <button type="submit" className="comman_btn2">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade Edit_help Edit_modal" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="form-design row mx-0 py-2" action="">
                                <div className="form-group col-12 text-end">
                                    <label className="text-end" htmlFor="quesstioon">Title</label>
                                    <input className="form-control text-end" type="text" id="quesstioon" name="quesstioon"
                                        defaultValue="سلامتك تهمنا" />
                                </div>
                                <div className="form-group col-12 text-end">
                                    <label className="text-end" htmlFor="quesstioon">Description</label>

                                    <textarea
                                        className="form-control text-end"
                                        name="message"
                                        id="message"
                                        style={{ height: '150px' }}
                                        defaultValue="لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاصأن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن"
                                    />

                                </div>
                                <div className="form-group col-12 text-center mb-0">
                                    <button type="submit" className="comman_btn2">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContentManagement

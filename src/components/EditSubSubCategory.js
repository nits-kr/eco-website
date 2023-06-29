import React, { useState, useEffect } from 'react'
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from './Sidebar';
//import { Link } from "react-router-dom";
function EditSubSubCategory(props) {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [subSubCategories, setSubSubCategories] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [category, setCategory] = useState({
        nameEn: '',
        nameAr: '',
        categoryId: '',
    });
    const [categoryData, setCategoryData] = useState(props?.newCategory);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCategory({ ...category, [name]: value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/createAttribute', { name: category })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.post(
                "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/selectCategory",
            );
            setCategories(response.data.results.categoryData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/selectSubcategory"
                );
                setSubCategories(response.data.results.subCategoryData);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/selectSubSubCategory"
                );
                setSubSubCategories(response.data.results.subSubCategoryData);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/values/selectAttribute"
                );
                setAttributes(response.data.results.attributeCategoryData);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleUpdate = (itemId, event) => {
        event.preventDefault();
        axios.defaults.headers.common['x-auth-token-user'] = localStorage.getItem('token');
        axios
            .patch(`http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subSubCategory/subSubCategoryUpdate/${props.newCategory.id}`, {
                subSubCategoryName: category.nameEn
            })
            .then((response) => {
                console.log(response)
                if (!response.data.error) {
                    Swal.fire({
                        title: "Updated!",
                        text: "Your have been updated the list successfully.",
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
                }
            })
            .catch((error) => {
                console.log(error)
            });
    };
    console.log(props.newCategory)
    return (
        <>
        <Sidebar/>
            <div
                className="modal fade Edit_modal"
                id="staticBackdrop5"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">
                                Edit Sub Sub Category
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form
                                className="form-design p-3 help-support-form row align-items-end justify-content-center"
                                action=""
                                onSubmit={handleSubmit}
                            >
                                <div className="form-group col-6">
                                    <label htmlFor="">Select Category</label>
                                    <select className="select form-control" size={15} name="categoryId" id="selectCategory" value={category.categoryId}
                                        onChange={handleInputChange}>
                                        {Array.isArray(categories) && categories.map(category => (
                                            <option key={category._id} value={category._id}>{category.categoryName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Select Sub Category</label>
                                    <select className="select form-control" size={15} name="categoryId1" id="selectSubCategory" value={category.categoryId1}
                                        onChange={handleInputChange}>
                                        {Array.isArray(subCategories) && subCategories.map(subCategory => (
                                            <option key={subCategory._id} value={subCategory._id}>{subCategory.subCategoryName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Select Sub Sub Category</label>
                                    <select className="select form-control" size={15} name="categoryId2" id="selectSubSubCategory" value={category.categoryId2}
                                        onChange={handleInputChange}>
                                        {Array.isArray(subSubCategories) && subSubCategories.map(subSubCategory => (
                                            <option key={subSubCategory._id} value={subSubCategory._id}>{subSubCategory.subSubCategoryName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Select Attribute</label>
                                    <select className="select form-control" size={15} name="categoryId3" id="selectAttribute" value={category.categoryId3}
                                        onChange={handleInputChange}>
                                        {Array.isArray(attributes) && attributes.map(attribute => (
                                            <option key={attribute._id} value={attribute._id}>{attribute.attributeName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Value Name (En)</label>
                                    <input
                                        type="text"
                                        className="form-control"

                                        name="nameEn"
                                        id="nameEn"
                                        defaultValue={props.newCategory.nameEn}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Value Name (Ar)</label>
                                    <input
                                        type="text"
                                        className="form-control"

                                        name="nameAr"
                                        id="nameAr"
                                        defaultValue={props.newCategory.nameAr}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group mb-0 col-auto">
                                    <button className="comman_btn2" onClick={(event) => handleUpdate(category._id, event)}>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditSubSubCategory








// import React, { useState, useEffect } from 'react'
// import axios from "axios";

// function EditSubSubCategory() {
//     const [categories, setCategories] = useState([]);
//     const [subCategories, setSubCategories] = useState([]);
//     const [subSubCategory, setSubSubCategory] = useState({
//         nameEn: '',
//         nameAr: '',
//         categoryId: '',
//     });
//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setSubSubCategory({ ...subSubCategory, [name]: value });
//     };
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         await axios.post('http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/createAttribute', { name: subSubCategory })
//             .then(response => {
//                 console.log(response.data);
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     };
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.post(
//                     "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/selectCategory"
//                 );
//                 setCategories(response.data.results.categoryData);
//                 console.log(response.data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         fetchData();
//     }, []);
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.post(
//                     "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/selectSubcategory"
//                 );
//                 setSubCategories(response.data.results.subCategoryData);
//                 console.log(response.data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         fetchData();
//     }, []);

//     return (
//         <>
//             <div
//                 className="modal fade Edit_modal"
//                 id="staticBackdrop2"
//                 data-bs-backdrop="static"
//                 data-bs-keyboard="false"
//                 tabIndex="-1"
//                 aria-labelledby="staticBackdropLabel"
//                 aria-hidden="true"
//             >
//                 <div className="modal-dialog modal-dialog-centered">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title" id="staticBackdropLabel">
//                                 Edit Sub Sub Category
//                             </h5>
//                             <button
//                                 type="button"
//                                 className="btn-close"
//                                 data-bs-dismiss="modal"
//                                 aria-label="Close"
//                             ></button>
//                         </div>
//                         <div className="modal-body">
//                             <form
//                                 className="form-design p-3 help-support-form row align-items-end justify-content-center"
//                                 action=""
//                                 onSubmit={handleSubmit}
//                             >
//                                 <div className="form-group col-6">
//                                     <label htmlFor="">Select Category</label>
//                                     <select className="select form-control" size={15} name="categoryId" id="selectCategory" value={subSubCategory.categoryId}
//                                         onChange={handleInputChange}>
//                                         {Array.isArray(categories) && categories.map(category => (
//                                             <option key={category._id} value={category._id}>{category.categoryName}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="form-group col-6">
//                                     <label htmlFor="">Select Sub Category</label>
//                                     <select className="select form-control" size={15} name="categoryId1" id="selectSubCategory" value={subSubCategory.categoryId1}
//                                         onChange={handleInputChange}>
//                                         {Array.isArray(subCategories) && subCategories.map(subCategory => (
//                                             <option key={subCategory._id} value={subCategory._id}>{subCategory.subCategoryName}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="form-group col-6">
//                                     <label htmlFor="">Enter Sub Sub Category Name (En)</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"

//                                         name="name"
//                                         id="name"
//                                         value={subSubCategory.nameEn}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                                 <div className="form-group col-6">
//                                     <label htmlFor="">Enter Sub Sub Category Name (Ar)</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"

//                                         name="name"
//                                         id="name"
//                                         value={subSubCategory.nameAr}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                                 <div className="form-group mb-0 col-auto">
//                                     <button className="comman_btn2">Save</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* <div
//         className="modal fade Edit_modal"
//         id="staticBackdrop2"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex="-1"
//         aria-labelledby="staticBackdropLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="staticBackdropLabel">
//                 Edit Sub Sub Category
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <form
//                 className="form-design p-3 help-support-form row align-items-end justify-content-center"
//                 action=""
//               >
//                 <div className="form-group col-6">
//                   <label htmlFor="">Select Category</label>
//                   <select
//                     className="select form-control"
//                     multiple
//                     name=""
//                     id=""
//                   >
//                     <option defaultValue="1">Lorem</option>
//                     <option defaultValue="2">ipsum</option>
//                     <option defaultValue="3">Lorem</option>
//                     <option defaultValue="1">Lorem</option>
//                     <option defaultValue="2">ipsum</option>
//                     <option defaultValue="3">Lorem</option>
//                   </select>
//                 </div>
//                 <div className="form-group col-6">
//                   <label htmlFor="">Select Sub Category</label>
//                   <select
//                     className="select form-control"
//                     multiple
//                     name=""
//                     id=""
//                   >
//                     <option defaultValue="1">Lorem</option>
//                     <option defaultValue="2">ipsum</option>
//                     <option defaultValue="3">Lorem</option>
//                     <option defaultValue="1">Lorem</option>
//                     <option defaultValue="2">ipsum</option>
//                     <option defaultValue="3">Lorem</option>
//                   </select>
//                 </div>
//                 <div className="form-group col-6">
//                   <label htmlFor="">Enter Sub Sub Category Name (En)</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     defaultValue="Lorem"
//                     name="name"
//                     id="name"
//                   />
//                 </div>
//                 <div className="form-group col-6">
//                   <label htmlFor="">Enter Sub Sub Category Name (Ar)</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     defaultValue="لوريم"
//                     name="name"
//                     id="name"
//                   />
//                 </div>
//                 <div className="form-group mb-0 col-auto">
//                   <button className="comman_btn2">Save</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div> */}
//         </>
//     )
// }

// export default EditSubSubCategory

import React from 'react'
import { Link } from "react-router-dom"
import Sidebar from './Sidebar'
function LanguageSelection() {
    return (
        <>
        <Sidebar/>
            <section className="login_page">
                <div className="container-fluid px-0">
                    <div className="row justify-content-start">
                        <div className="col-4">
                            <div className="login_page_form shadow">
                                <div className="row">
                                    <div className="col-12 formheader mb-4 text-center">
                                        <img src="assets/img/logo.png" alt="" />
                                        <h1>Choose Your Language</h1>
                                    </div>
                                    <div className="col-12">
                                        <form className="row form-design" action="">
                                            <div className="language">
                                                <div id="google_translate_element"></div>
                                                <div className="language_bax">
                                                    <div className="flag-lists translation-links d-flex justify-content-center p-0 w-100">
                                                        <div className="flag-lists_in active">
                                                            <Link className="english shadow" data-lang="English" to="javscript:;">
                                                                <img className="mr-md-2 ml-md-0 ml-1 flag_img"
                                                                    src="assets/img/united-kingdom.png" alt=''/>
                                                                <span>English</span>
                                                            </Link>
                                                        </div>
                                                        <div className="flag-lists_in">
                                                            <Link className="arabic shadow" data-lang="Arabic" to="javscript:;">
                                                                <img className="mr-md-2 ml-md-0 ml-1 flag_img" src="assets/img/saudi_flag1.png" alt=''/>
                                                                <span>Arabic</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="google_translate_element"></div>
                                            </div>
                                            <div className="form-group col-12 text-center mt-4 pt-3">
                                                <Link className="comman_btn" to="/">Continue</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div id="google_translate_element"></div>

        </>
    )
}

export default LanguageSelection

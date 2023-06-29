import React from 'react'
import Sidebar from './Sidebar'

export default function HelpEditModel() {
    return (
        <>
        <Sidebar/>
            <div className="modal fade Edit_help Edit_modal" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false"
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
                                    <label className="text-end" htmlFor="quesstioon">Question</label>
                                    <input className="form-control text-end" type="text" id="quesstioon" name="quesstioon"
                                        defaultValue="كن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول" />
                                </div>
                                <div className="form-group col-12 text-end">
                                    <label className="text-end" htmlFor="quesstioon">Answer</label>
                                    {/* <textarea className="form-control text-end" name="message" id="message"
                                        style={{ height: '150px' }}>كن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد </textarea> */}
                                    <textarea className="form-control text-end" name="message" id="message"
                                        style={{ height: '150px' }}
                                        defaultValue="كن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد "></textarea>

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

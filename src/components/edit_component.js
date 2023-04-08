import './home_component.css';
import { LoadingComponent } from './loading_component';
import Select from "react-select";

export const EditCOmponent = ({
    isLoading,
    onChangeName,
    NameValue,
    onChangeSector,
    SectorValue,
    Sector_options,
    onChangeCheckbox,
    CheckboxValue,
    onSaveBtn,
    btnLoading}) => {

    return (

        <div className='home-bg' >

            <div className='mid_div' >

                { isLoading ?
                    <LoadingComponent/>
                :
            
                <>
                
                    <h4 className='mid_div-title' >Edit User</h4>
                    <h6 className='mid_div-sub' >Please enter your name and pick the Sectors you are currently involved in.</h6>

                    <div className='mid_div-form' >

                        <div className='mid_div-form-div' >
                            <label className='mid_div-form-div-label' >Name</label>
                            <input className='mid_div-form-div-input' type={"text"} placeholder="e.g afolabi damilare" onChange={onChangeName} value={NameValue} />
                        </div>

                        <div className='mid_div-form-div' >
                            <label className='mid_div-form-div-label' >Sector</label>
                            {/* <select multiple className='mid_div-form-div-input' onChange={onChangeSector} value={SectorValue} >
                                {Sector_options}
                            </select> */}
                            <Select classNamePrefix={"hsys"} options={Sector_options} value={SectorValue} onChange={onChangeSector} placeholder="Select Sector" isSearchable={true} isMulti />
                        </div>

                        <div className='mid_div-form-div checkBox-div' >
                            <input type={"checkbox"} className="mid_div-form-div-checkBox" onChange={onChangeCheckbox} value={CheckboxValue} />
                            <h5 className='agree-text' >Agree to terms</h5>
                        </div>

                        <button className='mid_div-form-btn' onClick={onSaveBtn} >
                            { btnLoading ? "Loading..." : "Update"}
                        </button>

                    </div>

                </>

                }

            </div>

        </div>

    );

}
import Axios from "axios";
import { useEffect, useState } from "react";
import { HomeComponent } from "../components/home_component";
import { useNavigate } from "react-router-dom";
import useSectorFetch from "../hooks/sectors_hook";


export const HomePage = () => {

    const navigate = useNavigate();

    // const [Sectors, SetSectors] = useState(null)
    // const [isLoading, SetisLoading] = useState(true)
    // const [Error, setError] = useState(null)
    const [Name, setName] = useState('')
    const [MySector, setMySector] = useState(null)
    const [Checkbox, setCheckbox] = useState(false)
    const [btnIsloading, setbtnIsloading] = useState(false)


    const [ Sectors, isLoading ] = useSectorFetch()

    const HandleSaveUser = () => {

        setbtnIsloading(true)

        // console.log(MySector)

        if (!MySector || Name === '' || !Checkbox) {
            alert("Please Fill all fileds")
            setbtnIsloading(false)
            return
        }

        if (MySector.length < 1) {
            alert("Please select one or more sectors")
            setbtnIsloading(false)
            return
        }

        Axios.post('/main/save_user/', {
            name: Name,
            sectors: MySector,
            agree_to_terms: Checkbox
        }).then((response) => {

            alert("User was successfully created")
            setbtnIsloading(false)
            navigate(`/edit_user/${Name}`)

        })
            .catch((err) => {

                if ( err.response.data ) {
                    alert(err.response.data)
                    return
                }else{
                    alert("Something went wrong while creating user")
                }

                setbtnIsloading(false)
            })

    }

    return (

        <HomeComponent
            isLoading={isLoading}
            CheckboxValue={Checkbox}
            onChangeCheckbox={(e) => setCheckbox(!Checkbox)}
            NameValue={Name}
            onChangeName={(e) => {
                setName(e.target.value)
            }}
            SectorValue={MySector}
            Sector_options={
                Sectors
            }
            onChangeSector={(e) => setMySector(e)}
            onSaveBtn={() => HandleSaveUser()}
            btnLoading={btnIsloading}
        />

    );

}
import { EditCOmponent } from "../components/edit_component";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import useSectorFetch from "../hooks/sectors_hook";


export const EditPage = () => {

    const {name} = useParams()
    const [Name, setName] = useState('')
    const [MySector, setMySector] = useState(null)
    const [Checkbox, setCheckbox] = useState(false)
    const [ Loading, setLoading ] = useState(false)
    const [btnIsloading, setbtnIsloading] = useState(false)


    const [ Sectors, isLoading ] = useSectorFetch()

    useEffect( () => {
        setLoading(true)
        Axios.post('/main/get_user',{name:name})
            .then( (response) => {

                setMySector(response.data.sectors)
                setName(response.data.name)
                setCheckbox(false)
                setLoading(false)

            } )
            .catch( (e) => {
                if ( e.response.data ) {
                    alert(e.response.data)
                }else{
                    alert("Something went wrong while fetching details")
                }
                setLoading(false)
            } )

    }, [name] )

    const HandleUpdateUpdate = () => {

        setbtnIsloading(true)

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

        Axios.put('/main/update_user', {
            name: Name,
            sectors: MySector,
            agree_to_terms: Checkbox
        }).then((response) => {

            alert("User was successfully Updated")
            setbtnIsloading(false)

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

        <EditCOmponent
        
            isLoading={ Loading }
            CheckboxValue={Checkbox}
            onChangeCheckbox={(e) => setCheckbox(true)}
            NameValue={Name}
            onChangeName={(e) => {
                setName(e.target.value)
            }}
            SectorValue={MySector}
            Sector_options={
                Sectors
            }
            onChangeSector={(e) => setMySector(e)}
            onSaveBtn={() => HandleUpdateUpdate()}
            btnLoading={btnIsloading}

        />

    );

}
import { useState, useEffect } from "react";
import Axios from "axios";

const useSectorFetch = () => {

    const [Sectors, SetSectors] = useState(null)
    const [isLoading, SetisLoading] = useState(true)


    useEffect(() => {

        SetisLoading(false)

        Axios.get('main/get_sectors')
            .then((response) => {
                SetisLoading(false)
                // SetSectors(response.data)

                var TheOptions = []

                for (let i = 0; i < response.data.length; i++) {

                    const Opt = response.data[i]

                    TheOptions.push({ value: Opt.sector_name, label: Opt.sector_name })

                    if (Opt.sector_sub.length > 0) {

                        for (let h = 0; h < Opt.sector_sub.length; h++) {

                            const Opt_sub = Opt.sector_sub[h];

                            TheOptions.push({ value: Opt_sub.sector_sub_name, label: `${Opt_sub.sector_sub_name}` })

                            if (Opt_sub.sector_sub.length > 0) {

                                for (let l = 0; l < Opt_sub.sector_sub.length; l++) {

                                    const Opt_sub_sub = Opt_sub.sector_sub[l];

                                    if (typeof Opt_sub_sub === "string") {
                                        TheOptions.push({ value: Opt_sub_sub, label: `${Opt_sub_sub}` })
                                    }

                                    if (typeof Opt_sub_sub === "object") {
                                        TheOptions.push({ value: Opt_sub_sub.sector_sub_name, label: `${Opt_sub_sub.sector_sub_name}` })

                                        for (let w = 0; w < Opt_sub_sub.sector_sub.length; w++) {
                                            const Opt_sub_sub_sub = Opt_sub_sub.sector_sub[w];
                                            TheOptions.push({ value: Opt_sub_sub_sub, label: `${Opt_sub_sub_sub}` })
                                        }

                                    }


                                }

                            }

                        }

                    }

                }

                SetSectors(TheOptions)

            })
            .catch((err) => {
                SetisLoading(false)
                alert('Something went wrong')
            })

    }, [])

    return [ Sectors, isLoading ]

}

export default useSectorFetch
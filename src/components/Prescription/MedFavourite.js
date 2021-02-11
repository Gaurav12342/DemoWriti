import React, { useEffect, useState } from 'react';
import { getFavouriteMeds, removeFavouriteMeds } from '../../services/api/routes/prescription';
import axios from '../../services/api/services/common'
import { Button, Search, Toast, CheckBox } from '../../components/common'
import { Clear } from '../../assets/images/index'
const _ = require('lodash')

const List = (props) => {
    const { tableLength, onSaveFav, tableData, isFavAdded } = props
    const [loader, setLoader] = useState(false)
    const [saveLoader, setSaveLoader] = useState(false)
    const [data, setData] = useState([])
    const [response, setResponse] = useState()
    const [selected, setSelected] = useState([])

    useEffect(() => {
        fetch()
    }, [])

    useEffect(() => {
        if (isFavAdded)
            fetch()
    }, [isFavAdded])

    useEffect(() => {
        selDeselMeds('cancel')
    }, [tableLength])

    const fetch = async () => {
        try {
            setLoader(true)
            let res = await axios({ ...getFavouriteMeds, data: {} })
            if (res) {
                if (res.code === 'OK') {
                    setResponse(res.data)
                    setData(res.data)
                } else
                    Toast.error(res.message)
            }
            setLoader(false)
        } catch{ setLoader(false) }
    }

    const handleSearch = (e) => {
        let val = e.target.value
        let newData = _.cloneDeep(response)
        if (val) {
            newData = newData.filter(x => {
                let name = x.medicineFullName || x.name
                if (name)
                    return name.toLowerCase().indexOf(val.toLowerCase()) >= 0
            })
        }
        setData(newData)
    }

    const SaveFav = () => {
        console.log("SaveFav -> selected", selected)
        if (selected.length === 0)
            Toast.error('Please Select Medication')
        else if (selected.length > 3)
            Toast.error('You can select Maximum 3 per order')
        else if (selected.length + tableLength > 3)
            Toast.error('only 3 Medications are allowed')
        else {
            onSaveFav(selected)
            setSelected([])
            selDeselMeds()
        }
        // setSaveLoader(true)
        // let res = await axios({ ...getFavouriteMeds, data: {} })
        // if (res) {
        //     if (res.code === 'OK') {
        //         setResponse(res.data)
        //         setData(res.data)
        //     } else
        //         Toast.error(res.message)
        // }
        // setSaveLoader(false)
    }

    const selDeselMeds = (str) => {
        let newData = [...data]
        newData = newData.map(x => {
            if (str === 'cancel')
                x.isAdded = x.isChecked = tableData.find(sel => sel._id === x._id) ? true : false
            else x.isAdded = selected.find(sel => sel._id === x._id) ? true : false
            return x
        })
        setData(newData)
    }

    const onSelFav = (e, obj) => {
        let newSelected = [...selected]
        if (e.target.checked) {
            newSelected.push({
                _id: obj._id,
                orderType: obj.orderType,
                // medStrip: false,
                physicianId: obj.physicianId,
                name: obj.name,
                medication: obj.medicineFullName,
                medicineFullName: obj.medicineFullName,
                direction: obj.direction,
                indication: obj.indication,
                progressNote: obj.progressNote,
                pharmacyNote: obj.pharmacyNote,
            })
        } else {
            let index = newSelected.findIndex(x => x._id === obj._id)
            if (index >= 0)
                newSelected.splice(index, 1)
        }
        setSelected(newSelected)

        let newData = [...data]
        newData = newData.map(x => {
            if (x._id === obj._id)
                x.isChecked = e.target.checked
            return x
        })
        setData(newData)
    }

    const handleRemove = async opt => {
        try {
            setLoader(true)
            let res = await axios({ ...removeFavouriteMeds, data: { id: opt._id } })
            if (res) {
                if (res.code === 'OK') {
                    let tempData = [...data]
                    tempData = tempData.filter(x => x._id !== opt._id)
                    setData(tempData)
                    Toast.success(res.message)
                } else
                    Toast.error(res.message)
            }
            setLoader(false)
        } catch{ setLoader(false) }
    }

    return <div className="right-create-box fav-meds">
        <div className="bg-gray">
            <div className="d-flex-center">
                <span className="sub-text">Favourites</span>
                <div className="search-box">
                    <div className="form_group no_mrgn">
                        <Search placeholder="Search" onChange={handleSearch} allowClear={true} />
                    </div>
                </div>
            </div>
        </div>
        <div className="daysport">
            {data && data.length > 0 ? <>
                {
                    data.map(x => {
                        return <div className="daysportblock" key={x._id}>
                            <div className="day-block">
                                <div className="form_group inline_check" style={{ float: "left" }}>
                                    <CheckBox disabled={x.isAdded} checked={x.isChecked}
                                        label={x.medicineFullName}
                                        onChange={(e) => onSelFav(e, x)} />
                                    <p>directions : {x.direction}</p>
                                    <p>Indication : {x.indication}</p>

                                </div>

                                <div className="action_ico remove_ic" onClick={() => handleRemove(x)}>
                                    <Clear />
                                    <p>Remove</p>
                                </div>

                            </div>
                        </div>
                    })
                } </> : <p className="text-center">No Data Found</p>
            }
        </div>
        <div className="small-text-btn">
            <Button class="btn small-add-btn" loading={saveLoader} onClick={SaveFav}>ADD</Button>
            <p class="">Maximum 3 per order</p>
        </div>
    </div>

}

export default List
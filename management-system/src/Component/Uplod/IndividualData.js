import React from 'react'

export const IndividualData = ({individualExcelData}) => {
    return (
        <>
            <th>{individualExcelData.Name}</th>
            <th>{individualExcelData.Account}</th>
            <th>{individualExcelData.Call}</th>
            <th>{individualExcelData.Minutes}</th>
            <th>{individualExcelData.Child}</th>
            {/* <th>{individualExcelData.Age}</th>
            <th>{individualExcelData.Date}</th> */}
        </>
    )
}

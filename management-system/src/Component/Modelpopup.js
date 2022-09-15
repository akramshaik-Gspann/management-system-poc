import React from 'react'
import {Modal,ModalHeader} from reactstrap;
import { useState } from "react";

function modelpopup() {
    const [modal,setmodal] = useState(false)
  return (
    <div>
        <div>
            <Modal
            size='lg'
            isopen={modal}
            toggle={()=>setmodal(!modal)}>
                <ModalHeader>
                toggle={()=>setmodal(!modal)}
                </ModalHeader>
            </Modal>
        </div>
        <button className="btn mt-3" style={{backgroundColor:"black",color:"white"}} onClick={()=>setmodal(ture)}>
    openmodel
    </button>
    </div>
  )
}

export default modelpopup
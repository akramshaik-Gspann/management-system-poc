import React, { useState } from 'react'
import { Modal, ModalHeader } from 'reactstrap'


function Popup() {
    const [modal, setmodal] = useState(false)
    return (
        <div>

            <div>
                <Modal
                    size='lg'
                    isopen={modal}
                    toggle={() => setmodal(!modal)}>
                    <ModalHeader
                        toggle={() => setmodal(!modal)}>
                        <form>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" />
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Check me out</label>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </ModalHeader>
                </Modal>
            </div>
            <button className="btn mt-3" style={{ backgroundColor: "black", color: "white" }} onClick={() => setmodal(true)}>
                openmodel
            </button>
        </div>


    )
}

export default Popup
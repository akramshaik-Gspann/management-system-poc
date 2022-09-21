import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button } from "react-bootstrap";
// import CabinDataService from "../CabinTable/CabinService";
import ProductService from "./ProductService";
import "../../styles/Login.css";
import { useSelector } from "react-redux";

const AddProduct = ({ id, setCabinId, cabinData, profile }) => {

  console.log("Cabin Data for confirm Booking", cabinData);
  console.log("Cabin Data for confirm Booking", cabinData.Newcabin);
  // console.log("Profle Email Id:", profile);

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [date, setDate] = useState(new Date());
  // const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (title === "" || name === "" || email === "" || designation === "" || date === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newCabin = {
      title,
      name,
      email,
      designation,
      date
    };
    console.log(newCabin);

    try {
      if (id !== undefined && id !== "") {
        await ProductService.updateCabin(id, newCabin);
        setCabinId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await ProductService.addCabins(newCabin);
        setMessage({ error: false, msg: "New Cabin added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle("");
    setName("");
    setEmail("");
    setDesignation("");
    setDate("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await ProductService.getCabin(id);
      console.log("the record is :", docSnap.data());
      setTitle(docSnap.data().title);
      setName(docSnap.data().name);
      setEmail(docSnap.data().email);
      setDesignation(docSnap.data().designation);
      setDate(docSnap.data().date);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
};


  return (
    <>
      <div className="p-4 box" id="logreg-forms">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}
        <center><h5>Confirm Booking</h5>
          <div className="cabindata">
            <p>Cabin Name : <span>{cabinData.Newcabin}</span></p>
            <p>Cabin Size : <span>{cabinData.capacity}</span></p>
          </div>
        </center>

        <Form className="form-signin" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBookTitle">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Cabin Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Emp Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <Form.Control
                type="email"
                placeholder="Emp Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Emp Designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <input className="form-control" type="date" value={date} onChange={(e) => setDate(e.target.value)} min={disablePastDate()} />
            </InputGroup>
          </Form.Group>
          <div className="col-12 text-center">
            <Button className="signinb" type="Submit">
              Confirm Booking
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddProduct;

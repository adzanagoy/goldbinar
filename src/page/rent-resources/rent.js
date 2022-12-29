import { Form, Button, Container } from "react-bootstrap";
import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetcApi } from "config/fethApi";
import CarCard from "component/card";
import { category, price, status } from "./option-data";

const RentCar = (props) => {
  const [data, setdata] = useState([]);
  const [state, setState] = useState({
    name: "",
    category: "",
    price: "",
    isRented: false,
  });
  const [isLoading, setLoading] = useState("isLoad");
  const [focus, setfocus] = useState(false);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const [buttonText, setButtonText] = useState("Cari Mobil");

  const clickHandler = () => {
    props.closeHandler("success");
    setfocus(false);
    fetcApi(state).then(({ data }) => setdata(data.cars));
    setButtonText("Edit");
  };

  useEffect(() => {
    isLoading === "isLoad" &&
      fetcApi(state).then(({ data }) => setdata(data.cars));
    setLoading("break");
  }, [state, isLoading]);

  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setfocus(false);
    }
  };

  return (
    <>
      {focus && <div className="opacity"></div>}
      {/* <!-- Pencarian --> */}
      <div className="pencarian hasil-pencarian shadow-sm p-4 rounded-3">
        <Form ref={wrapperRef} onFocus={() => setfocus(true)}>
          <table>
            <tr>
              <td>
                <Form.Label className="form-label col-form-label-sm p-0 m-0">
                  Nama Mobil
                </Form.Label>
              </td>
              <td>
                <Form.Label className="form-label col-form-label-sm p-0 m-0">
                  Kategori
                </Form.Label>
              </td>
              <td>
                <Form.Label className="form-label col-form-label-sm p-0 m-0">
                  Harga
                </Form.Label>
              </td>
              <td>
                <Form.Label className="form-label col-form-label-sm p-0 m-0">
                  Status
                </Form.Label>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <Form.Control
                  className="form-control form-control-sm"
                  name="name"
                  onChange={changeHandler}
                  placeholder="Nama"
                  type="text"
                />
              </td>
              <td>
                <Form.Select
                  id="katogori"
                  className="cari-mobil form-select-sm"
                  onChange={changeHandler}
                  name="category"
                >
                  <option>Masukan Kapasitas Mobil</option>
                  {category.map((item, index) => {
                    return (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
                </Form.Select>
              </td>
              <td>
                <Form.Select
                  id="harga"
                  className="cari-mobil form-select-sm"
                  onChange={changeHandler}
                  name="price"
                >
                  <option selected>Masukan Harga Sewa Per Hari</option>
                  {price.map((item, index) => {
                    return (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
                </Form.Select>
              </td>
              <td>
                <Form.Select
                  id="status"
                  className="form-select cari-mobil form-select-sm"
                  onChange={changeHandler}
                  name="isRented"
                >
                  <option selected>Select Status</option>
                  {status.map((item, index) => {
                    return (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
                </Form.Select>
              </td>
              <td>
                <Button
                  className="btn btn-success btn-sm"
                  onClick={clickHandler}
                >
                  {buttonText}
                </Button>
              </td>
            </tr>
          </table>
        </Form>
      </div>
      <Container className="hasil-mobil">
        {data.length === 0 ? (
          <div className="text-center pb-5">Data Not found</div>
        ) : (
          <CarCard data={data} />
        )}
      </Container>
    </>
  );
};

export default RentCar;

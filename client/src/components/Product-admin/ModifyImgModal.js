import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getProducts, modifyImgProduct } from "../../actions/product.actions";
import "./modal.scss";

const ModifyImgModal = ({ modal, toggle, productId, productName }) => {
    const [newImg, setNewImage] = useState(null);

    const dispatch = useDispatch();

    const handleImage = (e) => {
        setNewImage(e.target.files[0]);
    };

    const handleModifyImgEvent = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        const data = new FormData();

        data.append("file", newImg);
        data.append("name", productName);
        data.append("productId", productId);

        await dispatch(modifyImgProduct(data));
        dispatch(getProducts());
        toggle();
    };

    return (
        <div>
            <Modal
                isOpen={modal}
                toggle={() => {
                    toggle();
                }}
            >
                <ModalHeader
                    toggle={() => {
                        toggle();
                    }}
                >
                    Changer l'image du produit
                </ModalHeader>
                <form
                    className="event-form"
                    onSubmit={(e) => {
                        handleModifyImgEvent(e);
                    }}
                >
                    <ModalBody>
                        <input
                            type="file"
                            name="file"
                            id="file"
                            onChange={(e) => handleImage(e)}
                            required
                        ></input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" type="submit">
                            Valider
                        </Button>{" "}
                        <Button
                            color="secondary"
                            onClick={() => {
                                toggle();
                            }}
                        >
                            Retour
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
};

export default ModifyImgModal;

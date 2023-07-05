import { useState } from "react";

const handleInputChange = (event, setFormData) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
    }));
};

export default handleInputChange
import axios from "axios";
import config from "../config";

const API_URL = config.API_URL;

export const fetchParents = () => {
    return {
        type: "MEDICINE",
        payload: axios.get(`${API_URL}/getAllMedicines`)
    };
};

export const addMedicine = medicine => {
    let formdata = new FormData();
    formdata.append("medicine_name", medicine.medicine_name);
    formdata.append("special_instructions", medicine.special_instructions);
    formdata.append("prescribed_date", medicine.prescribed_date);
    formdata.append("Physician_name", medicine.physician_name);
    formdata.append("days_of_week", medicine.days_of_week);
    formdata.append("child_id", medicine.child_id);
    formdata.append("dosage", medicine.dosage);
    formdata.append("administration_time", medicine.administration_time);
    formdata.append("scheduled", medicine.scheduled);
    formdata.append("total_no_of_days", medicine.total_no_of_days);
    formdata.append("start_date", medicine.start_date);


    var house_ids = medicine.houses[0]._id;
    for (var i = 1; i < medicine.houses.length; i++) {
        house_ids = house_ids + "," + medicine.houses[i]._id;
    }
    formdata.append("house_ids", house_ids);
    return {
        type: "MEDICINE_ADD",
        payload: axios.post(`${API_URL}/addMedicine`, formdata, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        // .then(response => id)
        // .catch(error => console.log(error))
    };
};

export const updateMedicine = (id, medicine) => {
    let formdata = new FormData();
    formdata.append("_id", id);
    formdata.append("medicine_name", medicine.medicine_name);
    formdata.append("special_instructions", medicine.special_instructions);
    formdata.append("prescribed_date", medicine.prescribed_date);
    formdata.append("physician_name", medicine.physician_name);
    formdata.append("days_of_week", medicine.days_of_week);
    formdata.append("child_id", medicine.child_id);
    formdata.append("dosage", medicine.dosage);
    formdata.append("administration_time", medicine.administration_time);
    formdata.append("scheduled", medicine.scheduled);
    formdata.append("total_no_of_days", medicine.total_no_of_days);
    formdata.append("start_date", medicine.start_date);



    formdata.append("house_ids", house_ids);
    return {
        type: "MEDICINE_UPDATE",
        payload: axios.post(`${API_URL}/updateMedicine`, formdata, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    };
};

export const deleteMedicine = (id, medicine) => {
    let formdata = new FormData();
    formdata.append("_id", id);
    return {
        type: "MEDICINE_DELETE",
        payload: axios
            .post(`${API_URL}/deleteMedicine`, formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => id)
            .catch(error => console.log(error))
    };
};

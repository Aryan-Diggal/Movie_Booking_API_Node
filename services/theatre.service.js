const Theatre = require("../models/theatre.model");

const createTheatre = async (data) => {

    try {
        const theatre = await Theatre.create(data);
        return theatre;
    } catch (error) {
        console.log(error);
        throw error;
    }

    
}


module.exports = {
    createTheatre,
}
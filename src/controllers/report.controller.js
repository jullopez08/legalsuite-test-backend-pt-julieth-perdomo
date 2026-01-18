// const {lawyer, legalCase} = require("../models");
const {Op} = require("sequelize");
const {getLawyerCasesReport} = require("../services/report.service");

const getLawyerCases = async (req, res, next) => {
    try {
    const {lawyerId}  = req.params;

    const report = await getLawyerCasesReport(lawyerId);
    res.status(200).json(report);
       
    } catch (error) {
        if(error.message === "LAWYER_NOT_FOUND") {
            return res.status(404).json({message: "No se encuentra el abogado"});
        }
        next(error);
    }
}

module.exports = {
    getLawyerCases
}
const { Lawyer, LegalCase } = require("../models");
const { Op, literal } = require("sequelize");

const getLawyerCasesReport = async (lawyerId) => {
  
 const  lawyer = await Lawyer.findByPk(lawyerId);
  if (!lawyer) {
    throw new Error("LAWYER_NOT_FOUND")  }

  const cases = await LegalCase.findAll({
        where: { lawyer_id: lawyerId},
        attributes: ["id", "case_number", "status", "case_type"],
        order: [
            [literal(`CASE WHEN status='pending' THEN 1 ELSE 2 END`), "ASC"],
            ["created_at", "DESC"],
        ],
    })
    const status ={
        total: cases.length,
        pending: 0,
        assigned: 0,
        in_progress: 0,
        resolved: 0
    };
    cases.forEach((c) =>{
        if (status[c.status] !== undefined) {
            status[c.status]++;
        }
    })
    return{
        lawyer,
        cases,
        status
    }
};
module.exports = {
  getLawyerCasesReport,
};

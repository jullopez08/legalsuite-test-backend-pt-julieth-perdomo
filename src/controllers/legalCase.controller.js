const { LegalCase, Lawyer } = require('../models');

const  getAllCases = async (req, res, next) => {
    try{
        const cases =await LegalCase.findAll({
            include: Lawyer
        });
        res.status(200).json(cases);
    }
    catch (error){
        next (error);
    }
}

const createCase = async (req, res, next) => {
    try {
        const newCase = await LegalCase.create({
            case_number: req.body.case_number,
            plaintiff: req.body.plaintiff,
            defendant: req.body.defendant,
            case_type: req.body.case_type,
            description: req.body.description
        })
        res.status(201).json(newCase);
    }
    catch (error) {
        next (error);
    }
}
 const   getOneCase = async (req, res, next) =>{
    try {
        const findId = await LegalCase.findByPk( req.params.id,
           { include: Lawyer})
        

        if (!findId) {
            return res.status(404).json({message: 'No encontrado'});
        }
        res.status(200).json(findId)
        
    } catch (error) {
        next (error)
    }
}

const assignLawyerToCase = async (req, res, next) =>{
    try {
        const caseId = req.params.id;
        const {lawyer_id}= req.body;

        const legalCase = await LegalCase.findByPk(caseId);
        if (!legalCase) {
            return res.status(404).json({message: 'No encontrado'})
        }

        const lawyer = await Lawyer.findByPk(lawyer_id);
        if (!lawyer ) {
            return res.status(404).json({message: 'No encontrado'})
        }
        if (lawyer.status !== 'active') {
            return res.status(400).json({messaje: 'Lawyer inactive'})
        }

        legalCase.lawyer_id = lawyer_id;
        legalCase.status = 'assigned';

        await legalCase.save();
        res.status(200).json(legalCase);
    } catch (error) {
        next (error)
    }
}


module.exports = {
    getAllCases,
    createCase,
    getOneCase,
    assignLawyerToCase
}
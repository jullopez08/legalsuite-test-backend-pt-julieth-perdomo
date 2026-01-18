const { LegalCase, Lawyer, sequelize } = require("../models");
const { isValidStatus } = require("../utils/validators");
const VALID_CASE_TYPE = ["civil", "criminal", "labor", "commercial"];
const VALID_STATUS = ["pending", "assigned", "in_progress", "resolved"];

const getAllCases = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    if (page < 1 || limit < 1) {
      return res.status(400).json({ message: "Page y limiy no validos" });
    }
    if (status && !VALID_STATUS.includes(status)) {
      return res.status(400).json({ message: "Status inválido" });
    }
    const where = {};
    if (status) where.status = status;

    const { count, rows } = await LegalCase.findAndCountAll({
      where,
      offset: (page - 1) * limit,
      limit,
      order: [["created_at", "DESC"]],
      include: Lawyer,
      distinct: true,
      subQuery: false,
    });
    res.status(200).json({
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

const createCase = async (req, res, next) => {
  try {
    const {
      case_number,
      plaintiff,
      defendant,
      case_type,
      description,
      status,
    } = req.body;

    if (!case_number || !plaintiff || !defendant || !case_type) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    if (!VALID_CASE_TYPE.includes(req.body.case_type)) {
      return res.status(400).json({ message: "Invalido" });
    }
    if (status && !VALID_STATUS.includes(status)) {
      return res.status(400).json({ message: "Invalido" });
    }
    const existingCase = await LegalCase.findOne({
      where: { case_number: req.body.case_number },
    });
    if (existingCase) {
      return res.status(400).json({ message: "Ya existe" });
    }

    const newCase = await LegalCase.create({
      case_number,
      plaintiff,
      defendant,
      case_type,
      description,
      status: status || "pending",
    });
    res.status(201).json(newCase);
  } catch (error) {
    next(error);
  }
};
const getOneCase = async (req, res, next) => {
  try {
    const findIdCase = await LegalCase.findByPk(req.params.id, {
      include: Lawyer,
    });

    if (!findIdCase) {
      return res.status(404).json({ message: "No encontrado" });
    }
    res.status(200).json(findIdCase);
  } catch (error) {
    next(error);
  }
};

const assignLawyerToCase = async (req, res, next) => {
  try {
    const caseId = req.params.id;
    const { lawyer_id } = req.body;

    const legalCase = await LegalCase.findByPk(caseId);
    if (!legalCase) {
      return res.status(404).json({ message: "No encontrado" });
    }

    const lawyer = await Lawyer.findByPk(lawyer_id);
    if (!lawyer) {
      return res.status(404).json({ message: "No encontrado" });
    }
    if (lawyer.status !== "active") {
      return res.status(400).json({ message: "Abogado inactivo" });
    }

    legalCase.lawyer_id = lawyer_id;
    legalCase.status = "assigned";

    await legalCase.save();
    res.status(200).json(legalCase);
  } catch (error) {
    next(error);
  }
};

const transferCase = async (req, res, next) => {
  const caseId = req.params.id;
  const { new_lawyer_id } = req.body;
  const t = await sequelize.transaction();
  try {
    const legalCase = await LegalCase.findByPk(caseId, { transaction: t });
    if (!legalCase) {
      await t.rollback();
      return res.status(404).json({ message: "No encontrado" });
    }
    if (!legalCase.lawyer_id) {
      await t.rollback();
      return res.status(400).json({ message: "No asignado" });
    }

    const newLawyer = await Lawyer.findByPk(new_lawyer_id, { transaction: t });
    if (!newLawyer) {
      await t.rollback();
      return res.status(404).json({ message: "No encontrado" });
    }

    if (!isValidStatus(newLawyer.status) || newLawyer.status !== "active") {
      await t.rollback();
      return res.status(400).json({ message: "Status inválido" });
    }

    legalCase.lawyer_id = new_lawyer_id;
    await legalCase.save({ transaction: t });
    await t.commit();
    res.status(200).json(legalCase);
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

module.exports = {
  getAllCases,
  createCase,
  getOneCase,
  assignLawyerToCase,
  transferCase,
};

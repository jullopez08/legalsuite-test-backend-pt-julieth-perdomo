const {  Lawyer, Sequelize } = require("../models");
const { isValidEmail, isValidStatus } = require("../utils/validators");

const createLawyer = async (req, res, next) => {
  try {
    const { name, email, phone, specialization, status } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Obligatorios" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Email inválido" });
    }

    if (status && !isValidStatus(status)) {
      return res.status(400).json({ message: "Status inválido" });
    }

    const existing = await Lawyer.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Ya existe Email" });
    }

    const newLawyer = await Lawyer.create({
      name,
      email,
      phone,
      specialization,
      status: status || "active",
    });

    res.status(201).json(newLawyer);
  } catch (error) {
    next(error);
  }
};

const updateLawyer = async (req, res, next) => {
  try {
    const { name, email, phone, specialization, status } = req.body;

    const lawyer = await Lawyer.findByPk(req.params.id);
    if (!lawyer) {
      return res.status(404).json({ message: "No encontrado" });
    }

    if (email) {
      if (!isValidEmail(email)) {
        return res.status(400).json({ message: "Email inválido" });
      }

      const existing = await Lawyer.findOne({
        where: { email, id: { [Sequelize.Op.ne]: lawyer.id } },
      });
      if (existing) {
        return res.status(400).json({ message: "Ya existe Email" });
      }
    }

    if (status && !isValidStatus(status)) {
      return res.status(400).json({ message: "Status inválido" });
    }
    lawyer.name = name || lawyer.name;
    lawyer.email = email || lawyer.email;
    lawyer.phone = phone || lawyer.phone;
    lawyer.specialization = specialization || lawyer.specialization;
    lawyer.status = status || lawyer.status;

    await lawyer.save();
    res.status(200).json(lawyer);
  } catch (error) {
    next(error);
  }
};
const getAllLawyer = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1 || limit < 1) {
      return res.status(400).json({ message: "page y limit no validos" });
    }

    const status = req.query.status;
    const where = {};

    if (status) {
      if (status !== "active" && status !== "inactive") {
        return res.status(400).json({ message: "Invalido" });
      }
      where.status = status;
    }

    const { count, rows } = await Lawyer.findAndCountAll({
      where,
      offset: (page - 1) * limit,
      limit,
      order: [["created_at", "DESC"]],
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

const getOneLawyer = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const orderDirection = req.query.order || "DESC";
    const offset = (page - 1) * limit;

    const casesWhere = {};

    const totalCases = await LegalCase.count({
      where: { lawyer_id: req.params.id, ...casesWhere },
    });

    const lawyer = await Lawyer.findByPk(req.params.id, {
      include: [
        {
          model: LegalCase,
          where: casesWhere,
          required: false,
          attributes: ["id", "case_number", "status", "case_type"],
          order: [
            [
              Sequelize.literal(`CASE WHEN status='pending' THEN 1 ELSE 2 END`),
              "ASC",
            ],
            ["created_at", orderDirection],
          ],
          limit,
          offset,
          separate: true,
        },
      ],
    });

    if (!lawyer) {
      return res.status(404).json({ message: "No encontrado" });
    }
    res.status(200).json({
      lawyer,
      cases: lawyer.LegalCases,
      meta: {
        total: totalCases,
        page,
        limit,
        totalPages: Math.ceil(totalCases / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLawyer,
  updateLawyer,
  getAllLawyer,
  getOneLawyer,
};

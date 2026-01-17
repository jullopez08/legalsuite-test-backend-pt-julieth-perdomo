const Lawyer = require('./Lawyer');
const LegalCase = require('./LegalCase');

Lawyer.hasMany(LegalCase, {foreignKey: 'lawyer_id'});
LegalCase.belongsTo(Lawyer, {foreignKey: 'lawyer_id'});

module.exports = { Lawyer, LegalCase };
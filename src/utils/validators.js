const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidStatus = (status) => ["active", "inactive"].includes(status);

module.exports =
{
    isValidEmail, isValidStatus
}
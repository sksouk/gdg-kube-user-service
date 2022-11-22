
const randomNumber = (count) => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < count; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

module.exports = {
    randomNumber,
}
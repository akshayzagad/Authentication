export function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
}

export function getOtpHtml(otp) {
  return `
    <p>Your OTP is: <strong>${otp}</strong></p>
    <p>Please enter this code to verify your email address.</p>
  `;
}


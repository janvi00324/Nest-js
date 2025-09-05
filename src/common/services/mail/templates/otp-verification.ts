export const otpVerification = (otp: string) => `
<div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>Email Verification</h2>
    <p>Your OTP code is:</p>
    <h1 style="color: #2d89ef;">${otp}</h1>
    <p>This code will expire in <b>10 minutes</b>.</p>
</div>
`;

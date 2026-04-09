import { verifyEmailsendemail } from "../services/email.service.js";

const mailHandlers = {

  verifyMail: async ({ email, name, otp }: { email: string, name: string, otp: string }) => {
    return verifyEmailsendemail(email, name, otp);
  },

};

export default mailHandlers;
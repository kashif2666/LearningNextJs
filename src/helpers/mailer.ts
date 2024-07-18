import User from '@/models/userModel';
import bcryptjs from 'bcryptjs'
import nodemailer from 'nodemailer';

export const sendEmail=async({email,emailType,userId}:any)=>{
  try {
    // create a hashed token
    const hashedToken=await bcryptjs.hash(userId.toString(),10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId,{
        verifyToken:hashedToken,
        verifyTokenExpiry: Date.now()+3600000
      })
    }else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId,{
        forgotPasswordToken:hashedToken,
        forgotPasswordTokenExpiry: Date.now()+3600000
      })
    }

    // const transport = nodemailer.createTransport({
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: "c5db6473aa944c",
    //     pass: "428a28e8a963c0"

    //     // TODO: add these credentials to env file
    //   }
    // });
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2fef1b96ab3b2a",
        pass: "9b4552fe4f7ae4"
      }
    });

    const mailOptions={
      from:"kashif.jsr2666@gmail.com",
      to:email,
      subject: emailType === "VERIFY" ? "Verify your email":"Reset your Password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here </a> to ${emailType === "VERIFY" ? " Verify your email ":" Reset your Password "}
      or Copy and Paste in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      
      </p>`
    }

    const mailresponse= await transport.sendMail(mailOptions);
    return mailresponse;
    
  } catch (error:any) {
    throw new Error(error.message);
  }
}
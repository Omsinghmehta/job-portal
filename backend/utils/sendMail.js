import nodemailer from "nodemailer";

const sendMail=async(to,subject,html)=>{
    try {
        const transpoter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }

        });
        const mailOption={
            from:`"Job Portal",<${process.env.MAIL_USER}>`,
            to,
            subject,
            html
        };
        const info=await transpoter.sendMail(mailOption);
        console.log("Email Sent:",info.response)
    } catch (error) {
        console.log("Erro:",error)
        
    }
}

export default sendMail;
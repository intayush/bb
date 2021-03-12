const nodemailer = require('nodemailer');
const Excel = require('exceljs');


const SellersMailer = async ( content) => {

    const filename = 'Sellers.xlsx';
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('Sellers');
          worksheet.columns = [
              {header:'date',key:'date'},
              {header: 'name', key: 'name'},
              {header: 'city', key: 'city'},
              {header: 'brand', key: 'brand'},
              {header: 'variant', key: 'variant'},
              {header: 'mobile', key: 'mobile'},
              {header: 'address', key: 'address'},
              {header: 'model', key: 'model'},
              {header: 'kmsdriven', key: 'kmsdriven'},
              {header: 'manufactureYear', key: 'manufactureYear'},
              {header: 'promocode', key: 'promocode'},
             
          ];
    let data = content;
    data.forEach((e) => {
        worksheet.addRow(e);
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: 'bikebazaar01@gmail.com',
          pass: 'bikebazaar123'
        },
    });
    const mailOptions = {
        from: '"Daily Sellers Report" <bikebazaar01@gmail.com>',
        to: 'saurabh.k@bikebazaar.com',
        subject: 'Sellers Report',
        html: '',
        attachments: [
            {
                filename,
                content: buffer,
                contentType:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            },
        ],
    };
    await transporter.sendMail(mailOptions);
};

module.exports=SellersMailer;
const express = require("express");
const router = express.Router();
const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });
const  mailer = require('../../helper/mailer');
const multer = require('multer');

//details of seller and bike from sell page
router.get("/createSellerDetail", (req, res) => {
  async function run() {
    await client.indices.create(
      {
        index: "leadDetail",
        body: {
          mappings: {
            properties: {
              id: { type: "integer" },
              name: { type: "text" },
              type: { type: "integer" },
              brand: { type: "integer" },
              model: { type: "integer" },
              regnumber: { type: "text" },
              descr: { type: "text" },
              price: { type: "integer" },
              state: { type: "text" },
              city: { type: "text" },
              loc: { type: "text" },
              location: { type: "geo_point" },
              myear: { type: "integer" },
              mmonth: { type: "integer" },
              kmdriven: { type: "integer" },
              images: { type: "string" },
              mimage: { type: "string" },
              owner: { type: "string" },
              cc: { type: "integer" },
              bhp: { type: "integer" },
              category: { type: "integer" },
              mileage: { type: "integer" },
              phone: { type: "integer" },
              additionalInfo: { type: "text" },
              bulletInfo1: { type: "text" },
              bulletInfo2: { type: "text" },
              bulletInfo3: { type: "text" },
              bulletInfo4: { type: "text" },
              bulletInfo5: { type: "text" },
              bulletInfo6: { type: "text" },
              sold: { type: "string" },
              discountPercent: {type: "float"}            }
          }
        }
      },
      { ignore: [400] }
    );
  }
  run().catch(console.log);
  res.json({ msg: "createSellerDetail Index Created Sucessfully" });
});

//details of buyer and bike from product detail page
router.get("/createBuyerIndex", (req, res) => {
  async function run() {
    await client.indices.create(
      {
        index: "buyerdetails",
        body: {
          mappings: {
            properties: {
              buyerName: { type: "text" },
              emailId: { type: "text" },
              phone: { type: "text" },
              isEmi: { type: "integer" },
              vehicleId: { type: "integer" }
            }
          }
        }
      },
      { ignore: [400] }
    );
  }
  run().catch(console.log);
  res.json({ msg: "createBuyerIndex Index Created Sucessfully" });
});

//details of buyer and bike from product detail page
router.get("/createFranchiseIndex", (req, res) => {
  async function run() {
    await client.indices.create(
      {
        index: "franchisedetail",
        body: {
          mappings: {
            properties: {
              name: { type: "text" },
              emailId: { type: "text" },
              phone: { type: "text" },
              city: { type: "text" },
              address: { type: "text" },
              pincode: { type: "integer" },
              currentBusiness:{type:"integer"}
            }
          }
        }
      },
      { ignore: [400] }
    );
  }
  run().catch(console.log);
  res.json({ msg: "createFranchiseIndex Index Created Sucessfully" });
});

//details of buyer and bike from product detail page
router.get("/createSellerIndex", (req, res) => {
  async function run() {
    await client.indices.create(
      {
        index: "sellerdetails",
        body: {
          mappings: {
            properties: {
              name: { type: "text"},
              city: { type: "text"},
              brand:{ type: "text"},
              variant: {type: "text"},
              manufactureYear: { type: "integer"},
              mobile:{ type: "text"},
              address: {type: "text"},
              model: {type: "text"},
              kmsdriven: { type: "text"},
              images: { type: "text" }
            }
          }
        }
      },
      { ignore: [400] }
    );
  }
  run().catch(console.log);
  res.json({ msg: "createSellerIndex Index Created Sucessfully" });
});

router.post("/insertFranchiseRequest", (req, res) => {
  let formData = req.body;
  // console.log("=====",formData);
  async function upload() {
    const dataset = [
      {
        name: formData.name.value,
        emailId: formData.email.value,
        phone: formData.mobile.value,
        city: formData.city.value,
        address: formData.address.value,
        pincode: formData.pin.value,
        currentBusiness:formData.current_business.value

      }
    ];
    const data = dataset[0];
    const output = `
      <table border='1' style='width:100%'>
        <tr>
          <td> Name </td>
          <td> ${data.name} </td>
        </tr>
        <tr>
          <td> Mobile No. </td>
          <td> ${data.phone} </td>
        </tr>
        <tr>
          <td> Email </td>
          <td> ${data.emailId} </td>
        </tr>
        <tr>
          <td> City </td>
          <td> ${data.city} </td>
        </tr>
        <tr>
          <td> Address </td>
          <td> ${data.address} </td>
        </tr>
        <tr>
          <td> Pincode </td>
          <td> ${data.pincode} </td>
        </tr>
        <tr>
          <td> Date </td>
          <td> ${new Date()} </td>
        </tr>
        <tr>
          <td>Current Business </td>
          <td> ${data.currentBusiness}</td>
        </tr>
      </table>
    `;
    const sendToEmail = 'rahul.khedkar@bikebazaar.com'; //email to send alerts to
    
    mailer(output, 'Franchise Request', sendToEmail).catch(console.error);

    const body = dataset.flatMap(doc => [
      { index: { _index: "franchisedetail" } },
      doc
    ]);

    const { body: bulkResponse } = await client.bulk({ refresh: true, body });

    if (bulkResponse.errors) {
      const erroredDocuments = [];
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0];
        if (action[operation].error) {
          erroredDocuments.push({
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1]
          });
        }
      });
      console.log(erroredDocuments);
    }
    res.send("successfully inserted");
  }
  upload().catch(console.log);
});

router.post("/insertSellrequest",(req,res) => {
  let formData = req.body;

  async function upload() {
    const dataset = [
      {
        date:formData.date.value,
        name: formData.name.value,
        city: formData.city.value,
        brand:formData.make.value ,
        variant: formData.variant.value,
        mobile:formData.mobile.value ,
        address: formData.address.value,
        model: formData.model.value,
        kmsdriven: formData.kmsdriven.value,
        manufactureYear: formData.yom.value,
        promocode: formData.promocode.value,
        images: formData.image.imageNames,
      }
    ];
    const data = dataset[0];
    const attachmentImages = data.images.map(img => {
      return ({
        path: "../server/tempEmailImg/" + img
      });
    });
    const output = `
      <table border='1' style='width:100%'>
        <tr>
          <td> Name </td>
          <td> ${data.name} </td>
        </tr>
        <tr>
          <td> Mobile No. </td>
          <td> ${data.mobile} </td>
        </tr>
        <tr>
          <td> City </td>
          <td> ${data.city} </td>
        </tr>
        <tr>
          <td> Make </td>
          <td> ${data.brand} </td>
        </tr>
        <tr>
          <td> Model </td>
          <td> ${data.model} </td>
        </tr>
        <tr>
          <td> Variant </td>
          <td> ${data.variant} </td>
        </tr>
        <tr>
          <td> KMs driven </td>
          <td> ${data.kmsdriven} </td>
        </tr>
        <tr>
          <td> Year of Manufacture </td>
          <td> ${data.manufactureYear} </td>
        </tr>
        <tr>
          <td> Promocode </td>
          <td> ${data.promocode} </td>
        </tr>
        <tr>
          <td> Date </td>
          <td> ${new Date()} </td>
        </tr>
      </table>
    `;
    //const sendToEmail = 'inspection@bikebazaar.com'; //email to send alerts to
    const sendToEmail = 'rahul.khedkar@bikebazaar.com';
    mailer(output, 'Appointment Booked', sendToEmail, attachmentImages).catch(console.error);

    const body = dataset.flatMap(doc => [
      { index: { _index: "sellerdetails" } },
      doc
    ]);

    const { body: bulkResponse } = await client.bulk({ refresh: true, body });

    if (bulkResponse.errors) {
      const erroredDocuments = [];
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0];
        if (action[operation].error) {
          erroredDocuments.push({
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1]
          });
        }
      });
      console.log(erroredDocuments);
    }
    res.send("successfully inserted");
  }
  upload().catch(console.log);

})

router.post("/insertBuyRequest", (req, res) => {
  let formData = req.body;
  async function upload() {
    const dataset = [
      {
        buyerName: formData.name.value,
        emailId: formData.email.value,
        phone: formData.phone.value,
        isEmi: formData.emi.value,
        vehicleId: formData.vehicleid.value
      }
    ];
    const body = dataset.flatMap(doc => [
      { index: { _index: "buyerdetails" } },
      doc
    ]);
    const link = formData.vehiclelink.value;
    const output = `
      <table border='1' style='width:100%'>
        <tr>
          <td> Vehicle </td>
          <td> <a href ="${link}">${link}</a> </td>
        </tr>
        <tr>
          <td> Name. </td>
          <td> ${formData.name.value} </td>
        </tr>
        <tr>
          <td> Phone No. </td>
          <td> ${formData.phone.value} </td>
        </tr>
        <tr>
          <td> Email Id </td>
          <td> ${formData.email.value} </td>
        </tr>
        <tr>
          <td> Date </td>
          <td> ${new Date()} </td>
        </tr>
      </table>
    `;
    const sendToEmail = 'rahul.khedkar@bikebazaar.com'; //email to send alerts to
    mailer(output, 'Buy request Booked', sendToEmail).catch(console.error);

    const { body: bulkResponse } = await client.bulk({ refresh: true, body });

    if (bulkResponse.errors) {
      const erroredDocuments = [];
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0];
        if (action[operation].error) {
          erroredDocuments.push({
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1]
          });
        }
      });
      console.log(erroredDocuments);
    }
    res.send("successfully inserted");
  }
  upload().catch(console.log);
});

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../server/tempEmailImg')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});
const upload = multer({ storage });

router.post('/tempUpload', upload.single('image'), (req, res) => {
  if (req.file)
    res.json({
      imageUrl: `../tempEmailImg/${req.file.filename}`
    });
  else
    res.status("409").json("No Files to Upload.")
});

module.exports = router;

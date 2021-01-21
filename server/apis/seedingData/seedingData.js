const express = require("express");
const router = express.Router();
const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

/*create schema to store bike details*/
router.get("/createbikeMapping", (req, res) => {
  async function run() {
    await client.indices.create(
      {
        index: "bike-details",
        body: {
          mappings: {
            properties: {
              id: { type: "integer" },
              name: { type: "text" },
              type: { type: "integer" },
              brand: { type: "integer" },
              storeId:{type:"integer"},
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
              additionalInfo: { type: "string" },
              bulletInfo1: { type: "string" },
              bulletInfo2: { type: "string" },
              bulletInfo3: { type: "string" },
              bulletInfo4: { type: "string" },
              bulletInfo5: { type: "string" },
              bulletInfo6: { type: "string" },
              sold: { type: "string" },
              discountPercent: {type: "float"}
            }
          }
        }
      },
      { ignore: [400] }
    );
  }
  run().catch(console.log);
  res.json({ msg: "createbikeMapping Index Created Sucessfully" });
});

router.get("/deleteMapping", (req, res) => {
  async function run() {
    await client.indices.delete(
      {
        index: req.query.index
      },
      { ignore: [400] }
    );
  }
  run().catch(console.log);
  res.json({ msg: "Index Deleted Sucessfully" });
});

router.get("/createStoreLocationMapping", (req, res) => {
  async function createMapping() {
    await client.indices.create(
      {
        index: "store-location",
        body: {
          mappings: {
            id: { type: "integer" },
            name: { type: "text" },
            city: { type: "text" },
            locality: { type: "text" },
            location: { type: "geo_point" }
          }
        }
      },
      { ignore: [400] }
    );
  }
  createMapping().catch(err => {
    console.log(err);
  });
  res.json({
    msg: "createStoreLocationMapping mapping created"
  });
});

router.get("/uploadBikes", (req, res) => {
  async function upload() {
    const dataset = [
      {
        id: 1,
        name: "Activa",
        type: 2,
        model: 16,
        brand: 4,
        regnumber: "",
        descr: "",
        price: 42000,
        state: "Kerela",
        city: "Aluva",
        loc: "Pullinchode",
        location: { lat: 10.100914, lon: 76.348984 },
        myear: 2016,
        mmonth: 0,
        kmdriven: 21230,
        images: ["Img-M1-1.jpg","Img-M1-2.jpg","Img-M1-3.jpg"],
        mimage: "Img-M1-1.jpg",
        owner: 1,
        cc: 100,
        bhp: 8,
        category: 2,
        mileage: 60,
        storeId:1
      },
      {
        id: 2,
        name: "Honda",
        type: 1,
        model: 17,
        brand: 4,
        regnumber: "",
        descr: "",
        price: 30000,
        state: "Kerela",
        city: "Aluva",
        loc: "Pullinchode",
        location: { lat: 10.100914, lon: 76.348984 },
        myear: 2012,
        mmonth: 0,
        kmdriven: 61416,
        images: ["Img-M2-1.jpg","Img-M2-2.jpg","Img-M2-3.jpg"],
        mimage: "Img-M2-1.jpg",
        owner: 1,
        cc: 120,
        bhp: 10,
        category: 1,
        mileage: 65,
        storeId:1
      },
      {
        id: 3,
        name: "Royal Enfield Classic 500",
        type: 3,
        model: 18,
        brand: 2,
        regnumber: "",
        descr: "",
        price: 120000,
        state: "Kerela",
        city: "Aluva",
        loc: "Pullinchode",
        location: { lat: 10.100914, lon: 76.348984 },
        myear: 2016,
        mmonth: 0,
        kmdriven: 14480,
        images: ["Img-M3-1.jpg","Img-M3-2.jpg","Img-M3-3.jpg"],
        mimage: "Img-M3-1.jpg",
        owner: 1,
        cc: 500,
        bhp: 27,
        category: 3,
        mileage: 32,
        storeId:1
      },
      {
        id: 4,
        name: "Honda Unicorn 160",
        type: 1,
        model: 19,
        brand: 4,
        regnumber: "",
        descr: "",
        price: 45000,
        state: "Kerela",
        city: "Aluva",
        loc: "Pullinchode",
        location: { lat: 10.100914, lon: 76.348984 },
        myear: 2015,
        mmonth: 0,
        kmdriven: 0,
        images: ["Img-M4-1.jpg","Img-M4-2.jpg","Img-M4-3.jpg"],
        mimage: "Img-M4-1.jpg",
        owner: 1,
        cc: 160,
        bhp: 14,
        category: 1,
        mileage: 62,
        storeId:1
      },
      {
        id: 5,
        name: "Honda SP Shine",
        type: 1,
        model: 17,
        brand: 4,
        regnumber: "",
        descr: "",
        price: 50000,
        state: "Andhra Pradesh",
        city: "Rajahmundry",
        loc: "Rajahmundry",
        location: { lat: 16.999954, lon: 81.786184 },
        myear: 2017,
        mmonth: 0,
        kmdriven: 29279,
        images: ["Shine_1_20191216T123430.jpeg","Shine_2_20191216T123430.jpeg","Shine_3_20191216T123430.jpeg", "Shine_4_20191216T123430.jpeg"],
        mimage: "Shine_4_20191216T123430.jpeg",
        owner: 1,
        cc: 125,
        bhp: 12,
        category: 1,
        mileage: 70,
        storeId:3
      },
      {
        id: 6,
        name: "Yamaha Fascino 2016",
        type: 2,
        model: 20,
        brand: 0,
        regnumber: "",
        descr: "",
        price: 40000,
        state: "Kerela",
        city: "Aluva",
        loc: "Alluva",
        location: { lat: 10.100914, lon: 76.348984 },
        myear: 2016,
        mmonth: 0,
        kmdriven: 71067,
        images: ["Fsno16_1_20191216T123530.jpg","Fsno16_2_20191216T123530.jpg","Fsno16_3_20191216T123530.jpg", "Fsno16_4_20191216T123530.jpg"],
        mimage: "Fsno16_1_20191216T123530.jpg",
        owner: 1,
        cc: 100,
        bhp: 12,
        category: 2,
        mileage: 40,
        storeId:1
      },
      {
        id: 7,
        name: "Yamaha Fascino 2017",
        type: 2,
        model: 20,
        brand: 0,
        regnumber: "",
        descr: "",
        price: 45000,
        state: "Kerela",
        city: "Aluva",
        loc: "Alluva",
        location: { lat: 10.100914, lon: 76.348984 },
        myear: 2017,
        mmonth: 0,
        kmdriven: 17041,
        images: ["Fsno17_1_20191216T123630.jpg","Fsno17_2_20191216T123630.jpg","Fsno17_3_20191216T123630.jpg", "Fsno17_4_20191216T123630.jpg"],
        mimage: "Fsno17_1_20191216T123630.jpg",
        owner: 1,
        cc: 100,
        bhp: 12,
        category: 2,
        mileage: 40,
        storeId:1
      },
      {
        id: 8,
        name: "Honda Activa",
        type: 2,
        model: 16,
        brand: 4,
        regnumber: "",
        descr: "",
        price: 30000,
        state: "Kerela",
        city: "Aluva",
        loc: "Aluva",
        location: { lat: 10.100914, lon: 76.348984 },
        myear: 2013,
        mmonth: 0,
        kmdriven: 28582,
        images: ["Activa_1_20191216T123730.jpg","Activa_2_20191216T123730.jpg","Activa_3_20191216T123730.jpg", "Activa_4_20191216T123730.jpg"],
        mimage: "Activa_1_20191216T123730.jpg",
        owner: 1,
        cc: 100,
        bhp: 12,
        category: 2,
        mileage: 40,
        storeId: 1
      },
      {
        id: 9,
        name: "Hero Passion Plus",
        type: 1,
        model: 21,
        brand: 5,
        regnumber: "",
        descr: "",
        price: 25000,
        state: "Kerela",
        city: "Aluva",
        loc: "Aluva",
        location: { lat: 10.100914, lon: 76.348984 },
        myear: 2010,
        mmonth: 0,
        kmdriven: 1203,
        images: ["Passion_1_20191216T123830.jpg","Passion_2_20191216T123830.jpg","Passion_3_20191216T123830.jpg", "Passion_4_20191216T123830.jpg"],
        mimage: "Passion_1_20191216T123830.jpg",
        owner: 1,
        cc: 100,
        bhp: 12,
        category: 1,
        mileage: 80,
        storeId:1
      },
      {
        id: 10,
        name: "Bajaj Pulsar 135 LS",
        type: 1,
        model: 22,
        brand: 3,
        regnumber: "",
        descr: "",
        price: 40000,
        state: "West Bengal",
        city: "Kolkata",
        loc: "Kolkata",
        location: { lat: 22.5726, lon: 88.3639 },
        myear: 2017,
        mmonth: 0,
        kmdriven: 26494,
        images: ["Pulsar_LS_1_20191216T123930.jpeg","Pulsar_LS_2_20191216T123930.jpeg","Pulsar_LS_3_20191216T123930.jpeg", "Pulsar_LS_4_20191216T123930.jpeg"],
        mimage: "Pulsar_LS_3_20191216T123930.jpeg",
        owner: 1,
        cc: 150,
        bhp: 15,
        category: 1,
        mileage: 55,
        storeId: 2
      },
      {
        id: 11,
        name: "Honda CB Hornet",
        type: 1,
        model: 23,
        brand: 4,
        regnumber: "",
        descr: "",
        price: 52000,
        state: "West Bengal",
        city: "Kolkata",
        loc: "Kolkata",
        location: { lat: 22.5726, lon: 88.3639 },
        myear: 2016,
        mmonth: 0,
        kmdriven: 6546,
        images: ["Hornet_1_20191216T124045.jpeg","Hornet_2_20191216T124045.jpeg","Hornet_3_20191216T124045.jpeg", "Hornet_4_20191216T124045.jpeg"],
        mimage: "Hornet_1_20191216T124045.jpeg",
        owner: 1,
        cc: 100,
        bhp: 8,
        category: 1,
        mileage: 60,
        storeId: 2
      },
      {
        id: 12,
        name: "TVS Apache RTR 160",
        type: 3,
        model: 24,
        brand: 10,
        regnumber: "",
        descr: "",
        price: 50000,
        state: "West Bengal",
        city: "Kolkata",
        loc: "Kolkata",
        location: { lat: 22.5726, lon: 88.3639 },
        myear: 2015,
        mmonth: 0,
        kmdriven: 27899,
        images: ["Apache_1_20191216T124215.jpeg","Apache_2_20191216T124215.jpeg","Apache_3_20191216T124215.jpeg", "Apache_4_20191216T124215.jpeg"],
        mimage: "Apache_4_20191216T124215.jpeg",
        owner: 1,
        cc: 150,
        bhp: 12,
        category: 3,
        mileage: 40,
        storeId: 2
      },
      {
        id: 13,
        name: "Bajaj Avenger 220 Street",
        type: 3,
        model: 25,
        brand: 3,
        regnumber: "",
        descr: "",
        price: 59000,
        state: "West Bengal",
        city: "Kolkata",
        loc: "Kolkata",
        location: { lat: 10.100914, lon: 76.348984 },
        myear: 2017,
        mmonth: 0,
        kmdriven: 8845,
        images: ["Avenger_1_20191216T124320.jpeg","Avenger_2_20191216T124320.jpeg","Avenger_3_20191216T124320.jpeg", "Avenger_4_20191216T124320.jpeg"],
        mimage: "Avenger_4_20191216T124320.jpeg",
        owner: 1,
        cc: 200,
        bhp: 20,
        category: 3,
        mileage: 35,
        storeId: 2
      },
      {
        id: 14,
        name: "Mahindra Centuro",
        type: 1,
        model: 26,
        brand: 11,
        regnumber: "",
        descr: "",
        price: 25000,
        state: "West Bengal",
        city: "Kolkata",
        loc: "Kolkata",
        location: { lat: 10.100914, lon: 76.348984 },
        myear: 2015,
        mmonth: 0,
        kmdriven: 8000,
        images: ["Centuro_1_20191216T124557.jpeg","Centuro_2_20191216T124557.jpeg","Centuro_3_20191216T124557.jpeg", "Centuro_4_20191216T124557.jpeg"],
        mimage: "Centuro_1_20191216T124557.jpeg",
        owner: 1,
        cc: 100,
        bhp: 12,
        category: 1,
        mileage: 90,
        storeId: 2
      },
      {
        id: 15,
        name: "Yamaha SZ RR",
        type: 1,
        model: 27,
        brand: 0,
        regnumber: "",
        descr: "",
        price: 38000,
        state: "Andhra Pradesh",
        city: "Rajahmundry",
        loc: "Rajahmundry",
        location: { lat: 16.999954, lon: 81.786184 },
        myear: 2016,
        mmonth: 0,
        kmdriven: 22469,
        images: ["SZRR_1_20191216T123030.jpeg","SZRR_2_20191216T123030.jpeg","SZRR_3_20191216T123030.jpeg","SZRR_4_20191216T123030.jpeg"],
        mimage: "SZRR_3_20191216T123030.jpeg",
        owner: 1,
        cc: 150,
        bhp: 8,
        category: 1,
        mileage: 60,
        storeId:3
      },
      {
        id: 16,
        name: "Hero Mastero Edge",
        type: 2,
        model: 28,
        brand: 5,
        regnumber: "",
        descr: "",
        price: 40000,
        state: "Andhra Pradesh",
        city: "Rajahmundry",
        loc: "Rajahmundry",
        location: { lat: 16.999954, lon: 81.786184 },
        myear: 2015,
        mmonth: 0,
        kmdriven: 5737,
        images: ["Maestro_1_20191216T123130.jpeg","Maestro_2_20191216T123130.jpeg","Maestro_3_20191216T123130.jpeg", "Maestro_4_20191216T123130.jpeg"],
        mimage: "Maestro_3_20191216T123130.jpeg",
        owner: 1,
        cc: 110,
        bhp: 10,
        category: 2,
        mileage: 50,
        storeId:3
      },
      {
        id: 17,
        name: "Hero Glamour i3s",
        type: 1,
        model: 29,
        brand: 5,
        regnumber: "",
        descr: "",
        price: 53000,
        state: "Andhra Pradesh",
        city: "Rajahmundry",
        loc: "Rajahmundry",
        location: { lat: 16.999954, lon: 81.786184 },
        myear: 2017,
        mmonth: 0,
        kmdriven: 31809,
        images: ["Glamour_1_20191216T123230.jpeg","Glamour_2_20191216T123230.jpeg","Glamour_3_20191216T123230.jpeg", "Glamour_4_20191216T123230.jpeg"],
        mimage: "Glamour_2_20191216T123230.jpeg",
        owner: 1,
        cc: 125,
        bhp: 10,
        category: 1,
        mileage: 55,
        storeId:3
      },
      {
        id: 18,
        name: "Hero Duet",
        type: 2,
        model: 30,
        brand: 5,
        regnumber: "",
        descr: "",
        price: 30000,
        state: "Andhra Pradesh",
        city: "Rajahmundry",
        loc: "Rajahmundry",
        location: { lat: 16.999954, lon: 81.786184 },
        myear: 2016,
        mmonth: 0,
        kmdriven: 58157,
        images: ["Duet_1_20191216T123330.jpeg","Duet_2_20191216T123330.jpeg","Duet_3_20191216T123330.jpeg", "Duet_4_20191216T123330.jpeg"],
        mimage: "Duet_4_20191216T123330.jpeg",
        owner: 1,
        cc: 110,
        bhp: 8,
        category: 2,
        mileage: 50,
        storeId:3
      },
      {
        // data values to be admitted for better processing and user screening
        id: 19,
        name: "Hero Duet",
        type: 2,
        model: 30,
        brand: 5,
        regnumber: "",
        descr: "",
        price: 30000,
        state: "Kerala",
        city: "Thrissur",
        loc: "Thrissur",
        location: { lat: 10.540670, lng: 76.213814 },
        myear: 2016,
        mmonth: 0,
        kmdriven: 58157,
        images: ["Duet_1_20191216T123330.jpeg","Duet_2_20191216T123330.jpeg","Duet_3_20191216T123330.jpeg", "Duet_4_20191216T123330.jpeg"],
        mimage: "Duet_4_20191216T123330.jpeg",
        owner: 1,
        cc: 110,
        bhp: 8,
        category: 2,
        mileage: 50,
        storeId:4
      },
      {
        id: 20,
        name: "Hero Mastero Edge",
        type: 3,
        model: 28,
        brand: 5,
        regnumber: "",
        descr: "",
        price: 40000,
        state: "Kerala",
        city: "Thrissur",
        loc: "Thrissur",
        location: { lat: 10.540670, lng: 76.213814 },
        myear: 2015,
        mmonth: 0,
        kmdriven: 5737,
        images: ["Maestro_1_20191216T123130.jpeg","Maestro_2_20191216T123130.jpeg","Maestro_3_20191216T123130.jpeg", "Maestro_4_20191216T123130.jpeg"],
        mimage: "Maestro_3_20191216T123130.jpeg",
        owner: 1,
        cc: 110,
        bhp: 10,
        category: 3,
        mileage: 50,
        storeId:4
      },
      {
        id: 21,
        name: "Mahindra Centuro",
        type: 1,
        model: 26,
        brand: 11,
        regnumber: "",
        descr: "",
        price: 25000,
        state: "Kerala",
        city: "Thrissur",
        loc: "Thrissur",
        location: { lat: 10.540670, lng: 76.213814 },
        myear: 2015,
        mmonth: 0,
        kmdriven: 8000,
        images: ["Centuro_1_20191216T124557.jpeg","Centuro_2_20191216T124557.jpeg","Centuro_3_20191216T124557.jpeg", "Centuro_4_20191216T124557.jpeg"],
        mimage: "Centuro_1_20191216T124557.jpeg",
        owner: 1,
        cc: 100,
        bhp: 12,
        category: 1,
        mileage: 90,
        storeId: 4
      },
      {
        id: 22,
        name: "Yamaha SZ RR",
        type: 1,
        model: 27,
        brand: 0,
        regnumber: "",
        descr: "",
        price: 38000,
        state: "Kerala",
        city: "Thrissur",
        loc: "Thrissur",
        location: { lat: 10.540670, lng: 76.213814 },
        myear: 2016,
        mmonth: 0,
        kmdriven: 22469,
        images: ["SZRR_1_20191216T123030.jpeg","SZRR_2_20191216T123030.jpeg","SZRR_3_20191216T123030.jpeg","SZRR_4_20191216T123030.jpeg"],
        mimage: "SZRR_3_20191216T123030.jpeg",
        owner: 2,
        cc: 150,
        bhp: 8,
        category: 1,
        mileage: 60,
        storeId:4
      },
      {
        id: 23,
        name: "Yamaha SZ RR",
        type: 1,
        model: 27,
        brand: 0,
        regnumber: "",
        descr: "",
        price: 38000,
        state: "Karnataka",
        city: "Bangalore",
        loc: "Bangalore",
        location: { lat: 12.989492, lng: 77.558663 },
        myear: 2016,
        mmonth: 0,
        kmdriven: 22469,
        images: ["SZRR_1_20191216T123030.jpeg","SZRR_2_20191216T123030.jpeg","SZRR_3_20191216T123030.jpeg","SZRR_4_20191216T123030.jpeg"],
        mimage: "SZRR_3_20191216T123030.jpeg",
        owner: 2,
        cc: 150,
        bhp: 8,
        category: 1,
        mileage: 60,
        storeId:5
      }
        
    ];
    const body = dataset.flatMap(doc => [
      { index: { _index: "bike-details" } },
      doc
    ]);

    const { body: bulkResponse } = await client.bulk({ refresh: true, body });

    if (bulkResponse.errors) {
      const erroredDocuments = [];
      // The items array has the same order of the dataset we just indexed.
      // The presence of the `error` key indicates that the operation
      // that we did for the document has failed.
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0];
        if (action[operation].error) {
          erroredDocuments.push({
            // If the status is 429 it means that you can retry the document,
            // otherwise it's very likely a mapping error, and you should
            // fix the document before to try it again.
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1]
          });
        }
      });
      console.log(erroredDocuments);
    }

    const { body: count } = await client.count({ index: "bike-details" });
    res.json({
      msg: "Data Seeded"
    });
  }
  upload().catch(console.log);
});

router.get("/uploadLocations", (req, res) => {
  async function upload() {
    const dataset = [
      {
        id: 1,
        name: "Jkb – BikeBazaar",
        city: "Aluva",
        state: "Kerela",
        locality: "Building No. XVII – 27&28 , Pullinchode, Aluva - 683101",
        location: { lat: 31.12, lon: -71.34 }
      },
      {
        id: 2,
        name: "BikeBazaar, Kolkata",
        city: "Kolkata",
        state: "West Bengal",
        locality: "D. No. 77/8/7-1, Beside Bajaj Two Wheeler Showroom, R.T.C Complex Road, Rajahmundry - 533103, Andhra Pradesh, India.",
        location: { lat: 16.999954, lon: 81.786184 }
      },
      {
        id: 3,
        name: "BikeBazaar, MCV Wheels",
        city: "Rajahmundry",
        state: "Andhra Pradesh",
        locality: "D. No. 77/8/7-1, Beside Bajaj Two Wheeler Showroom, R.T.C Complex Road, Rajahmundry - 533103, Andhra Pradesh, India.",
        location: { lat: 16.999954, lon: 81.786184 }
      },
    ];
    const body = dataset.flatMap(doc => [
      { index: { _index: "store-location" } },
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

    const { body: count } = await client.count({ index: "store-location" });
    console.log(count);
  }
  upload().catch(console.log);
  res.json({ msg: " uploadLocations Location index seeded" });
});

router.get("/uploadNewLocations", (req, res) => {
  async function upload() {
    const dataset = [
      {
        id: 4,
        name: "BikeBazaar – Sitaram Trade & Services",
        city: "Thrissur",
        state: "Kerala",
        locality: "Sitaram Trade & Services, PT Manual Road, Kollothumpadam, Patturaikal, Thrissur, Kerala",
        location: { lat: 10.540670, lng: 76.213814 }
      },
      {
        id: 5,
        name: "Rajaji Nagar, Bangalore",
        city: "Bangalore",
        state: "Karnataka",
        locality: "New no.72, Old No.60/61, Dr. Rajkumar Road, Rajaji Nagar, Opp Srinath sanitary wares,Bangalore - 560010",
        location: {lat: 12.989492, lng: 77.558663}
      },
      {
        id: 6,
        name: "Mootha Centre, Nungambakkam",
        city: "Nungambakkam",
        state: "Chennai",
        locality: "Mootha Centre, Door No 23, Kodambakkam High road, Nungambakkam, Chennai - 600034",
        location: { lat: 13.052892, lng: 80.246384 }
      },
      {
        id: 7,
        name: "S/F Arya Samaj, Karol Bagh",
        city: "New Delhi",
        state: "New Delhi",
        locality: "1694 S/F Arya Samaj Road Karol Bagh, Near Grace Hotel & Sat Bharaba Govt School, l Karol Bagh, New Delhi - 110005",
        location: { lat: 28.647347, lng: 77.194833 }
      },
      {
        id: 8,
        name: "Sector-12 A, Gurgaon",
        city: "Gurgaon",
        state: "Haryana",
        locality: "SCO 37, 3rd Floor, Hall No.1 Sector-12 A, Huda Market, Opp. Telephone Exchange, Near Bikanerwala, Gurgaon - 122001",
        location: { lat: 28.468494, lng: 77.035545 }
      },
      {
        id: 9,
        name: "Babukhan Estate, Hyderabad",
        city: "Hyderabad",
        state: "Telanagna",
        locality: "5th Floor, Flat No 509/A, Babukhan Estate, Basheerbagh, Hyderabad, Telanagna - 500001",
        location: { lat: 17.400817, lng: 78.474401 }
      },
      {
        id: 10,
        name: "ARG CORPORATE PARK, Jaipur",
        city: "Jaipur",
        state: "Rajasthan",
        locality: "ARG CORPORATE PARK GOPAL BARI BUILDING, Ajmer Road, Panch Batti, Mission Compound, Hathroi, Jaipur, Rajasthan",
        location: { lat: 26.915150, lng: 75.794112 }
      },
      {
        id: 11,
        name: "Sagar Tech Plaza A, Mumbai",
        city: "Mumbai",
        state: "Maharashtra",
        locality: "Office N0. 208, 2nd Floor, Sagar Tech Plaza A, Sakinaka Junction, Mumbai - 400072",
        location: { lat: 19.102637, lng: 72.885387 }
      },
      {
        id: 12,
        name: "Jejani Bhavan, Nagpur",
        city: "Nagpur",
        state: "Maharashtra",
        locality: "Jejani Bhavan, Above Khamgaon urban Bank, Gandhi Grain Market, Telephone Exchange Square, Central Avenue Road, Nagpur - 440009",
        location: { lat: 21.148516, lng: 79.122348 }
      },
      {
        id: 13,
        name: "Govind Niwas, Pune",
        city: "Pune",
        state: "Maharashtra",
        locality: "Office no. 2 and 3, 1st Floor, Govind Niwas, Rasta Peth, Near Naidu Ganapati Rasta Peth, Pune - 411011",
        location: { lat: 18.517641, lng: 73.867125 }
      }

    ];
    const body = dataset.flatMap(doc => [
      { index: { _index: "store-location" } },
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

    const { body: count } = await client.count({ index: "store-location" });
    console.log(count);
  }
  upload().catch(console.log);
  res.json({ msg: "uploadNewLocations New Location added" });
});


/*create schema to store bike details*/
router.get("/createLeadDetail", (req, res) => {
  async function run() {
    await client.indices.create(
      {
        index: "leadDetail",
        body: {
          mappings: {
            properties: {
              name: { type: "text" },
              email: { type: "text" },
              phone: { type: "integer" },
              emiOption: { type: "integer" },
              bikeId: { type: "integer" },
              storeId: { type: "integer" }
            }
          }
        }
      },
      { ignore: [400] }
    );
  }
  run().catch(console.log);
  res.json({ msg: "createLeadDetail Index Created Sucessfully" });
});


/*create schema to store bike details*/
router.get("/sellBikeDetails", (req, res) => {
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
              address:{type:"text"},
              mobile:{type:"integer"},
              additionalInfo: { type: "string" },
              bulletInfo1: { type: "string" },
              bulletInfo2: { type: "string" },
              bulletInfo3: { type: "string" },
              bulletInfo4: { type: "string" },
              bulletInfo5: { type: "string" },
              bulletInfo6: { type: "string" },
              sold: { type: "string" },
              discountPercent: {type: "float"}
            }
          }
        }
      },
      { ignore: [400] }
    );
  }
  run().catch(console.log);
  res.json({ msg: "sellBikeDetails Index Created Sucessfully" });
});


router.get("/getAllBikes", (req, res) => {
  async function getData() {
    const { body } = await client.search({
      index: "bike-details",
      body: {
        size: 10000,
        query: {
          match_all: {}
        }
      }
    });
    res.send(body.hits.hits);
  }
  getData().catch(console.log);
});

router.get("/getAllStoreLocations", (req, res) => {
  async function getData() {
    const { body } = await client.search({
      index: "store-location",
      body: {
        query: {
          match_all: {}
        }
      }
    });
    res.send(body.hits.hits);
  }
  getData().catch(console.log);
});

router.get("/searchBike", (req, res) => {
  async function getBike() {
    const { body } = await client.search({
      index: "bike-details",
      body: {
        query: {
          // match: {
          //   id: req.query.id
          // }
          terms: {
            _id: [req.query.vehicleid]
          }
        }
      }
    });
    res.send(body.hits.hits);
  }
  getBike().catch(console.log);
});

router.post("/deleteVehicle", (req, res) => {
  let data = req.body;
  async function deleteBike() {
    const { body } = await client.delete({
      index: "bike-details",
      id: data.id
    });
    res.send(body);
  }
  deleteBike().catch(console.log);
});


async function oldVehiclesDetails() {
  // getting the old vehicles from db
  let oldVehiclesDataFromDB = [];

  const { body } = await client.search({
    index: "bike-details",
    body: {
      size: 10000,
      query: {
        match_all: {},
      },
    },
  });

  return new Promise((resolve, reject) => {
    if (!body) {
      reject();
    } else {
      for (let i = 0; i < body.hits.hits.length; i++) {
        oldVehiclesDataFromDB.push(body.hits.hits[i]._source);
      }
      resolve(oldVehiclesDataFromDB);
    }
  });
}

router.post("/adminVehiclesUpdate", (req, res) => {

  let data = req.body;
  async function updateBike() {

    const dataset = 
      {
        name: data.submitObj.name.value,
        type: parseInt(data.submitObj.type.value),
        brand: parseInt(data.submitObj.brand.value),
        storeId: parseInt(data.submitObj.storeId.value),
        location: data.submitObj.location.value,
        model: parseInt(data.submitObj.model.value),
        regnumber: data.submitObj.regnumber.value,
        descr: data.submitObj.descr.value,
        price: parseInt(data.submitObj.price.value),
        state: data.submitObj.state.value,
        city: data.submitObj.city.value,
        loc: data.submitObj.loc.value,
        myear: parseInt(data.submitObj.myear.value),
        mmonth: parseInt(data.submitObj.mmonth.value),
        kmdriven: parseInt(data.submitObj.kmdriven.value),
        owner: parseInt(data.submitObj.owner.value),
        cc: parseInt(data.submitObj.cc.value),
        bhp: parseInt(data.submitObj.bhp.value),
        category: parseInt(data.submitObj.type.value),
        mileage: parseInt(data.submitObj.mileage.value),
        images: data.submitObj.image.imageNames,
        mimage: data.submitObj.image.imageNames[0],
        additionalInfo: data.submitObj.additionalInfo.value,
        bulletInfo1: data.submitObj.bulletInfo1.value,
        bulletInfo2: data.submitObj.bulletInfo2.value,
        bulletInfo3: data.submitObj.bulletInfo3.value,
        bulletInfo4: data.submitObj.bulletInfo4.value,
        bulletInfo5: data.submitObj.bulletInfo5.value,
        bulletInfo6: data.submitObj.bulletInfo6.value,
        sold: data.submitObj.sold.value,
        discountPercent: data.submitObj.discountPercent.value
      };
    console.log(dataset);
    const { body } = await client.update({
      index: "bike-details",
      id: data.vehicleId,
      body:{
        doc: dataset
      }
    });
    const { bodyU } = await client.get({
      index: 'bike-details',
      id: data.vehicleId
    })
  
    res.send(body);
  }
  updateBike().catch((err)=> console.log(err.meta.body.error, true, 10, true));
});



router.post("/adminVehiclesUpload", (req, res) => {

  let formData = req.body;
  
  // console.log(formData);
  async function uploadVehiclels() {

    async function getStore() {
      const { body } = await client.search({
        index: "store-location",
        body: {
          query: {
            match: {
              id: formData.storeId.value
            }
          }
        }
      });
      return body.hits.hits[0]._source;
    }

    let oldvehicledetailsArr=await oldVehiclesDetails();
    let idTobeAssigned=oldvehicledetailsArr.length;

    let storeDetails = await getStore();
  
    console.log("AB: ", storeDetails)
    const dataset = [
      {
        id:idTobeAssigned,
        name: formData.name.value,
        type: parseInt(formData.type.value),
        brand: parseInt(formData.brand.value),
        storeId: parseInt(formData.storeId.value),
        location: storeDetails.location,
        model: parseInt(formData.model.value),
        regnumber: formData.regnumber.value,
        descr: formData.descr.value,
        price: parseInt(formData.price.value),
        state: storeDetails.state,
        city: storeDetails.city,
        loc: storeDetails.city,
        myear: parseInt(formData.myear.value),
        mmonth: parseInt(formData.mmonth.value),
        kmdriven: parseInt(formData.kmdriven.value),
        owner: parseInt(formData.owner.value),
        cc: parseInt(formData.cc.value),
        bhp: parseInt(formData.bhp.value),
        category: parseInt(formData.type.value),
        mileage: parseInt(formData.mileage.value),
        images: formData.image.imageNames,
        mimage: formData.image.imageNames[0],
        additionalInfo: formData.additionalInfo.value,
        bulletInfo1: formData.bulletInfo1.value,
        bulletInfo2: formData.bulletInfo2.value,
        bulletInfo3: formData.bulletInfo3.value,
        bulletInfo4: formData.bulletInfo4.value,
        bulletInfo5: formData.bulletInfo5.value,
        bulletInfo6: formData.bulletInfo6.value,
        sold: formData.sold.value,
        discountPercent: formData.discountPercent.value
      }
    ]
    const body = dataset.flatMap(doc => [
      { index: { _index: "bike-details" } },
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

    const { body: count } = await client.count({ index: "bike-details" });
    res.json({
      msg: "Data Uploaded"
    });
  }
  uploadVehiclels().catch(console.log);
});

module.exports = router;
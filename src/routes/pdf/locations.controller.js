const fs = require("fs");
const path = require("path");
const axios = require("axios");
const moment = require("moment");
const PdfPrinter = require('pdfmake');
const Repair = require("../../models/repairs.model");

require("dotenv").config();

const normalPathRoboto = path.join(__dirname, "./utils/Roboto-Regular.ttf")
const boldPathRoboto = path.join(__dirname, "./utils/Roboto-Bold.ttf")


const robotoFont = {

    Roboto: {
        normal: normalPathRoboto,
        bold: boldPathRoboto
    }
};

const tableData = [
    "AFFILIATION",
    "TRANSPORT UNIT",
    "CEO",
    "MEDICAL CLINIC",
    "PHARMACY 66",
    "OCCUPATIONAL THERAPY",
    "PUBLIC HEALTH",
    "CASH POINT",
    "PLANNING AND STRATEGY",
    "KPCC",
    "RECEPTION",
    "DAYCARE",
    "KNH HOSTEL",
    "CARDIOLOGY",
    "NUITRITION",
    "MAIN PHARMACY 40",
    "PRIME CARE",
    "HEALTH INFORMATION OFFICE",
    "SDCOS",
    "RENAL UNIT",
    "QUALITY ASSURANCE",
    "NURSES TRIA",
    "LABOUR WARD",
    "BIO CHEMISTRY",
    "PRINTING",
    "STAFF CLINIC",
    "B.T.U",
    "PAEDITRIC EMERGENCY UNIT",
    "COM AND MARKETING",
    "LEVEL 3",
    "DIABETIC CLINIC",
    "BURNS UNIT",
    "SURGICAL CLINIC 24",
    "CATERING",
    "COMPREHENSIVE CARE CENTER",
    "SCHOOL OF NURSING",
    "LEVEL 10",
    "BIOMEDICAL ENGINEERING",
    "CLINIC 66",
    "HOU",
    "LEVEL 4",
    "LEVEL 5",
    "ICT OFFICE 3",
    "MAIN STORE",
    "CHAPLAINCY",
    "V.C.T",
    "LEVEL 7",
    "THERAPY",
    "FLOOR MNG",
    "SUPPLIES",
    "N/A",
    "WARD GFB",
    "LEVEL 6",
    "PROJECT",
    "LEGAL",
    "ENGINEERING DEPARTMENT",
    "PHARMACY",
    "MALIPO",
    "STRATEGY AND PLANNING",
    "ICT",
    "PAEDIATRIC",
    "EYE CLINIC",
    "CTC HEALTH INFO",
    "YOUTH CENTER",
    "FINANCE",
    "DMU",
    "ULTRA SOUND",
    "CHAPLAIN",
    "MEDICAL RESEARCH",
    "WARD 1A",
    "WARD GFA",
    "PHYSIOTHERAPY",
    "LAUNDRY",
    "DRUG STORE",
    "RADIOLOGY",
    "INTERNAL AUDIT",
    "MENTAL HEALTH",
    "REPRODUCTIVE HEALTH CLINIC",
    "PAEDIATRIC",
    "ENT CLINIC",
    "HEALTH INFORMATION",
    "LEVEL 1C",
    "NEW BORN UNIT",
    "A&E",
    "DENTAL UNIT",
    "HOUSING",
    "SECURITY",
    "CATERING RAHIMTULLAH",
    "MARTENITY WARD",
    "REGISTRY",
    "PUBLIC HEALTH WARD 42",
    "LEVEL 9",
    "VCT",
    "ICU",
    "MAIN THEATRE",
    "INFECTION AND CONTROL",
    "PALLATIVE CARE",
    "ORTHAPEDIC TECH NO:46"
  ];
  
  function createTable(tableData) {
    const tableBody = [];
  
    // Header row
    tableBody.push([
      { text: 'Location', bold: true },
    ]);
  
    // Data rows
    tableData.forEach((location) => {
      tableBody.push([location]);
    });
  
    return tableBody;
  }
  
  const tableBody = createTable(tableData);
  console.log(tableBody);
  

function createPdf(tableBody, location) {
    const logoPath = path.join(__dirname, "./utils/logo.png")
    const docDefinition = {
        content: [{
                columns: [{
                        image: logoPath,
                        width: 80,
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: 'KENYATTA NATIONAL HOSPITAL \n ICT EQUIPMENT PLANNED PREVENTIVE MAINTENANCE (PPM) SERVICE SHEET',
                        style: 'header',
                        bold: true,
                        fontSize: 13,
                        alignment: 'center',
                        margin: [0, 0, 0, 0],
                        width: '*'
                    },
                    {
                        text: 'KNH/ICT/3 \n REVISION:01',
                        alignment: 'right',
                        margin: [0, 0, 35, 0],
                        width: 110
                    },
                ]
            },
            {
                columns: [{
                    text: location,
                    fontSize: 15,
                    alignment: "center",
                    margin: [0, 0, 0, 0],
                    width: '*',
                    bold: true,
                }]
            },
            {
                margin: [20, 30, 0, 10],
                table: {
                    headerRows: 1,
                    widths: ["auto", 100, "auto", "auto", "20%", "auto", "10%", "10%"],
                    body: tableBody,
                    margin: [0, 0, 0, 5],
                    bold: true,
                }
            },
            {
                text: "* For PPM on active network devices and data cente this will be signed by the supervisor - infrastructure & Networks \n PPM done by:____________________________________________________________ \n Confirmed by Supervisor:Name________________________________Sign:_______________________Date:_______________",
                margin: [50, 0, 0, 0],
                alignment: "left",
                fontSize: 12,
                relativePosition: { x: -20, y: -5 }
            }
        ],
        defaultStyle: {
            font: 'Roboto'
        },
        pageOrientation: 'landscape',
        footer: function(currentPage, pageCount) {
            if (currentPage === pageCount) {
                return {
                    columns: [{
                        text: 'Page ' + currentPage + ' of ' + pageCount,
                        margin: [20, 0, 0, 0],
                        alignment: "center",
                        fontSize: 10,
                        width: 80
                    }],
                    margin: [0, 40, 0, 0]
                };
            }
        }
    };

    const pdfDoc = new PdfPrinter(robotoFont).createPdfKitDocument(docDefinition);
    return pdfDoc;
}

async function location(req, res) {
    try {
        // const { location } = req.body;
        // const location = req.query.location
        const location="All"
        console.log(location)


        const users = await getRepairs(location);
        const tableBody = createTable(users);
        const pdfDoc = createPdf(tableBody, location);

        const date = new Date().toLocaleDateString().replace(/\//g, "-");
        const filename = `PPM_${date}.pdf`;

        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');

        pdfDoc.pipe(res);
        pdfDoc.end();

    } catch (error) {
        if (error.message === 'Failed to retrieve user data') {
            console.error('Failed to retrieve user data. Please check your internet connection and try again.');
            res.status(500).send('Failed to retrieve user data. Please check your internet connection and try again.');
        } else {
            console.error('An error occurred while generating the PDF:', error);
            res.status(500).send('An error occurred while generating the PDF');
        }
    }
}





module.exports = {location };
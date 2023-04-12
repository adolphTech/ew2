const fs = require("fs");
const path = require("path");
const axios = require("axios");
const moment = require("moment");
const PdfPrinter = require('pdfmake');
const Equipment = require("../../models/equipment.model");
require("dotenv").config();

const normalPathRoboto = path.join(__dirname, "./utils/Roboto-Regular.ttf")
const boldPathRoboto = path.join(__dirname, "./utils/Roboto-Bold.ttf")


const robotoFont = {

    Roboto: {
        normal: normalPathRoboto,
        bold: boldPathRoboto
    }
};
// ===========================PPM PDF ==================//
async function getUsers(location) {
    try {
        // const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const response = await axios.get(`${process.env.DOMAIN}/loc?location=${location}`)
            // console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error('Failed to retrieve user data');
    }
}

//function to get users from the api for the pdf table
function createTable(users) {
    // const tableBody = [
    //     ['LOCATION', 'ICT EQUIPMENT \n (Type and Model)', 'SERIAL NUMBER', 'ASSET TAG', 'SERVICE NOTES', "USER \n CONFIRMATION \n (sign)", "DATE PPM \n DONE", "NEXT PPM \n DATE"]
    // ];

    const tableBody = [
        [
            { text: 'LOCATION', bold: true },
            { text: 'ICT EQUIPMENT \n (Type and Model)', bold: true },
            { text: 'SERIAL NUMBER', bold: true },
            { text: 'ASSET TAG', bold: true },
            { text: 'SERVICE NOTES', bold: true },
            { text: 'USER \n CONFIRMATION \n (sign)', bold: true },
            { text: 'DATE PPM \n DONE', bold: true },
            { text: 'NEXT PPM \n DATE', bold: true },
        ]
    ];

    users.forEach(user => {
        const today = moment().format('DD-MM-YY');
        const todayPlusYear = moment().add(1, 'year').format('DD-MM-YY');
        const serviceNotes = "Removed dust \n removed temp files \n scanned virus(comps)"

        // tableBody.push([user.assetTag, user.serialNumber, user.model, user.physicalLocation, '', today, today]);
        tableBody.push([user.physicalLocation, user.equipmentType + '/' + user.model, user.serialNumber, user.assetTag, serviceNotes, '', today, todayPlusYear]);

    });

    return tableBody;
}

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

async function httpDownloadPdf(req, res) {
    try {
        // const { location } = req.body;
        const location = req.query.location
        console.log(location)


        const users = await getUsers(location);
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
// ========================PPM PDF END ===========//

// ========================REPAIR REPORTS ===============//
async function getRepairs(startDate, endDate) {
    try {
        const response = await axios.get(`${process.env.DOMAIN}/repair/range?startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to retrieve user data');
    }
}

function createRepairTable(repairs) {
    // const tableBody = [
    //     ['No', 'Asset Tag', 'Date', 'Area', 'User', 'Nature of Problem', 'Solution', 'ICT Officer']
    // ];

    const tableBody = [
        [
            { text: "No", bold: true },
            { text: "Asset Tag", bold: true },
            { text: "Date", bold: true },
            { text: "Area", bold: true },
            { text: "User", bold: true },
            { text: "Nature of problem", bold: true },
            { text: "solution", bold: true },
            { text: "ICT officer", bold: true },
        ]
    ]

    repairs.forEach((repair, index) => {
        tableBody.push([index + 1, repair.assetTag, repair.date, repair.physicalLocation, repair.user, repair.jobDescription, repair.solution, repair.ictOfficer]);
    });

    return tableBody;
}

function createReportPdf(tableBody, startDate, endDate) {

    const formattedStartDate = moment(startDate).format("DD/MM/YYYY");
    const formattedEndDate = moment(endDate).format("DD/MM/YYYY");



    const logoPath = path.join(__dirname, "./utils/logo.png");
    const totalRepairs = tableBody.length - 1; // Get the total number of repairs
    const docDefinition = {
        content: [{
                alignment: 'center',
                image: logoPath,
                width: 80,
                margin: [0, 0, 0, 0]
            },
            {
                text: `KENYATTA NATIONAL HOSPITAL \n ICT WORKSHOP - QUARTERLY REPAIR REPORT FROM ${formattedStartDate} T0  ${formattedEndDate} )`,
                style: 'header',
                bold: true,
                fontSize: 13,
                alignment: 'center',
                margin: [0, 0, 0, 0],
                width: '*'
            },
            {
                margin: [20, 30, 0, 10],
                table: {
                    headerRows: 1,
                    widths: ["auto", "auto", 'auto', "auto", "auto", 120, 120, '10%'],
                    body: tableBody,
                    margin: [0, 0, 0, 5]
                }
            },
            {
                text: `TOTAL REPAIRS DONE: ${totalRepairs}`, // Display the total count
                margin: [50, 0, 0, 0],
                alignment: "left",
                bold: true,
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


async function httpDownloadReport(req, res) {
    try {
        const { startDate, endDate } = req.body;
        // console.log(startDate, endDate)


        const repairs = await getRepairs(startDate, endDate);
        // console.log(repairs)

        const tableBody = createRepairTable(repairs);
        // console.log(tableBody)

        const pdfDoc = createReportPdf(tableBody, startDate, endDate);


        const filename = `Report_${startDate}_to_${endDate}.pdf`;
        console.log(filename)


        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');

        pdfDoc.pipe(res);
        pdfDoc.end();

    } catch (error) {
        if (error.message === 'Failed to retrieve REPAIR data') {
            console.error('Failed to retrieve REPAIR data. Please check your internet connection and try again.');
            res.status(500).send('Failed to retrieve REPAIR data. Please check your internet connection and try again.');
        } else {
            console.error('An error occurred while generating the PDF:', error);
            res.status(500).send('An error occurred while generating the PDF');
        }
    }
}




module.exports = { httpDownloadReport, httpDownloadPdf };
// ,
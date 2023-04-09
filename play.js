const express = require('express');
const PdfPrinter = require('pdfmake');
const fs = require('fs');
const axios = require('axios');

const app = express();
const port = 3000;

const robotoFont = {
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Bold.ttf'
    }
};

async function getUsers() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return response.data;
    } catch (error) {
        throw new Error('Failed to retrieve user data');
    }
}

function createTable(users) {
    const tableBody = [
        ['Name', 'Username', 'Email', 'City', 'Sign', 'Today', 'Next PPM']
    ];

    users.forEach(user => {
        const today = new Date().toLocaleDateString();
        tableBody.push([user.userId, user.id, user.title, user.body, '', today, today]);
    });

    return tableBody;
}

function createPdf(tableBody) {
    const docDefinition = {
        content: [{
                columns: [{
                        image: 'logo.png',
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
                    }
                ]
            },
            {
                margin: [20, 30, 0, 10],
                table: {
                    headerRows: 1,
                    widths: ["*", 'auto', 100, 100, "*", '10%', '10%'],
                    body: tableBody,
                    margin: [0, 0, 0, 5]
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

app.get('/download-pdf', async(req, res) => {
    try {
        const users = await getUsers();
        const tableBody = createTable(users);
        const pdfDoc = createPdf(tableBody);

        const date = new Date().toLocaleDateString().replace(/\//g, "-");
        const filename = `PPM_${date}.pdf`;

        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-Type', 'application/pdf');
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
});


app.listen(port, () => {
    console.log("pdf server listening")
})
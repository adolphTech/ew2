async function getRepairs(startDate, endDate) {
    try {
        const response = await axios.get(`${process.env.DOMAIN}/repair/range?startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to retrieve user data');
    }
}

async function createRepairTable(repairs) {
    const tableBody = [
        ['No', 'Asset Tag', 'Date', 'Area', 'User', 'Nature of Problem', 'Solution', 'ICT Officer']
    ];

    repairs.forEach((repair, index) => {
        tableBody.push([index + 1, repair.assetTag, repair.date, repair.physicalLocation, repair.user, repair.jobDescription, repair.solution, repair.ictOfficer]);
    });

    return tableBody;
}

async function createReportPdf(tableBody) {
    const docDefinition = {
        content: [{
                alignment: 'center',
                image: 'logo.png',
                width: 80,
                margin: [0, 0, 0, 0]
            },
            {
                text: `KENYATTA NATIONAL HOSPITAL \n ICT WORKSHOP - QUARTER REPAIR REPORT (4/6/2022 - 4/11/23 )`,
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
                text: `TOTAL REPAIRS DONE:`,
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
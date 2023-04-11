const express = require("express");



const { httpDownloadReport } = require("./pdf.controller");


const pdfRouter = express.Router();


// pdfRouter.get("/", downloadPdf);
// pdfRouter.get("/", httpDownloadPdf);

pdfRouter.post("/", httpDownloadReport)


module.exports = pdfRouter;
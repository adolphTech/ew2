const express = require("express");



const { httpDownloadPdf } = require("./pdf.controller");


const pdfRouter = express.Router();


// pdfRouter.get("/", downloadPdf);
pdfRouter.get("/", httpDownloadPdf);



module.exports = pdfRouter;
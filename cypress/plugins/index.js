/* eslint-disable no-unused-vars */
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
// eslint-disable-next-line import/no-extraneous-dependencies
// for html report
const ReportGenerator = require("lighthouse/report/generator/report-generator");
// import to access files
const fs = require("fs");
// import to access files
const path = require("path");

// dir of cypress/reports
const outDir = "cypress/reports";

module.exports = (on, config) => {
  // before launch
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });
   // on launch
  on("task", {
    lighthouse: lighthouse((lighthouseReport) => {
      // try/catch error handling
      try {
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

        // to rotate logs, uncomment the code below
        /* const lighthouseReports = fs
          .readdirSync(outDir)
          .filter((file) => file.search(/^lighthouse-report.*\.html$/) === 0);
        lighthouseReports
          .reverse()
          .slice(10) // replace 10 with the number of reports to keep
          .forEach((file) => {
            console.log("---- INFO: deleted old lighthouse report file", file);
            fs.unlinkSync(path.join(outDir, file));
          });
        */
        // datestring
        const dateString = new Date().toISOString();
        // create filename
        const fileName = path.join(
          outDir,
          `lighthouse-report-${dateString}.html`
        );
        // write report to file
        fs.writeFileSync(
          fileName,
          ReportGenerator.generateReport(lighthouseReport.lhr, "html")
        );
        console.log("---- INFO: wrote lighthouse report to", fileName);
      } catch (error) {
        console.error(
          "---- ERROR: failed to generate lighthouse report",
          error
        );
      }
    }),
  });
};

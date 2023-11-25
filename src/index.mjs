'use strict';

import path from 'path';
import fs from 'fs/promises';
import libre from 'libreoffice-convert';
import util from 'util';

libre.convertAsync = util.promisify(libre.convert);

async function main() {
  const ext = '.pdf';
  const inputPath = path.join(
    '/Users/evachng/Documents/dev/project/csoss/frontend/packages/coss/xxx.docx'
  );
  const outputPath = path.join(
    `/Users/evachng/Documents/dev/project/csoss/frontend/packages/coss/example${ext}`
  );

  // Read file
  const docxBuf = await fs.readFile(inputPath);

  // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
  let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);

  // Here in done you have pdf file which you can save or transfer in another stream
  await fs.writeFile(outputPath, pdfBuf);
}

main().catch(function (err) {
  console.log(`Error converting file: ${err}`);
});

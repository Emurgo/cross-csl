const baseDir = 'dist'; // HARD-CODING THIS FOR NOW

const glob = require("glob");
const fs = require('fs');
const path = require("path");
const { compiler, beautify } = require('flowgen');

const toFlowFilePath = function (tsFilePath) {
  const dirPath = path.dirname(tsFilePath);
  const fileName = path.basename(tsFilePath);
  const flowFileName = fileName.replace('.d.ts', '.js.flow');
  const flowRelativeFilePath = path.join(dirPath, flowFileName);

  return flowRelativeFilePath;
};

const getFlowDef = function (tsDefPath) {
  const flowDef = compiler.compileDefinitionFile(tsDefPath);
  const readableDef = beautify(flowDef);

  const fullDef = `// @flow

${readableDef}`;

  return fullDef;
};

const getDirectories = function (src, callback) {
  glob(src + '/**/*.d.ts', callback);
};

getDirectories(baseDir, function (err, res) {
  if (err) {
    console.log('Error', err);
  } else {
    for (const relativePath of res) {
      const filePath = toFlowFilePath(relativePath);
      const flowDef = getFlowDef(relativePath);
      
      fs.writeFileSync(filePath, flowDef);
    }
  }
});

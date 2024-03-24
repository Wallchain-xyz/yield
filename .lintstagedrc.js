const path = require('path');

const buildEslintCommand = filenames => {
  const relativeFilePaths = filenames.map(filename => path.relative(process.cwd(), filename));
  return `eslint --fix ${relativeFilePaths.join(' ')}`;
};

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*.css': 'stylelint --fix',
};

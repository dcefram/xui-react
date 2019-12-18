const fs = require('fs');

const packageJson = {
  name: '@dcefram/xjs-react',
  version: '0.1.2',
  license: 'MIT',
  repository: {
    type: 'git',
    url: 'https://github.com/dcefram/xjs-react.git'
  },
  homepage: 'https://github.com/dcefram/xjs-react.git',
  dependencies: {
    '@emotion/core': '^10.0.22',
    '@emotion/styled': '^10.0.14',
    polished: '^3.4.2',
    react: '^16.8.6',
    'react-dom': '^16.8.6',
    'react-useportal': '^1.0.13',
    scheduler: '^0.15.0'
  }
};

// Bump version number based on current package.json's version
const parentPackageJsonString = fs.readFileSync(`${process.cwd()}/package.json`, 'utf8');
const parentPackageJson = JSON.parse(parentPackageJsonString);
const buildPackageJson = {
  ...packageJson,
  version: parentPackageJson.version
};

fs.writeFileSync(
  `${process.cwd()}/build/package.json`,
  JSON.stringify(buildPackageJson, null, 2),
  'utf8'
);

const readme = fs.readFileSync(`${process.cwd()}/tools/README.md`, 'utf8');
fs.writeFileSync(`${process.cwd()}/build/README.md`, readme);

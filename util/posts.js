import preval from 'preval.macro';

export default preval`
  const fs = require('fs');

  module.exports = fs
    .readdirSync(__dirname + '/../docs/posts')
    .map(path => ({
      id: path.toLowerCase().replace(/\.md$/, ''),
      title: path.replace(/-/g, ' ').replace(/\.md$/, ''),
      path
    }));
`;

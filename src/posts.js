import preval from 'preval.macro';

export default preval`
  const fs = require('fs');
  const matter = require('gray-matter');

  module.exports = fs
    .readdirSync(__dirname + '/../docs/posts')
    .map(path => {
      const content = fs.readFileSync(__dirname + '/../docs/posts/' + path, 'utf8');
      const data = matter(content).data;

      return {
        id: path.toLowerCase().replace(/\.md$/, ''),
        path,
        data
      };
    });
`;

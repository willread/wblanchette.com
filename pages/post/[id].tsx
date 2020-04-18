import matter from 'gray-matter';
import  React from 'react';
import Markdown from 'react-markdown';

import Layout from '../../components/Layout';
import posts from '../../src/posts';
import { Post } from '../../src/types';

type PostProps = {
  post: Post,
  content: any
};

export default class extends React.Component<PostProps> {
  static async getInitialProps({ query }) {
    let content, post;

    try {
      post = posts.find(p => p.id === query.id);

      if (!post) {
        throw(new Error());
      } else {
        content = (await require(`../../docs/posts/${post.path}`)).default;
      }
    } catch (e) {
      content = 'Not found';
    }

    return { content: matter(content).content, post };
  }

  render() {
    return (
      <Layout>
        <div>
          <h1>{ this.props.post.data.title }</h1>
          <Markdown
            source={this.props.content}
          />
        </div>
        <style jsx global>{`
        `}</style>
      </Layout>
    );
  }ß
};

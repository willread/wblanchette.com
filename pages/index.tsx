import Link from 'next/link';
import useSWR from 'swr';

import Layout from '../components/Layout';
import posts from '../src/posts';
import './index.scss';

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

const PostLink = ({ post }) => (
    <li>
      <Link href="/post/[id]" as={`/post/${post.id}`}>
        <a>
          {post.data.title}
          <span className='date'> / {post.data.date}</span>
        </a>
      </Link>
    </li>
);

export default function Blog() {
  const { data, error } = useSWR(
    `/api/stats`,
    fetcher
  );

  return (
    <Layout>
      <section className='index'>
        <div className='col'>
          <h1 className='logo'>Will Read</h1>
          <h2 className='title'>web developer</h2>
        </div>

        <div className='col'>
          <section>
            <h1 className='section-header'>About Me</h1>

            <div className='stats'>
              <a href="https://github.com/willread" target="_blank" className='stat'>
                <h1>{ data ? data.repos : '' }</h1>
                <h2>github repos</h2>
              </a>

              <div className='stat'>
                <h1>{ data ? data.repos : '' }</h1>
                <h2>github repos</h2>
              </div>

              <div className='stat'>
                <h1>{ data ? data.repos : '' }</h1>
                <h2>github repos</h2>
              </div>

              <div className='stat'>
                <h1>{ data ? data.repos : '' }</h1>
                <h2>github repos</h2>
              </div>

              <div className='stat'>
                <h1>{ data ? data.repos : '' }</h1>
                <h2>github repos</h2>
              </div>

              <div className='stat'>
                <h1>{ data ? data.repos : '' }</h1>
                <h2>github repos</h2>
              </div>
            </div>
          </section>

          <section>
            <h1 className='section-header'>Latest Articles</h1>

            <ul className='articles'>
              {posts.map(post => (
                <PostLink key={post.id} post={post} />
              ))}
            </ul>
          </section>
        </div>
      </section>
    </Layout>
  );
}

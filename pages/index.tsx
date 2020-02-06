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
      <Link href='/post/[id]' as={`/post/${post.id}`}>
        <a>
          {post.data.title}
          <span className='date'> / {post.data.date}</span>
        </a>
      </Link>
    </li>
);

export default function Blog() {
  const repos = useSWR(`/api/stats/repos`, fetcher).data;
  const beers = useSWR(`/api/stats/beers`, fetcher).data;
  const songs = useSWR(`/api/stats/songs`, fetcher).data;
  const games = useSWR(`/api/stats/games`, fetcher).data;
  const books = useSWR(`/api/stats/books`, fetcher).data;

  return (
    <Layout>
      <section className='index'>
        <div className='cols'>
          <div className='col'>
            <h1 className='logo'>Will Read</h1>
            <h2 className='title'>web developer</h2>
          </div>

          <div className='col'>
            <section>
              <h1 className='section-header'>About Me</h1>

              <div className='stats'>
                <a href='https://github.com/willread' target='_blank' className={`stat ${repos ? '' : 'loading'}`}>
                  <span className='loading-animation'></span>
                  <h1>{ repos ? repos.value : '' }</h1>
                  <h2>github repos</h2>
                </a>
                <a href='https://untappd.com/user/williamread' target='_blank' className={`stat ${beers ? '' : 'loading'}`}>
                  <span className='loading-animation'></span>
                  <h1>{ beers ? beers.value : '' }</h1>
                  <h2>untappd checkins</h2>
                </a>
                <a href='http://soundcloud.com/will_read' target='_blank' className={`stat ${songs ? '' : 'loading'}`}>
                  <span className='loading-animation'></span>
                  <h1>{ songs ? songs.value : '' }</h1>
                  <h2>soundcloud tracks</h2>
                </a>
                <a href='https://steamcommunity.com/id/mr-bill/' target='_blank' className={`stat ${games ? '' : 'loading'}`}>
                  <span className='loading-animation'></span>
                  <h1>{ games ? games.value : '' }</h1>
                  <h2>steam games</h2>
                </a>
                <a href='https://www.goodreads.com/user/show/12302339-william' target='_blank' className={`stat ${books ? '' : 'loading'}`}>
                  <span className='loading-animation'></span>
                  <h1>{ books ? books.value : '' }</h1>
                  <h2>books read</h2>
                </a>
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
        </div>
      </section>
    </Layout>
  );
}

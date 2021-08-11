import Link from 'next/link';
import useSWR from 'swr';

import Layout from '../components/Layout';
import posts from '../src/posts';
import styles from './index.module.scss';

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

const PostLink = ({ post }) => (
    <li>
      <Link href='/post/[id]' as={`/post/${post.id}`}>
        <a>
          {post.data.title}
          <span className='meta'> / {post.data.date}</span>
        </a>
      </Link>
    </li>
);

const ToolLink = ({ id, title }) => (
  <li>
    <Link href='/tools/[id[' as={`/tools/${id}`}>
      <a>
        {title}
      </a>
    </Link>
  </li>
);

export default function Blog() {
  const commits = useSWR(`/api/stats/commits`, fetcher).data;
  const beers = useSWR(`/api/stats/beers`, fetcher).data;
  const songs = useSWR(`/api/stats/songs`, fetcher).data;
  const games = useSWR(`/api/stats/games`, fetcher).data;
  const books = useSWR(`/api/stats/books`, fetcher).data;

  return (
    <Layout noHeader>
      <section className={styles.index}>
        <div className={styles.wrapper}>
          <h1 className={styles.logo}>
            Will Read
          </h1>

          <section>
            <h1 className={styles.sectionHeader}>About Me</h1>

            <div className={styles.text}>
              <p>I'm a web developer from Calgary, AB, Canada with almost 20 years of experience working with more technologies than you can shake a stick at.</p>
            </div>

            <h1 className={styles.sectionHeader}>Articles</h1>

            <ul className={styles.articles}>
              {posts.map(post => (
                <PostLink key={post.id} post={post} />
              ))}
            </ul>

            <h1 className={styles.sectionHeader}>Stats</h1>

            <div className={styles.stats}>
              <a href='https://github.com/willread' target='_blank' className={`${styles.stat} ${commits ? '' : styles.loading}`}>
                <span className={styles.loadingAnimation}></span>
                <h1>{ commits ? commits.value : '' }</h1>
                <h2>git commits</h2>
              </a>
              <a href='https://untappd.com/user/williamread' target='_blank' className={`${styles.stat} ${beers ? '' : styles.loading}`}>
                <span className={styles.loadingAnimation}></span>
                <h1>{ beers ? beers.value : '' }</h1>
                <h2>untappd checkins</h2>
              </a>
              <a href='http://soundcloud.com/will_read' target='_blank' className={`${styles.stat} ${songs ? '' : styles.loading}`}>
                <span className={styles.loadingAnimation}></span>
                <h1>{ songs ? songs.value : '' }</h1>
                <h2>soundcloud tracks</h2>
              </a>
              <a href='https://steamcommunity.com/id/mr-bill/' target='_blank' className={`${styles.stat} ${games ? '' : styles.loading}`}>
                <span className={styles.loadingAnimation}></span>
                <h1>{ games ? games.value : '' }</h1>
                <h2>steam games</h2>
              </a>
              <a href='https://www.goodreads.com/user/show/12302339-william' target='_blank' className={`${styles.stat} ${books ? '' : styles.loading}`}>
                <span className={styles.loadingAnimation}></span>
                <h1>{ books ? books.value : '' }</h1>
                <h2>books read</h2>
              </a>
            </div>
          </section>

          <section>
            <h1 className={styles.sectionHeader}>Tools</h1>

            <ul className={styles.articles}>
              <ToolLink id='dotted-underlines' title='Dotted Underline CSS Generator'></ToolLink>
            </ul>
          </section>

          <section>
            <h1 className={styles.sectionHeader}>Contact Me</h1>

            <div className={styles.contact}>
              <a href='mailto:hello@willread.ca'>Drop me a line at <span className={styles.meta}>hello@willread.ca</span></a>
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
}

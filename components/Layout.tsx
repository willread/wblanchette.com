import Head from 'next/head';

import Header from './Header';
import './Layout.scss';

const Layout = props => (
  <div>
    <Head>
      <title>willread.ca</title>
    </Head>
    <Header />
    {props.children}
  </div>
);

export default Layout;

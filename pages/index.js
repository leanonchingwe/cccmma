import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index({ posts, globalData }) {
  return (
    <Layout className="container">
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <main className="row">
        <div className="col-lg-12 text-center mb-5">
          <h1 className="display-4">{globalData.blogTitle}</h1>
        </div>
        <ul className="list-unstyled w-100">
          {posts.map((post) => (
            <li key={post.filePath} className="border-bottom mb-4 pb-4">
              <Link as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`} href={`/posts/[slug]`}>
                <a className="d-block mb-2">
                  {post.data.date && (
                    <p className="text-uppercase mb-0 font-weight-bold opacity-60">{post.data.date}</p>
                  )}
                  <h2 className="h4">{post.data.title}</h2>
                  {post.data.description && (
                    <p className="mt-2 mb-0 text-muted">{post.data.description}</p>
                  )}
                </a>
              </Link>
              <ArrowIcon className="mt-2" />
            </li>
          ))}
        </ul>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground variant="large" className="fixed top-20 opacity-40" />
      <GradientBackground variant="small" className="absolute bottom-0 opacity-20" />
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}

import Link from 'next/link';
import { getGlobalData } from '../../utils/global-data';
import { getNextPostBySlug, getPostBySlug, getPreviousPostBySlug, postFilePaths } from '../../utils/mdx-utils';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import ArrowIcon from '../../components/ArrowIcon';
import CustomLink from '../../components/CustomLink';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';

const components = {
  a: CustomLink,
  Head,
};

export default function PostPage({
  source,
  frontMatter,
  prevPost,
  nextPost,
  globalData,
}) {
  return (
    <Layout className="container">
      <SEO
        title={`${frontMatter.title} - ${globalData.name}`}
        description={frontMatter.description}
      />
      <Header name={globalData.name} />
      <div className="container py-5">
        <div className="text-center">
          <h1 className="display-4">{frontMatter.title}</h1>
          {frontMatter.description && (
            <p className="lead">{frontMatter.description}</p>
          )}
        </div>
        <main>
          <div className="prose dark:prose-dark">
            <MDXRemote {...source} components={components} />
          </div>
        </main>
        <div className="row mt-5">
          {prevPost && (
            <div className="col-md-6">
              <Link href={`/posts/${prevPost.slug}`}>
                <a className="card bg-light p-4 text-center">
                  <p className="text-uppercase text-muted mb-3">Previous</p>
                  <h4 className="card-title">{prevPost.title}</h4>
                  <ArrowIcon className="mt-3" />
                </a>
              </Link>
            </div>
          )}
          {nextPost && (
            <div className="col-md-6">
              <Link href={`/posts/${nextPost.slug}`}>
                <a className="card bg-light p-4 text-center">
                  <p className="text-uppercase text-muted mb-3">Next</p>
                  <h4 className="card-title">{nextPost.title}</h4>
                  <ArrowIcon className="mt-3" />
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="absolute -top-32 opacity-30 dark:opacity-50"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const globalData = getGlobalData();
  const { mdxSource, data } = await getPostBySlug(params.slug);
  const prevPost = getPreviousPostBySlug(params.slug);
  const nextPost = getNextPostBySlug(params.slug);

  return {
    props: {
      globalData,
      source: mdxSource,
      frontMatter: data,
      prevPost,
      nextPost,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

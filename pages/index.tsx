import LandingPage from "@sections/LandingPage/LandingPage";

export default function IndexPage() {
  return <LandingPage />;
}

export async function getStaticProps() {
  return {
    props: {},
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

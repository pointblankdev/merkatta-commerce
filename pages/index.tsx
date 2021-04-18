import { getWhyNextReasons } from "../lib/api";

export default function IndexPage({ reasons }) {
  return (
    <div>
      <div className="container px-8 py-20 mx-auto font-medium font-poppins">
        <h1 className="mb-16 text-5xl text-center text-accent-1 text-teal">
          Why Next.js?
        </h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reasons.slice(0, reasons.length - 1).map(({ title, description, href }) => (
            <a
              className="p-4 border rounded border-grey-200 hover:shadow-lg hover:border-transparent"
              key={title}
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              <h3 className="mb-2 font-bold">{title}</h3>
              <div dangerouslySetInnerHTML={{ __html: description }} />
              <span className="block mt-4 text-blue-600 hover:text-blue-400 hover:underline">
                Documentation →
              </span>
            </a>
          ))}
        </div>
        <div className="mt-8 text-center">
          {reasons.slice(reasons.length - 1).map(({ title, description }) => (
            <div className="markdown inline-p" key={title}>
              <strong>{title}</strong>{" "}
              <span dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const reasons = await getWhyNextReasons();

  return {
    props: {
      reasons,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

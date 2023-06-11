import type { NextPage } from "next";
import Head from "next/head";
import Remote from "@everyworkflow/panel-bundle/service/remote";
import PageBuilderComponent from "@everyworkflow/page-builder-bundle/component/page-builder-component";
import Error404Component from "@everyworkflow/panel-bundle/component/error-404-component";

const AllPage: NextPage = ({ state, data }: any) => {
  if (state === "complete" && data) {
    return (
      <>
        <Head>
          <title>{data.meta_title}</title>
        </Head>
        <PageBuilderComponent pageBuilderData={data?.item?.page_builder_data} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>404 - EveryWorkflow</title>
      </Head>
      <Error404Component />
    </>
  );
};

export async function getServerSideProps(context: any) {
  // context.res.setHeader(
  //     'Cache-Control',
  //     'public, s-maxage=10, stale-while-revalidate=59'
  // );

  let currentPathName = "/" + context.params.all.join("/");
  if (currentPathName !== "/[...all]") {
    if (currentPathName === "/") {
      currentPathName = "/home";
    }
    try {
      const response = await Remote.get(`/url-rewrite${currentPathName}`);
      return {
        props: {
          data: response,
          state: "complete",
        },
      };
    } catch (error: any) {
      return {
        props: {
          state: "404",
        }, // will be passed to the page component as props
      };
    }
  }
}

export default AllPage;

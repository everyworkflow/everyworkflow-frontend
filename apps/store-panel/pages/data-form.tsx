import DataFormPage from "@everyworkflow/store-panel-bundle/page/example/data-form-page";
import { FormData } from "@everyworkflow/store-panel-bundle/page/example/data-form-page/form-data";
import type { NextPage } from "next";
import Head from "next/head";

const DataForm: NextPage = ({ apiData }: any) => {
    return (
        <>
            <Head>
                <title>StoreFront</title>
            </Head>
            <DataFormPage apiData={apiData} />
        </>
    );
};

export async function getServerSideProps(context: any) {
    return {
        props: {
            apiData: FormData,
        }, // will be passed to the page component as props
    }
}

export default DataForm;

import { useParams } from "react-router-dom";

const ReportPage = () => {
    const params = useParams();
    console.log(params)

    return <>{params.testrunid}</>

}

export default ReportPage;
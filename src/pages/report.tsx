import { useParams } from "react-router-dom";

const ReportPage = () => {
    const params = useParams();

    return <>{params.testrunid}</>

}

export default ReportPage;
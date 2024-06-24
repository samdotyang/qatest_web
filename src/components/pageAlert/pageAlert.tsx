import { Alert } from "reactstrap";
import { PageAlertContext } from "@/contexts/pageAlertContext";

export default function PageAlert() {
  return (
    <PageAlertContext.Consumer>
      {(context) =>
        context?.showAlert && (
          <Alert
            color={context.alertContent.type}
            fade={false}
            isOpen={context.showAlert}
            toggle={context.closeAlert}
          >
            {context.alertContent.message}
          </Alert>
        )
      }
    </PageAlertContext.Consumer>
  );
}

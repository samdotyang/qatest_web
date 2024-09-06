import Alert from "@mui/material/Alert";
import { PageAlertContext } from "@/contexts/pageAlertContext";

export default function PageAlert() {
  return (
    <PageAlertContext.Consumer>
      {(context) =>
        context?.showAlert && (
          <Alert
            severity={context.alertContent.type}
            onClose={context.closeAlert}
          >
            {context.alertContent.message}
          </Alert>
        )
      }
    </PageAlertContext.Consumer>
  );
}

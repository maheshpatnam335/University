import { handleError } from "./Sweetalert";

export const displayBackendError = (error) => {
    if (error.response.data.messages) {
        if (error.response.data.messages.length > 0) {
            return handleError(error.response.data.messages[0].messageContent);
        }
    }
    if (error.response.data.length > 0) {
        return handleError(error.response.data[0].messageContent);
    }
    if (error.response.status === 500) {
        handleError(error.response.data ? error.response.data : "Sorry an error occured ")
    }
    if (error.response.status === 404) {
        handleError(error.response.data ? error.response.data : "Sorry an error occurred.");
        return;
    } else if (error.response.status === 400) {
        handleError(error.response.data ? error.response.data : "Sorry an error occurred.");
        return;
    } else if (error.response.status === 403) {
        handleError(error.response.data ? error.response.data : "Sorry! you do not have permission.");
        return;
    } else {
        handleError("Sorry, an error occurred while processing your request.");
    }
}


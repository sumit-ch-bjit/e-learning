import { Response } from "express"

interface IResponseObj {
    status: number,
    success: boolean,
    message: string,
    data: object | null,
    error: object | undefined | null
}

const sendResponse = (res: Response, status: number, message: string, result: any = null) => {
    let response: IResponseObj = {
        status: status,
        success: status < 400,
        message:
            status >= 400
                ? "Internal server error"
                : "Successfully completed operations",
        data: status < 400 ? result : null,
        error: status >= 400 ? result : undefined,
    };

    if (message) {
        response.message = message;
    }
    res.status(status).send(response);
};

export default sendResponse
import { body, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express';
import sendResponse from '../utils/common';
import HTTP_STATUS from '../constants/statusCodes';

const userValidationRules = () => {
    return [
        body("username")
            .exists()
            .notEmpty()
            .isAlphanumeric()
            .withMessage("cannot be empty and must be alphanumeric")
            .bail(),
        body("email").isEmail().withMessage("Invalid Email").bail(),
        body("password")
            .isStrongPassword({
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minSymbols: 1,
            })
            .withMessage(
                "password should be 8 character long and must contain 1 lowercase, 1 uppercase and 1 symbol"
            )
            .bail(),
        body("role")
            .optional()
            .custom((value) => {
                if (value && !["student", "instructor", "admin"].includes(value.toLowerCase())) {
                    throw new Error("Invalid user type");
                }
                return true;
            })
            .bail(),
        body("firstName").notEmpty().withMessage("fistname cannot be empty"),
        body("lastName").notEmpty().withMessage("lastname cannot be empty"),
        // Add more validation for address fields if needed
    ];
};


const validate = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors: string[] = errors.array().map((err) => {
        // console.log(err);
        return err.msg; // Assuming the error message is of type string
    });

    // res.status(422).json({
    //     errors: extractedErrors,
    // });
    return sendResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "cannot process", extractedErrors);
};


export { userValidationRules, validate };
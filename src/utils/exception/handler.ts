import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        // Default status code
        let status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        // Default error message
        let message = exception.message || 'Internal server error';

        // Handle Mongoose Validation Errors
        if (exception.name === 'ValidationError') {
            message = Object.keys(exception.errors).reduce((acc: any, key: string) => {
                acc[key] = exception.errors[key].message;
                return acc;
            }, {});
            status = HttpStatus.UNPROCESSABLE_ENTITY
        }

        // Handle other specific errors if needed
        if (exception.response && exception.response.message) {
            message = exception.response.message;
        }

        // Log the error (optional)
        // console.error('Exception caught:', exception);

        // Send the response
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }
}
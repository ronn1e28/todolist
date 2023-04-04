class HttpException {
    message = '';
    status = 500
    constructor(message:string, status:number) {
        this.message = message;
        this.status = status;
    }
}

export default HttpException
class ErrorHandler extends Error{
    constructor(message,statuscode,stack=""){
        super(message)
        this.statuscode = statuscode
        //Unused the code
        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
        //
    }
}

  export default ErrorHandler
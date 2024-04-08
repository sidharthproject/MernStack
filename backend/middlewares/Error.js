class ErrorHandler extends Error{
    constructor(message,statuscode=500){
        super(message)
        this.statuscode = statuscode
        
    }
}

    
   


  export default ErrorHandler
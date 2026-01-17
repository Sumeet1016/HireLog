package com.HireLog.HireLog.Exception;
import java.util.HashMap;
import java.util.Map;
import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;
import jakarta.validation.ConstraintViolationException;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity <ErrorResponse> handleResponseStatusException(
        ResponseStatusException ex,
        HttpServletRequest request){

            ErrorResponse error=new ErrorResponse(
                LocalDateTime.now(),
                ex.getStatusCode().value(),
                ex.getStatusCode().toString(),
                ex.getReason(),
                request.getRequestURI()
            );

            return new ResponseEntity<>(error,ex.getStatusCode());
        }

        @ExceptionHandler(Exception.class)
        public ResponseEntity<ErrorResponse> handleGenericException(
            Exception ex,
            HttpServletRequest request){
                    ErrorResponse error =new ErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.INTERNAL_SERVER_ERROR.value(),
                        HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                        ex.getMessage(),
                        request.getRequestURI()
                    );

                    return new ResponseEntity<>(error,HttpStatus.INTERNAL_SERVER_ERROR);
            }

            @ExceptionHandler(MethodArgumentNotValidException.class)
            public ResponseEntity<Map<String,String>> handleValidationErrors(
                MethodArgumentNotValidException ex
            ){
                Map<String,String> errors=new HashMap<>();

                ex.getBindingResult()
                .getFieldErrors()
                .forEach(error->
                     errors.put(error.getField(),
            error.getDefaultMessage()));
                    return ResponseEntity.badRequest().body(errors);
            }

            @ExceptionHandler(ConstraintViolationException.class)
            public ResponseEntity<Map<String, String>> handleConstraintViolation(
                    ConstraintViolationException ex) {

                Map<String, String> errors = new HashMap<>();

                ex.getConstraintViolations().forEach(violation -> {
                    String field = violation.getPropertyPath().toString();
                    errors.put(field, violation.getMessage());
                });

                return ResponseEntity.badRequest().body(errors);
            }

}

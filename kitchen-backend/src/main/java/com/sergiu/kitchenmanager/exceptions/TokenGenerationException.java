package com.sergiu.kitchenmanager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class TokenGenerationException extends RuntimeException{
  public TokenGenerationException(String msg){
    super(msg);
  }
}

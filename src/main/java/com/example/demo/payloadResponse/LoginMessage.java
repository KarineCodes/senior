package com.example.demo.payloadResponse;

public class LoginMessage {
    String message;
    Boolean status;
    long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

	public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public LoginMessage(String message, Boolean status, long id) {
        this.message = message;
        this.status = status;
        this.id = id;
    }
}

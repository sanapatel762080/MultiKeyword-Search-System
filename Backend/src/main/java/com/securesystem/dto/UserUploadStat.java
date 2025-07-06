package com.securesystem.dto;


public class UserUploadStat {
    private String email;
    private long fileCount;

    public UserUploadStat(String email, long fileCount) {
        this.email = email;
        this.fileCount = fileCount;
    }

    public String getEmail() { return email; }
    public long getFileCount() { return fileCount; }
}


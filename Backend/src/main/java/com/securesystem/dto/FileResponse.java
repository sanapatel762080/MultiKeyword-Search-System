package com.securesystem.dto;


public class FileResponse {
    private Long id;
    private String filename;
    private String encryptedKeywords;
    private String uploadedBy;

    // constructor
    public FileResponse(Long id, String filename, String encryptedKeywords, String uploadedBy) {
        this.id = id;
        this.filename = filename;
        this.encryptedKeywords = encryptedKeywords;
        this.uploadedBy = uploadedBy;
    }

	public Long getId() {
		return id;
	}

	public String getFilename() {
		return filename;
	}

	public String getEncryptedKeywords() {
		return encryptedKeywords;
	}

	public String getUploadedBy() {
		return uploadedBy;
	}

    
}

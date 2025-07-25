package com.securesystem.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
	public class FileData {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String filename;
	    private String encryptedKeywords;

	    private String uploadedBy; // user email

	    @Lob
	    private byte[] content;
	    
	    @CreationTimestamp
	    private LocalDateTime uploadDate;


		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getFilename() {
			return filename;
		}

		public void setFilename(String filename) {
			this.filename = filename;
		}

		public String getEncryptedKeywords() {
			return encryptedKeywords;
		}

		public void setEncryptedKeywords(String encryptedKeywords) {
			this.encryptedKeywords = encryptedKeywords;
		}

		public String getUploadedBy() {
			return uploadedBy;
		}

		public void setUploadedBy(String uploadedBy) {
			this.uploadedBy = uploadedBy;
		}

		public byte[] getContent() {
			return content;
		}

		public void setContent(byte[] content) {
			this.content = content;
		}

	    
	}




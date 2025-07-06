package com.securesystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.securesystem.dto.UserUploadStat;
import com.securesystem.model.FileData;

public interface FileRepository extends JpaRepository<FileData, Long>{

    List<FileData> findByUploadedBy(String email);

    @Query("SELECT new com.securesystem.dto.UserUploadStat(f.uploadedBy, COUNT(f)) " +
    	       "FROM FileData f GROUP BY f.uploadedBy")
    	List<UserUploadStat> countFilesByUser();

}

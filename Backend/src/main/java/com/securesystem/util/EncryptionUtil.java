package com.securesystem.util;


import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class EncryptionUtil {
    private static final String KEY = "MySecretKey12345"; // 16 chars for AES

    public static String encrypt(String input) throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(KEY.getBytes(), "AES");
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        byte[] encrypted = cipher.doFinal(input.getBytes());
        return Base64.getEncoder().encodeToString(encrypted);
    }

    public static String decrypt(String encrypted) throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(KEY.getBytes(), "AES");
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        byte[] decoded = Base64.getDecoder().decode(encrypted);
        return new String(cipher.doFinal(decoded));
    }
    
    public static String encryptKeywords(String keywords) throws Exception {
        String[] keywordArray = keywords.split(",");
        List<String> encryptedList = new ArrayList<>();

        for (String keyword : keywordArray) {
            String clean = keyword.trim().toLowerCase(); // normalize
            encryptedList.add(encrypt(clean));
        }

        return String.join(",", encryptedList); // return comma-separated encrypted keywords
    }


}

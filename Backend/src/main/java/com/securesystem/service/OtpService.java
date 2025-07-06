package com.securesystem.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import org.springframework.stereotype.Service;

@Service
public class OtpService {
    private Map<String, String> otpMap = new HashMap<>();

    public String generateOtp(String email) {
        String otp = String.valueOf(new Random().nextInt(899999) + 100000); // 6-digit
        otpMap.put(email, otp);
        return otp;
    }

    public boolean validateOtp(String email, String otp) {
        return otpMap.containsKey(email) && otpMap.get(email).equals(otp);
    }

    public void clearOtp(String email) {
        otpMap.remove(email);
    }
}


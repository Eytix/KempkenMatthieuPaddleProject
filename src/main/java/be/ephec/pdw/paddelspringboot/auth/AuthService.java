package be.ephec.pdw.paddelspringboot.auth;

import be.ephec.pdw.paddelspringboot.auth.LoginRequest;
import be.ephec.pdw.paddelspringboot.auth.LoginResponse;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public LoginResponse login(LoginRequest request) {

        if (
                request.identifier().equals("ADMIN")
                        && request.password().equals("admin")
        ) {
            return new LoginResponse(
                    "A001",
                    "Admin",
                    "Test",
                    "ADMIN"
            );
        }

        return null;
    }
}
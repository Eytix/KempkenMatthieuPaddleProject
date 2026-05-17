package be.ephec.pdw.paddelspringboot.admin;

import java.time.LocalDateTime;

public record Admin(
        String id,
        String type,
        String email,
        String firstName,
        String lastName,
        String password,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
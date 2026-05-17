package be.ephec.pdw.paddelspringboot.auth;

public record LoginResponse(
        String id,
        String firstName,
        String lastName,
        String role
) {
}
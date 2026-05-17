package be.ephec.pdw.paddelspringboot.auth;

public record LoginRequest(
        String identifier,
        String password
) {
}
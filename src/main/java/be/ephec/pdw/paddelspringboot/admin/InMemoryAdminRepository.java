package be.ephec.pdw.paddelspringboot.admin;

import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class InMemoryAdminRepository
        implements AdminRepository {

    private final List<Admin> admins =
            new ArrayList<>();

    public InMemoryAdminRepository() {

        admins.add(
                new Admin(
                        "A0001",
                        "GLOBAL",
                        "admin@paddle.com",
                        "Admin",
                        "Test",
                        "adminpass",
                        LocalDateTime.now(),
                        LocalDateTime.now()
                )
        );
    }

    @Override
    public List<Admin> findAll() {
        return admins;
    }

    @Override
    public Optional<Admin> findById(String id) {

        return admins.stream()
                .filter(admin -> admin.id().equals(id))
                .findFirst();
    }

    @Override
    public Admin save(Admin admin) {

        admins.add(admin);

        return admin;
    }
}
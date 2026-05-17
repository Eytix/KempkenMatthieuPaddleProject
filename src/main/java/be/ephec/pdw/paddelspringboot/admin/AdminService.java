package be.ephec.pdw.paddelspringboot.admin;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository repository;

    public AdminService(
            AdminRepository repository
    ) {
        this.repository = repository;
    }

    public List<Admin> getAll() {
        return repository.findAll();
    }

    public Optional<Admin> getById(String id) {
        return repository.findById(id);
    }

    public Admin create(Admin admin) {
        return repository.save(admin);
    }
}
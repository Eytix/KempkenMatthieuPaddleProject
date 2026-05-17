package be.ephec.pdw.paddelspringboot.admin;

import java.util.List;
import java.util.Optional;

public interface AdminRepository {

    List<Admin> findAll();

    Optional<Admin> findById(String id);

    Admin save(Admin admin);
}
package be.ephec.pdw.paddelspringboot.admin;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admins")
public class AdminController {

    private final AdminService service;

    public AdminController(
            AdminService service
    ) {
        this.service = service;
    }

    @GetMapping
    public List<Admin> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Admin> getById(
            @PathVariable String id
    ) {
        return service.getById(id);
    }

    @PostMapping
    public Admin create(
            @RequestBody Admin admin
    ) {
        return service.create(admin);
    }
}
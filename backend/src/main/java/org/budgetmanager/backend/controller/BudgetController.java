package org.budgetmanager.backend.controller;

import lombok.RequiredArgsConstructor;
import org.budgetmanager.backend.dto.BudgetDTO;
import org.budgetmanager.backend.service.BudgetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@RequiredArgsConstructor
@CrossOrigin
public class BudgetController {

    private final BudgetService service;

    @PostMapping
    public ResponseEntity<BudgetDTO> create(@RequestBody BudgetDTO dto) {
        return ResponseEntity.ok(service.createBudget(dto));
    }

    @GetMapping
    public ResponseEntity<List<BudgetDTO>> getAll() {
        return ResponseEntity.ok(service.getAllBudgets());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BudgetDTO> update(@PathVariable Long id, @RequestBody BudgetDTO dto) {
        return ResponseEntity.ok(service.updateBudget(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteBudget(id);
        return ResponseEntity.noContent().build();
    }
}

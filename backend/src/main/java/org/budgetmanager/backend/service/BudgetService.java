package org.budgetmanager.backend.service;

import org.budgetmanager.backend.dto.BudgetDTO;

import java.util.List;

public interface BudgetService {
    BudgetDTO createBudget(BudgetDTO dto);
    List<BudgetDTO> getAllBudgets();
    BudgetDTO updateBudget(Long id, BudgetDTO dto);
    void deleteBudget(Long id);
}

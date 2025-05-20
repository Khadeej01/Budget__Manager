package org.budgetmanager.backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.budgetmanager.backend.dto.BudgetDTO;
import org.budgetmanager.backend.entity.Budget;
import org.budgetmanager.backend.entity.Category;
import org.budgetmanager.backend.mapper.BudgetMapper;
import org.budgetmanager.backend.repository.BudgetRepository;
import org.budgetmanager.backend.repository.CategoryRepository;
import org.budgetmanager.backend.service.BudgetService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BudgetServiceImpl implements BudgetService {

    private final BudgetRepository budgetRepo;
    private final CategoryRepository categoryRepo;
    private final BudgetMapper mapper;

    @Override
    public BudgetDTO createBudget(BudgetDTO dto) {
        Category category = categoryRepo.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Catégorie introuvable"));

        Budget budget = Budget.builder()
                .amount(dto.getAmount())
                .category(category)
                .build();

        return mapper.toDTO(budgetRepo.save(budget));
    }

    @Override
    public List<BudgetDTO> getAllBudgets() {
        return budgetRepo.findAll().stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public BudgetDTO updateBudget(Long id, BudgetDTO dto) {
        Budget budget = budgetRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget non trouvé"));

        Category category = categoryRepo.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Catégorie introuvable"));

        budget.setAmount(dto.getAmount());
        budget.setCategory(category);

        return mapper.toDTO(budgetRepo.save(budget));
    }

    @Override
    public void deleteBudget(Long id) {
        budgetRepo.deleteById(id);
    }
}
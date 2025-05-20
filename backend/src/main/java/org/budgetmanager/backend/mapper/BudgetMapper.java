package org.budgetmanager.backend.mapper;

import org.budgetmanager.backend.dto.BudgetDTO;
import org.budgetmanager.backend.entity.Budget;
import org.springframework.stereotype.Component;

@Component
public class BudgetMapper {

    public BudgetDTO toDTO(Budget budget) {
        return BudgetDTO.builder()
                .id(budget.getId())
                .amount(budget.getAmount())
                .categoryId(budget.getCategory().getId())
                .categoryName(budget.getCategory().getName())
                .build();
    }
}

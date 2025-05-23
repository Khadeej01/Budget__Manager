package org.budgetmanager.backend.repository;

import org.budgetmanager.backend.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
}

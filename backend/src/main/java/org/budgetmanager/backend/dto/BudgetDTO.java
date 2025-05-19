package org.budgetmanager.backend.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class BudgetDTO {
    private Long id;
    private double amount;
    private Long categoryId;
    private String categoryName; // utile pour l'affichage
}

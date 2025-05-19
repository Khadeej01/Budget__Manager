package org.budgetmanager.backend.dto;

public class TransactionDTO {
}


package org.budgetmanager.backend.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class TransactionDTO {
    private Long id;
    private Double montant;
    private LocalDate date;    
    private String description;
    private String type;
    private String categorie;
}




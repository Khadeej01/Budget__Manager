
package org.budgetmanager.backend.mapper;


import org.budgetmanager.backend.dto.TransactionDTO;
import org.budgetmanager.backend.entity.Transaction;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TransactionMapper {
    TransactionDTO toDto(Transaction transaction);
    Transaction toEntity(TransactionDTO dto);

}


package org.budgetmanager.backend.mapper;

public class TransactionMapper {


package org.budgetmanager.backend.mapper;

import org.budgetmanager.backend.dto.TransactionDTO;
import org.budgetmanager.backend.entity.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface TransactionMapper {
    TransactionDTO toDto(Transaction transaction);
    Transaction toEntity(TransactionDTO dto);

}

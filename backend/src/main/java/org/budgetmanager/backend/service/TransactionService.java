
package org.budgetmanager.backend.service;

import org.budgetmanager.backend.dto.TransactionDTO;
import org.budgetmanager.backend.entity.Transaction;
import org.budgetmanager.backend.exception.ResourceNotFoundException;
import org.budgetmanager.backend.mapper.TransactionMapper;
import org.budgetmanager.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, TransactionMapper transactionMapper) {
        this.transactionRepository = transactionRepository;
        this.transactionMapper = transactionMapper;
    }

    public TransactionDTO createTransaction(TransactionDTO dto) {
        Transaction transaction = transactionMapper.toEntity(dto);
        Transaction saved = transactionRepository.save(transaction);
        return transactionMapper.toDto(saved);
    }

    public List<TransactionDTO> getAllTransactions(String categorie, String type, LocalDate startDate, LocalDate endDate) {
        return transactionRepository.findAll()
                .stream()
                .filter(transaction ->
                        (categorie == null || categorie.equals(transaction.getCategorie())) &&
                                (type == null || type.equals(transaction.getType())) &&
                                (startDate == null || !transaction.getDate().isBefore(startDate)) &&
                                (endDate == null || !transaction.getDate().isAfter(endDate)))
                .map(transactionMapper::toDto)
                .collect(Collectors.toList());
    }

    public TransactionDTO getTransactionById(Long id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id: " + id));
        return transactionMapper.toDto(transaction);
    }

    public TransactionDTO updateTransaction(Long id, TransactionDTO dto) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id: " + id));

        transaction.setMontant(dto.getMontant());
        transaction.setDescription(dto.getDescription());
        transaction.setDate(dto.getDate());
        transaction.setCategorie(dto.getCategorie());
        transaction.setType(dto.getType());

        Transaction updated = transactionRepository.save(transaction);
        return transactionMapper.toDto(updated);
    }

    public void deleteTransaction(Long id) {
        if (!transactionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Transaction not found with id: " + id);
        }
        transactionRepository.deleteById(id);
    }
}



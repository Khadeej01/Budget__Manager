package org.budgetmanager.backend.service;


public class TransactionService {

import org.budgetmanager.backend.dto.TransactionDTO;
import org.budgetmanager.backend.entity.Transaction;
import org.budgetmanager.backend.exception.ResourceNotFoundException;
import org.budgetmanager.backend.mapper.TransactionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.budgetmanager.backend.repository.TransactionRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionMapper transactionMapper;

    public TransactionDTO createTransaction(TransactionDTO dto) {
        Transaction transaction = transactionMapper.toEntity(dto);
        return transactionMapper.toDto(transactionRepository.save(transaction));
    }

    public List<TransactionDTO> getAllTransactions(String categorie, String type, LocalDate startDate, LocalDate endDate) {
        return transactionRepository.findAll()
                .stream()
                .filter(transaction -> (categorie == null || transaction.getCategorie().equals(categorie)) &&
                        (type == null || transaction.getType().equals(type)) &&
                        (startDate == null || !transaction.getDateTransaction().isBefore(startDate)) &&
                        (endDate == null || !transaction.getDateTransaction().isAfter(endDate)))
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
        transaction.setDateTransaction(dto.getDate());
        transaction.setCategorie(dto.getCategorie());
        transaction.setType(dto.getType());
        return transactionMapper.toDto(transactionRepository.save(transaction));
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

}

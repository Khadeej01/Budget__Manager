package org.budgetmanager.backend.repository;


public class TransactionRepository {

import org.budgetmanager.backend.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}

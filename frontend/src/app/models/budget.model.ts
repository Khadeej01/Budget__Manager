export interface Budget {
  id?: number;           // Optionnel si c’est généré par le backend
  amount: number;        // Le montant du budget
  categoryId: number;    // L'identifiant de la catégorie sélectionnée
}

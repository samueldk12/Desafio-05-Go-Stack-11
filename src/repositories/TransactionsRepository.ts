import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}


interface Request {  
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {

     return this.transactions;

  }
  

  public getBalance(): Balance {

    const val_income = this.
                      all().
                      filter( 
                          transaction  =>  transaction.type == 'income' ).
                      reduce(
                            ( prevVal, transaction ) => prevVal + transaction.value , 0);
    const val_outcome = this.
                        all().
                        filter( 
                           transaction => transaction.type == 'outcome' ).
                        reduce(
                          ( prevVal, transaction ) => prevVal + transaction.value , 0);
    const val_total = val_income - val_outcome;

    const aux_balance = {
      income: val_income,
      outcome: val_outcome,
      total:  val_total
    }

    return aux_balance;
    
  }

  public create({ title, value, type } : Request): Transaction {
    const transaction = new Transaction({title, value, type});

    if(type == 'outcome' && this.getBalance().total < value)
      throw Error("You don't have this value in your balance.");

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

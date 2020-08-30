<template>
  <div class="home">
    <!-- eslint-disable max-len -->
    <div class="transaction-history">
      <div class="header">
        <div class="text balance">
          <span>Balance: {{' '}}</span>
          <span :class="total > 0 ? 'positive' : 'negative'">${{Math.abs(total)}}</span>
        </div>
        <div class="income-expense-container">
          <div class="text income-expense">
            <span>Incomes: {{' '}}</span>
            <span class="positive">${{Math.abs(incomeTotal)}}</span>
          </div>
          <div class="text income-expense">
            <span>Expenses: {{' '}}</span>
            <span class="negative">${{Math.abs(expenseTotal)}}</span>
          </div>
        </div>
      </div>
      <div class="transaction" v-for="(transaction, index) in transactions" :key="index">
        <button class="delete-btn" @click="deleteTransaction(transaction.id)">&times;</button>
        <div class="transaction-content">
          <p class="text">{{transaction.name}}</p>
          <p
            class="text"
            :class="transaction.amount > 0 ? 'positive' : 'negative'"
          >${{Math.abs(transaction.amount)}}</p>
        </div>
      </div>
    </div>

    <div class="transaction-form-container">
      <div class="transaction-form">
        <p class="menu-label">Add Transaction</p>
        <div class="inputs">
          <label for="text">Transaction</label>
          <b-input v-model="transaction.name" placeholder="Transaction Type" />
        </div>
        <div class="inputs">
          <label for="text">Amount</label>
          <b-input v-model.number="transaction.amount" placeholder="Amount" />
        </div>
        <button
          class="btn"
          :class="isLoggedIn ? '' : 'disabled-btn'"
          :disabled="!isLoggedIn"
          @click="createTransaction()"
        >Submit</button>
        <p class="prompt" v-show="!isLoggedIn">Please Log In to Use</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  data: () => ({
    transaction: {
      name: '',
      amount: '',
    },
    incomeTotal: '',
    expenseTotal: '',
  }),
  mounted() {
    this.initUsers();
    if (this.user.id) {
      this.init(this.user.id);
    }
  },
  watch: {
    'user.id': function () {
      if (this.user.id) {
        this.init(this.user.id);
      } else {
        this.init('');
      }
    },
  },
  computed: {
    ...mapState('transactionHistory', ['transactions']),
    ...mapGetters('transactionHistory', ['transactionsGetter']),
    ...mapState('auth', ['user', 'isLoggedIn']),

    total() {
      let sum = 0;
      let income = 0;
      let expense = 0;
      this.transactions.forEach((transaction) => {
        sum += transaction.amount;
        if (transaction.amount > 0) {
          income += transaction.amount;
        }
        if (transaction.amount < 0) {
          expense += transaction.amount;
        }
      });
      /* eslint-disable */
      this.incomeTotal = income;
      this.expenseTotal = expense;
      /* eslint-enable */
      return sum;
    },
  },
  methods: {
    ...mapActions('auth', ['login']),
    ...mapActions('transactionHistory', ['init', 'delete', 'create']),
    ...mapActions('users', { initUsers: 'init' }),

    getCreated(post) {
      function timeSince(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
          return `${interval} years`;
          /* eslint-disable */
        } else if (interval == 1) {
          return `${interval} year`;
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
          return `${interval} months`;
        } else if (interval == 1) {
          return `${interval} month`;
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
          return `${interval} days`;
        } else if (interval == 1) {
          return `${interval} day`;
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
          return `${interval} hours`;
        } else if (interval == 1) {
          return `${interval} hour`;
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
          return `${interval} minutes`;
        }
        return `${Math.floor(seconds)} seconds`;
      }
      return timeSince(post.created_at.seconds * 1000) < 0
        ? '0 seconds ago'
        : `${timeSince(post.created_at.seconds * 1000)} ago`;
    },

    async createTransaction() {
      if (!this.transaction.name || !this.transaction.amount) {
        alert('Both Fields Are Required');
      }
      if (
        this.transaction.name &&
        (this.transaction.amount || this.transaction.amount === 0)
      ) {
        await this.create(this.transaction);
        this.transaction = {
          name: '',
          amount: '',
        };
      }
    },
    /* eslint-enable */

    async deleteTransaction(id) {
      await this.delete(id);
    },
  },
};
</script>

<style scoped>
.income-expense-container {
  font-size: x-large;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5em;
  transition: all 200ms ease-in-out;
}

.balance {
  font-size: xx-large;
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 0.5em;
  transition: all 200ms ease-in-out;
}

.header {
  display: flex;
  width: 100%;
  flex-direction: column;
  border-bottom: 2px rgba(0, 0, 0, 0.205) solid;
  margin-bottom: 1.25em;
  transition: all 200ms ease-in-out;
}

.prompt {
  text-align: center;
  font-weight: 700;
  color: orangered;
  transition: all 200ms ease-in-out;
}

.positive {
  color: springgreen !important;
}

.negative {
  color: orangered !important;
}

.text {
  font-weight: 700;
  letter-spacing: 0.05em;
  color: mediumpurple;
  transition: all 200ms ease-in-out;
}

.transaction-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1em 1.25em;
  transition: all 200ms ease-in-out;
}

.transaction {
  display: flex;
  width: 100%;
  justify-content: start;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  border: 1px rgba(0, 0, 0, 0.308) solid;
  border-radius: 0.35em;
  background-color: azure;
  box-shadow: 0px 0px 7.5px rgba(0, 0, 0, 0.336);
  transition: all 200ms ease-in-out;
}

.transaction-form {
  display: flex;
  flex-direction: column;
  transition: all 200ms ease-in-out;
}

.inputs {
  margin-top: 1em;
  margin-bottom: 1em;
  transition: all 200ms ease-in-out;
}

.transaction-form-container {
  width: 30%;
  min-width: 20em;
  height: fit-content;
  margin: 1em;
  margin-top: 0.5em;
  padding: 1em;
  border: 3px mediumpurple solid;
  border-radius: 0.5em;
  transition: all 200ms ease-in-out;
}

.transaction-history {
  width: 100%;
  margin: 0.5em;
  margin-left: 1em;
  margin-right: 1.5em;
  /* padding: 0.5em; */
  transition: all 200ms ease-in-out;
}

.home {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-left: 1em;
  padding-right: 1em;
  transition: all 150ms ease-in-out;
}

.delete-btn {
  background-color: crimson;
  color: aliceblue;
  border: none;
  border: 1px rgba(0, 0, 0, 0.308) solid;
  border-right: 0px;
  border-radius: 0.35em;
  border-top-right-radius: 0em;
  border-bottom-right-radius: 0em;
  box-shadow: 0px 0px 7.5px rgba(0, 0, 0, 0.336);
  transition: all 200ms ease-in-out;
}

.delete-btn:hover {
  cursor: pointer;
}

.delete-btn:focus {
  outline: none;
}

.btn {
  color: black;
  font-weight: bold;
  padding: 1em 1.25em 1em 1.25em;
  display: flex;
  margin: auto;
  margin-top: 1em;
  margin-bottom: 1em;
  background-color: mediumpurple;
  border: 1px black;
  border-radius: 0.5em;
  transition: all 150ms ease-in-out;
}
.btn:hover {
  cursor: pointer;
  background-color: rgb(216, 179, 216);
  color: rgba(0, 0, 0, 0.753);
}
.btn:focus {
  outline: none;
  background-color: rgb(207, 159, 207);
  color: black;
  transform: scale(0.95);
}

.disabled-btn {
  color: gray;
  background-color: rgba(147, 112, 216, 0.5);
}

@media only screen and (max-width: 800px) {
  .home {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-right: 3em;
  }

  .transaction-form-container {
    width: 100%;
    min-width: 0em;
  }

  .transaction-history {
    margin: 1em;
  }

  .income-expense-container {
    flex-direction: column;
    padding-left: 1em;
    padding-right: 1em;
  }

  .income-expense {
    display: flex;
    justify-content: space-between;
  }
}
</style>

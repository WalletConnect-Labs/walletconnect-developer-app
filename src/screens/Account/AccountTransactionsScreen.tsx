import * as React from "react";
import { View, FlatList } from "react-native";
import { connect } from "react-redux";
import { accountGetTransactions } from "../../redux/_account";
import ScrollViewContainer from "../../components/ScrollViewContainer";
import TransactionRow from "../../components/TransactionRow";

class AccountTransactionsScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: "Transactions",
    headerTitle: "Transactions"
  };
  componentDidMount() {
    this.getTransactions();
  }

  getTransactions() {
    this.props.accountGetTransactions();
  }

  render() {
    const { loading, address, transactions } = this.props;
    return (
      <ScrollViewContainer
        refreshing={loading}
        onRefresh={this.getTransactions}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 5 }}>
            {transactions && (
              <FlatList
                data={transactions}
                ListEmptyComponent={
                  <View style={{ height: 100, marginTop: 50 }}>
                    <View>No Transactions yet</View>
                  </View>
                }
                onRefresh={() => this.getTransactions()}
                refreshing={loading}
                keyExtractor={(item: any) => item.hash}
                renderItem={({ item }) => (
                  <TransactionRow
                    tx={item}
                    address={address}
                    navigator={navigator}
                  />
                )}
              />
            )}
          </View>
        </View>
      </ScrollViewContainer>
    );
  }
}

const reduxProps = (reduxState: any) => ({
  loading: reduxState.account.loading,
  address: reduxState.account.address,
  transactions: reduxState.account.transactions
});

export default connect(
  reduxProps,
  { accountGetTransactions }
)(AccountTransactionsScreen);

var Const = {
  luniverse: {
    endpoint: {
      contractAction: function(actionName) {
        return `https://stg-api.luniverse.io/tx-api/api/v1.1/transactions/${actionName}`;
      },
      sideTokenAction: 'https://stg-api.luniverse.io/tx-api/api/v1.0/transactions/action',
      balanceOf: function(walletAddress, contractAddress) {
        return `https://stg-api.luniverse.io/tx-api/api/v1.0/wallet/users/${walletAddress}/balances/${contractAddress}`;
      },
      history: function(mtId, ptId) {
        return `https://stg-api.luniverse.io/tx-api/api/v1.0/transactions/history/${mtId}?productTokenId=${ptId}`;
      }
    }
  }
};

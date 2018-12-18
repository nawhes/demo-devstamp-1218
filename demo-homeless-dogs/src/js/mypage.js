MyPage = {
  init: function() {
    $.ajax({
      url: Const.luniverse.endpoint.balanceOf(Config.walletAddress.user, Config.st.support.contractAddress),
      type: 'get',
      crossDomain: true,
      dataType: 'json',
      headers: {
        'api-key': Config.dapp.apiKey,
        'lchainId': Config.chainId
      },
      success: function (data) {
        let sptBalance = data.data.balance || '';
        $('#spt').text((new BigNumber(sptBalance)).div((new BigNumber('10')).pow(18)).toFixed(5));
      },
      error: function (data) {
      }
    });

    $.ajax({
      url: Const.luniverse.endpoint.balanceOf(Config.walletAddress.user, Config.st.adopt.contractAddress),
      type: 'get',
      crossDomain: true,
      dataType: 'json',
      headers: {
        'api-key': Config.dapp.apiKey,
        'lchainId': Config.chainId
      },
      success: function (data) {
        let adtBalance = data.data.balance || '';
        $('#adt').text((new BigNumber(adtBalance)).div((new BigNumber('10')).pow(18)).toFixed(5));
      },
      error: function (data) {
      }
    });
  },
};

$(function() {
  MyPage.init();
});

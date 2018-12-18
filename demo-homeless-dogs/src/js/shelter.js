Shelter = {
  init: function() {
    $.getJSON('./data/animals.json?v=12', function (animals) {
      let columns = '';
      const makeColumn = (animal) => {
        const column = `
          <div class="column is-one-quarter">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="${animal.mainImgUrl}" alt="Placeholder image">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img src="${animal.subImgUrl}" alt="Placeholder image">
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">${animal.name}</p>
                    <p class="subtitle is-6" id="dog-${animal.animalId}"></p>
                  </div>
                </div>
                <div class="content">
                  ${animal.intro}
                </div>
                <div class="content">
                  <a onclick="adopt(${animal.animalId}, '${animal.name}', '${animal.subImgUrl}')" class="button is-link is-fullwidth">입양신청하기</a>
                </div>
              </div>
            </div>
          </div>`
        return column;
      }

      const shelterId = parseInt(getParameterByName('shelterId'), 10);
      let animalCount = 0;
      $.each(animals, function(index, animal) {
        if (shelterId && shelterId === animal.shelterId) {
          columns += makeColumn(animal);
          animalCount ++;
        }
      });

      $('.subtitle').text(`마포구보호소에서 ${animalCount}마리의 유기견이 도움을 기다리고 있어요.`)
      $('.columns').html(columns);

      // STEP 2 Remove this anotation

      /*
      for(let i = 0; i < animals.length; i ++) {
        $.ajax({
          url: Const.luniverse.endpoint.contractAction(Config.txActionName.getOwner),
          type: 'post',
          crossDomain: true,
          dataType: 'json',
          headers: {
            'Authorization': `Bearer ${Config.dapp.apiKey}`,
          },
          data: {
            'inputs': {
              '_index': animals[i].animalId
            }
          },
          success: function (data) {
            if (data.data.res[0] !== '') {
              $(`#dog-${animals[i].animalId}`).text(`입양인: ${data.data.res[0]}`)
            }
          },
          error: function (data) {
          }
        })
      }
      */
    });
  }
};

$(function() {
  Shelter.init();
});

function support(value) {
  $('.overlay').show()
  $.ajax({
    url: Const.luniverse.endpoint.sideTokenAction,
    type: 'post',
    crossDomain: true,
    dataType: 'json',
    headers: {
      'api-key': Config.dapp.apiKey,
    },
    data: {
      'senderAddress': Config.walletAddress.user,
      'receiverAddress': Config.walletAddress.pd,
      'valueAmount': (new BigNumber(value)).times((new BigNumber(10)).pow(18)).toFixed(),
      'feePercent': '0',
      'actionName': 'Support'
    },
    success: function (data) {
      $.ajax({
        url: Const.luniverse.endpoint.sideTokenAction,
        type: 'post',
        crossDomain: true,
        dataType: 'json',
        headers: {
          'api-key': Config.dapp.apiKey,
        },
        data: {
          'senderAddress': Config.walletAddress.pd,
          'receiverAddress': Config.walletAddress.user,
          'valueAmount': (new BigNumber(value)).times(10).times((new BigNumber(10)).pow(18)).toFixed(),
          'feePercent': '0',
          'actionName': 'Reward'
        },
        success: function (data) {
          alert(`후원에 성공하여 ${value * 10} ADT를 획득했습니다.`)
          $('.overlay').hide()
        },
        error: function (data) {
          alert('후원에 실패했습니다.')
          $('.overlay').hide()
        }
      });
    },
    error: function (data) {
      alert('후원에 실패했습니다.')
      $('.overlay').hide()
    }
  });
}

function adopt(animalId, animalName, imgUrl) {
  $('.overlay').show()
  $.ajax({
    url: Const.luniverse.endpoint.sideTokenAction,
    type: 'post',
    crossDomain: true,
    dataType: 'json',
    headers: {
      'api-key': Config.dapp.apiKey,
    },
    data: {
      'senderAddress': Config.walletAddress.user,
      'receiverAddress': Config.walletAddress.pd,
      'valueAmount': (new BigNumber(100)).times((new BigNumber(10)).pow(18)).toFixed(),
      'feePercent': '0',
      'actionName': 'Adopt'
    },
    success: function (data) {
      // STEP 2 Remove this anotation

      /*
      $.ajax({
        url: Const.luniverse.endpoint.contractAction(Config.txActionName.setOwner),
        type: 'post',
        crossDomain: true,
        dataType: 'json',
        headers: {
          'Authorization': `Bearer ${Config.dapp.apiKey}`,
        },
        data: {
          'from': Config.walletAddress.pd,
          'inputs': {
            '_index': animalId,
            '_name': Config.userName
          }
        },
        success: function (data) {
          alert('입양에 성공하였습니다.')
          $('.overlay').hide()
        },
        error: function (data) {
          alert('입양에 실패하였습니다.')
          $('.overlay').hide()
        }
      })
      */

     // STEP 2 remove below 2 line
     alert('입양에 성공하였습니다.')
     $('.overlay').hide()
    },
    error: function (data) {
      alert('입양에 실패하였습니다.')
      $('.overlay').hide()
    }
  });
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

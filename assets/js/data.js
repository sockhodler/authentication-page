// Bind
/**
 * follows a path on the given data to retrieve a value
 *
 * @example
 * var data = { foo : { bar : 'abc' } };
 * followPath(data, 'foo.bar'); // 'abc'
 * 
 * @param  {Object} data the object to get a value from
 * @param  {String} path a path to a value on the data object
 * @return the value of following the path on the data object
 */
 function followPath(data, path) {
  return path.split('.').reduce(function(prev, curr) {
    return prev && prev[curr];
  }, data);
}

/**
 * sets value of an element based on it's data-value attribute
 * 
 * @param  {Object}  data     the data source
 * @param  {Element} element  the element
 */
function bindSingleElement(data, element) {
  var path = element.getAttribute('data-value');
  element.innerText = followPath(data, path);
}

/**
 * Binds data object to an element. Allows arbitrary nesting of fields
 *
 * @example
 * <div class='user'>
 *   <p data-value='name'></p>
 * </div>
 * 
 * var element = document.querySelector('.user');
 * bind({ name : 'Nick' }, element);
 * 
 * @param  {Object}  data     the data to bind to an element
 * @param  {Element} element  the element to bind data to
 */
function bind(data, element) {
  var holders = element.querySelectorAll('[data-value]');
  [].forEach.call(holders, bindSingleElement.bind(null, data));
}/**
 * follows a path on the given data to retrieve a value
 *
 * @example
 * var data = { foo : { bar : 'abc' } };
 * followPath(data, 'foo.bar'); // 'abc'
 * 
 * @param  {Object} data the object to get a value from
 * @param  {String} path a path to a value on the data object
 * @return the value of following the path on the data object
 */
function followPath(data, path) {
  return path.split('.').reduce(function(prev, curr) {
    return prev && prev[curr];
  }, data);
}

/**
 * sets value of an element based on it's data-value attribute
 * 
 * @param  {Object}  data     the data source
 * @param  {Element} element  the element
 */
function bindSingleElement(data, element) {
  var path = element.getAttribute('data-value');
  element.innerText = followPath(data, path);
}

/**
 * Binds data object to an element. Allows arbitrary nesting of fields
 *
 * @example
 * <div class='user'>
 *   <p data-value='name'></p>
 * </div>
 * 
 * var element = document.querySelector('.user');
 * bind({ name : 'Nick' }, element);
 * 
 * @param  {Object}  data     the data to bind to an element
 * @param  {Element} element  the element to bind data to
 */
function bind(data, element) {
  var holders = element.querySelectorAll('[data-value]');
  [].forEach.call(holders, bindSingleElement.bind(null, data));
}

// Setters
function setNftAddress(chainId, ownerAddress, contractAddress) {
  if (chainId) {
    let url;
    if (chainId === 1) {
      url = 'https://etherscan.io/address/';
    } else if (chainId === 137) {
      url = 'https://polygonscan.com/address/';
    }
    document.getElementById('owner-address').href = (url + ownerAddress);
    document.getElementById('contract-address').href = (url + contractAddress);
  }
}

function setRedemptionUrl(url) {
  if (url) {
    document.getElementById('redeem').href = url;
  } else {
    document.getElementById('redeem').classList.add('disabled');
  }
}

// Data-binding
let queryVar = 'pl'

function getQueryVariable(queryVar) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == queryVar) {
      return decodeURIComponent(pair[1]);
    }
  }
  console.log('Query variable %s not found', queryVar);
}

async function getTagData(variable) {
  let response = await fetch('https://staging.smartseal.io/api/authenticate/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(variable)
  });
  let data = await response.text();
  data = JSON.parse(data);

  let statusIcon;
  let statusType;
  let statusMessage;

  switch (data.scan.auth_stat) {
    case 0:
      statusIcon = './assets/icons/status-error.svg';
      statusType = 'Error'
      statusMessage = 'There was a problem authenticating this tag. Please contact info@smartseal.io for more information';
      break;
    case 1:
      statusIcon = './assets/icons/status-success.svg';
      statusType = 'Authenticated'
      document.getElementById('status-message').style.display = 'none';
      document.getElementById('__status-box').style.display = 'block';
      document.getElementById('redeem').style.display = 'block';
      setNftAddress(data.tag.chain_id, data.tag.nft_owner_address, data.tag.nft_contract_address);
      setRedemptionUrl(data.tag.nft_redemption_url);
      break;
    case 2:
      statusIcon = './assets/icons/status-success.svg';
      statusType = 'Authenticated and Sealed'
      document.getElementById('status-message').style.display = 'none';
      document.getElementById('__status-box').style.display = 'block';
      setNftAddress(data.tag.chain_id, data.tag.nft_owner_address, data.tag.nft_contract_address);
      setRedemptionUrl(data.tag.nft_redemption_url);
      break;
    case 3:
      statusIcon = './assets/icons/status-success.svg';
      statusType = 'Authenticated and Unsealed'
      document.getElementById('status-message').style.display = 'none';
      document.getElementById('__status-box').style.display = 'block';
      setNftAddress(data.tag.chain_id, data.tag.nft_owner_address, data.tag.nft_contract_address);
      break;
    case 4:
      statusIcon = './assets/icons/status-error.svg';
      statusType = 'Tag Not Active'
      statusMessage = 'Here is where we can have the error message on this screen and the next action';
      break;
    case 5:
      statusIcon = './assets/icons/status-error.svg';
      statusType = 'Tag Not Active'
      statusMessage = 'Here is where we can have the error message on this screen and the next action';
      break;
    case 6:
      statusIcon = './assets/icons/status-error.svg';
      statusType = 'Tag Not Active'
      statusMessage = 'Here is where we can have the error message on this screen and the next action';
      break;
    case 7:
        statusIcon = './assets/icons/status-warning.svg';
        statusType = 'Authentication Token Expired'
        statusMessage = 'Please rescan tag';
        break;
    case 8:
      statusIcon = './assets/icons/status-error.svg';
      statusType = 'Authentication Code Not Valid'
      statusMessage = 'Here is where we can have the error message on this screen and the next action';
      break;
  }
  document.getElementById('status-icon').src = statusIcon;
  document.getElementById('status-type').innerText = statusType;
  document.getElementById('status-message').innerText = statusMessage;
  bind(data, document.querySelector('.auth-page'));
  return data;
}

var data;
var response;
var post_data;
var url_payload = getQueryVariable(queryVar);
post_data = {useragent:'useragent string goes here', ip_address:'111.111.111.111', url_payload:'4D43652BD6DFD67F9359EEEB178BFD7AFBA2C1915C52AF90'};
// post_data = { useragent: 'useragent string goes here', ip_address: '111.111.111.111', url_payload: url_payload };
response = getTagData(post_data);

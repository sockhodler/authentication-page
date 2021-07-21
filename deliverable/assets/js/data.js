// Bind
/**
 * follows a path on the given data to retrieve a value
 *
 * @example
 * var data = { foo : { bar : "abc" } };
 * followPath(data, "foo.bar"); // "abc"
 * 
 * @param  {Object} data the object to get a value from
 * @param  {String} path a path to a value on the data object
 * @return the value of following the path on the data object
 */
 function followPath(data, path) {
  return path.split(".").reduce(function(prev, curr) {
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
  var path = element.getAttribute("data-value");
  element.innerText = followPath(data, path);
}

/**
 * Binds data object to an element. Allows arbitrary nesting of fields
 *
 * @example
 * <div class="user">
 *   <p data-value="name"></p>
 * </div>
 * 
 * var element = document.querySelector(".user");
 * bind({ name : "Nick" }, element);
 * 
 * @param  {Object}  data     the data to bind to an element
 * @param  {Element} element  the element to bind data to
 */
function bind(data, element) {
  var holders = element.querySelectorAll("[data-value]");
  [].forEach.call(holders, bindSingleElement.bind(null, data));
}/**
 * follows a path on the given data to retrieve a value
 *
 * @example
 * var data = { foo : { bar : "abc" } };
 * followPath(data, "foo.bar"); // "abc"
 * 
 * @param  {Object} data the object to get a value from
 * @param  {String} path a path to a value on the data object
 * @return the value of following the path on the data object
 */
function followPath(data, path) {
  return path.split(".").reduce(function(prev, curr) {
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
  var path = element.getAttribute("data-value");
  element.innerText = followPath(data, path);
}

/**
 * Binds data object to an element. Allows arbitrary nesting of fields
 *
 * @example
 * <div class="user">
 *   <p data-value="name"></p>
 * </div>
 * 
 * var element = document.querySelector(".user");
 * bind({ name : "Nick" }, element);
 * 
 * @param  {Object}  data     the data to bind to an element
 * @param  {Element} element  the element to bind data to
 */
function bind(data, element) {
  var holders = element.querySelectorAll("[data-value]");
  [].forEach.call(holders, bindSingleElement.bind(null, data));
}

// Data-binding
let queryVar = "pl"

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
  let response = await fetch("https://staging.smartseal.io/api/authenticate/", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(variable)
  });
  let data = await response.text();
  // console.log(data);
  data = JSON.parse(data);
  console.log(data);
  var boilerplate = "-Tag Information-";
  var newline = "<br />";
  var str = boilerplate.concat(newline, "Authentication Status: ", data.message,
    newline, "Product: ", data.tag.product_name,
    newline, "UID: ", data.tag.uid,
    newline, "NFT Contract Address: ", data.tag.nft_contract_address,
    newline, "NFT Token ID: ", data.tag.nft_token_id,
    newline, "NFT Owner Address: ", data.tag.nft_owner_address.
    newline);
  // document.getElementById("main").innerHTML = str;
  switch (data.scan.auth_stat) {
    case 0:
      console.log('0');
      var statusIcon = "./assets/icons/status-error.svg";
      var statusType = 'Error'
      var statusMessage = 'There was a problem authenticating this tag. Please contact info@smartseal.io for more information';
      break;
    case 1:
      console.log('1');
      var statusIcon = "..icassets/ons/status-success.svg";
      var statusType = 'Authenticated'
      break;
    case 2:
      console.log('2');
      var statusIcon = "..icassets/ons/status-success.svg";
      var statusType = 'Authenticated and Sealed'
      break;
    case 3:
      console.log('3');
      var statusIcon = "..icassets/ons/status-success.svg";
      var statusType = 'Authenticated and Unsealed'
      break;
    case 4:
      console.log('4');
      var statusIcon = "..icassets/ons/status-warning.svg";
      var statusType = 'Authentication Token Expired'
      var statusMessage = 'Please rescan tag';
      break;
    case 5:
      console.log('5');
      var statusIcon = "./assets/icons/status-error.svg";
      var statusType = 'Tag Not Active'
      var statusMessage = 'Here is where we can have the error message on this screen and the next action';
      break;
    case 6:
      console.log('6');
      var statusIcon = "./assets/icons/status-error.svg";
      var statusType = 'Tag Not Active'
      var statusMessage = 'Here is where we can have the error message on this screen and the next action';
      break;
    case 7:
      console.log('7');
      var statusIcon = "./assets/icons/status-error.svg";
      var statusType = 'Authentication Code Not Valid'
      var statusMessage = 'Here is where we can have the error message on this screen and the next action';
      break;
  }
  document.getElementById('status-icon').src = statusIcon;
  document.getElementById('status-type').innerText = statusType;
  if (statusMessage !== '')
    document.getElementById('status-message').innerHtml = statusMessage;
  bind(data, document.querySelector(".auth-page"));
  return data;
}

var data;
var response;
var post_data;
var url_payload = getQueryVariable(queryVar);
post_data = {useragent:"useragent string goes here", ip_address:"111.111.111.111", url_payload:"4D43652BD6DFD67F9359EEEB178BFD7AFBA2C1915C52AF90"};
// post_data = { useragent: "useragent string goes here", ip_address: "111.111.111.111", url_payload: url_payload };
response = getTagData(post_data);

import template from './template.js';
import { bind } from './helpers.js';


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

var url_payload = getQueryVariable(queryVar);
var post_data = { useragent: 'useragent string goes here', ip_address: '111.111.111.111', url_payload: '4D43652BD6DFD67F9359EEEB178BFD7AFBA2C1915C52AF90' };
// post_data = { useragent: 'useragent string goes here', ip_address: '111.111.111.111', url_payload: url_payload };

export class SmartSealAuth extends HTMLElement {
  constructor() {
    super();
    // attach Shadow DOM to the parent element.
    // save the shadowRoot in a property because, if you create your shadow DOM in closed mode, 
    // you have no access from outside

    const shadowRoot = this.attachShadow({mode: 'open'});

    // clone template content nodes to the shadow DOM
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.description = this.shadowRoot.querySelector('.description');
    this.description.addEventListener('click', () => {
      this.toggleDescription();
    });

    this.closeBtn = this.shadowRoot.querySelector('.btn-close');
    this.closeBtn.addEventListener('click', () => {
      this.close();
    });

    var response = this.getTagData(post_data);
  }

  toggleDescription() {
    this.description.classList.toggle('hide');
  }

  close() {
    this.shadowRoot.querySelector('.auth-page-wrapper').style.display = 'none';
  }

  // Setters
  setNftAddress(chainId, ownerAddress, contractAddress) {
    if (chainId) {
      let url;
      if (chainId === 1) {
        url = 'https://etherscan.io/address/';
      } else if (chainId === 137) {
        url = 'https://polygonscan.com/address/';
      }
      this.shadowRoot.getElementById('owner-address').href = (url + ownerAddress);
      this.shadowRoot.getElementById('contract-address').href = (url + contractAddress);
    }
  }

  setRedemptionUrl(url) {
    if (url) {
      this.shadowRoot.getElementById('redeem').href = url;
    } else {
      this.shadowRoot.getElementById('redeem').classList.add('disabled');
    }
  }

  async getTagData(variable) {
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
        this.shadowRoot.getElementById('status-message').style.display = 'none';
        this.shadowRoot.getElementById('__status-box').style.display = 'block';
        this.shadowRoot.getElementById('redeem').style.display = 'block';
        this.setNftAddress(data.tag.chain_id, data.tag.nft_owner_address, data.tag.nft_contract_address);
        this.setRedemptionUrl(data.tag.nft_redemption_url);
        break;
      case 2:
        statusIcon = './assets/icons/status-success.svg';
        statusType = 'Authenticated and Sealed'
        this.shadowRoot.getElementById('status-message').style.display = 'none';
        this.shadowRoot.getElementById('__status-box').style.display = 'block';
        this.setNftAddress(data.tag.chain_id, data.tag.nft_owner_address, data.tag.nft_contract_address);
        this.setRedemptionUrl(data.tag.nft_redemption_url);
        break;
      case 3:
        statusIcon = './assets/icons/status-success.svg';
        statusType = 'Authenticated and Unsealed'
        this.shadowRoot.getElementById('status-message').style.display = 'none';
        this.shadowRoot.getElementById('__status-box').style.display = 'block';
        this.setNftAddress(data.tag.chain_id, data.tag.nft_owner_address, data.tag.nft_contract_address);
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
    this.shadowRoot.getElementById('status-icon').src = statusIcon;
    this.shadowRoot.getElementById('status-type').innerText = statusType;
    this.shadowRoot.getElementById('status-message').innerText = statusMessage;
    bind(data, this.shadowRoot.querySelector('.auth-page'));
    return data;
  }
}

window.customElements.define('smartseal-auth', SmartSealAuth);

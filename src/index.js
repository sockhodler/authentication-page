import template from './template.js';
import { bind } from './helpers.js';
import iconError from './assets/icons/sh-status-error.svg';
import iconWarning from './assets/icons/sh-status-warning.svg';
import iconSuccess from './assets/icons/sh-status-success.svg';
export class SockHodlerAuth extends HTMLElement {
  constructor() {
    super();
    // attach Shadow DOM to the parent element.
    // save the shadowRoot in a property because, if you create your shadow DOM in closed mode,
    // you have no access from outside

    const shadowRoot = this.attachShadow({mode: 'open'});

    // clone template content nodes to the shadow DOM
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.injectFont();
  }

  connectedCallback() {
    this.description = this.shadowRoot.querySelector('.description');
    this.description.addEventListener('click', () => {
      this.toggleDescription();
    });

    this.closeBtn = this.shadowRoot.querySelector('.btn-close');
    this.closeBtn.addEventListener('click', () => {
      this.hide();
    });

    let queryVar = 'pl'

    var url_payload = this.getQueryVariable(queryVar);
    // var post_data = { useragent: 'useragent string goes here', ip_address: '111.111.111.111', url_payload: '4D43652BD6DFD67F9359EEEB178BFD7AFBA2C1915C52AF90' };
    var post_data = { useragent: 'useragent string goes here', ip_address: '111.111.111.111', url_payload: url_payload };

    if( post_data && post_data.url_payload ){
      this.getTagData(post_data);
    }
  }

  getQueryVariable(queryVar) {
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

  toggleDescription() {
    this.description.classList.toggle('hide');
  }

  show() {
    this.shadowRoot.querySelector('.auth-page-wrapper').style.display = 'block';
  }

  hide() {
    this.shadowRoot.querySelector('.auth-page-wrapper').style.display = 'none';
    this.dispatchEvent( new CustomEvent( 'smartseal-close', { bubbles: true} ) );
  }

  // Setters
  setNftAddress(chainId, tokenId, ownerAddress, creatorAddress, totalSupply, circSupply, mediaFile) {
    if (chainId) {
      let url;
      if (chainId === 1) {
        url = 'https://etherscan.io/address/';
      } else if (chainId === 137) {
        url = 'https://polygonscan.com/address/';
      } else if (chainId === 3) {
        url = 'https://ropsten.etherscan.io/address/';
      } else if (chainId === 247) {
        url = 'https://algoexplorer.io/';
      }
      this.shadowRoot.getElementById('token-id').href = (url + 'asset/' + tokenId);
      this.shadowRoot.getElementById('owner-address').href = (url + 'address/' + ownerAddress);
      this.shadowRoot.getElementById('creator-address').href = (url + 'address/' + creatorAddress);
      this.shadowRoot.getElementById('total-supply').innerText = totalSupply;
      this.shadowRoot.getElementById('circ-supply').innerText = circSupply;
      this.shadowRoot.getElementById('media-file').href = mediaFile;
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
    let response = await fetch('https://socks.smartseal.io/api/authenticate/', {
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
        statusIcon = iconError;
        statusType = 'Error'
        statusMessage = 'There was a problem authenticating this tag. Please contact sockmaster@sockhodler.com for more information';
        break;
      case 1:
        statusIcon = iconSuccess;
        statusType = 'Authenticated'
        this.shadowRoot.getElementById('status-message').style.display = 'none';
        this.shadowRoot.getElementById('__status-box').style.display = 'block';
        this.shadowRoot.getElementById('redeem').style.display = 'block';
        this.setNftAddress(data.tag.chain_id, data.algo_id, data.tag.algo_owner, data.tag.algo_creator, data.tag.algo_total, data.tag.algo_circulatingsupply, data.tag.algo_url);
        this.setRedemptionUrl(data.tag.nft_redemption_url);
        break;
      case 2:
        statusIcon = iconSuccess;
        statusType = 'Authenticated and Sealed'
        this.shadowRoot.getElementById('status-message').style.display = 'none';
        this.shadowRoot.getElementById('__status-box').style.display = 'block';
        this.setNftAddress(data.tag.chain_id, data.algo_id, data.tag.algo_owner, data.tag.algo_creator, data.tag.algo_total, data.tag.algo_circulatingsupply, data.tag.algo_url);
        this.setRedemptionUrl(data.tag.nft_redemption_url);
        break;
      case 3:
        statusIcon = iconSuccess;
        statusType = 'Authenticated and Unsealed'
        this.shadowRoot.getElementById('status-message').style.display = 'none';
        this.shadowRoot.getElementById('__status-box').style.display = 'block';
        this.setNftAddress(data.tag.chain_id, data.algo_id, data.tag.algo_owner, data.tag.algo_creator, data.tag.algo_total, data.tag.algo_circulatingsupply, data.tag.algo_url);
        break;
      case 4:
        statusIcon = iconError;
        statusType = 'Tag Not Active'
        statusMessage = 'This tag is not currently active.';
        break;
      case 5:
        statusIcon = iconError;
        statusType = 'Tag Not Active'
        statusMessage = 'This tag is not currently active.';
        break;
      case 6:
        statusIcon = iconError;
        statusType = 'Tag Not Active'
        statusMessage = 'This tag is not currently active.';
        break;
      case 7:
          statusIcon = iconWarning;
          statusType = 'Authentication Token Expired'
          statusMessage = 'Please rescan tag';
          break;
      case 8:
        statusIcon = iconError;
        statusType = 'Authentication Code Not Valid'
        statusMessage = 'This authentication code is not valid.  Please contact sockmaster@sockhodler.com for more information.';
        break;
      default:
        statusIcon = iconError;
        statusType = 'Error'
        statusMessage = 'There was a problem authenticating this tag. Please contact sockmaster@sockhodler.com for more information';
        break;
    }
    this.shadowRoot.getElementById('status-icon').innerHTML = statusIcon;
    this.shadowRoot.getElementById('status-type').innerText = statusType;
    this.shadowRoot.getElementById('status-message').innerText = statusMessage;
    bind(data, this.shadowRoot.querySelector('.auth-page'));

    this.show();

    return data;
  }

  injectFont(){
    var css = `
    @font-face {
      font-family: 'Lato';
      font-style: normal;
      font-display: swap;
      src: url('https://fonts.googleapis.com/css2?family=Lato:400,700');
    }
    `;

    if(!document.getElementById('smartSealFont')){
      var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
      style.id = 'smartSealFont';
      style.type = 'text/css';
      style.innerText = css;
      head.appendChild(style);
    }
  }
}

window.customElements.define('sockhodler-auth', SockHodlerAuth);

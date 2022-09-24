import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import omit from 'object.omit';

const javasriptCode = `(function() {
    window.postMessage = function(data) {
      window.ReactNativeWebView.postMessage(data);
    };
  })()`;

class PlaidAuthentication extends Component {
    render() {
        const {
            clientName,
            countryCodes,
            env,
            plaidRef,
            product,
            publicKey,
            selectAccount,
            style,
            token,
            userEmail,
            userLegalName,
            webhook
        } = this.props;

        let uri = `https://cdn.plaid.com/link/v2/stable/link.html?key=${publicKey}&apiVersion=v2&env=${env}&product=${product}&clientName=${clientName}&isWebView=true&isMobile=true&selectAccount=${selectAccount}`;

        uri = countryCodes !== undefined ? `${uri}&countryCodes=${countryCodes}` : uri;
        uri = userLegalName !== undefined ? `${uri}&userLegalName=${userLegalName}` : uri;
        uri = token !== undefined ? `${uri}&token=${token}` : uri;
        uri = userEmail !== undefined ? `${uri}&userEmail=${userEmail}` : uri;
        uri = webhook !== undefined ? `${uri}&webhook=${webhook}` : uri;

    return (
        <WebView
          {...omit(this.props, [
            'clientName',
            'countryCodes',
            'env',
            'product',
            'publicKey',
            'ref',
            'selectAccount',
            'token',
            'userEmail',
            'userLegalName',
            'webhook'
            ])}
          ref={plaidRef}
          source={{ uri }}
          onMessage={this.onMessage}
            useWebKit
          injectedJavaScript={javasriptCode}
        />
        );
    }

    onMessage = (e) => {
        this.props.onMessage(JSON.parse(e.nativeEvent.data))
    };
};

PlaidAuthentication.propTypes = {
    clientName: PropTypes.string,
    countryCodes: PropTypes.string,
    env: PropTypes.string.isRequired,
    onMessage: PropTypes.func.isRequired,
    plaidRef: PropTypes.func,
    product: PropTypes.string.isRequired,
    publicKey: PropTypes.string.isRequired,
    userEmail: PropTypes.string,
    userLegalName: PropTypes.string,
    webhook: PropTypes.string
};

PlaidAuthentication.defaultProps = {
    clientName: '',
    plaidRef: () => {}
};

export default PlaidAuthenticator;